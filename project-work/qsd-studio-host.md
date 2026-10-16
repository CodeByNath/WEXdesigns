# WEX-to-QSD staging auto-update — active work

Status: BUILDER ACTION REQUIRED
Phase: 2E — approved WEX release automatically selected by QSD staging
Actor: BUILDER:CODER / Codex in WEX — design and implement WEX-side trigger and release metadata, then handoff QSD integration
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
