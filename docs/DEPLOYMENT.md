# Deployment and operation

## Current environment

See `public/deployment.json` for network, address, source hash, code-update receipt, fixture commit and reference release ID. This is hosted **GenLayer Studio / Studionet**, chain ID 61999, RPC `https://studio.genlayer.com/api`.

The contract was deployed with the built-in Studio account in **Normal (Full Consensus)** mode. No MetaMask or other external-wallet connection was used. The reference application registration, release submission and assessment use that built-in account.

## Reproduce a contract deployment

1. Run local checks; do not deploy unchanged source unnecessarily.
2. Open `https://studio.genlayer.com`, import `contracts/releasescope.py`, and verify the dependency header is retained.
3. Select Normal (Full Consensus). The constructor has no arguments.
4. Deploy with Studio's built-in account. Record the full transaction hash and address.
5. Wait for `FINALIZED` and inspect execution success. Verify source against deployment calldata/code-update data, and save its SHA-256.
6. Register an integration with a new ID, submit its release, and assess. Inputs are JSON strings for the first two methods.
7. Save finalized receipts, verify the stored report, and use `challenge_assessment` to test additional evidence.
8. Update `public/deployment.json`, rebuild and publish the frontend only after the source/address are verified.

Studio's duplicate file import does not replace the existing editor buffer. Source matching is essential after an edit. Simulator code updates are administrative operations, not a production upgrade mechanism. No private key belongs in source or deployment metadata.

## Website

The Vite project builds static files into `dist/` using `npm run build`. Hosting metadata is in `.openai/hosting.json`. Production origin: `https://releasescope.keenbasil9.chatgpt.site`.

Runtime contract reads and signed writes use the pinned official `genlayer-js` SDK. The site is public. A disposable local SDK account provides frontend signing without an extension. To use the exact Studio built-in account, transact in Studio and resume its hash in the frontend. Studio currently provides no supported cross-origin signing bridge; ReleaseScope does not inspect Studio local storage.

## Transaction recovery

After a hash is returned, the operation is recorded in browser local storage and polled. Acceptance is intermediate; finalization and execution success are required for the completed state. A timeout pauses tracking; it does not authorize another write. Reopen Transactions and resume the same hash. For contract execution errors, inspect the receipt and fix the underlying input before creating a new operation.

After a page reload, transaction hashes remain but the ephemeral signer does not. Public reads and transaction tracking can continue without it. Owner-only new operations require the same test key or Studio account that registered the integration.
