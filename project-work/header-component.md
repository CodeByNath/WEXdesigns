# Header Component

Status: BUILDER ACTION REQUIRED
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

## Builder action

1. Start at Component Manager, Global Components, Layout, authority model,
   verified `main`, and existing schema/semantic-action patterns.
2. Produce the Header component plan/contract and any architecture/value gates.
3. Do not implement Header source yet if unresolved authority exists.
4. Do not add Search, icon-button, profile, notification, or other speculative
   component families.
5. Do not mount anything into Admin Station.
6. Update this same file to `AWAITING REVIEWER REVIEW` with findings,
   proposed contract, exact authority references, and any stop gates.

No topic branch is required for a documentation-only authority investigation.
If implementation becomes authorised later, first re-check the three-branch
limit before creating one.
