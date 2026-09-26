# Heading DNA

## Current operating status

- Last visited: 2026-09-26
- Last updated: 2026-09-26
- Verified against: `origin/main` at `bf5f1fd9aebc7b05da75a0d521dcb9a83c3a0a8e`
- Registration status: no Heading DNA roles or values are registered by this map.

### Recent work (newest first)

- Phase 1 establishes navigation and unresolved Owner gates only. It does not
  author Heading DNA values, CSS, schemas, components, or runtime presentation.

## Purpose and scope

This map routes the demonstrated Heading DNA subject to existing WEX evidence
and the Owner decisions required before a DNA definition can be authorised. It
does not define heading roles, values, HTML semantics, component behaviour, or
layout composition.

## Governing authority and evidence routes

- [Authority model](../architecture/authority-model.md)
- [Repository map](../architecture/repository-map.md)
- [Historical WEX source](../../packages/wex/src/source/WEX-SOURCE.md)
- [Typography and font delivery map](typography-font-delivery.md)
- [Colour map](colour.md)
- [Spacing map](spacing.md)
- [Layout map](layout.md)
- [Actions and interaction map](interaction-focus.md)

The linked subject maps are evidence routes to their own governing authority.
They do not supply or approve Heading DNA values.

## Current source and focused verification

- Typography entrypoint and heading evidence:
  [`packages/wex/src/foundations/typography.css`](../../packages/wex/src/foundations/typography.css)
  and [`heading.css`](../../packages/wex/src/foundations/typography/heading.css)
- Related current foundations: [`colour.css`](../../packages/wex/src/foundations/colour.css),
  [`spacing.css`](../../packages/wex/src/foundations/spacing.css),
  [`layout.css`](../../packages/wex/src/foundations/layout.css), and
  [`interaction.css`](../../packages/wex/src/foundations/interaction.css)
- Current focused checks: [`typography-modules.test.mjs`](../../packages/wex/test/typography-modules.test.mjs),
  [`colour-tokens.test.mjs`](../../packages/wex/test/colour-tokens.test.mjs), and
  [`validate-foundation.mjs`](../../tooling/scripts/validate-foundation.mjs)

## Dependency boundary

```text
existing WEX authority and registered foundations
  -> Owner decision and authorised Heading DNA definition (future work)
  -> WEX Design Tokens
  -> components and consuming applications
```

Components collect registered Design Tokens; they do not establish Heading DNA.
AI may use registered WEX Design Tokens only. If no registered DNA matches a
requested role, it must not invent, approximate, substitute, or create one.

## Unresolved Owner gates

The following questions remain open and must be answered before Heading DNA
values or contracts are authored:

1. Is the initial registered heading family exactly `Page Heading`, `Page
   Subheading`, `Layout Heading`, and `Section Heading`?
2. Are `Subsection Heading` and `Group Heading` deferred until a demonstrated
   need exists?
3. Which v1 foundation inputs may a Heading DNA token carry: typography,
   colour, responsive, theme/inversion, spacing relationship, or
   interaction/state mapping?
4. Which inputs are mandatory for every Heading DNA token, and which are
   optional only when demonstrated?
5. Must Heading DNA names remain semantic-only and avoid visual-size names?
6. What exact escalation wording must agents use when no registered DNA
   matches the requested role?
7. Is a v1 version/deprecation rule required for DNA changes, or deferred?

## Safe change routing

- Keep Heading DNA semantic and separate from component logic and HTML heading
  ownership.
- Do not introduce raw values, CSS custom properties, schemas, APIs, runtime
  rendering, margins, or layout rules until an Owner decision and an authorised
  follow-up phase establish them.
- When no registered DNA matches a request, escalate it to the Owner or an
  authorised AI/WEX engineer; the exact agent wording remains an Owner gate.
- Refresh this map with the governing authority, source paths, and focused
  verification when an authorised Heading DNA change is made.

## Related documents

- [Code Map entrypoint](README.md)
- [Foundation entrypoint](../foundation/README.md)
