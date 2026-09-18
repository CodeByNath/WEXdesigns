# Colour

## Verification

- Created: 2026-09-19
- Last verified: 2026-09-19
- Verified against: `origin/main` at `b701a9d497442cf714c7ecbd39ee8660635d6f11`

## Purpose and scope

This map navigates the demonstrated WEX colour system: its historical authority, accepted extensions, theme-aware semantic layer, package entrypoint, and focused verification. It does not reproduce palette or token values.

## Governing authority

- [Authority model](../architecture/authority-model.md)
- [Repository map](../architecture/repository-map.md)
- [Historical WEX source](../../packages/wex/src/source/WEX-SOURCE.md)
- [ADR 0002: Inversion-ready Colour System](../decisions/0002-inversion-ready-colour-system.md)
- [ADR 0004: Core Colour Tokens](../decisions/0004-core-colour-tokens.md)

## Source and focused verification

- Colour foundation: [`packages/wex/src/foundations/colour.css`](../../packages/wex/src/foundations/colour.css)
- WEX bundle entrypoint: [`packages/wex/src/index.css`](../../packages/wex/src/index.css)
- Focused colour checks: [`packages/wex/test/colour-tokens.test.mjs`](../../packages/wex/test/colour-tokens.test.mjs)
- Authority, dependency, and CSS-structure audit: [`tooling/scripts/validate-foundation.mjs`](../../tooling/scripts/validate-foundation.mjs)

## Dependency path and boundary

```text
historical WEX authority + accepted colour ADRs
  -> @weerax/wex colour foundation
  -> shared UI and consuming applications
```

WEX is the presentation authority and has no internal package dependency. Consumers use semantic WEX roles through the package bundle; they do not define competing palettes or make WEX depend on application code.

## Safe change routing

- Confirm whether the change is already governed by historical WEX authority or an accepted colour ADR.
- Resolve an authority gap through an ADR before changing primitives, semantic roles, theme relationships, or compatibility aliases.
- Change the WEX foundation and focused checks together, then run the repository foundation audit.
- Keep component-specific colour decisions with the relevant component authority rather than widening this foundation map.

## Related documents

- [Code Map entrypoint](README.md)
- [Foundation entrypoint](../foundation/README.md)
- [Interaction and focus map](interaction-focus.md)
