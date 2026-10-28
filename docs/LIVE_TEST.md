# Live browser verification

Environment: hosted GenLayer Studio / Studionet 61999 and public ReleaseScope website. Date: 28 October 2026.

Observed actions:

- Deployed contract through Studio's built-in account with Normal (Full Consensus) selected.
- Verified corrected code-update data against the exact local contract bytes.
- Used built-in account to register the reference integration and submit pinned HTTPX release evidence; both finalized with successful execution.
- Ran an initial AI assessment that failed consensus and did not store a report. Corrected bounded-context handling, then obtained a consensus `BREAKING_CHANGE` report with exact manifest/usage/release citations.
- Opened the publicly deployed frontend without a sign-in wall.
- Created an in-memory disposable SDK signing session without MetaMask.
- Registered an application snapshot and submitted a release from the public website, observing pending, accepted and finalized successful states.
- Read the live reference report through the frontend, including API usage, version evidence, source SHA-256 and exact quotes.
- Submitted a challenge through the public frontend with immutable upstream proxy documentation.

The frontend session is intentionally distinct from the Studio built-in account; it uses the same SDK local-account signing mechanism. No Studio storage was inspected, and no private key was embedded in source, receipts or website assets.

Final challenge, failure-path, resume/export and published-version verification results are recorded in EVIDENCE.md and the machine-readable transaction evidence. See SECURITY.md for scope and simulator limitations.
