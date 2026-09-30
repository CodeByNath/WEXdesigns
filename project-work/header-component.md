# Header Component

Status: AWAITING REVIEWER REVIEW
Phase: 3 — Draft Header composition and component boundaries

## Accepted direction

Phase 1 is accepted with safeguards. Header is reusable Shared UI composition,
proved in Component Manager before Admin Station integration. It owns structure,
allocation, accessibility mechanics, and accepted WEX presentation—not routes,
state, permissions, persistence, callbacks, or future controls.

The root is a semantic `header`; application placement determines whether it is
the page banner. It is `block-size: var(--wex-space-64)` at every width. Its
outer wrapper has inline padding of `--wex-space-16` at Large/Medium and
`--wex-space-8` at Compact (`<=767px`); its sole immediate inner container has
`--wex-space-8` at every band. The resulting insets are 24px and 16px.
Padding stops there: no nested Header compartment inherits or repeats it, and
margins never recreate it. Every participant has `min-width: 0`.

## Header shell contract

The immediate inner container is a two-column allocation:

```text
HeaderShell
├── BrandShell: 64px × 64px (`--wex-space-64`)
│   ├── Logo slot
│   └── Home/Dashboard action slot
└── NavigationShell: minmax(0, 1fr)
    ├── ControlEdge
    │   ├── LocationLabel at >=768px
    │   └── SidebarTrigger at <=767px (replaces, not duplicates, Location)
    └── Controls
        ├── Search slot at inline-start
        ├── PrimaryNavigation slot in remaining control space
        └── exactly one MainAction slot at inline-end
```

The inactive Location/Sidebar alternative is not rendered or exposed to
assistive technology. Header places SidebarTrigger only; the Trigger component
owns accessible toggle state and must receive it from the sidebar integration.
Header gives MainAction no product meaning. Logo and LocationLabel own their
respective mark and text presentation. Header owns no local child widths, gaps,
typography, or control presentation beyond accepted geometry and gutters.

`HeaderDefinition` is a future serializable assembly contract, not new source:
`brand { logo, homeAction }`, `navigation { location, sidebarTrigger, search,
primaryNavigation, mainAction }`. It contains approved child definitions or
semantic intents only—never functions, routes, CSS, raw values, or sidebar
state. Child contracts own their own tiers and internal layout.

## Component dependency / authority map

| Child | Header boundary | Current authority |
| --- | --- | --- |
| Logo | fixed Brand slot | New Logo component/asset contract. |
| LocationLabel | supplied location; >=768px | New text contract; later presentation uses WEX Typography. |
| SidebarTrigger | <=767px placement | Button only if record-backed; icon/toggle mechanics need authority. |
| MainAction | one inline-end slot | Button only for an accepted record-backed ordinary action. |
| PrimaryNavigation | ordered; remaining space | New contract; `fixed`/`scrollable` are component modes. |
| Search | control-group inline-start | New contract; `full`/`icon-only` are component modes. |

Existing `ButtonDefinition`/`SemanticAction` can serialize an ordinary action
only (`id`, `label`, `command`, `recordId`, variant, tier, disabled). They do
not authorize Header, Logo, navigation, Search, icon-only, toggle, route, or
sidebar contracts. `@weerax/ui` remains platform-neutral; application browser
integration owns native invocation and handlers.

## Narrow remaining authority choices

**Surface:** choose either (A) a presentation-neutral Header, whose host owns
surface/border/separation, or (B) a Header-owned WEX surface contract that
explicitly selects semantic background, border, and any geometry tokens. The
existing Admin Station region cannot be silently reused as generic Header
authority.

**Actions:** choose either (A) designate an application-shell record owner and
runtime executor, allowing the existing `SemanticAction` for Brand,
SidebarTrigger, and qualifying MainAction, or (B) approve a bounded new
shell-intent schema/executor that does not misuse `recordId`. Option B requires
an action/schema decision; neither option permits callbacks in definitions.

No Header/child source, schema, fixture, Component Manager mount, topic branch,
or Admin Station integration was created.

## Evidence

Rechecked verified `main`: [Layout](../docs/code-map/layout.md),
[authority model](../docs/architecture/authority-model.md),
[Button schema](../packages/schemas/src/components/button.schema.ts),
[SemanticAction](../packages/schemas/src/actions/semantic-action.schema.ts),
[ADR 0007](../docs/decisions/0007-button-semantic-action-authority.md), and
[ADR 0008](../docs/decisions/0008-button-runtime-invocation-authority.md).
