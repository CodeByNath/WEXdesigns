# Header Component

Status: AWAITING REVIEWER REVIEW
Phase: Header authority candidate submitted for Reviewer review

## Reviewer verdict

**Proceed**

The previous block is resolved by Owner authority already captured in the WEX
handover and reaffirmed in the current cycle. The missing issue is not a new
product decision; it is that the accepted Header plan has not yet been promoted
into repository architecture authority.

Do not redesign the Header. Formalise the existing plan.

## Owner-approved Header direction to record

Header is the first real reusable Shared UI Lego for Admin Station. It is
developed first in Component Manager, then fitted into the Admin Station Header
region only after component acceptance.

Recursive composition:
- Header directly composes Brand and Navigation;
- Navigation directly composes Location/SidebarTrigger, Search,
  PrimaryNavigation, and MainAction;
- each child owns its own internals and may itself be a shell;
- ancestors do not acquire descendant presentation or behaviour authority.

Presentation/composition:
- Header height: 64px on all viewport modes;
- Brand allocation: 64px x 64px;
- Navigation consumes remaining inline width;
- Large/Medium Header gutter: 16px outer + 8px immediate inner;
- <=767px Header gutter: 8px outer + 8px immediate inner;
- deeper descendants do not accumulate those ancestor gutters;
- LocationLabel is loaded at >=768px;
- SidebarTrigger replaces LocationLabel at <=767px;
- MainAction is exactly one prominent inline-end slot;
- Search owns full/icon-only modes at Search component level;
- PrimaryNavigation owns ordered items and fixed/scrollable modes at its own
  component level.

These values are Header-specific WEX presentation semantics consuming the
existing WEX spacing/layout foundations. They do not create a second global
spacing scale.

## Contract boundary

Create the minimum durable repository authority needed for implementation:
1. an accepted Header architecture/ADR defining the reusable Header family,
   ownership, direct-child composition, slot/count rules, responsive replacement
   rule, and Header-specific presentation semantics above;
2. the framework-neutral serializable Header definition/schema boundary in
   design only for this phase — define what the future schema must express, but
   do not implement schema/source yet unless the repository's ADR convention
   requires an exact contract example;
3. preserve the accepted atomic-composition rule: definitions say what can be
   composed; WEX owns presentation; applications/domain provide runtime meaning;
4. preserve WEX Identity separation: reusable Header capability != concrete
   WEXAMH allocation. No local/ad-hoc ID mechanism;
5. update the relevant Code Maps/navigation evidence so the next Builder starts
   from the new authority.

## Required authority to inspect

Read and reconcile against:
- `docs/architecture/atomic-composition.md`;
- `docs/architecture/authority-model.md`;
- `docs/architecture/dependency-rules.md`;
- `docs/code-map/layout.md`;
- `docs/code-map/spacing.md`;
- `docs/code-map/global-components.md`;
- `docs/code-map/component-manager.md`;
- `docs/code-map/admin-shell.md`;
- accepted WEX Identity ADRs/architecture;
- current WEX layout/spacing source;
- existing component-schema precedent such as Button.

## Hard exclusions

No Header Shared UI implementation, CSS, schema implementation, child-component
implementation, Component Manager fixture/mount, Global Components registration,
Admin Station fitting, host/domain adapter, binding, route/search behaviour, or
speculative component catalogue expansion.

## Builder handoff

- Candidate branch: `docs/header-component-authority`
- Remote commit: `a23363569a7aa5e1c2f03686f04319dc9df16d8c`
- Candidate files: `docs/decisions/0020-header-component-authority.md`,
  `docs/decisions/README.md`, `docs/code-map/header-component.md`,
  `docs/code-map/README.md`, `docs/code-map/component-manager.md`,
  `docs/code-map/global-components.md`, and `docs/code-map/admin-shell.md`.
- Checks passed: `pnpm audit:foundation`; `git diff --check`.
- Result: the ADR formalises the approved Header family, direct-child slot and
  count rules, responsive replacement, WEX-specific semantics, future
  serializable boundary, and WEX Identity separation. The Header Code Map and
  adjacent navigation maps route the next Builder to that authority.
- No unresolved authority conflict or deviation. No Header source, schema, CSS,
  child component, fixture/mount, registration, Admin Station fitting, adapter,
  binding, or product behaviour was added.
