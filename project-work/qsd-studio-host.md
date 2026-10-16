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
1. Audit accepted WEX ADR 0024, release publishing/CI, actual QSD loader contract read-only, permissions, retention and Code Maps. Select the smallest **staging-only controlled release pointer** or equivalent authenticated trusted approval signal that identifies an immutable release ID/manifest URL/manifest SHA-384/contract. It may move, but only the pointer moves, never the release artifact. Define exact threat model, integrity, rollback, failure and approval semantics in appropriate WEX authority. Explicitly distinguish publishing from approving for QSD staging.
2. Build deterministic WEX publication/approval automation with verification of release artifact and pointer contents; no new speculative orchestration platform or permanent WEX domain logic. Ensure staging pointer only advances after accepted release checks, cannot downgrade or serve tampered assets, and previous verified release is retained. Add focused tests and workflow evidence.
3. Coordinate a complete QSD consumer contract (read-only QSD repository; **no QSD write from WEX**). Document precise QSD Builder changes: staging-only selection, allowlisted origin and pointer integrity/trust, bounded caching/revalidation, fail-closed or last verified release on outage, explicit rollback, prevent browser-provided selectors, preserve Account Profile Logo binding, auth and CSS ownership. Production must stay pinned.
4. Push candidate/topic, checks, exact SHA, workflow proof, compatibility contract and a single QSD handoff in THIS file. Set `AWAITING REVIEWER REVIEW`; stop once for independent review. No additional Owner micro-gates for implementation details unless actual security/credential/authority violation.

## Cross-repo sequencing and boundaries
QSD Phase 1H should close on **delivery functional evidence** independently of visual styling; UI screenshot defects belong to WEX refinement. QSD Phase 1I auto-consumer Builder implementation begins only after WEX 2E producer candidate is independently accepted and published. Do not make QSD Studio depend on a mutable unverified JS/CSS address. Do not grant public write access to release selection, expose secrets, auto-promote production, or bypass current QSD permissions. Staging-only automated update is explicitly approved by Owner.

Historical Phase 2B implementation/review evidence remains in this file's Git history.
