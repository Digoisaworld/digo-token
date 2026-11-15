# Mainnet Launch Checklist — DIGO

**Status: NOT DEPLOYED.** The website and logo are published; the Solana token mint has not been created.

## Approved working parameters
- Name: DIGO
- Symbol: DIGO
- Network: Solana Mainnet Beta
- Token program: Original SPL Token (proposed; compatibility review still required)
- Decimals: 8
- Initial mint target: 100,000,000,000 DIGO
- Intended recipient: founder-controlled Phantom account; public address observed during the website connection: `HK7Fh86hwAQwjqmLrm8L1JLVS57Eo7jD2FfzaHdhmZbQ`
- Mint authority: intended to remain active
- Freeze authority: must be absent (set to None at mint initialization)

100 billion whole tokens at 8 decimals require 10^19 base units, which fits the SPL Token u64 supply field. Confirm the decimals and amount in every transaction preview.

## Verified project assets
- [x] Public project website is deployed through GitHub Pages.
- [x] Logo is present at `assets/digo-logo.png`.
- [x] `metadata/token.json` references the public PNG logo.
- [x] The website's Connect Phantom button returned the intended public address in Phantom's in-app browser.
- [ ] Verify signing capability with a clearly described, non-transaction message-signing challenge if needed. A connect response alone does not prove that the site can submit signed transactions.

## Still required before any Mainnet signature
- [ ] Confirm the wallet address again in Phantom immediately before launch.
- [ ] Review and pin audited, versioned client dependencies; do not load unpinned scripts.
- [ ] Build and review the exact transaction instructions and account metas.
- [ ] Obtain live rent-exemption and network-fee estimates from Mainnet RPC immediately before signing.
- [ ] Confirm the mint keypair is generated locally in the browser and never uploaded; explain how its public key/mint address is retained.
- [ ] Create the mint with 8 decimals, mint authority set to the intended wallet, and freeze authority set to None.
- [ ] Create the recipient associated token account.
- [ ] Mint exactly 100,000,000,000 DIGO (base units: 10,000,000,000,000,000,000).
- [ ] Create and verify on-chain token metadata (name, symbol, URI) using the selected metadata standard and program.
- [ ] Independently verify supply, decimals, token program, authorities, metadata URI, recipient ATA and balance on Mainnet.
- [ ] Publish mint address and transaction signatures only after independent verification.

## Important controls
- Keeping mint authority active means supply is not permanently capped. Publish issuance rules, custody and every mint event.
- Never share a seed phrase, private key or wallet export. No project website or assistant should request them.
- Never send SOL to an address supplied by an untrusted guide or embedded Playground wallet.
- Wallet connection is not transaction authorization. Every transaction must be explicitly reviewed and approved in Phantom.
- Do not claim the token is live, listed, liquid or tradable until independently verified.
