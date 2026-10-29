# Global Tokens / Typography DNA

## Current operating status

- Last visited: 2026-10-26
- Last updated: 2026-10-26
- Verified against: Owner-directed WEX Search Input Global Tokens direct release
  worktree on main.
- Registration status: Typography roles remain registered as before. WEX Tab
  Navigation and WEX Search Input Default are registered component-token
  families; no Shared UI component is registered.

### Recent work (newest first)

- WEX Search Input Default promotes the existing Header search-field
  presentation into a reusable token-only class. Header keeps its own
  allocation; Services is its first additional consumer.
- WEX Tab Navigation Default, Small, and Large each register complete
  navigation presentation references for target allocation, icons, typography,
  state treatment, child alignment, and chevrons. The Admin Station Sidebar and
  Profile action list consume those tokens but remain application/runtime
  layouts.
- Phase 4 presents every existing Typography role with its Default base atom
  first, followed only by its sparse role-valid attributes.
- Phase 3C makes registered Heading Default attributes the primary Global
  Tokens showcase; Typography retains tier presentation authority.
- Phase 2 supersedes Page Heading DNA with Typography-aligned Global Tokens.
- Phase 1B presented the previous registered role on the existing runtime route.

## Purpose and scope

This map routes the demonstrated Global Tokens subject to its accepted authority,
existing Typography and component-token evidence, and focused verification. It
does not define HTML semantics, component behaviour, or layout composition.

## Governing authority and evidence routes

- [Authority model](../architecture/authority-model.md)
- [Repository map](../architecture/repository-map.md)
- [Historical WEX source](../../packages/wex/src/source/WEX-SOURCE.md)
- [Global Tokens / Typography DNA](../decisions/0012-global-tokens-typography-dna.md)
- [WEX Tab Navigation Global Tokens](../decisions/0027-tab-navigation-global-tokens.md)
- [WEX Search Input Global Tokens](../decisions/0029-wex-search-input-global-tokens.md)
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
- WEX Tab Navigation component tokens:
  [`tab-navigation.css`](../../packages/wex/src/foundations/tab-navigation.css)
- WEX Search Input component tokens:
  [`search-input.css`](../../packages/wex/src/foundations/search-input.css)
- Current focused checks: [`global-tokens.test.mjs`](../../packages/wex/test/global-tokens.test.mjs),
  [`search-input-foundation.test.mjs`](../../packages/wex/test/search-input-foundation.test.mjs),
  [`typography-modules.test.mjs`](../../packages/wex/test/typography-modules.test.mjs),
  [`colour-tokens.test.mjs`](../../packages/wex/test/colour-tokens.test.mjs), and
  [`validate-foundation.mjs`](../../tooling/scripts/validate-foundation.mjs)
- Runtime presentation and route check:
  [`apps/web-runtime/global-tokens/index.html`](../../apps/web-runtime/global-tokens/index.html)
  and [`catalogue.test.mjs`](../../apps/web-runtime/test/catalogue.test.mjs)

## Dependency boundary

```text
existing WEX foundations
  -> accepted Global Tokens authority decisions
  -> Typography selection + optional registered attributes
  -> WEX Tab Navigation and WEX Search Input component tokens
  -> components and consuming applications
```

Components collect registered Global Tokens; they do not establish a competing
Typography role or component-token family. AI may use registered WEX Design
Tokens only. If no existing selection or registered attribute matches a
request, it must request an Owner decision; it must not invent, approximate,
substitute, or create a value, token, or attribute.

The accepted decision binds every concern to existing WEX foundation token
references. It records approved relationships, never resolved raw values or
aliases; Attributes remain sparse token-reference overrides. If the needed
foundation token or reference mechanism does not exist, route that concern to
an architecture decision rather than hardcoding it.

## Registration boundary

ADR 0012 covers the existing Heading, Title, Navigation, and Body roles
at their existing tiers. ADR 0027 covers WEX Tab Navigation Default, Small,
and Large; ADR 0029 covers WEX Search Input Default. Each retains only
references to existing foundations. Neither decision creates component
mechanics, domain input, or product navigation behaviour.

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
