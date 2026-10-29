# 0027: WEX Tab Navigation Global Tokens

## Status

Accepted — Owner-directed on 2026-10-26; Small Horizontal and Small Dropdown modes approved by the Owner on 2026-10-29.

## Decision

Global Tokens registers the WEX Tab Navigation component-token family. Its
base is named **WEX Tab Navigation Default**. It has the matching **WEX Tab
Navigation Small** and **WEX Tab Navigation Large** tiers.

Each tier references existing WEX Navigation typography and icon foundations:

| Tier | Typography | Icon |
| --- | --- | --- |
| Small | Navigation Small | `--wex-icon-size-16` |
| Default | Navigation Default | `--wex-icon-size-20` |
| Large | Navigation Large | `--wex-icon-size-24` |

Default defines the verified sidebar-navigation geometry: target allocation,
gap, padding, border, radius, child indent, and chevron allocation. Small
uses a 40px target with no block padding so its Owner-authorised 38px square
icon allocation fits inside the border box. Its remaining geometry inherits
from Default. The root-tab start rule is part of that geometry: a root tab
begins on its wrapper's layout line and does not add a second leading inset. A
square icon allocation centres its glyph with equal padding on every side,
regardless of glyph size; Small's SVG glyph token remains independent.
Each tier exposes Default, Hover, Selected, and Focus state tokens. Unreleased
Pressed interaction is supplied by the existing WEX Button Neutral pressed
foundation: background and foreground use its established pressed values while
the shared outer-ring foundation supplies focus treatment. Tab Navigation does
not define a parallel pressed visual token. Shared state values are inherited
through token aliases, so a change to the Default state remains system-wide
until a tier requires an authorised override. Every value references an
existing WEX foundation; this decision introduces no resolved colour, spacing,
geometry, typography, or motion value.

Small has two registered presentation modes. **Small Horizontal** retains the
complete Small tier for horizontally arranged filters. **Small Dropdown**
retains Small state, type, target and spacing references while using the
existing WEX default radius reference established by dropdown option surfaces.
Both modes expose the same complete Tab Navigation state contract and inherit
the WEX Button Neutral pressed interaction; they do not create a Button
variant, interaction mechanic, or raw visual value.

## Boundaries

This registers a presentation token family only. It does not register a Global
Component, define a Shared UI schema, create browser interaction mechanics, or
change product navigation meaning. The current Admin Station Sidebar consumes
the tokens as an application-level reference implementation; it is not the
WEX Tab Navigation component.

A future shared component must consume this family rather than recreate its
visual states. A local class may add a true local variation but must not
redefine this family’s base, tier, state, child, or chevron tokens.

## Evidence

- Canonical tokens: `packages/wex/src/foundations/tab-navigation.css`
- Global Tokens catalogue: `apps/web-runtime/global-tokens/index.html`
- Existing navigation typography and icon foundations:
  `packages/wex/src/foundations/typography/navigation-body.css`
- Existing colour, interaction, and geometry foundations:
  `packages/wex/src/foundations/colour.css`,
  `packages/wex/src/foundations/interaction.css`, and
  `packages/wex/src/foundations/geometry.css`
