# WEX Dashboard — QSD consumer handoff

Status: AWAITING REVIEWER REVIEW
Phase: 2D — fixed 64×64px Logo, independent of Sidebar state
Actor: REVIEWER — independently inspect the pushed Phase 2D candidate

## Builder handoff — Phase 2D (16 October 2026)

Candidate branch: `codex/logo-fixed-64`

Candidate SHA: `ec445a73dc98b94f1781096e94ccc34e48bff32c`, based on accepted
WEX `main` `3c9e136e12be218b2bfac068594b92f4ddfc5865`.

Scope: WEX-only Logo/Header presentation. Logo is a non-shrinking fixed
`--wex-space-64` square; the approved Brand allocation is itself 64px high
and has no inner padding that can shrink Logo. Artwork retains `object-fit:
contain`. No inline CSS, new token, schema, host/API, QSD, deployment, or
distribution change.

Evidence:

- Focused Header/Logo tests pin the fixed token geometry and parent allocation.
- `pnpm check` passed: Foundation audit and 45/45 Turbo tasks; `git diff
  --check` passed.
- Local Studio fixture DOM rectangles were exactly 64×64px for Logo and Brand
  in desktop collapsed, expanded, hover rail, and 375px compact drawer states.
  Wide (1200×160), tall (160×800), and square (800×800) HTTPS artwork stayed
  contained; invalid URL retained the label fallback. Compact drawer Escape
  restored focus to `Open sidebar`. Desktop-expanded and compact screenshots
  were captured in the in-app browser.

No QSD action, host install, or deployment was performed. Reviewer must
independently inspect the remote candidate/diff/evidence and issue the next
recorded verdict.

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

## Builder handoff — Phase 2C (15 October 2026)

Candidate: `codex/logo-containment-64` at `3c9e136e12be218b2bfac068594b92f4ddfc5865`, based on accepted `main` `943e7bea2e102e76475784114e311eac5ca37259`. Scope is WEX-only: Logo wrapper is token-bounded with existing `--wex-space-64`; image fills that box with `object-fit: contain`. No new token, inline style, schema, host/API, QSD, deployment, or distribution change.

Evidence:
- Added focused `packages/wex/test/logo-foundation.test.mjs`; preserves existing image binding and label fallback.
- `pnpm check` passed: Foundation audit plus 45/45 Turbo tasks.
- Codex in-app local Studio fixture used a real 1200×160 HTTPS image. DOM rectangles: collapsed 48×31px, hover 48×31px, expanded 64×31px, compact open drawer 64×31px. Each image rect was inside Brand and at most 64px per axis. Desktop-expanded and compact screenshots captured in the local in-app browser.
- Compact accessibility: opening drawer sets main/footer inert; Escape closes it, restores focus to “Open sidebar”, and clears inert state.

No QSD action, host install, or deployment was performed. Reviewer must independently inspect remote candidate/diff/evidence and issue the next recorded verdict.

## Independent Reviewer verdict — Phase 2C
**Proceed with safeguards.** Verified pushed `codex/logo-containment-64` at `3c9e136e12be218b2bfac068594b92f4ddfc5865`: exactly one commit ahead of accepted `main`, no divergence, and exactly two files changed (`logo.css` and focused test). Logo bounds use existing `--wex-space-64` and percent-responsive limits; artwork retains `object-fit: contain`. No domain/schema/API/QSD change. Builder reports passing `pnpm check` and DOM rectangle checks; Reviewer verified source/diff but has not independently run a browser. **Authorise Codex exact-SHA fast-forward to WEX `main` now**, no source alterations, then verify checks/main equality, safely delete completed topic per branch governance, record closure in this same file. QSD `/studio` must be separately updated via its existing manual host install and browser-verified before claiming runtime fix. No additional Owner approval needed for clean WEX exact-SHA closeout; do not begin unrelated delivery architecture work.

## Reviewer promotion verification — 15 October 2026
Verified remote `main` is exactly `3c9e136e12be218b2bfac068594b92f4ddfc5865` and its tree is identical to `codex/logo-containment-64` (ahead=0, behind=0). Accepted Logo sizing CSS and focused test exist on `main`; no new source work is pending. Existing `codex/logo-containment-64` remote topic remains after promotion. **Codex:** use authorised Git-capable execution to safely delete ONLY the identical completed topic branch, verify two remaining remote heads (`main`, `Project-work-instructions`), mark Phase 2C ACCEPTED here and stop. This is housekeeping, not a new UI-review phase. Do not reimplement Logo work or request another review for unchanged content. QSD staging has not been verified with this new version.


## Owner instruction — Phase 2D (16 October 2026)

QSD Phase 1F was closed as **DEFERRED** by Owner direction (visual gate not independently accepted). Do not send Logo geometry work back to QSD. WEX `main` currently has Phase 2C at `3c9e136e12be218b2bfac068594b92f4ddfc5865`; CSS currently uses `min(100%, var(--wex-space-64))` on `.wex-logo`, so its allocated box can shrink below 64px. **Owner requires a fixed 64×64px Logo box at all times, including expanded/collapsed/hover Sidebar and compact layout.** This is exact geometry, **not a maximum**. Artwork (wide, tall, square) must retain its aspect ratio inside this fixed box (`object-fit: contain`); never stretch or crop the image, overlap Header/Sidebar, or change Logo dimensions on Sidebar interaction. Resolve any parent slot/header layout conflict through approved WEX geometry/composition only.

**Codex bounded task:** first safely delete completed remote `codex/logo-containment-64` only after verifying it is identical to `main` (last verified 0 ahead/behind); confirm branch capacity, then open one authorised topic. Inspect current Logo/Header design authority, Code Maps and source. Apply minimal WEX-only token-based presentation correction; no QSD edits, inline CSS, invented tokens, schema/host bindings/API changes, or new component. Test DOM rect equals exactly 64×64 for Logo wrapper in all listed states and viewports; image fits with preserved aspect ratio, no overlap, and fallback remains intact. Check keyboard/accessibility and run `pnpm check`; record screenshot evidence. Push topic plus same-file handoff `AWAITING REVIEWER REVIEW` with exact SHA/tests, stop for independent Reviewer. Do not self-promote or commence deferred Phase 2B delivery redesign. If authoritative responsive geometry forbids a fixed box, stop with the exact conflicting source rather than invent a rule.
