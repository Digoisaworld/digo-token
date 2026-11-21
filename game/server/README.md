# DIGO Evolution API (isolated)

This API is a development scaffold. It is not deployed and does not send DIGO tokens.

## Endpoints
- `GET /health`
- `POST /v1/auth/nonce` with `{ "wallet": "<base58 public key>" }`
- `POST /v1/auth/verify` with `{ "wallet", "nonce", "signature" }` (base58 detached Ed25519 signature of the exact returned message)
- `GET /v1/me` with Bearer JWT
- `POST /v1/game/sessions/start` with Bearer JWT; opens one active, server-timed hold session per wallet.
- `POST /v1/game/sessions/finish` with Bearer JWT and `{ "sessionId": "<UUID>", "requestId": "<UUID>" }`; awards at most one server-calculated point per 900 ms, capped at 30 minutes, and is idempotent for the same finish request.
- `POST /v1/game/taps` with Bearer JWT and `{ "requestId": "<UUID>", "taps": 1..10 }` (legacy endpoint; do not use for the hold-and-dodge game).
- `GET /v1/leaderboard?limit=20`

## Local setup
1. Copy `.env.example` to `.env`; use a unique random JWT secret of at least 32 characters.
2. Set `APP_ORIGIN` to the exact production site origin. Do not use a wildcard.
3. Set `POSTGRES_PASSWORD` in the shell/environment.
4. Run `docker compose up --build -d`.
5. Apply `migrations/001_init.sql`, then `migrations/002_authoritative_sessions.sql` (the latter is additive; never rewrite an already-applied migration).
6. Check `GET /health`.

## Security and known limitations
- Phantom sign-in uses a one-time server nonce, expiry, exact-message Ed25519 verification and JWT.
- Hold sessions are timed using the database clock, limited to one active session per wallet, capped at 30 minutes, and finalized transactionally with an idempotent request UUID. Credits are written to `score_ledger`. Hold-session credits update `total_points` only; `total_taps` remains a count of legacy tap events and is not inflated by timed play.
- The session endpoint currently validates elapsed hold time only. It does not validate movement, bomb collisions or reward pickups. Those gameplay effects remain preview-only and must not be included in payout or a public competitive leaderboard.
- The legacy tap endpoint is separate and must not be mixed with hold-session scores.
- This is a baseline, not a complete anti-cheat system. Automated tapping/bots, multiple accounts and Sybil abuse still require additional detection, challenge/risk controls and operational monitoring before rewards.
- Leaderboard currently ranks all registered accounts; production should add privacy controls and abuse filtering.
- No token payout endpoint exists. Do not add treasury secrets to this repo or frontend. Reward distribution requires a separately reviewed signer/treasury service, budget controls, claim limits and incident procedures.
- Do not deploy until API origin, TLS/reverse proxy, backups, monitoring, migration process, CORS and security review are configured.


## Current session scoring boundary
The new session API is a first server-authoritative building block, not the finished anti-cheat protocol. A client can still automate session start/finish timing; operational abuse controls, challenge/risk signals, replay analysis and verified movement/object simulation are not yet implemented. Do not expose token claims or advertise prize eligibility. Apply migration 002 before enabling these routes in any environment.
