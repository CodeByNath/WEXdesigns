# WEX Dashboard — QSD consumer handoff

Status: DEFERRED — WEX delivery architecture Phase 2B
Phase: 2B — eliminate repeated host-bundle copies
Actor: NONE — no WEX Builder action in this phase until Phase 1F QSD staging acceptance

## Ownership
- WEX Builder: **BUILDER:DESIGNER (Codex)**. Works only in `CodeByNath/WEXdesigns`. Owns WEX presentation, schemas as authorised, runtime package and publishing mechanism. **Must not edit/deploy QSD.**
- QSD Builder: **BUILDER:CODER (Claude)**. Works only in `CodeByNath/qldscubadive`. Owns QSD host integration, staging install/deployment and host-owned Profile data. **Must not invent/modify WEX presentation.**
- Reviewer: independently checks source/diff/checks/runtime and approves phase boundaries. Owner owns decisions.

## Accepted WEX source
Dashboard UI refinement is accepted on WEX `main` at `943e7bea2e102e76475784114e311eac5ca37259`. WEX Pages CI `38673046456` passed. This **does not prove** QSD `/studio` is updated. Earlier real QSD Profile Logo was visibly accepted on QSD staging; the latest Sidebar/Header refinements still require QSD host install.

## Immediate external handoff (not WEX Builder work)
QSD `project-work/wex-studio-host.md` Phase 1F owns the immediate action. **Claude** installs the accepted WEX Dashboard bundle using the existing QSD staging process, preserves Profile Logo binding, proves actual authenticated QSD `/studio` browser behaviour, and submits evidence to Reviewer. This is a temporary compatibility step, not the permanent delivery design.

## Deferred WEX Phase 2B
After Reviewer closes/defers QSD Phase 1F, activate this phase with **Codex**, one scoped task: audit WEX versioned build/manifest and actual QSD loader (QSD read-only); propose the smallest centrally published, version-pinned WEX runtime consumable without repeated per-host bundle commits. Check integrity/version pinning, rollback, caching, CSP, host data isolation and staging release controls. Submit specific authority/ADR gate if required; **do not implement architectural changes before acceptance**. Avoid new speculative packages/tokens/components and do not replicate host business logic.

## Historical evidence
Previous Logo correction `17e4ca2` and QSD Phase 1E visual acceptance are already recorded in Git history. Previous UI diff and TS7006 correction, successful checks, acceptance and main promotion are recorded in this file's Git history; this current file states only the actionable handoff.
