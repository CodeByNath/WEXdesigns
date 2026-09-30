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

## Owner clarification — shell/component ownership

The Header shell controls **which component is loaded into each Header slot**.
It does not control, duplicate, or reach inside a loaded component's internal
behaviour, state, presentation mode, action execution, or data logic.

Therefore:

- Header may choose/mount the component assigned to Brand, Location/Sidebar,
  Search, Primary Navigation, and Main Action slots;
- each loaded component owns what it is programmed/contracted to do internally;
- Header does not toggle Search between full/icon modes from outside unless the
  Search component contract itself exposes and owns such a mode;
- Header does not implement Primary Navigation scrolling/fixed behaviour;
  Primary Navigation owns that capability;
- Header does not own Sidebar Trigger toggle semantics/state;
- Header does not own Main Action or Brand/Home action execution;
- replacing LocationLabel with SidebarTrigger at <=767px is a **slot/component
  selection rule**, not Header control of either component's internals.

This removes child-action semantics from the Header authority gate. Action
ownership must be resolved in the relevant child component's own authorised
work when that component is developed.

## Independent authority check

Verified `main` confirms:

- current WEX layout has the required 64/16/8 spacing tokens and responsive
  threshold but no Header-specific surface contract;
- existing `SemanticAction` requires `recordId`;
- ADR 0007 binds ordinary Button actions to record-backed semantic commands;
- ADR 0008 keeps execution in the consuming application and does not establish
  shell navigation/toggle action ownership.

Therefore child navigation/toggle intent must not be forced into the Header contract or into the existing record-backed Button contract merely to make the Header shell work.

## Owner decisions required

### 1. Header surface

Choose one:

**A — Presentation-neutral Header**
Header owns no new background/border/separator. The host/Admin Station region
provides its surrounding surface.

**B — Header-owned WEX surface**
Header receives explicit WEX-owned background/border/separator presentation.
Exact semantic tokens and geometry must be authorised before implementation.

### 2. Child action authority

Resolved at Header level by Owner clarification: **defer to each child
component's own contract/authority**. Header only loads the selected component
into its slot and does not own that component's internal action semantics.

Brand/Home, Sidebar Trigger, Main Action, Search, and Primary Navigation action
or interaction authority must be addressed only when those child components
are separately authorised.

## Stop boundary

Do not implement child components from this Header phase. Header implementation remains blocked only on the Header surface decision. After that Owner decision, Reviewer may authorise the first Header-shell implementation phase in Component Manager using controlled placeholder/slot fixtures rather than implementing child internals. Admin Station integration remains a later phase.
