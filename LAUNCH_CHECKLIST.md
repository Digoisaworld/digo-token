# Mainnet Launch Checklist — Do not skip

Do not sign a mainnet transaction until every required decision is approved and the transaction is simulated and reviewed.

## Founder decisions
- [ ] Confirm exact token name and symbol
- [ ] Confirm original SPL Token vs Token-2022 after checking target wallet/exchange compatibility
- [ ] Confirm **8 decimals** and initial mint amount of **100,000,000,000 DIGO**. SPL Token's u64 base-unit supply field cannot represent 100 billion whole tokens at 9 decimals.
- [ ] Confirm mint authority retention, custody and issuance policy
- [ ] Confirm freeze authority revocation
- [ ] Approve final allocation table totaling 100%
- [ ] Approve logo and public metadata
- [ ] Approve treasury and liquidity custody plan

## Before signing
- [ ] Publish metadata JSON and logo on durable public storage
- [ ] Verify metadata URI and image
- [ ] Inspect every instruction, account, authority and fee
- [ ] Simulate on intended cluster
- [ ] Confirm wallet and cluster are Solana Mainnet
- [ ] Confirm enough SOL for rent and fees
- [ ] Never put seed phrases or private keys in the browser, terminal, repository or chat

## After creation
- [ ] Verify mint, decimals, supply and authorities using independent RPC/explorer
- [ ] Verify metadata account and image rendering
- [ ] Publish transaction signatures and explorer links
- [ ] Publish allocation wallets and vesting evidence
- [ ] Update website, README and exchange dossier
- [ ] Do not claim listing or liquidity until it actually exists
