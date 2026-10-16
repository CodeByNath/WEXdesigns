# WEX Studio versioned delivery — active work

Status: BUILDER ACTION REQUIRED
Phase: 2B — WEX release producer, multi-step package
Actor: BUILDER:DESIGNER (Codex)
Owner authorisation: 16 October 2026 — complete phased WEX-to-QSD delivery without recurring micro-approvals; stop only at an actual authority/security conflict.

## Audited baseline
WEX `main` `ec445a73dc98b94f1781096e94ccc34e48bff32c` contains fixed 64×64 Logo. `apps/web-runtime/vite.studio-host.config.ts` emits relative hashed JS/CSS and `{entry,styles,version}`, output `studio-host-dist`. Existing `.github/workflows/deploy-pages.yml` publishes only mutable `apps/web-runtime/dist`, not retained Studio releases. QSD read-only Code Map `docs/code-map/studio-host.md` and `StudioAssetGateway.php` show plugin-local manifest, `realpath` containment, `filemtime` URLs and pre-module Profile Logo binding. Do not alter these host contracts in WEX.

## Outcome
WEX owns an immutable, verifiable, explicitly versioned Studio bundle. QSD can choose an approved release without copying entire asset trees into QSD on every visual change. First proof: fixed Logo on QSD staging. No automatic production updates.

## One WEX Builder package — perform internal steps without repeated Reviewer cycles
1. **Authority / compatibility:** Inspect WEX Code Maps, build, publish workflow, available WEX-controlled release origin/permissions. Record a small ADR on `main` via the authorised topic candidate, covering release ID/full source SHA, immutable hosting and retention, exact manifest/integrity format, supported module MIME/CORS, compatibility contract, caching, rollback, and producer/consumer ownership. Prefer verified existing GitHub infrastructure; do not assume GitHub Releases or Pages are suitable without browser delivery evidence.
2. **Producer:** Extend existing Studio build/release pipeline only as forced by real QSD consumer; publish one verified immutable version directory with manifest and digests for all runtime files (including fonts). Reject path traversal, missing files or hash mismatches. Make release job idempotent, reject overwrite, retain rollback version. Do not publish unreviewed feature branches as an approved host release.
3. **Verification:** Prove release URLs deliver module JS, CSS and fonts with appropriate MIME/CORS/CSP-compatible headers; verify manifest/full artifact hashes, immutability, repeat build or reproducible artifact evidence, version pin and rollback retrieval. Run `pnpm check` and focused release tests; record workflow, exact URL/ref/SHA, hashes and evidence.
4. **Handoff:** Publish the WEX consumer contract, staging release ID/manifest URL/digest and rollback reference for QSD. Push one topic candidate; set SAME work file `AWAITING REVIEWER REVIEW` with SHA/results; stop. Reviewer may accept the entire package once, no reviews between internal tasks.

## Hard boundaries and real stop conditions
No QSD writes from WEX; no Profile/data/API/identity changes, inline CSS, new UI, speculative packages, mutable `latest` selectors, production deploy or silent host update. Never expose secrets. If the release origin requires unavailable credentials/admin permissions, incompatible host CSP/MIME/CORS, an unapproved paid service, or changes to security/authority beyond this expressly authorised delivery scope, record exact evidence and stop instead of inventing access. Preserve existing Pages/catalogue behaviour.

QSD consumer instruction lives in its own `project-work/wex-studio-host.md` and may begin once an independently accepted, verified WEX release artifact/contract exists. No more manual WEX bundle-copy cycles.
