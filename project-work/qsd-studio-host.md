# WEX Dashboard — QSD consumer handoff

Status: BUILDER ACTION REQUIRED — Phase 2C Logo 64px containment
Phase: 2C — contain Header Logo at approved 64 x 64 px
Actor: BUILDER:DESIGNER (Codex) — WEX presentation-only correction

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

## Owner-reported regression — Phase 2C (15 Oct 2026)
Screenshot of QSD /studio shows the real Logo image overflowing the Header into the Sidebar and other regions, apparently growing when Sidebar layout changes. WEX `main` verified: `packages/wex/src/foundations/logo.css` constrains `.wex-logo__image` only by percentages; `header.css` expands Brand allocation to sidebar width and does not bound Logo itself. Exact root cause needs Builder reproduction. Owner requirement: **Logo image remains inside a 64 by 64 px maximum area**, preserves aspect ratio, and never overlaps adjacent regions, in collapsed, expanded, hovered or compact layouts. Host may supply wide/tall artwork. Header/Brand allocation can change independently, but not Logo bounds.

**BUILDER:DESIGNER (Codex), WEX only:** Inspect approved Logo/Header ADRs and source. Reproduce the image overflow using a realistic wide source and collapsed/expanded/hover/compact states. Make the minimum WEX-owned, token-only CSS/presentation fix using existing approved 64px geometry, with no inline styles, new tokens, local QSD CSS or schema/domain/host API changes. Preserve Logo binding and fallback. Test image dimensions and containment with DOM/bounding rectangles, accessibility, responsive and `pnpm check`. Existing remote topic `codex/split-window-icons` occupies the third branch slot and is already on `main`; confirm containment and follow authorised housekeeping before opening a new topic; do not force-delete or overwrite it. Submit exact branch/SHA, test evidence and screenshots in THIS work file as `AWAITING REVIEWER REVIEW`; stop for independent review. QSD deployment is a later **QSD:CODER (Claude)** task only after WEX approval and relevant host handoff. No QSD action assigned by this WEX phase.

**Phase 2B permanent distribution architecture remains DEFERRED** until separately activated after this UI correction. Do not start it concurrently.


## Builder capability preflight — Phase 2C (15 October 2026)

Remote `codex/split-window-icons` is exactly contained in WEX `main`
`943e7bea2e102e76475784114e311eac5ca37259` (zero commits ahead or
behind). Required deletion of only that completed topic was attempted, but the
terminal `WeeraX` credential received GitHub HTTP 403. The connected
`CodeByNath` GitHub surface exposes guarded ref updates but no ref-deletion
operation.

The three remote heads remain `main`, `Project-work-instructions`, and
`codex/split-window-icons`; branch capacity is full. No Phase 2C branch,
source edit, deployment, QSD change, or visual claim was made. A Git-capable
`CodeByNath` executor must delete only the verified contained topic, fetch
and confirm the two permanent heads, then rerun this WEX cycle.

## Branch housekeeping complete — Phase 2C (15 October 2026)

Owner directed the housekeeping-only step using the `kalhomer` credential
(push access to this repository). Before deletion, remote
`codex/split-window-icons` was re-verified at `943e7be`, identical to `main`
(0 ahead / 0 behind). It was deleted with a plain, non-force delete. Remote
heads are now only `main` (`943e7be`) and `Project-work-instructions`.

Housekeeping only: no Phase 2C topic branch, source edit, deployment or QSD
change was made. The Phase 2C Logo containment task above remains assigned to
BUILDER:DESIGNER (Codex) and may now open its topic branch.
