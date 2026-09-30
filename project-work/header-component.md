# Header Component

Status: AWAITING REVIEWER REVIEW
Phase: 1 — Reverse-engineer Header structure and authority

## Owner intent

Header is the first reusable Admin Station Lego piece. Develop and prove it in
Component Manager first; do not fit it into Admin Station in this phase.

Owner-provided reference image is design evidence only.

## Required structure

Header contains two top-level compartments:

1. **Brand**
   - logo/brand placement;
   - primary Home/Dashboard navigation affordance from anywhere;
   - navigation intent must remain semantic/application-resolved, not a
     hardcoded product route.

2. **Navigation**
   - **Location**: active location label such as Dashboard or Services;
   - **Utility**: right-side shell ready to host future accepted controls such
     as search, icon-only quick navigation, ordinary buttons, profile/actions,
     notifications, or similar controls.

Header owns those compartments and their allocation. It does not pre-build the
future controls.

## Phase 1 decisions required

Before implementation, inspect current WEX/layout/typography/action authority
and record the smallest defensible Header contract covering:

- semantic landmark/structure and accessibility;
- overall Header width behaviour inside its parent;
- Header block-size/height;
- Brand inline allocation/width;
- Navigation remaining-width allocation;
- Location vs Utility allocation and alignment;
- internal padding/gaps and boundary treatment;
- overflow behaviour;
- Large / Medium / Compact behaviour at current WEX thresholds;
- what happens when Utility content grows;
- light/dark presentation;
- controlled Component Manager fixture shape;
- serializable definition/schema needs, if any;
- semantic action needed for Brand Home/Dashboard navigation.

Use existing WEX values/tokens where authority exists. Do **not** copy arbitrary
pixel values from the reference. If an exact required width, height, geometry,
responsive rule, or visual value has no current WEX authority, identify that
gate and stop before hardcoding it.

## Architecture boundary

Header may own reusable structure, layout mechanics, interaction/accessibility
mechanics, and registered WEX presentation.

Header must not own route maps, search logic/data, notification state, account
state, permissions, persistence, domain validation, product-specific labels,
credentials, backend calls, or executable callbacks.

Application/domain integration later supplies active location, brand
destination/action, and utility-control definitions through approved contracts.

## Builder findings and proposed contract

Inspected verified `main` through [Component Manager](../docs/code-map/component-manager.md),
[Global Components](../docs/code-map/global-components.md), [Layout](../docs/code-map/layout.md),
[authority model](../docs/architecture/authority-model.md), [semantic actions](../packages/schemas/src/actions/semantic-action.schema.ts),
and [ADRs 0007](../docs/decisions/0007-button-semantic-action-authority.md) and
[0008](../docs/decisions/0008-button-runtime-invocation-authority.md).

The smallest defensible structural contract is a reusable `header` with Brand
and Navigation direct children; Navigation has Location and Utility direct
children. Each layout participant has `min-width: 0`. The parent allocates the
Header; Header is full available inline size, with intrinsic Brand and Utility
allocations and a `minmax(0, 1fr)` Navigation/Location remainder. Brand carries
one application-supplied `SemanticAction` for Home/Dashboard; no route,
callback, record logic, or executable control belongs in Header. Location is
supplied text. Utility is an application-supplied ordered control definition
slot, initially empty. A controlled Component Manager fixture may supply those
three serializable values only, and must not introduce an inert search, icon,
profile, or notification control. Theme presentation must use WEX semantic
tokens and native focus must remain visible.

## Stop gates for implementation

No Header-specific authority selects its block size, tier interpretation,
padding/gaps, surface/border treatment, or Brand/Utility alignment. WEX provides
spacing tokens and page bands (Large >1024, Medium 768–1024, Compact ≤767), but
no Header reallocation or Utility growth/overflow rule. The reference cannot
fill those gaps. An accepted WEX/Header presentation decision must set these
values and specify whether Utility wraps, scrolls, truncates, or has another
accessible reduction before source is written.

`SemanticAction` requires a domain `recordId`; no accepted application-shell
record or navigation executor/handler exists. Reviewer/Owner must decide
whether Brand navigation has an existing owner record or needs a bounded action
contract decision. Therefore no Header schema, source, fixture, Component
Manager mount, or Admin Station integration was created. Remote capacity is two
permanent branches; no topic branch was needed.
