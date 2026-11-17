# DIGO Market, Pool and Website Swap Readiness

**Status: NOT VERIFIED — WEBSITE SWAP IS NOT LIVE.** This document records reported setup details separately from independently verified on-chain facts.

## Reported pool setup (not independently verified)
The project owner reported that a Raydium SOL/DIGO pool-creation attempt succeeded after reducing the SOL amount to **0.02 SOL** on 16 November 2026.

Earlier planning notes described a **Raydium CLMM** configuration with:
- Pair: SOL/DIGO
- Fee tier: 0.01%
- Indicative starting ratio: approximately 706,800 DIGO per SOL
- Earlier preview (not a confirmed deposit): 0.224780689 SOL and 155,000 DIGO
- A later estimate for 0.02 SOL: approximately 14,140 DIGO, based on an assumed SOL price of $70.70 and DIGO price of $0.0001. This is arithmetic only, not a transaction record or current quote.

**Not supplied / not verified:** pool address, successful transaction signature, exact deposited token amounts, pool program/account state, vault balances, active liquidity, current price, LP position ownership, fee tier on-chain, or withdrawal/lock controls. The earlier failed transaction signature must not be represented as a successful pool creation.

## Evidence required before enabling in-site swaps
1. Obtain the successful pool-creation signature or pool address.
2. Resolve and verify the pool account on Solana Mainnet; confirm Raydium program, SOL/DIGO mints, vaults, fee tier and active state.
3. Read vault balances and CLMM position/liquidity state from Mainnet RPC; record block time and slot.
4. Verify LP position owner, withdrawal rights, lock/burn state (if any), and disclose who controls liquidity.
5. Obtain a fresh executable quote from a supported swap aggregator or Raydium route. Confirm the route actually includes the verified pool.
6. Simulate the exact transaction; validate minimum output, slippage, price impact, network fee, token account rent, quote expiry and wallet balance.
7. Only then expose a Buy/Swap action. The user must review and explicitly approve the transaction in Phantom.

## Current website behavior
The published website includes Phantom connection and legacy mint/metadata preparation interfaces. Phantom connection only shares the public key; it is not a swap, trade, or proof that a purchase route works.

The currently inspected `index.html` does not implement a verified SOL/DIGO quote-and-swap flow. Therefore:
- Do not label the site as supporting live DIGO purchases.
- Do not display a fabricated price, liquidity figure, volume, route or pool address.
- Do not use the old failed CLMM transaction as pool evidence.
- Do not submit transactions or sign on behalf of the wallet owner.

## Mint and metadata cautions
The DIGO mint is documented as having an active mint authority and mutable metadata update authority. The initial 100 billion DIGO is not a permanent supply cap. The metadata URI is registered on-chain and points to the former GitHub owner path. Updating repository text or the JSON file does not change that on-chain URI; any on-chain URI change requires a valid metadata-authority transaction and explicit owner approval.

## Go-live acceptance gate
- [ ] Successful pool address/signature recorded
- [ ] Mainnet pool and vault state independently verified
- [ ] LP control and liquidity risks disclosed
- [ ] Live quote route observed for SOL/DIGO
- [ ] Transaction simulation and output checks pass
- [ ] Phantom signing tested on desktop and Phantom in-app mobile browser
- [ ] Failure, stale quote, insufficient balance and RPC outage handling tested
- [ ] No private key/seed phrase collection
- [ ] Independent security review completed

Until all applicable gates pass, the swap feature remains **not live**.
