# DIGO Security Policy

**Status:** Baseline policy only. This is not an independent audit or certification.

## Current on-chain risk
- DIGO is an original SPL token on Solana Mainnet Beta.
- Mint authority remains active; 100 billion DIGO is initial minted supply, not a hard cap.
- Freeze authority is absent.
- Metadata update authority remains active; metadata is mutable.
- No custom DIGO payment program or audited swap contract is claimed to exist.

## Key management
- Never request or store a user's seed phrase or private key.
- Never commit wallet exports, signing keys, RPC secrets or API tokens.
- Separate treasury, authority and operational wallets.
- Use hardware-backed custody or a multisig with independent signers; rehearse recovery.
- Require two-person review for releases and privileged actions.
- Rotate and revoke credentials immediately after suspected exposure.

## Website and wallet safety
- Wallet connection is read-only unless a clearly described user-initiated transaction is required.
- Never trigger signing on page load or request seed phrases.
- Before a transaction, show network, destination, token, amount, minimum received, fees, slippage and expiry.
- Apply HTTPS, restrictive Content Security Policy, dependency pinning and minimal third-party scripts.
- Treat RPC data, wallet responses and remote content as untrusted.

## AI/API safety (planned system)
- Enforce tenant isolation, least privilege, scoped credentials, quotas and per-agent spending limits.
- Treat prompts, retrieved documents and model output as untrusted; defend against prompt injection and tool abuse.
- Sandbox tool execution, restrict egress, validate schemas and defend against SSRF.
- Use idempotency keys, replay protection, timeouts, circuit breakers and audit trails.
- Minimize data collection, encrypt sensitive data and redact secrets from telemetry.

## Vulnerability reporting
A monitored security contact and response SLA must be published before public production launch. Until then, use GitHub's private vulnerability reporting feature if enabled. Do not post exploit details or personal data in public issues.

## Incident response
1. Triage and contain affected systems.
2. Revoke exposed credentials and pause affected integrations.
3. Preserve relevant evidence without exposing user data.
4. Notify affected users and providers as legally required.
5. Publish a factual post-incident report and remediation status.

## Release gates
- [ ] Secret scan current repository and full Git history
- [ ] SAST, dependency and license scans
- [ ] Browser security headers and CSP verified
- [ ] Wallet flows manually tested on desktop and mobile
- [ ] AI tool threat model and abuse-case review
- [ ] Independent penetration test and remediation evidence
- [ ] Reproducible build and release provenance

**No audit claim:** No independent security audit is represented as completed.
