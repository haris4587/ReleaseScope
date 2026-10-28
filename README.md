# ReleaseScope

**Know what breaks. Before you ship.**

ReleaseScope is an evidence-backed software upgrade impact verification application built with a Python GenLayer Intelligent Contract and a Vite/JavaScript frontend.

- [Public application](https://releasescope.keenbasil9.chatgpt.site)
- [Contract explorer](https://explorer-studio.genlayer.com/address/0x8719F14F3919cB6aB66debe92B542415d9935b05)
- [Deployment configuration](public/deployment.json)
- [Submission brief](docs/SUBMISSION.md) · [Security and limitations](docs/SECURITY.md) · [Validation](docs/VALIDATION.md)

## The trust problem

A dependency update is often approved on a release number, a changelog summary, or one person's interpretation. Maintainers and downstream teams need a shared, inspectable account of why a documented change affects a particular application snapshot. ReleaseScope commits the evidence and puts independently assessed compatibility decisions and challenges on GenLayer.

A report is deliberately scoped: it examines the provided dependency manifest and usage file, not an entire repository or executing application. It never certifies that an upgrade is safe to deploy.

## How it works

1. Register a dependency name, installed version, application repository, exact 40-character commit, manifest path, usage path, and upstream repository.
2. Submit a target version and immutable upstream release-document commit/path.
3. The Intelligent Contract fetches those public files independently on leader and validator nodes. Files are bounded to 60 KB and SHA-256 fingerprints are recorded. A target-version section is selected from a changelog when possible; reasoning inputs are limited to 18,000 characters per document.
4. Each node independently evaluates release relevance, dependency/version evidence, and actual shown API usage. Comparative consensus requires matching verdicts and evidence fingerprints, plus equivalent factual reasoning.
5. Store an append-only report with citations, migration action, previous-report hash and current-report hash.
6. Anyone can request a bounded challenge with additional immutable documentation from the same declared upstream repository. Earlier revisions remain available.

| Verdict | Meaning |
| --- | --- |
| `BREAKING_CHANGE` | A documented incompatible change affects shown usage. |
| `MIGRATION_NEEDED` | Shown usage needs a documented adaptation or faces deprecation without proven immediate breakage. |
| `NO_IMPACT` | Sufficient explicit release/usage coverage supports no impact within the submitted scope. |
| `INCONCLUSIVE` | Evidence, model output, version relevance, or coverage does not support a conclusive decision. |

Conclusive reports must cite exact substrings from **manifest, usage, and release**. Unsupported citations fail closed. A missing file, oversized document, malformed output or insufficient scope cannot become `NO_IMPACT`.

## Try the demonstration

Open the application and select **Explore live report**. The reference case pins HTTPX `0.27.2` usage that calls `httpx.Client(proxies=...)` and the official HTTPX `0.28.0` changelog, where the argument was removed. The application fixture is synthetic and clearly labelled; the release change is real upstream evidence.

To create your own case, open **Verify upgrade**, load the demonstration to generate unique IDs, connect a disposable test session, register the integration, submit the release, then assess it. Wait for each transaction to finalize with successful execution. Read the report by its release ID, export JSON, or submit a challenge. Do not submit the same operation again after a timeout: resume its transaction hash in **Transactions**.

## Accounts and network

The contract deployment and reference transactions use **GenLayer Studio's built-in local account** in Full Consensus mode. No MetaMask integration is included.

Studio does not expose a supported cross-origin wallet-signing bridge. For direct browser writes the application uses the same official `genlayer-js` local-account mechanism as Studio: a new disposable SDK account, held only in tab memory. An optional disposable test private key can also be supplied. Keys are never saved by ReleaseScope or sent to a ReleaseScope server; reload/disconnect drops the signer. A reload therefore loses ownership access to an ephemeral integration unless you retained its test key independently. Reads and transaction tracking need no signer. Never enter a real-funds wallet key.

You can perform all methods directly in [GenLayer Studio](https://studio.genlayer.com) using its built-in account, then paste the resulting transaction hash into ReleaseScope to track finalization. See [deployment instructions](docs/DEPLOYMENT.md).

Network: **Studionet**, chain ID **61999**. This is the Studio development simulator, not a production/mainnet deployment. Simulator code upgrades and resets remain administrative trust assumptions.

## Local development

Prerequisites: Node.js 22.12+ or 24+, Python 3.12+.

```bash
npm ci
python -m pip install -r requirements-dev.txt
npm test
npm run check
npm run build
npm run dev
```

Open the Vite development URL. The checked-in deployment configuration points at the public reference contract. Writes use public Studionet; local development is not an isolated blockchain.

The Python tests use GenLayer Test Direct Mode and pin GenVM `v0.2.16`, matching the SDK dependency header used by hosted Studio. The first test run downloads the official runtime archive. Unit tests mock web/model results and do not prove live consensus or model accuracy. Live evidence is documented separately.

## Contract API

| Method | Arguments | Access / effect |
| --- | --- | --- |
| `register_integration` | JSON payload string | Register a new immutable integration; binds sender as owner. |
| `submit_release` | JSON payload string | Integration owner; new immutable release ID. |
| `assess_impact` | release ID | Owner; one initial assessment. |
| `challenge_assessment` | release ID, reason, document commit, document path | Public; three distinct challenges maximum. |
| `get_report` | release ID | JSON array of report revisions, or `[]`. |
| `get_integration` | integration ID | Immutable registered metadata, or `{}`. |
| `get_release` | release ID | Immutable release metadata, or `{}`. |
| `list_records` | none | Registered IDs. |

Example integration/release payloads are available in the application's workbench and [fixtures](fixtures/).

## Project layout

- `contracts/releasescope.py`: complete deployable Intelligent Contract, including deterministic validation and validator prompt.
- `src/`: frontend, GenLayer SDK adapter and transaction-state handling.
- `fixtures/`: public synthetic application exhibiting a real upgrade risk.
- `tests/`: contract and transaction lifecycle tests.
- `public/deployment.json`: exact network, contract, source digest and reference identifiers.
- `docs/`: deployment, security, validation, evidence, and submission material.

## Continued development

Useful next steps include package-registry-to-upstream identity attestations, automated usage extraction from full repositories, GitHub CI integration, content-addressed evidence archives, signed review identities, anti-spam challenge economics, and testnet deployment with user-controlled signing. These are roadmap items, not current features.

MIT licensed. Contributions should include a reproducible failing case and appropriate tests. Never submit credentials or proprietary application source as public evidence.
