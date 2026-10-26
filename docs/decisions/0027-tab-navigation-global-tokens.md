# 0027: WEX Tab Navigation Global Tokens

## Status

Accepted — Owner-directed on 2026-10-26.

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

Each tier owns token references for target allocation and a square icon
allocation. The square allocation centres its glyph with equal padding on every
side, regardless of glyph size. Each tier also owns icon/label gap, padding,
border, radius, child indent, and chevron allocation.
The Owner-authorised Small icon allocation is 38px square; its SVG glyph token
remains independent.
Each tier also exposes Default, Hover, Selected, Focus, and Pressed state
tokens. Shared state values are inherited through token aliases, so a change
to the Default state remains system-wide until a tier requires an authorised
override. Every value references an existing WEX foundation; this decision
introduces no resolved colour, spacing, geometry, typography, or motion value.

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
