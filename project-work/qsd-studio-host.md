# WEX Studio versioned delivery — active work

Status: ACCEPTED — Phase 2B promoted and public release verified
Phase: 2B — WEX release producer, multi-step package (closed)
Actor: None in WEX. QSD consumer work may begin under QSD's own `project-work/wex-studio-host.md`.
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


## Independent Reviewer decision — 16 October 2026
**Verdict: Proceed with safeguards.** Independently compared pushed `codex/qsd-versioned-release-contract` at `e45a48d15a44436a2b9474c4f6d527ff7948cc5d` against `main` `ec445a73dc98b94f1781096e94ccc34e48bff32c`: 3 commits ahead, 0 behind. Inspected actual workflow patch, immutable release manifest and verifier. The manifest declares `wex-studio-host@1`, source SHA `7d1dd544fb92f5d019e5034cd15ede94857b671d`, hashed relative entry/styles and SHA-384 asset inventory. The verifier validates releases and rejects edits to previously present release directories when supplied a valid base. Builder reports 45/45 clean `pnpm check` tasks and focused checks; these checks were not independently executed here.

**Authorise exact-SHA, non-force fast-forward promotion to WEX main**, with no implementation-content changes or extra release content. Codex/authorised Git executor must verify exact tree, run deterministic release checks, confirm Pages workflow passes, then independently fetch the resulting public manifest/module/CSS/font URLs and verify response MIME, CORS, full digest matches and browser module loading. Test immutable path and baseline rollback retrieval; check CDN caching behaviour without assuming Pages provides immutable headers. **Do not mark this work ACCEPTED or release QSD dependency until successful public evidence is recorded in this same file.** If public delivery fails, record actual failure and stop for a bounded correction; do not pass an unverified URL to Claude. Once public checks pass, safely delete only the identical completed topic branch and mark Phase 2B ACCEPTED with exact WEX release URL, manifest digest, verification result and QSD handoff. Never auto-deploy QSD or production. No new Owner round-trip for successful verification-only closeout.

## Builder blocker — 16 October 2026

Candidate `codex/qsd-versioned-release-contract` is local at
`e45a48d15a44436a2b9474c4f6d527ff7948cc5d` (three commits ahead of WEX
`main`): retained source-SHA Pages release, SHA-384 manifest for all 75 files,
no-overwrite workflow guard, focused release proof, proposed ADR 0024 and
contract documentation. `pnpm check` passed (Foundation audit; 45/45 tasks),
the focused Studio suite passed (20/20), and the static Pages build contained
the release tree. Existing Pages browser and response evidence confirms the
current public origin is HTTPS and CORS-readable; candidate URLs cannot be
verified until candidate publication/promotion.

Push was refused by GitHub using the Owner-directed `kalhomer` credential:
`refusing to allow an OAuth App to create or update workflow
.github/workflows/deploy-pages.yml without workflow scope`. No remote topic,
release URL, QSD write, deployment, or host selection was made. Do not switch
to another credential, remove the workflow guard, force push, or publish the
unreviewed candidate. Owner/Reviewer must provide a `kalhomer` credential with
`workflow` scope (or record a specific credential exception) before Builder
can push and submit the candidate for review.

## Builder handoff — Phase 2B (16 October 2026)

Credential blocker resolved by Owner: candidate pushed by the Owner with a
`workflow`-scoped credential. No force push, no credential exception beyond
that, and the workflow guard was not removed.

Candidate: `codex/qsd-versioned-release-contract` at
`e45a48d15a44436a2b9474c4f6d527ff7948cc5d`, 3 commits ahead of WEX `main`
`ec445a73dc98b94f1781096e94ccc34e48bff32c` (0 behind). Remote SHA verified.
Release ID `wex-studio-v1-7d1dd544fb92f5d019e5034cd15ede94857b671d`
(contract `wex-studio-host@1`, source `7d1dd54`), SHA-384 manifest for all
runtime files including fonts. Workflow change: full-history checkout,
retained-release verify step (hashes + no-overwrite against push base), and a
built release-tree presence check; triggers/permissions unchanged. Proposed
ADR 0024 plus Code Map/README contract documentation.

Evidence (re-run by Claude Code on exact `e45a48d`, clean worktree):
- `pnpm check`, Turbo cache forced off: Foundation audit passed; 45/45 tasks,
  0 cached.
- `verify-studio-releases.mjs --base ec445a7`: passed; focused
  `studio-release.test.mjs` 1/1 passed (Codex reported Studio suite 20/20).
- `git diff --check` clean outside generated release assets; the minified
  release JS contains trailing whitespace, which cannot be edited without
  breaking its recorded digest.

Limitations: Pages is `main`-only, so release URLs, MIME/CORS/cache headers
and browser module loading are not yet verified for this candidate; Codex
recorded existing Pages origin HTTPS/CORS readability only. With no valid push
base (manual dispatch), the verifier checks digests but skips the
no-overwrite comparison. No QSD write, host selection or deployment made.
Stop for independent Reviewer review.

## Exact-SHA promotion closeout — 16 October 2026

Promotion: non-force fast-forward `main` `ec445a7` → `e45a48d15a44436a2b9474c4f6d527ff7948cc5d`
(exact reviewed candidate, tree `7656c7cf`; no content changes). Pre-push on the
exact tree, clean worktree: `verify-studio-releases.mjs --base ec445a7` passed;
`studio-release.test.mjs` 1/1; `pnpm check` Foundation audit + 45/45 tasks, 0 cached.
Pages run `38860174506` (push, `e45a48d`): success, including "Verify retained
Studio releases" and "Verify published Studio release tree".

Public release (QSD handoff):
- Release ID: `wex-studio-v1-7d1dd544fb92f5d019e5034cd15ede94857b671d` (contract `wex-studio-host@1`)
- Manifest URL: https://codebynath.github.io/WEXdesigns/studio-releases/wex-studio-v1-7d1dd544fb92f5d019e5034cd15ede94857b671d/manifest.json
- Manifest digest: `sha384-TGJL9R8YXT5xSlCTXoBG8NtbtuBnbXUKEZiqzlU5MBnGuoIgoREBquPzbO7Cob7W`
  (public bytes identical to committed manifest)

Public evidence: all 74 manifest files fetched with 200 and SHA-384 match (75
with manifest); missing path 404. Headers: JS `application/javascript`, CSS
`text/css`, fonts `font/woff2`, manifest `application/json`; `access-control-allow-origin: *`;
`cache-control: max-age=600` (no `immutable` — immutability rests on the retained
path and no-overwrite guard, per ADR 0024). Browser: Owner opened a cross-origin
test page (`http://127.0.0.1:5500`, Live Server) loading the public CSS and
module entry with SRI `integrity` + `crossorigin`: PASS — module mounted, CSS
loaded, 2 fonts loaded, no errors, Logo and Header rendered. Test page not committed.

Rollback: this is the first retained WEX release, so no earlier WEX release
directory exists. Rollback reference for QSD is its current plugin-local
`studio-assets/` installation; this release stays retrievable at its pinned
path for later rollback once a successor exists.

Housekeeping: `codex/qsd-versioned-release-contract` was identical to `main`
(`e45a48d`) and has been deleted; remote heads are now `main` and
`Project-work-instructions`. No QSD write, host selection, production deploy or
Google Drive handover update (Drive connector not authorised in this session).
