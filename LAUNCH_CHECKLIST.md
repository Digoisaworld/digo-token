# Mainnet Launch Checklist — DIGO

**Status: NOT DEPLOYED. Do not treat this checklist as evidence of a live token.**

## Approved working parameters
- Name: DIGO
- Symbol: DIGO
- Network: Solana Mainnet
- Token program: Original SPL Token (proposed; compatibility check still required)
- Decimals: 8
- Initial mint target: 100,000,000,000 DIGO
- Recipient wallet supplied by founder: `HK7Fh86hwAQwjqmLrm8L1JLVS57Eo7jD2FfzaHdhmZbQ`
- Mint authority: intended to remain active
- Freeze authority: intended to be absent

The SPL mint supply field is a u64 base-unit integer. 100 billion whole tokens at 9 decimals would require 10^20 base units, above u64 max; 8 decimals requires 10^19 and fits. Confirm decimals and amount in every transaction preview.

## Still required before any Mainnet signature
- [ ] Publish the final logo at `assets/digo-logo.jpg` and verify the public image URL.
- [ ] Publish `metadata/token.json` and verify its JSON and image URL. The current metadata file references the logo path, which is not yet present.
- [ ] Confirm the recipient address in Phantom. The supplied public address has not been cryptographically proven to belong to the founder.
- [ ] Check payer balance and obtain live rent/fee estimates immediately before signing.
- [ ] Review the token program ID, all instruction accounts, authorities and exact amounts.
- [ ] Simulate the exact transaction on Devnet first.
- [ ] Review every Mainnet transaction in Phantom; never sign an unknown or opaque transaction.
- [ ] Create the mint with mint authority set to the intended owner-controlled wallet and freeze authority set to none.
- [ ] Create the recipient associated token account.
- [ ] Mint exactly 100,000,000,000 DIGO (base units: 10,000,000,000,000,000,000).
- [ ] Independently verify supply, decimals, authorities, recipient ATA and balance on Mainnet.
- [ ] Publish mint address and transaction signatures only after verification.

## Important controls
- Keeping mint authority active means supply is not permanently capped. Publish issuance rules, custody and every mint event.
- Never share a seed phrase, private key or wallet export. No project website or assistant should request them.
- Never send SOL to an address supplied by an untrusted guide or embedded playground wallet.
- Do not claim the token is live, listed, liquid or tradable until independently verified.
