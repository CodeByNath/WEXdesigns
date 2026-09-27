# Global Tokens / Typography DNA

## Current operating status

- Last visited: 2026-09-27
- Last updated: 2026-09-27
- Verified against: Phase 4 Builder candidate on
  `feat/global-tokens-remaining`, based on `origin/main` at
  `21983ed56c442f41c4496e1677bdf6fa8c46189f`
- Registration status: Global Tokens augment the canonical WEX Typography
  vocabulary; no page-specific role is registered.

### Recent work (newest first)

- Phase 4 presents every existing Typography role with its Default base atom
  first, followed only by its sparse role-valid attributes.
- Phase 3C makes registered Heading Default attributes the primary Global
  Tokens showcase; Typography retains tier presentation authority.
- Phase 2 supersedes Page Heading DNA with Typography-aligned Global Tokens.
- Phase 1B presented the previous registered role on the existing runtime route.

## Purpose and scope

This map routes the demonstrated Global Tokens subject to its accepted authority,
existing Typography evidence, and focused verification. It does not define HTML
semantics, component behaviour, or layout composition.

## Governing authority and evidence routes

- [Authority model](../architecture/authority-model.md)
- [Repository map](../architecture/repository-map.md)
- [Historical WEX source](../../packages/wex/src/source/WEX-SOURCE.md)
- [Global Tokens / Typography DNA](../decisions/0012-global-tokens-typography-dna.md)
- [Typography and font delivery map](typography-font-delivery.md)
- [Colour map](colour.md)
- [Spacing map](spacing.md)
- [Layout map](layout.md)
- [Actions and interaction map](interaction-focus.md)

The linked subject maps are evidence routes to their own governing authority.
They do not supply or approve Global Tokens values.

## Current source and focused verification

- Typography entrypoint and role evidence:
  [`packages/wex/src/foundations/typography.css`](../../packages/wex/src/foundations/typography.css)
  and [`heading.css`](../../packages/wex/src/foundations/typography/heading.css)
- Related current foundations: [`colour.css`](../../packages/wex/src/foundations/colour.css),
  [`spacing.css`](../../packages/wex/src/foundations/spacing.css),
  [`layout.css`](../../packages/wex/src/foundations/layout.css), and
  [`interaction.css`](../../packages/wex/src/foundations/interaction.css)
- Current focused checks: [`global-tokens.test.mjs`](../../packages/wex/test/global-tokens.test.mjs),
  [`typography-modules.test.mjs`](../../packages/wex/test/typography-modules.test.mjs),
  [`colour-tokens.test.mjs`](../../packages/wex/test/colour-tokens.test.mjs), and
  [`validate-foundation.mjs`](../../tooling/scripts/validate-foundation.mjs)
- Runtime presentation and route check:
  [`apps/web-runtime/global-tokens/index.html`](../../apps/web-runtime/global-tokens/index.html)
  and [`catalogue.test.mjs`](../../apps/web-runtime/test/catalogue.test.mjs)

## Dependency boundary

```text
existing WEX Typography and Colour foundations
  -> accepted Global Tokens / Typography DNA authority decision
  -> existing Typography selection + optional registered attributes
  -> components and consuming applications
```

Components collect registered Global Tokens; they do not establish a competing
Typography role. AI may use registered WEX Design Tokens only. If no existing
Typography selection or registered attribute matches a request, it must request
an Owner decision; it must not invent, approximate, substitute, or create a
value, token, or attribute.

The accepted decision binds every concern to existing WEX foundation token
references. It records approved relationships, never resolved raw values or
aliases; Attributes remain sparse token-reference overrides. If the needed
foundation token or reference mechanism does not exist, route that concern to
an architecture decision rather than hardcoding it.

## Registration boundary

The accepted decision covers the existing `Heading`, `Title`, `Navigation`, and
`Body` roles at their existing tiers. Every role's Default selection is its
Design Token base; role-valid Size / Large and Size / Small relationships refer
only to the same role's existing classes/tokens. Typography retains every
resolved tier value and class. The decision creates no new roles, versioning,
loading/shimmer behaviour, or unproved presentation input.

## Safe change routing

- Preserve the existing Typography role, tier, values, canonical classes, and
  tier-pairing rule. Each role's Size attributes may reference only its own
  existing Large or Small selection and change size/rhythm alone.
- Do not introduce raw values, CSS custom properties, schemas, APIs, margins,
  or layout rules in order to consume Global Tokens.
- When no existing Typography selection or registered attribute matches a
  request, request an Owner decision; never invent or approximate a value.
- Refresh this map with governing authority, source paths, and focused
  verification when authorised Global Tokens work changes them.

## Related documents

- [Code Map entrypoint](README.md)
- [Foundation entrypoint](../foundation/README.md)
