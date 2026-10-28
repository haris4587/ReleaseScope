# Validation

## Automated checks

Run from the project root:

```bash
npm ci
python -m pip install -r requirements-dev.txt
npm run check
npm test
npm run build
node scripts/verify-live.mjs
python scripts/verify-report.py
```

The contract suite uses the official GenLayer Test Direct Mode, with web and model fixtures and a pinned `v0.2.16` runtime. Ten tests cover immutable registration, owner permissions, invalid URL/path/commit input, same-version rejection, all verdict types, initial assessment, report history linkage, duplicate and exhausted challenges, fabricated citations, missing evidence, and challenge-before-assessment rejection.

The six JavaScript tests cover pending/accepted/finalized lifecycle distinctions; execution errors despite finalization; cancellation; address/hash/payload validation; unsafe evidence URLs; and hosted Studio's nested leader-receipt execution format.

The live verifier independently reads finalized transactions and final-state reports, compares Studio's recorded code update with the exact checkout bytes, checks the source digest, and retrieves/fingerprints every evidence source. The Python verifier independently recomputes canonical report hashes and links.

## Boundaries

Unit fixtures are not live AI accuracy tests. The live HTTPX case demonstrates one real semantic upgrade risk and a challenged migration recommendation. Other verdicts are schema/lifecycle tested with deterministic mocks, not claimed to have broad live model coverage. Tests do not establish whole-repository coverage, production security, mainnet readiness, or zero model error.

The first live assessment failed consensus without committing a report. Bounded target-release extraction and explicit response-shape guidance corrected the observed issue. The failure is retained in `failed-assessment-receipt.json`; it is not counted as a successful demonstration.

The hosted Studio code-update record is verified separately from normal consensus writes because simulator code updates do not produce a normal leader execution receipt.
