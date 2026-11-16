# DIGO Mainnet Launch and Verification Checklist

**Status: MINTED — METADATA FINALIZED.** This checklist distinguishes completed on-chain actions from remaining public-discovery, governance, product and market-readiness work.

## Verified on-chain asset
- [x] Original SPL Token mint created on Solana Mainnet Beta.
- [x] Decimals: 8.
- [x] Initial minted supply: 100,000,000,000 DIGO (base units: 10,000,000,000,000,000,000).
- [x] Mint authority: `HK7Fh86hwAQwjqmLrm8L1JLVS57Eo7jD2FfzaHdhmZbQ` (active).
- [x] Freeze authority: None.
- [x] Metaplex Token Metadata account created and finalized.
- [x] On-chain name: DIGO; symbol: DIGO.
- [x] Metadata URI: `https://raw.githubusercontent.com/ehsanatashzaban5-hub/digo-token/main/metadata/token.json`.
- [x] Metadata update authority retained by the project wallet (metadata remains mutable).
- [x] Public website and GitHub repository available.

**Mint:** `7gqusyDEx6L7JNUfDEUftzdKRSejgzCUk7QCUwocYG1F`  
**Metadata PDA:** `EU438GAHYf1sSdfZFZk91uUiSNWeAye7jXfiKKkQuPZ4`  
**Mint transaction:** [Explorer](https://explorer.solana.com/tx/4FqDVacpp7jpK3B7SKDyd1h99vHtA4xiCGTbkUxf3vkRQBTNztzw9jGUcQs19vNP7ghET2dFwmFCpY54ihnBWZfd?cluster=mainnet-beta)  
**Metadata transaction:** [Explorer](https://explorer.solana.com/tx/dmmEQmwG3bMmfvjaVXDLKtoAzXp5rY63fmCuTSvYg1E1GbZLSesMq3nJXXmH4tvAaEbeU2uFpntndjRDJcsAXhX?cluster=mainnet-beta)

## Public metadata and logo
- [x] Metadata JSON exists in the public repository and matches the on-chain name, symbol and URI.
- [x] JSON references `assets/digo-logo.png`.
- [ ] Independently inspect the delivered PNG (dimensions, format, visual quality and file size) and verify it loads from the public raw URL.
- [ ] Check how Phantom, Solana Explorer, Solscan and other indexers display the token; allow for independent cache/indexing delays.
- [ ] Consider durable content-addressed hosting (for example, IPFS/Arweave) before relying on the current GitHub-hosted URI for long-term permanence. Any URI change requires an explicit metadata update transaction.

## Governance and supply transparency
- [ ] Publish allocation table totaling 100% with wallet addresses and beneficial control.
- [ ] Publish treasury custody, multisig/key-management and signer policy.
- [ ] Publish future minting policy, notice period, approval process and public issuance log.
- [ ] Publish vesting, unlock schedules and circulating-supply methodology.
- [ ] Disclose holder concentration and related-party wallets.

## Product, security and legal
- [ ] Ship a demonstrable AI/API utility prototype; label roadmap items clearly until live.
- [ ] Complete independent security review of website, wallet integration and any custom programs.
- [ ] Publish incident-response contact and operational continuity plan.
- [ ] Obtain qualified legal review for target jurisdictions, including token, marketing, AML/sanctions, privacy and AI/data obligations.

## Market and directory readiness
- [ ] Decide whether and when to create a liquidity pool; document pair, initial liquidity source, LP control/lock policy and risks before any transaction.
- [ ] Apply to independent token directories/verification providers only with accurate project details.
- [ ] Prepare a dated due-diligence package: official contacts, mint and explorer links, tokenomics, authorities, allocations, audits, product demo, liquidity and legal materials.
- [ ] Never fabricate volume, holders, liquidity, partnerships, users or product capabilities.

## Important controls
- Active mint authority means supply is not permanently capped and creates dilution risk.
- Mutable metadata means the update authority can change the name, symbol or URI; disclose this clearly.
- Never share a seed phrase, private key or wallet export. No project website or assistant should request them.
- A token mint and metadata registration do not create a market, price, liquidity, exchange listing or guaranteed returns.
- Every wallet transaction must be reviewed and explicitly approved by the owner.
