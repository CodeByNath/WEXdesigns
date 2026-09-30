# Header Component

Status: BLOCKED — DECISION REQUIRED
Phase: 4 — Resolve final Header authority gates

## Reviewer verdict

**Proceed with safeguards**

Phase 3 composition planning is accepted. The proposed Header shell and child
component boundaries match the Owner direction and current repository authority.

## Accepted Header contract

- Header block size: `var(--wex-space-64)` / 64px at every viewport.
- Brand shell: 64px x 64px square.
- Remaining inline width: Navigation shell.
- Two-level gutter only:
  - Large/Medium: outer 16px + immediate inner 8px = 24px effective inset;
  - Compact <=767px: outer 8px + immediate inner 8px = 16px effective inset;
  - no recursive nested gutter padding and no margin gutters.
- Navigation:
  - >=768px: Location Label at control edge;
  - <=767px: Sidebar Trigger replaces Location Label;
  - controls region is Search -> Primary Navigation -> exactly one Main Action,
    with Main Action fixed at inline-end.
- Primary Navigation is a separate future component with ordered items and
  `fixed` / `scrollable` component modes.
- Search is a separate future component with `full` / `icon-only` modes.
- Logo, Location Label, Sidebar Trigger, Main Action, Primary Navigation, and
  Search remain independent component families/capabilities; Header must not
  absorb their internal presentation or behaviour.

The Builder correctly created no Header source, schema, fixture, mount, branch,
or Admin Station integration.

## Independent authority check

Verified `main` confirms:

- current WEX layout has the required 64/16/8 spacing tokens and responsive
  threshold but no Header-specific surface contract;
- existing `SemanticAction` requires `recordId`;
- ADR 0007 binds ordinary Button actions to record-backed semantic commands;
- ADR 0008 keeps execution in the consuming application and does not establish
  shell navigation/toggle action ownership.

Therefore shell navigation/toggle intent must not be forced into the existing
record-backed Button contract without an explicit authority decision.

## Owner decisions required

### 1. Header surface

Choose one:

**A — Presentation-neutral Header**
Header owns no new background/border/separator. The host/Admin Station region
provides its surrounding surface.

**B — Header-owned WEX surface**
Header receives explicit WEX-owned background/border/separator presentation.
Exact semantic tokens and geometry must be authorised before implementation.

### 2. Shell action authority

Choose one:

**A — Record-backed actions only**
Brand/Home, Sidebar Trigger, and Main Action may use existing
`SemanticAction` only when a real authoritative record owner and command exist.

**B — Bounded shell-intent contract**
Create a separate serializable application-shell intent for navigation/toggle
actions that do not naturally target a domain `recordId`. Runtime execution
still belongs to the consuming application; no callbacks enter schemas/UI.

## Stop boundary

Do not implement Header or child components until these two decisions are
resolved. After Owner resolution, Reviewer may authorise the first implementation
phase in Component Manager. Admin Station integration remains a later phase.
