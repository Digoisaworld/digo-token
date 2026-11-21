# DIGO Evolution API (isolated)

This API is a development scaffold. It is not deployed and does not send DIGO tokens.

## Endpoints
- `GET /health`
- `POST /v1/auth/nonce` with `{ "wallet": "<base58 public key>" }`
- `POST /v1/auth/verify` with `{ "wallet", "nonce", "signature" }` (base58 detached Ed25519 signature of the exact returned message)
- `GET /v1/me` with Bearer JWT
- `POST /v1/game/taps` with Bearer JWT and `{ "requestId": "<UUID>", "taps": 1..10 }`
- `GET /v1/leaderboard?limit=20`

## Local setup
1. Copy `.env.example` to `.env`; use a unique random JWT secret of at least 32 characters.
2. Set `APP_ORIGIN` to the exact production site origin. Do not use a wildcard.
3. Set `POSTGRES_PASSWORD` in the shell/environment.
4. Run `docker compose up --build -d`.
5. Apply `migrations/001_init.sql` if the database volume already existed before this migration.
6. Check `GET /health`.

## Security and known limitations
- Phantom sign-in uses a one-time server nonce, expiry, exact-message Ed25519 verification and JWT.
- Tap requests are server-authoritative, idempotent per wallet/request UUID, transactionally recorded and rate-limited by last accepted server time.
- This is a baseline, not a complete anti-cheat system. Automated tapping/bots, multiple accounts and Sybil abuse still require additional detection, challenge/risk controls and operational monitoring before rewards.
- Leaderboard currently ranks all registered accounts; production should add privacy controls and abuse filtering.
- No token payout endpoint exists. Do not add treasury secrets to this repo or frontend. Reward distribution requires a separately reviewed signer/treasury service, budget controls, claim limits and incident procedures.
- Do not deploy until API origin, TLS/reverse proxy, backups, monitoring, migration process, CORS and security review are configured.
