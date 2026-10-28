# Verified deployment evidence

Verified on 28 October 2026. Network: hosted GenLayer Studio / Studionet, chain ID 61999. This is a simulator demonstration, not a mainnet deployment.

- Public website: https://releasescope.keenbasil9.chatgpt.site
- Source repository: https://github.com/haris4587/ReleaseScope
- Contract: [0x8719F14F3919cB6aB66debe92B542415d9935b05](https://explorer-studio.genlayer.com/address/0x8719F14F3919cB6aB66debe92B542415d9935b05)
- Final contract SHA-256: `77dace12a18a931f911abe9e08b7266bdec5668a458d01d3f2e0d5b5eabd2a4f`
- Final source update: [0x4d61ac8e4b101af686d308288135bd6c0a52d90f9ee3402634d319936112faf9](https://explorer-studio.genlayer.com/tx/0x4d61ac8e4b101af686d308288135bd6c0a52d90f9ee3402634d319936112faf9)
- Immutable application fixture commit: `97c856d24d6dc5b6dc5e699ac0cc1009878e21d4`
- Runtime dependency: `py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6` (hosted Studio GenVM v0.2.16).

The final source update data matches the local contract byte for byte. Code updates are simulator administrative operations; they are verified separately from normal consensus execution. Initial deployment and the initial unchanged simulator update are historical and are not the final source verification artifact.

## Finalized contract transactions

| Action | Status / execution | Transaction |
| --- | --- | --- |
| registration | FINALIZED / SUCCESS | [0xf158937aae…](https://explorer-studio.genlayer.com/tx/0xf158937aaece47cf2b065d886a52b712a9837753f0ad74c10b4f5a6782029f04) |
| release | FINALIZED / SUCCESS | [0x7b357778d5…](https://explorer-studio.genlayer.com/tx/0x7b357778d52e2db3c23b9d3d00f92d5e3bda95eeb95783957dcf18c306ddd1d6) |
| frontend registration | FINALIZED / SUCCESS | [0xe19b5bc2b6…](https://explorer-studio.genlayer.com/tx/0xe19b5bc2b66fa429854c3750cc5919a80925db120572e3efb0619a6ab78f69a0) |
| assessment | FINALIZED / SUCCESS | [0xa73404ff99…](https://explorer-studio.genlayer.com/tx/0xa73404ff991ed97b8f1cfa1e57540a874ac3fb684e4c091befd19a52b4a81024) |
| frontend release | FINALIZED / SUCCESS | [0x98575d1398…](https://explorer-studio.genlayer.com/tx/0x98575d139806938c3e1a36acbd5d7ad5461e33f1870c41e0e098c9a692702198) |
| challenge | FINALIZED / SUCCESS | [0xab7447a711…](https://explorer-studio.genlayer.com/tx/0xab7447a71116a50d26798af88a1920bcc9dde524d622aae2cbc7f311ffb6a471) |

| frontend assessment | FINALIZED / SUCCESS | [0x298e4472a9…](https://explorer-studio.genlayer.com/tx/0x298e4472a9112d9029eb22c7dfadce95f8f4d67eb2607f7d42a9f08f498376fb) |
| rejected duplicate | FINALIZED / ERROR | [0xbfb4c2b6f8…](https://explorer-studio.genlayer.com/tx/0xbfb4c2b6f8081663bcb886775a157a3531739efc3643e39452761362891450ad) |

Full transaction hashes, signing addresses, Full Consensus execution modes and validator votes are in `verified-transactions.json`. The built-in Studio account is `0xcD1305217298eB7a99696EEAB7f5a46b9dE2E441`; the disposable frontend session account is a separate test signer.

## Observed outcome

Reference release `httpx-028-demo` has two stored revisions. Both classify the upgrade as `BREAKING_CHANGE`. The challenge adds upstream proxy documentation and improves the migration action to replace the removed `proxies` argument with `proxy` for the shown single-proxy use. Prior report contents and hash links are preserved. `scripts/verify-live.mjs` and `scripts/verify-report.py` independently verify final-state reads, source fingerprints and report hash linkage.

## Evidence sources

- Application manifest: https://raw.githubusercontent.com/haris4587/ReleaseScope/97c856d24d6dc5b6dc5e699ac0cc1009878e21d4/fixtures/requirements.txt
- Application usage: https://raw.githubusercontent.com/haris4587/ReleaseScope/97c856d24d6dc5b6dc5e699ac0cc1009878e21d4/fixtures/application.py
- Official HTTPX changelog: https://raw.githubusercontent.com/encode/httpx/80960fa31918d7663c3f4c3ad61661cf0e80628f/CHANGELOG.md
- Official HTTPX proxy documentation: https://raw.githubusercontent.com/encode/httpx/80960fa31918d7663c3f4c3ad61661cf0e80628f/docs/advanced/proxies.md

The application fixture is synthetic; the upstream change is real. No private repository data or wallet keys are included.

## Official implementation references

- https://docs.genlayer.com/developers/intelligent-contracts/equivalence-principle
- https://docs.genlayer.com/developers/intelligent-contracts/features/web-access
- https://docs.genlayer.com/api-references/genlayer-js
- https://docs.genlayer.com/api-references/genlayer-test
- https://docs.genlayer.com/developers/networks

The live RPC/SDK behavior was checked against the hosted runtime. Current documentation also describes a newer preview network; this project uses the stable Studio environment and pinned SDK tested here.

## Preserved failed run

The initial assessment `0x8f41818e7b320984d131e702b8b6bb6cc0d9a245f954200383f952207af9fc9b` exhausted consensus rotations, left no report committed, and is retained as a failure artifact. It is not counted as successful on-chain evidence.

## Additional browser verification

The independent frontend case `httpx-mvrud4gx` completed registration, release submission and assessment with `FINALIZED / SUCCESS`, returning `BREAKING_CHANGE`. A deliberate duplicate registration finalized with `ERROR` and was correctly treated as failure despite protocol finalization. Resuming its existing hash updated tracking without sending another write.

## Public website release

The final website deployment succeeded at https://releasescope.keenbasil9.chatgpt.site. Published source commit in the hosting repository: `96e4cde435170a3e621bf2a447ee1977a08fe58c`; saved version 3. The hosting source history and GitHub mirror have different commit identities but the same application/contract source files. GitHub contains the additional post-publication screenshots and evidence documentation.

GitHub Actions passed for implementation commit `cbfe22875e43fe6c217e4469d14eaf390e8b18b5`: [validation run](https://github.com/haris4587/ReleaseScope/actions/runs/40657171489). The final evidence commit also triggers validation.

Screenshots:

- [Public ReleaseScope overview](screenshots/release-scope-overview.jpg)
- [Finalized impact assessment in the Studio explorer](screenshots/finalized-assessment.jpg)
- [Successful and rejected transaction lifecycle](screenshots/transaction-lifecycle.jpg)
- [Finalized report and migration recommendation](screenshots/release-scope-report.jpg)
