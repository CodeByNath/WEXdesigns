# Header Component

Status: BLOCKED — DECISION REQUIRED
Phase: Header authority recovery blocked before contract authoring

## Reviewer verdict

**Proceed**

The Identity Portability resume gate is satisfied through accepted/promoted
Phase 6. Header work is active again.

## Outcome

Recover and formalise the already-approved Header architecture into repository
authority before any Header source implementation. This phase is authority/docs
only.

## Builder authority finding

The Identity Portability resume gate is satisfied, but the Header contract
cannot yet be authored without new authority. Atomic Composition supplies only
recursive direct-child ownership and count constraints; it defines no Header
component family or serializable definition/schema. Global Components confirms
that no component family is registered. Component Manager is an empty sandbox,
and Admin Station is an application shell rather than Header authority.

Current WEX Layout establishes page/shell allocation and the spacing scale, but
does not assign Header-specific presentation semantics. In particular, it does
not authorise a 64px Header height, 64px Brand allocation, 16px/8px Header
gutters, the 768px LocationLabel/SidebarTrigger replacement, Search modes, or
PrimaryNavigation fixed/scrollable behaviour. The historical source confirms
spacing tokens, not those Header uses.

Decision required: establish the Header component-family and serializable
direct-child/schema boundary, and either cite or define the Header-specific WEX
presentation and responsive rules. Existing identity authority already keeps a
reusable Header capability distinct from a concrete `WEXAMH` allocation; no
new local ID mechanism is permitted. After this authority is accepted, Builder
can resume the documentation-only contract phase. No source or Code Map change
was made while blocked.

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

## Hard exclusions

No Header Shared UI source, CSS, Component Manager fixture/mount, Admin Station
fitting, new child-component implementation, host/domain adapter, binding,
route behaviour, or speculative catalogue expansion in this phase.

## Stop gate

Stop as `BLOCKED — DECISION REQUIRED` if the accepted Header direction cannot
be represented without inventing a new ownership boundary, visual value,
component family, or identity semantic not already authorised.
