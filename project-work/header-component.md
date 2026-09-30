# Header Component

Status: AWAITING REVIEWER REVIEW
Phase: 5 — Formalise recursive composition and Header implementation plan

## Accepted recursive boundary

Header is reusable Shared UI composition, proved in Component Manager before
Admin Station integration. A parent composes only direct children; each child
owns its presentation, modes, state, interaction, behaviour, and any direct
children. Neither padding nor layout/presentation authority cascades through
ancestors.

Header directly composes BrandShell and NavigationShell. NavigationShell owns
ControlEdge and Controls; Controls owns Search, PrimaryNavigation, and exactly
one inline-end MainAction. PrimaryNavigation owns NavigationItem instances;
each NavigationItem owns its Icon/Label. BrandShell owns the Logo and Home
action slots. Header must not reach into any of those child internals.

## Token-only Header presentation contract

Header is `block-size: var(--wex-space-64)` at every viewport. BrandShell is
`var(--wex-space-64)` square; NavigationShell is `minmax(0, 1fr)`. Every layout
participant has `min-width: 0`.

The only Header gutters are outer-wrapper `padding-inline:
var(--wex-space-16)` at Large/Medium and `var(--wex-space-8)` at Compact
(`<=767px`), followed by exactly one immediate inner-container
`padding-inline: var(--wex-space-8)`. The effective inset is 24px/16px. No
deeper Header child gains automatic gutter padding or margin-based separation.

The smallest authorised Header surface is
`background: var(--wex-color-background-primary)` and
`color: var(--wex-color-text-primary)`. ADR 0004 requires a composition to
begin on Background Primary; its direct child-surface alternation is explicit,
not inferred from nesting. Header therefore assigns no background to Brand,
Navigation, Location, Utility, or child controls. Header adds no border,
radius, shadow, or shell interaction state: no Header-specific authority
selects one, and shadows have no WEX authority. Light/dark theme inversion is
provided by the semantic tokens. Focus and native interaction states remain
with focusable children.

Header itself owns no typography. LocationLabel, Search, PrimaryNavigation, and
MainAction consume their own accepted WEX type/component rules. This preserves
the owner-approved >=768px LocationLabel versus <=767px SidebarTrigger
slot-selection swap without giving Header either child presentation or state.
The inactive alternative is not rendered or exposed to assistive technology.

## Direct-slot assembly API

The future serializable Header assembly contains only:

```text
brand: { logo, homeAction }
navigation: { location, sidebarTrigger, search, primaryNavigation, mainAction }
```

The Header selects `location` or `sidebarTrigger` by the accepted WEX Compact
threshold. It receives opaque, approved child definitions/semantic intents; it
does not receive functions, routes, CSS, raw values, sidebar state, Search
data/results, navigation-item internals, or child modes. `mainAction` is one
required placement slot, not Header action semantics. Search `full`/`icon-only`
and PrimaryNavigation `fixed`/`scrollable` remain child capabilities.

## Authority result and implementation boundary

The existing recursive layout/composition rules already establish this direct-
child ownership model; no ADR or architecture-document change is required.
Existing Button/SemanticAction authority applies only if a child action has an
accepted record owner. Brand, SidebarTrigger, and MainAction action execution
remain outside Header until their responsible component/action contract is
separately authorised.

The smallest future Component Manager proof is a Header shell with controlled,
non-interactive child-slot fixtures only. It must check 64px geometry, both
theme tokens, 24px/16px two-level insets, Navigation remainder, and the
Location/Sidebar swap at the existing 767px boundary. Slot fixtures must not
masquerade as Logo, Search, navigation, toggle, or Button implementations; no
native actions, state, scrolling, or schema are introduced. Admin Station stays
out of scope.

No source, schema, fixture, mount, topic branch, or integration was created.

## Evidence

Rechecked verified `main`: [Layout](../docs/code-map/layout.md),
[authority model](../docs/architecture/authority-model.md),
[composition architecture](../docs/architecture/composition-architecture.md),
[core colour ADR](../docs/decisions/0004-core-colour-tokens.md),
[SemanticAction](../packages/schemas/src/actions/semantic-action.schema.ts),
and [ADR 0008](../docs/decisions/0008-button-runtime-invocation-authority.md).
