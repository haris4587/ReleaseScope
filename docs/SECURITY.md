# Security and trust boundaries

ReleaseScope provides a scoped compatibility opinion based on public evidence. It is not a code execution sandbox, security audit, package authenticity registry, or guarantee that an application works after upgrading.

## Implemented protections

- Public evidence URLs are constructed internally on `raw.githubusercontent.com`; arbitrary schemes, hosts, ports and query strings are not accepted. Repository syntax, paths and immutable 40-character commits are validated; traversal and absolute paths are rejected.
- Integration/release snapshots cannot be overwritten through normal contract methods. Ownership gates release submission and initial assessment. Challenges append revisions rather than replacing past conclusions.
- Each fetched document is limited to 60 KB. Reasoning text is limited to 18,000 characters per document, with deterministic target changelog-section selection. Hashes cover complete fetched text, not just the selected section.
- Payloads, identifiers, text lengths, output fields, symbol arrays and citation counts are bounded. A conclusive result requires exact quote matches from each primary evidence category.
- External source and objection content are explicitly treated as untrusted data in prompts. Model outputs receive deterministic schema/citation validation. This reduces, but does not eliminate, prompt-injection or model-error risk.
- Leader and validators independently fetch evidence and derive a decision using comparative equivalence. Schema checks alone do not establish semantic correctness.
- The frontend escapes report content and accepts only HTTPS evidence links. It uses no application backend and holds optional signing material only in tab memory. It does not read Studio browser storage or embed a shared wallet key.
- Finalized success requires both finalization status and successful execution evidence. Tracking errors preserve transaction IDs and do not automatically duplicate writes.

## Residual risks

1. **Declared upstream identity:** an integration owner selects its upstream repository. There is no package-registry attestation that this is the canonical maintainer. Review that trust anchor before relying on a report.
2. **Partial application scope:** one manifest and one usage file cannot prove complete repository coverage or runtime behavior. A caller can omit important usages. `NO_IMPACT` applies only to supplied evidence.
3. **Models and consensus:** agreement is not mathematical proof of compatibility. Validators can share model biases or misinterpret incomplete documentation. Strict quote checking does not prove a quote supports the conclusion.
4. **Source availability:** immutable Git references can become unavailable after removal, private-repository changes or provider outages. SHA-256 fingerprints detect changed text but do not preserve the source bytes on chain.
5. **Challenge exhaustion:** the three public challenge slots can be consumed by an adversary. There is no bond, reputation or economic spam control in this first release. Register a new release ID for further review.
6. **Global ID squatting and enumeration:** public IDs are global and first-come. Records are append-only and enumeration grows with usage. Production deployment needs namespaces and pagination.
7. **Studio simulator:** deployment/source upgrades and state resets are simulator administrative operations. Source changes are documented with transaction receipts and hashes; this environment does not offer production immutability or real-world economic guarantees.
8. **Disposable sessions:** ephemeral frontend keys disappear on reload, losing owner-only write access. Test-account import is optional and should only use disposable keys. ReleaseScope never asks for production wallet credentials. Close the tab to clear the signing session. Browser extensions or compromised scripts can still compromise in-memory keys.
9. **Frontend supply chain:** pinned npm lockfile and Python test package improve reproducibility but do not eliminate dependency risk. Vite builds static browser assets; no server secrets are needed.

Report vulnerabilities privately to the repository owner before publishing exploitable details. Do not include secrets in issue reports.
