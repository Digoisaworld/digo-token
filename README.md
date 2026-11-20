# DIGO — AI × Solana

**DIGO** is a Solana-based technology project exploring an open ecosystem for AI agents, developers, and digital services.

Our long-term direction is to investigate practical infrastructure that helps AI agents discover services, access APIs and digital tools, and coordinate payments through transparent, verifiable systems.

## Proposed ecosystem

The following are development objectives and roadmap concepts, not claims of currently operational production services:

1. **DIGO Agent Hub** — a directory for discovering AI agents, tools, and digital services.
2. **AI API Marketplace** — a proposed marketplace for participating AI models, data, and automation APIs.
3. **Agent-to-Agent Payments** — research into secure payments and settlement between agents and service providers.
4. **Compute Integrations** — potential connections to independent AI inference and GPU providers.
5. **Developer SDK** — tools and APIs to help developers build and integrate AI-powered applications.
6. **Transparency Dashboard** — clear information about token supply, project progress, and ecosystem activity.

The project is built on Solana and emphasizes interoperability, practical utility, security, transparency, and community participation. AI inference and compute are intended to remain off-chain; Solana may support token transfers and selected settlement or coordination functions.

## Mainnet token information

| Field | Value |
|---|---|
| Name / Symbol | DIGO |
| Network | Solana Mainnet Beta |
| Token standard | Original SPL Token |
| Mint address | `7gqusyDEx6L7JNUfDEUftzdKRSejgzCUk7QCUwocYG1F` |
| Decimals | 8 |
| Initial minted supply | 100,000,000,000 DIGO |
| Freeze authority | None, according to current project records |
| Mint authority | Active |
| Metadata update authority | Active; metadata is mutable |

**Supply disclosure:** 100 billion DIGO is the initial minted supply, not a permanent maximum. Because mint authority remains active, additional issuance is technically possible and could dilute existing holders. No fixed maximum supply should be inferred.

## Website deployment

The website is published from the repository root through GitHub Actions.

Before deployment, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**. The deployment workflow requires Pages to be enabled for this repository; otherwise GitHub returns a Pages site not found error. After changing the setting, rerun the **Deploy DIGO site to GitHub Pages** workflow from the Actions tab.

The workflow publishes the static site only. It does not deploy a backend or perform blockchain transactions.

## On-chain metadata note

The JSON file in `metadata/token.json` is the off-chain metadata document. Phantom and other wallets first read the URI stored in the Metaplex metadata account on Solana. Editing this repository's JSON does not change that on-chain URI. A URI change requires a transaction signed by the current metadata update authority. Confirm the on-chain URI and verify that it resolves to this repository before announcing that wallet metadata has changed.

## Official links

- Website: https://digoisaworld.github.io/digo-token/
- GitHub: https://github.com/digoisaworld
- Token repository: https://github.com/Digoisaworld/digo-token
- X: https://x.com/Digoaicoin
- Telegram: https://t.me/Digoisaworld
- Token mint: https://explorer.solana.com/address/7gqusyDEx6L7JNUfDEUftzdKRSejgzCUk7QCUwocYG1F

## Documentation

- [Whitepaper](WHITEPAPER.md)
- [Litepaper](LITEPAPER.md)
- [Tokenomics](TOKENOMICS.md)
- [AI Architecture](AI_ARCHITECTURE.md)
- [Roadmap](ROADMAP.md)
- [Security Policy](SECURITY.md)
- [Exchange Readiness](EXCHANGE_READINESS.md)
- [Pool and Swap Readiness](POOL_AND_SWAP_READINESS.md)

## Security and transparency

- Never share a wallet seed phrase or private key with anyone, including the project.
- A Phantom connection is not a purchase or a swap. Users must review and approve every transaction in their own wallet.
- No live token price, guaranteed liquidity, exchange listing, partnership, or investment return is promised.
- A token mint and metadata record do not prove that a working AI product, swap route, or active liquidity pool exists.
- Future token issuance, treasury movements, allocations, and authority changes should be publicly disclosed.

## Risk notice

DIGO is an experimental crypto asset and may be volatile or illiquid. Holding DIGO does not represent equity, dividends, guaranteed access to services, or guaranteed returns. Blockchain transactions are generally irreversible. This repository is informational and is not financial, investment, legal, or tax advice.
