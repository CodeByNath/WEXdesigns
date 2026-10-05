# Header Component

Status: BUILDER ACTION REQUIRED
Phase: Header authority recovery and implementation contract

## Reviewer verdict

**Proceed**

The Identity Portability resume gate is satisfied through accepted/promoted
Phase 6. Header work is active again.

## Outcome

Recover and formalise the already-approved Header architecture into repository
authority before any Header source implementation. This phase is authority/docs
only.

## Existing accepted direction to preserve

Header is a reusable Shared UI component developed first in Component Manager,
then fitted into the Admin Station Header region only after component
acceptance.

Composition boundary:
- Header composes Brand and Navigation;
- Navigation composes Location/SidebarTrigger, Search, PrimaryNavigation, and
  MainAction;
- each child owns its own internals;
- LocationLabel is used at >=768px and SidebarTrigger replaces it at <=767px;
- Header height is 64px;
- Brand allocation is 64px x 64px;
- Navigation consumes remaining inline width;
- gutters are 16px outer + 8px immediate inner at Large/Medium and 8px + 8px
  at <=767px;
- deeper descendants do not accumulate ancestor gutter padding;
- MainAction is exactly one prominent inline-end slot;
- PrimaryNavigation owns ordered items and its own fixed/scrollable modes;
- Search owns its own full/icon-only modes.

Architecture boundaries:
- Header owns reusable structure, direct-child composition, layout/allocation
  mechanics, accessibility mechanics, and accepted WEX presentation;
- it does not own business navigation rules, route maps, search data/behaviour,
  notifications, account state, permissions, persistence, domain validation,
  credentials, callbacks, or product-specific labels;
- Admin Station remains the application shell and is not a Shared UI component;
- Component Manager remains an isolated validation sandbox;
- atoms remain governed by the accepted recursive-composition and identity
  rules;
- Header identity/allocation must use the accepted portable WEX Identity
  architecture, not a local ad-hoc ID.

## Builder work

1. Inspect current Header-related authority, Atomic Composition, WEX Layout,
   Component Manager, Admin Shell, Global Components, identity authority, and
   current source.
2. Record the durable Header component/composition contract through the
   repository's normal architecture authority (ADR/architecture doc as
   appropriate).
3. Resolve the exact reusable definition/schema boundary needed before source
   implementation, including direct-child slots/counts and responsive
   replacement rules.
4. Reconcile every required Header geometry/presentation value against existing
   WEX authority. If any value above lacks valid WEX presentation authority,
   record the gap instead of hardcoding it.
5. Update relevant Code Maps/navigation evidence.
6. Run documentation/foundation checks required by the repository.
7. Push one bounded candidate, update this same file to
   `AWAITING REVIEWER REVIEW` with exact SHA/evidence, and stop.

## Hard exclusions

No Header Shared UI source, CSS, Component Manager fixture/mount, Admin Station
fitting, new child-component implementation, host/domain adapter, binding,
route behaviour, or speculative catalogue expansion in this phase.

## Stop gate

Stop as `BLOCKED — DECISION REQUIRED` if the accepted Header direction cannot
be represented without inventing a new ownership boundary, visual value,
component family, or identity semantic not already authorised.
