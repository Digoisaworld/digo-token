import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import nacl from 'tweetnacl';
import bs58 from 'bs58';
import { PublicKey } from '@solana/web3.js';
import { pool, query } from './db.js';
import { randomBytes, randomUUID } from 'node:crypto';

const required = ['DATABASE_URL','JWT_SECRET','APP_ORIGIN'];
for (const key of required) if (!process.env[key]) throw new Error(`Missing required env var: ${key}`);
if (process.env.JWT_SECRET.length < 32) throw new Error('JWT_SECRET must be at least 32 characters');
const PORT = Number(process.env.PORT || 8787);
const NONCE_TTL = Number(process.env.AUTH_NONCE_TTL_SECONDS || 300);
const JWT_TTL = Number(process.env.JWT_TTL_SECONDS || 86400);
const MAX_TAPS = Math.min(10, Math.max(1, Number(process.env.MAX_TAPS_PER_BATCH || 10)));
const MIN_INTERVAL = Math.max(500, Number(process.env.MIN_TAP_INTERVAL_MS || 700));
const ORIGIN = process.env.APP_ORIGIN;
const app = express();
app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: ORIGIN.split(',').map(x=>x.trim()), methods:['GET','POST'], allowedHeaders:['Content-Type','Authorization'] }));
app.use(express.json({limit:'8kb'}));
app.use(rateLimit({windowMs:60_000,limit:120,standardHeaders:true,legacyHeaders:false}));
app.get('/health', async (_req,res)=>{try{await query('SELECT 1');res.json({ok:true,service:'digo-evolution-api'})}catch{res.status(503).json({ok:false})}});

function validWallet(value){try{return new PublicKey(value).toBase58()===value}catch{return false}}
function auth(req,res,next){const raw=req.headers.authorization||'';const token=raw.startsWith('Bearer ')?raw.slice(7):'';try{req.user=jwt.verify(token,process.env.JWT_SECRET,{issuer:'digo-evolution',audience:'digo-game'});next()}catch{return res.status(401).json({error:'unauthorized'})}}

app.post('/v1/auth/nonce', async (req,res)=>{
  const wallet=req.body?.wallet;
  if(typeof wallet!=='string'||!validWallet(wallet)) return res.status(400).json({error:'invalid_wallet'});
  const nonce=randomBytes(24).toString('hex');
  const expiresAt=new Date(Date.now()+NONCE_TTL*1000);
  await query('INSERT INTO auth_nonces(nonce,wallet_address,expires_at) VALUES($1,$2,$3)',[nonce,wallet,expiresAt]);
  const message=`DIGO Evolution sign-in\nWallet: ${wallet}\nNonce: ${nonce}\nOrigin: ${ORIGIN}\nExpires: ${expiresAt.toISOString()}\n\nSigning proves wallet ownership. It does not authorize a token transfer.`;
  res.json({nonce,message,expiresAt:expiresAt.toISOString()});
});

app.post('/v1/auth/verify', async (req,res)=>{
  const {wallet,nonce,signature}=req.body||{};
  if(typeof wallet!=='string'||!validWallet(wallet)||typeof nonce!=='string'||typeof signature!=='string') return res.status(400).json({error:'invalid_request'});
  let sig;try{sig=bs58.decode(signature)}catch{return res.status(400).json({error:'invalid_signature'})}
  if(sig.length!==64) return res.status(400).json({error:'invalid_signature'});
  const client=await pool.connect();
  try{
    await client.query('BEGIN');
    const n=await client.query('SELECT nonce,wallet_address,expires_at,consumed_at FROM auth_nonces WHERE nonce=$1 FOR UPDATE',[nonce]);
    if(!n.rowCount||n.rows[0].wallet_address!==wallet||n.rows[0].consumed_at||new Date(n.rows[0].expires_at)<new Date()){await client.query('ROLLBACK');return res.status(401).json({error:'nonce_invalid_or_expired'})}
    const expiresAt=new Date(n.rows[0].expires_at);
    const message=`DIGO Evolution sign-in\nWallet: ${wallet}\nNonce: ${nonce}\nOrigin: ${ORIGIN}\nExpires: ${expiresAt.toISOString()}\n\nSigning proves wallet ownership. It does not authorize a token transfer.`;
    const ok=nacl.sign.detached.verify(new TextEncoder().encode(message),sig,new PublicKey(wallet).toBytes());
    if(!ok){await client.query('ROLLBACK');return res.status(401).json({error:'signature_invalid'})}
    await client.query('UPDATE auth_nonces SET consumed_at=NOW() WHERE nonce=$1',[nonce]);
    await client.query('INSERT INTO game_accounts(wallet_address) VALUES($1) ON CONFLICT(wallet_address) DO NOTHING',[wallet]);
    await client.query('COMMIT');
    const token=jwt.sign({sub:wallet},process.env.JWT_SECRET,{expiresIn:JWT_TTL,issuer:'digo-evolution',audience:'digo-game'});
    res.json({token,wallet,expiresIn:JWT_TTL});
  }catch(e){await client.query('ROLLBACK');console.error('auth verify failed',e);res.status(500).json({error:'internal_error'})}
  finally{client.release()}
});

app.get('/v1/me',auth,async(req,res)=>{
  const r=await query('SELECT wallet_address,total_points,total_taps,created_at FROM game_accounts WHERE wallet_address=$1',[req.user.sub]);
  if(!r.rowCount)return res.status(404).json({error:'account_not_found'});
  const a=r.rows[0];res.json({wallet:a.wallet_address,totalPoints:Number(a.total_points),totalTaps:Number(a.total_taps),createdAt:a.created_at});
});

app.post('/v1/game/taps',auth,async(req,res)=>{
  const {requestId,taps}=req.body||{};
  if(typeof requestId!=='string'||! /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestId)||!Number.isInteger(taps)||taps<1||taps>MAX_TAPS) return res.status(400).json({error:'invalid_tap_batch',maxTaps:MAX_TAPS});
  const client=await pool.connect();
  try{
    await client.query('BEGIN');
    const account=await client.query('SELECT total_points,total_taps,last_tap_at FROM game_accounts WHERE wallet_address=$1 FOR UPDATE',[req.user.sub]);
    if(!account.rowCount){await client.query('ROLLBACK');return res.status(404).json({error:'account_not_found'})}
    const duplicate=await client.query('SELECT points_awarded FROM score_events WHERE wallet_address=$1 AND request_id=$2',[req.user.sub,requestId]);
    if(duplicate.rowCount){await client.query('COMMIT');return res.json({accepted:0,duplicate:true,totalPoints:Number(account.rows[0].total_points),totalTaps:Number(account.rows[0].total_taps)})}
    const last=account.rows[0].last_tap_at?new Date(account.rows[0].last_tap_at).getTime():0;
    const now=Date.now();
    const earliest=last+MIN_INTERVAL*taps;
    if(last&&now<earliest){await client.query('ROLLBACK');return res.status(429).json({error:'tap_rate_limited',retryAfterMs:earliest-now})}
    await client.query('INSERT INTO score_events(wallet_address,request_id,taps,points_awarded) VALUES($1,$2,$3,$3)',[req.user.sub,requestId,taps]);
    const updated=await client.query('UPDATE game_accounts SET total_points=total_points+$2,total_taps=total_taps+$2,last_tap_at=NOW(),updated_at=NOW() WHERE wallet_address=$1 RETURNING total_points,total_taps',[req.user.sub,taps]);
    await client.query('COMMIT');
    res.json({accepted:taps,totalPoints:Number(updated.rows[0].total_points),totalTaps:Number(updated.rows[0].total_taps)});
  }catch(e){await client.query('ROLLBACK');if(e.code==='23505')return res.status(409).json({error:'duplicate_request'});console.error('tap update failed',e);res.status(500).json({error:'internal_error'})}
  finally{client.release()}
});

app.get('/v1/leaderboard',async(req,res)=>{
  const limit=Math.min(50,Math.max(1,Number(req.query.limit||20)));
  const r=await query('SELECT wallet_address,total_points,total_taps FROM game_accounts ORDER BY total_points DESC,updated_at ASC LIMIT $1',[limit]);
  res.json({items:r.rows.map((x,i)=>({rank:i+1,wallet:x.wallet_address,totalPoints:Number(x.total_points),totalTaps:Number(x.total_taps)}))});
});

app.use((err,_req,res,_next)=>{console.error('unhandled request error',err);res.status(500).json({error:'internal_error'})});
const server=app.listen(PORT,()=>console.log(`DIGO Evolution API listening on ${PORT}`));
async function shutdown(){server.close(async()=>{await pool.end();process.exit(0)})}
process.on('SIGTERM',shutdown);process.on('SIGINT',shutdown);
