# DIGO Evolution Game — isolated prototype

This project is intentionally kept on the `feature/digo-evolution-game` branch and is not merged into the live website.

## UI milestone — completed prototype
The first visual UI is implemented in `game/index.html`: dark premium arena, orange mascot recreated from the supplied reference features (large glossy eyes, round peach body, orange feet), responsive layout, touch feedback, evolution cosmetics and Phantom public-address connection. No dog, mouse or unrelated character imagery is used.

## Current prototype
- Responsive mobile-first tap game UI.
- Original mascot direction follows the user-provided orange, round, big-eyed character reference (not the retired dog/SHIBA logo).
- Tap-to-earn demo points, evolution milestones, cosmetic unlocks and simple effects.
- Optional Phantom public-wallet connection for session display only.
- Demo points persist in the current browser via localStorage.

## Important limitations
This is a frontend prototype only. Demo points are not DIGO tokens, are not stored on a server, are not transferable, and cannot be withdrawn. Browser storage is user-editable and must never be treated as authoritative.

No production backend has been found/confirmed in the reviewed repository documentation. The token repository README says its GitHub Pages workflow publishes a static site only; it does not deploy a backend.

## Planned production architecture
- Separate game API and PostgreSQL database.
- Phantom wallet authentication using a server-generated nonce and signed message; verify signature server-side and bind the wallet address to the account.
- Server-authoritative score ledger, idempotent tap batches, rate limits, anti-bot controls and audit logs.
- Leaderboard derived from verified score events.
- Reward claims only after eligibility checks, treasury funding, transaction simulation, monitoring and security review.
- Never put a treasury private key, seed phrase, privileged RPC credential or signing secret in frontend code or Git.

## Integration
The game is standalone under `game/`. It can later be embedded or linked from the main DIGO website after review. Do not merge to `main` until backend persistence, authentication, anti-cheat and deployment are implemented and tested.


## Frontend/API integration status
The browser UI now contains the integration flow:
1. Connect Phantom.
2. Request a one-time nonce from the API.
3. Sign the exact login message with Phantom (no transaction).
4. Verify the Ed25519 signature and receive a short-lived JWT.
5. Load the wallet's server-side score and submit tap batches with idempotency UUIDs.
6. Refresh the leaderboard periodically.

Before it can connect, set the public API origin in `game/config.js`:
```js
window.DIGO_GAME_API_URL = 'https://YOUR-API-HOST';
```
The current value is intentionally empty because no API host has been deployed yet. The page will show a clear setup message and will not award pretend local points.

**Important:** Frontend integration is implemented but not yet end-to-end tested against a deployed API. Do not announce persistent scoring as live until deployment, database migration, CORS/TLS configuration and end-to-end tests pass. Clicker games need bot/Sybil detection and abuse review before token rewards are enabled.
