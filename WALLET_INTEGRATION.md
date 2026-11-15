# Wallet Integration Status

## Current website behavior

The published `index.html` uses Phantom's injected Solana provider:

```js
const provider = window.phantom?.solana;
const result = await provider.connect();
```

The site displays the public key returned by Phantom. The founder has observed the intended address in Phantom's Android in-app browser:

`HK7Fh86hwAQwjqmLrm8L1JLVS57Eo7jD2FfzaHdhmZbQ`

This confirms that Phantom connected and disclosed that account's public key to the site in that session.

## What it does not do

- It does not connect the Phantom account to Solana Playground's separate Playground Wallet.
- It does not request or sign a transaction.
- It does not prove transaction-signing capability.
- It does not create a mint, ATA, token supply or on-chain metadata.
- It does not transfer SOL.

The Playground CLI address (previously observed as `51gNYbaAZNkiVABWSSoCKJDT3eaDysGMJ2USAwCMAzNi`) belongs to its own Playground Wallet and must not be treated as the founder's Phantom account.

## Safe implementation requirements for the launch interface

1. Use Phantom's documented provider in the Phantom in-app browser; do not ask for a seed phrase or private key.
2. Display the connected public key and require the user to verify it before preparing transactions.
3. Use a pinned, reviewed Solana client and the original SPL Token Program unless a documented compatibility review selects otherwise.
4. Build transactions in the browser and request signing only through Phantom's documented signing methods.
5. Show every instruction, account, amount, authority, fee and rent estimate before the user approves.
6. Never auto-sign, hide instructions, or send SOL to a project-controlled or unknown address.
7. Verify the resulting mint, supply, decimals, authorities, metadata and recipient token account independently through Mainnet RPC and an explorer.

## Mobile connection

Phantom documents that mobile dApp connections work inside Phantom's in-app browser, not Chrome or other external mobile browsers. The user should open the project website from Phantom's search bar and connect there.

Official reference: https://help.phantom.com/articles/how-to-connect-to-dapps-using-phantom-wallet-29995498642195
