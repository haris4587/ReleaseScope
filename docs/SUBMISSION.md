# GenLayer Project Explorer submission

**Project:** ReleaseScope  
**Tagline:** AI-powered software upgrade impact verification  
**Category:** Developer tools / evidence verification  
**Website:** https://releasescope.keenbasil9.chatgpt.site  
**Source:** https://github.com/haris4587/ReleaseScope  
**Network:** GenLayer Studionet (Studio simulator), chain ID 61999  
**Intelligent Contract:** `0x8719F14F3919cB6aB66debe92B542415d9935b05`

## Short description

ReleaseScope compares official upstream release documentation with a committed application's dependency manifest and API usage. Independent GenLayer validators determine whether a particular upgrade breaks shown usage, requires migration, has no supported impact, or lacks enough evidence. Reports include source fingerprints, exact citations and an append-only challenge history.

## Why GenLayer

Version-number arithmetic cannot resolve semantic compatibility. Validators must interpret what a release changes and compare that with concrete usage. ReleaseScope fetches the same immutable evidence independently on each node and uses comparative consensus on verdict, evidence fingerprints and substantive conclusions. It does not outsource the conclusion to an off-chain web server and then merely record it on chain.

## Real-world value

Downstream application teams and library maintainers can inspect the same evidence and dispute a compatibility conclusion. This creates an auditable upgrade-review artifact suitable for dependency-review discussions and future CI gates, while explicitly separating scoped review from runtime testing.

## Demonstration

The synthetic application pins HTTPX 0.27.2 and calls `httpx.Client(proxies=...)`. Official HTTPX 0.28.0 release notes document removal of the argument. The reference release ID is `httpx-028-demo`. An additional challenge supplies upstream proxy documentation so validators can improve the migration recommendation while preserving the initial assessment.

Open the public app, select **Explore live report**, review citations and revision history, then inspect the finalized transaction links in `docs/EVIDENCE.md`. For a new case, load a demonstration with unique IDs in Verify upgrade and create a disposable signing session. No MetaMask is required.

## Implementation

Python Intelligent Contract; GenLayer web access and independent comparative AI evaluation; immutable GitHub evidence references; Vite/JavaScript web interface; pinned official `genlayer-js`; six lifecycle tests and ten contract tests; live transaction/source verification scripts.

## Honest scope

This is a public Studionet demonstration, not a mainnet product. The upstream repository is owner-declared rather than package-registry attested. Reviews cover supplied files, not the full repository, and do not execute the application. Model errors and prompt injection remain possible despite consensus and validation. The simulator permits administrative code updates/resets. Three public challenge slots can be exhausted. Frontend disposable SDK sessions are separate from the Studio built-in account; reference deployment and initial reference writes were executed using Studio's built-in account.

## Supporting material

- `docs/EVIDENCE.md`: verified addresses, source hashes and transaction links.
- `docs/LIVE_TEST.md`: browser checks and observed behavior.
- `docs/VALIDATION.md`: reproducible commands and test boundaries.
- `docs/SECURITY.md`: implemented controls and residual trust assumptions.
- `docs/live-report.json`: exported live report history.
- `docs/verified-transactions.json`: machine-readable finalized transaction evidence.

No public social-media post or Project Explorer submission has been sent automatically. This document is the reviewable submission brief.
