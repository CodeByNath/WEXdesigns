# Heading DNA

## Current operating status

- Last visited: 2026-09-27
- Last updated: 2026-09-27
- Verified against: `origin/main` at
  `d6aa97dec8b817bdf80eb930df68a512b0f6797a`
- Registration status: Page Heading DNA v1 is the accepted, registered Heading
  DNA role. No other Heading DNA role is registered.

### Recent work (newest first)

- Phase 1B presents registered Page Heading DNA on the existing runtime route
  using existing WEX classes and foundation roles only.
- Phase 1A corrects the accepted `Light` attribute reference to the existing,
  theme-independent `--wex-color-light` atom before any runtime presentation.
- Phase 3 maps the accepted Page Heading DNA v1 definition to existing WEX
  authority. It adds no CSS, schemas, components, or runtime presentation.

## Purpose and scope

This map routes the demonstrated Heading DNA subject to its accepted authority,
existing WEX evidence, and focused verification. It does not define HTML
semantics, component behaviour, or layout composition.

## Governing authority and evidence routes

- [Authority model](../architecture/authority-model.md)
- [Repository map](../architecture/repository-map.md)
- [Historical WEX source](../../packages/wex/src/source/WEX-SOURCE.md)
- [Page Heading DNA v1](../decisions/0012-page-heading-dna.md)
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
- Current focused checks: [`page-heading-dna.test.mjs`](../../packages/wex/test/page-heading-dna.test.mjs),
  [`typography-modules.test.mjs`](../../packages/wex/test/typography-modules.test.mjs),
  [`colour-tokens.test.mjs`](../../packages/wex/test/colour-tokens.test.mjs), and
  [`validate-foundation.mjs`](../../tooling/scripts/validate-foundation.mjs)
- Runtime presentation and route check:
  [`apps/web-runtime/design-tokens/index.html`](../../apps/web-runtime/design-tokens/index.html)
  and [`catalogue.test.mjs`](../../apps/web-runtime/test/catalogue.test.mjs)

## Dependency boundary

```text
existing WEX authority and registered foundations
  -> accepted Page Heading DNA authority decision
  -> WEX Design Tokens
  -> components and consuming applications
```

Components collect registered Design Tokens; they do not establish Heading DNA.
AI may use registered WEX Design Tokens only. If no registered DNA or attribute
matches a requested role, it must request an Owner decision or consult an
authorised AI/WEX engineer; it must not invent, approximate, substitute, or
create a value, token, or attribute.

The accepted DNA decision binds every DNA concern to existing WEX foundation
token references. DNA records their approved relationship, never resolved raw
values or aliases; Attributes remain sparse token-reference overrides. If the
needed foundation token or reference mechanism does not exist, route that
concern to an architecture decision rather than hardcoding it.

## Registration boundary

The accepted decision covers `Page Heading` only. All other heading roles,
version/deprecation machinery, loading/shimmer behaviour, and any unproved
presentation input remain absent. Their absence is not permission to improvise.

## Safe change routing

- Keep Heading DNA semantic and separate from component logic and HTML heading
  ownership.
- Do not introduce raw values, CSS custom properties, schemas, APIs, runtime
  rendering, margins, or layout rules in order to consume it.
- When no registered DNA or attribute matches a request, request an Owner
  decision or consult an authorised AI/WEX engineer; never invent,
  approximate, substitute, or create a value, token, or attribute.
- Refresh this map with the governing authority, source paths, and focused
  verification when an authorised Heading DNA change is made.

## Related documents

- [Code Map entrypoint](README.md)
- [Foundation entrypoint](../foundation/README.md)
