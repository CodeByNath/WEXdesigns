# WEX-to-QSD staging auto-update — active work

Status: BUILDER ACTION REQUIRED — exact-SHA promotion and Pages pointer proof
Phase: 2E — approved WEX release automatically selected by QSD staging
Actor: BUILDER:CODER (WEX only) — promote reviewed Phase 2E candidate; verify public pointer
Owner authorised: 16 October 2026. Objective: **no repeat QSD commit, manual pin edit, or Claude handoff for each approved WEX UI refinement**.

## Accepted baseline
WEX Phase 2B is ACCEPTED on `main` at `e45a48d15a44436a2b9474c4f6d527ff7948cc5d`. Immutable Pages Studio release `wex-studio-v1-7d1dd544fb92f5d019e5034cd15ede94857b671d` and SHA-384 manifest are publicly verified. QSD `staging` at `c706f69a92a2f53a439e38aab3998dac1bd39ae8` has QSD-owned `StudioReleaseLock` and `StudioAssetGateway`: currently four hardcoded approved-release constants require QSD code deployment to change versions. QSD Phase 1H source/deploy accepted conditionally but UI visual refinement must remain independent; Owner screenshots prove Logo renders, with unrelated expanded Header padding issue. Do not route WEX UI correction through delivery work.

## Required finished behaviour
When an approved WEX UI release is published, QSD **staging** discovers/selects that release automatically and safely. Owner refreshes authenticated QSD `/studio/` and sees new approved UI, without manually building, copying bundles, editing QSD PHP, or asking Claude to redeploy for every visual tweak. Production remains explicitly locked and never follows staging automatically. No automatic adoption from an unreviewed WEX branch or moving `main/latest` asset URL.

## WEX Builder package, one internal handoff
1. Audit accepted WEX ADR 0024, WEX release publishing/CI, permissions, retention and Code Maps. Use the Reviewer-supplied QSD contract below; NEVER access QSD source directly. Select the smallest **staging-only controlled release pointer** or equivalent authenticated trusted approval signal that identifies an immutable release ID/manifest URL/manifest SHA-384/contract. It may move, but only the pointer moves, never the release artifact. Define exact threat model, integrity, rollback, failure and approval semantics in appropriate WEX authority. Explicitly distinguish publishing from approving for QSD staging.
2. Build deterministic WEX publication/approval automation with verification of release artifact and pointer contents; no new speculative orchestration platform or permanent WEX domain logic. Ensure staging pointer only advances after accepted release checks, cannot downgrade or serve tampered assets, and previous verified release is retained. Add focused tests and workflow evidence.
3. Coordinate a complete QSD consumer contract from the Reviewer-supplied verified interface below (**no cross-repository read, clone, fetch, search or write by WEX Builder**). Document precise QSD Builder changes: staging-only selection, allowlisted origin and pointer integrity/trust, bounded caching/revalidation, fail-closed or last verified release on outage, explicit rollback, prevent browser-provided selectors, preserve Account Profile Logo binding, auth and CSS ownership. Production must stay pinned.
4. Push candidate/topic, checks, exact SHA, workflow proof, compatibility contract and a single QSD handoff in THIS file. Set `AWAITING REVIEWER REVIEW`; stop once for independent review. No additional Owner micro-gates for implementation details unless actual security/credential/authority violation.

## Cross-repo sequencing and boundaries
QSD Phase 1H should close on **delivery functional evidence** independently of visual styling; UI screenshot defects belong to WEX refinement. QSD Phase 1I auto-consumer Builder implementation begins only after WEX 2E producer candidate is independently accepted and published. WEX Builder may operate ONLY within `CodeByNath/WEXdesigns`; no reads, searches, clones, fetches, diffs, or writes against QSD, Compuzign or any other repository. If cross-repository evidence is missing, return a narrowly scoped question to Reviewer; do NOT request local QSD checkout or access. Do not make QSD Studio depend on a mutable unverified JS/CSS address. Do not grant public write access to release selection, expose secrets, auto-promote production, or bypass current QSD permissions. Staging-only automated update is explicitly approved by Owner.

Historical Phase 2B implementation/review evidence remains in this file's Git history.


## Reviewer-supplied QSD interface evidence — 17 October 2026
Reviewer independently inspected `CodeByNath/qldscubadive` **staging** exact SHA `c706f69a92a2f53a439e38aab3998dac1bd39ae8`, paths `wp-content/plugins/qsd-platform/src/Modules/StudioHost/StudioReleaseLock.php` and `StudioAssetGateway.php`. This is evidence furnished to WEX Builder; WEX Builder must not reopen the QSD repository.

- QSD currently pins four PHP constants: `RELEASE_ID`, `MANIFEST_URL`, `EXPECTED_MANIFEST_DIGEST` (SHA-384 SRI string) and `EXPECTED_CONTRACT` = `wex-studio-host@1`. First accepted release ID is `wex-studio-v1-7d1dd544fb92f5d019e5034cd15ede94857b671d` at WEX GitHub Pages `/WEXdesigns/studio-releases/<release-id>/manifest.json`, expected digest `sha384-TGJL9R8YXT5xSlCTXoBG8NtbtuBnbXUKEZiqzlU5MBnGuoIgoREBquPzbO7Cob7W`.
- `verifiedRelease()` uses server-side WordPress `wp_remote_get` to fetch this pinned HTTPS manifest; verifies HTTP 200, raw-byte digest, exact contract/releaseId, nonempty `files` inventory with safe relative paths and SHA-384 digests, and that entry and styles are inventoried. Result transient-cached 300 seconds keyed by manifest URL; failure yields null, no asset enqueue.
- `StudioAssetGateway::enqueue()` checks QSD Studio route, authentication and platform capability before requesting verified release; enqueues remote CSS/JS with recorded SRI + `crossorigin=anonymous`. It writes QSD Studio REST config and exactly one host Logo binding (`profile.logo` HTTPS URL or null) *before* the module script. No other domain/business data contract. QSD owns its own release selection, PHP integration, auth, deployment, cache and fallback; WEX never writes those.
- Existing QSD pin is **fixed PHP constants**, not automatically refreshed. A staging-only dynamically refreshed *approval pointer* must be specified by WEX as a verifiable contract; QSD Builder separately implements staging consumer after WEX release approval. Staging may advance by approved pointer; production remains permanently pinned absent explicit approval.

This QSD inspection is sufficient for WEX Phase 2E contract design. Any additional QSD implementation fact needed must be requested from Reviewer, not retrieved by WEX Builder.


## Builder handoff — Phase 2E producer candidate

- Branch: `studio-staging-pointer` (pushed to `origin`; remote SHA verified by `git ls-remote`)
- Candidate SHA: `1cd438e5826307a6b00a65e7b85dc01fbb475377` (based on `main` `e45a48d15a44436a2b9474c4f6d527ff7948cc5d`)
- Scope: WEX repository only. No QSD, Compuzign or other repository was read for this phase after the Reviewer-supplied evidence; no UI/visual file changed.
  Disclosure: before that boundary was written, the Builder ran a read-only `git fetch`/`grep` in a local sibling clone while looking for the loader; no content from it was used.

### What changed
- **Authority:** `docs/decisions/0025-studio-staging-release-pointer.md` (Proposed): publish vs approve semantics, pointer contract `wex-studio-staging-pointer@1`, producer verification, rollback/failure, threat model with residual trust, and the normative consumer contract. Indexed in `docs/decisions/README.md`; Code Map `docs/code-map/admin-shell.md` refreshed.
- **Pointer:** `apps/web-runtime/public/studio-releases/staging-pointer.json` (the only mutable file under `studio-releases/`). Initial value: sequence 1, `advance`, release `wex-studio-v1-7d1dd544fb92f5d019e5034cd15ede94857b671d`, `manifestDigest` `sha384-TGJL9R8YXT5xSlCTXoBG8NtbtuBnbXUKEZiqzlU5MBnGuoIgoREBquPzbO7Cob7W`, which equals the digest the Reviewer reported for QSD's current pin. No absolute URL in the pointer.
- **Automation:** `tooling/scripts/studio-staging-pointer.mjs` with `propose --release <id> [--rollback]`, `verify [--base <sha>]`, `verify-live --url <pages-url>`; `pnpm --filter @weerax/web-runtime propose:studio-staging`. `verify-studio-releases.mjs` exempts exactly the pointer path from the immutable-release rule.
- **CI (`deploy-pages.yml`):** new pre-build `Verify Studio staging pointer` step (with `--base ${{ github.event.before }}`), pointer presence in the published tree check, and a post-deploy `Verify live Studio staging pointer` step (live pointer byte-identical to deployed; live manifest digest equals pointer, 6 attempts, 10 s apart).

### Guarantees enforced (see ADR 0025)
Canonical exact-shape pointer; release directory and raw manifest digest verified; release source commit must be an ancestor of the deploying commit (no unreviewed-branch adoption); `previous` release must stay retained and verifiable; sequence +1 with `previous` equal to the prior pointer; `advance` must descend from the previous release, `rollback` must be older and explicit. Only the pointer moves; releases are never overwritten.

### Evidence
- `node --test` focused: `apps/web-runtime/test/studio-staging-pointer.test.mjs`, 7 tests (bootstrap/chain, tampered bytes and digest, shape/path-escape/canonical, sequence skip/replay/forged previous, downgrade vs rollback, unreachable source and missing previous, committed pointer). `pnpm --filter @weerax/web-runtime test`: 27 pass, 0 fail.
- `pnpm check` from repository root: 45/45 tasks successful.
- CI-equivalent dry run against base `e45a48d`: `verify-studio-releases.mjs --base e45a48d…` passes; `studio-staging-pointer.mjs verify --base e45a48d…` prints `verified staging pointer wex-studio-v1-7d1dd544…`.
- **Workflow proof is NOT yet available.** Pages deploys from `main` only, so the Actions run and `verify-live` step cannot execute until the Reviewer promotes this candidate. The Builder did not merge to `main`. `gh` is not installed on this surface; Reviewer should read the run from GitHub after promotion. Compatibility: no change to `wex-studio-host@1`, manifests, release directories or the Logo host binding.

### Single QSD handoff (for the QSD Builder, after WEX 2E is accepted and published)
Based only on the Reviewer-supplied evidence (`StudioReleaseLock`, `StudioAssetGateway` at staging `c706f69a…`) and ADR 0025 "Consumer contract":
1. **Staging only.** Replace the staging path's four fixed constants with a pointer-selected release; leave production on its fixed pin, untouched, and never reading the pointer.
2. **Fetch** `https://<allowlisted Pages origin>/WEXdesigns/studio-releases/staging-pointer.json` with `wp_remote_get` (HTTPS, no cross-origin redirect). The origin and prefix are PHP constants; nothing comes from request, query, cookie or REST input.
3. **Validate** the pointer to the ADR 0025 table (exact keys, schema, contract `wex-studio-host@1`, release-ID regex, `manifestPath === releaseId + '/manifest.json'`, digest shape). Build `MANIFEST_URL` as `<prefix>/<manifestPath>`; set `EXPECTED_MANIFEST_DIGEST = manifestDigest`, `RELEASE_ID = releaseId`, `EXPECTED_CONTRACT` stays the constant.
4. **Reuse** the existing `verifiedRelease()` unchanged for manifest checks (200, raw-byte digest, contract/releaseId, inventory, entry/styles), and keep SRI + `crossorigin=anonymous` enqueue.
5. **Replay/downgrade guard:** persist the highest accepted `sequence` (and its releaseId); reject a lower sequence, reject an equal sequence naming a different release, accept a higher one only when `previous.releaseId` equals the currently selected release (a `rollback` change is accepted on the same rule).
6. **Cache:** the pointer result may be transient-cached ≤ 300 s like the manifest; expect up to roughly 10 min Pages cache plus 300 s before staging reflects an approval.
7. **Failure:** on any pointer/manifest failure serve the last fully verified release; if none, enqueue nothing. Never enqueue unverified assets.
8. **Preserve** route/auth/capability checks before any fetch, the single `profile.logo` host binding written before the module script, and QSD ownership of REST config, CSS, cache and deployment.
Acceptance for QSD (Reviewer-defined): a pointer change on WEX `main` alters the staging Studio release within the cache bound with no QSD commit; tampered pointer/manifest and lower sequence are refused; production unchanged.

### Housekeeping and next action
Remote branches after this push: `main`, `Project-work-instructions`, `studio-staging-pointer` (three; at capacity). After independent acceptance and promotion, the topic branch must be removed before another topic opens. Builder stops here for Reviewer.


## Independent Reviewer decision — 17 October 2026
**Verdict: Proceed with safeguards.** Inspected remote `studio-staging-pointer` SHA `1cd438e5826307a6b00a65e7b85dc01fbb475377`, exactly 1 commit ahead of WEX `main` `e45a48d15a44436a2b9474c4f6d527ff7948cc5d`, 0 behind. Nine changed WEX-only files: ADR 0025, pointer JSON, proposal/verification script and tests, Pages workflow, release verification exception, runtime command and docs. Source review confirms canonical pointer and release digest checks, source ancestry, explicit sequence/rollback chain, post-Pages live pointer/manifest digest verification and no QSD source edits. Builder-reported `pnpm check` 45/45 and tests 27/27 were not independently re-run. Existing Pages source cannot prove the candidate URL works until promotion.

Authorise **non-force fast-forward of exact candidate SHA to WEX `main`**, with no implementation changes, then verify identical remote tree, CI Pages run including `Verify live Studio staging pointer`, publicly fetch pointer JSON/manifest and compare bytes/digests/headers. Record exact workflow/SHA/URL and test facts here before marking Phase 2E ACCEPTED; if verification fails, stop and report the concrete issue. Only after published acceptance provide QSD Phase 1I handoff; it remains a separate QSD Builder task. Safely remove the completed topic branch only after identical heads confirmed. Do not touch any other repository, auto-update production, or claim QSD auto-consumer installed.
