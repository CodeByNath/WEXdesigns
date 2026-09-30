# Header Component

Status: AWAITING REVIEWER REVIEW
Phase: 1 — Reverse-engineer Header structure and authority

## Owner intent and boundary

Header is the first reusable Admin Station Lego piece. Prove it in Component
Manager before any Admin Station fit. The reference image is design evidence,
not value authority.

Header owns reusable structure, layout and accessibility mechanics, and accepted
WEX presentation only. It must not own a route map, product label, search or
notification state, account data, permissions, persistence, domain validation,
credentials, callbacks, or future control families.

It has two direct compartments: Brand (logo/placement and a semantic
Home/Dashboard affordance) and Navigation. Navigation has Location (supplied
active-location text) and Utility (an ordered, application-supplied control
slot, initially empty). Header does not pre-build Utility controls.

## Revised proposed contract

Use a semantic `header` root; whether it is the page-level banner is determined
by its application placement. All Header layout participants use `min-width: 0`.
The parent allocates Header's available inline size; Header does not set a
hard-coded width or use margin spacing. Brand navigation remains a supplied,
serializable semantic intent, never a hard-coded route or callback. Native focus
must remain visible; future presentation uses WEX semantic tokens.

The Owner-resolved gutter model is exact:

- Header outer wrapper: `padding-inline: var(--wex-space-16)` at Large and
  Medium, changing to `var(--wex-space-8)` at Compact (`<= 767px`).
- Header inner container: `padding-inline: var(--wex-space-8)` at all bands.
- Effective content inset: 24px at Large/Medium, 16px at Compact.

These are separate nested padding responsibilities; neither is recreated with
margins or collapsed into a local value. Rechecked
[`layout.css`](../packages/wex/src/foundations/layout.css): its generic
`.wex-layout` uses `--wex-layout-page-padding` (24px) and its compact equivalent
(16px) as the *effective* page inset. It must not be applied as Header's outer
wrapper padding or it would double-count the inner 8px inset.

A later controlled Component Manager fixture may supply Brand intent, Location,
and an empty Utility slot only; it may not add an inert search, icon, profile,
or notification control.

## Remaining implementation gates

Current authority does not select Header block height, tier interpretation,
surface/border treatment, Brand/Utility allocation and alignment, or how Utility
grows/overflows. WEX provides the Large/Medium/Compact thresholds, but no Header
reallocation rule beyond the accepted Compact outer-padding change. An accepted
Header/WEX decision must select token-based values and an accessible Utility
reduction strategy (for example, wrap, scroll, or truncation) before any source
or responsive media rule is written.

[`SemanticAction`](../packages/schemas/src/actions/semantic-action.schema.ts)
requires a domain `recordId`; no accepted application-shell navigation record,
executor, or handler exists. Reviewer/Owner must decide whether a valid existing
record owner supplies Brand navigation or a bounded action-contract decision is
needed. No schema, source, fixture, Component Manager mount, or Admin Station
integration was created.

## Evidence

Inspected verified `main` through [Component Manager](../docs/code-map/component-manager.md),
[Global Components](../docs/code-map/global-components.md), [Layout](../docs/code-map/layout.md),
[authority model](../docs/architecture/authority-model.md), and
[ADRs 0007](../docs/decisions/0007-button-semantic-action-authority.md) and
[0008](../docs/decisions/0008-button-runtime-invocation-authority.md). Remote
capacity remains the two permanent branches; no topic branch was needed.
