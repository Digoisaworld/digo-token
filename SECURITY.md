# Security and operational policy

## Key management
- Never commit seed phrases, private keys, wallet exports, RPC secrets or API tokens.
- Use a hardware wallet or well-reviewed multisig for treasury and privileged roles.
- Separate deployer, treasury and operational wallets.
- Publish public addresses only after verifying ownership and purpose.
- Use testnet/devnet for rehearsals; mainnet signing requires explicit human review.

## Token launch checks
- Confirm the official SPL Token Program and mint address.
- Simulate transactions and inspect every instruction, account, authority and fee.
- Verify decimals, supply, metadata URI and authority state from independent explorers/RPC.
- Revoke freeze authority as publicly promised.
- Clearly disclose whether mint authority remains active or is revoked.
- Do not add transfer taxes, blacklists, hidden controls or unsupported Token-2022 extensions.

## Website and repository
- Never request wallet seed phrases or private keys.
- Wallet connection alone must not trigger a transaction.
- Display transaction purpose and exact amount before wallet approval.
- Pin dependency versions; run dependency and secret scanning.
- Report vulnerabilities privately before public disclosure.

## Incident response
Publish a contact channel and a process for acknowledging, triaging and disclosing security incidents. Never promise that a system is risk-free.
