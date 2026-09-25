# Colour

## Current operating status

- Last visited: 2026-09-25
- Last updated: 2026-09-25
- Verified against: `origin/main` at `daf45d1d2138115db766d1011013817647ff24c7`

### Recent work (newest first)

- `a2e81e0` (2026-09-22) refreshed this Colour Code Map after chromatic work.
- `04ae6d8` (2026-09-21) added deterministic chromatic tone derivation.

## Purpose and scope

This map navigates the demonstrated WEX colour system: its historical authority, accepted extensions, theme-aware semantic layer, package entrypoint, and focused verification. It does not reproduce palette or token values.

## Governing authority

- [Authority model](../architecture/authority-model.md)
- [Repository map](../architecture/repository-map.md)
- [Historical WEX source](../../packages/wex/src/source/WEX-SOURCE.md)
- [ADR 0002: Inversion-ready Colour System](../decisions/0002-inversion-ready-colour-system.md)
- [ADR 0004: Core Colour Tokens](../decisions/0004-core-colour-tokens.md)
- [ADR 0011: Chromatic Tone Derivation](../decisions/0011-chromatic-tone-derivation.md)

## Source and focused verification

- Colour foundation: [`packages/wex/src/foundations/colour.css`](../../packages/wex/src/foundations/colour.css)
- Chromatic derivation utility: [`packages/wex/src/foundations/chromatic-tone-derivation.mjs`](../../packages/wex/src/foundations/chromatic-tone-derivation.mjs)
- Generated chromatic delivery tokens: [`packages/wex/src/foundations/chromatic-tokens.generated.css`](../../packages/wex/src/foundations/chromatic-tokens.generated.css)
- Deterministic chromatic generator/check: [`packages/wex/scripts/generate-chromatic-tokens.mjs`](../../packages/wex/scripts/generate-chromatic-tokens.mjs)
- WEX bundle entrypoint: [`packages/wex/src/index.css`](../../packages/wex/src/index.css)
- Focused colour checks: [`packages/wex/test/colour-tokens.test.mjs`](../../packages/wex/test/colour-tokens.test.mjs)
- Authority, dependency, and CSS-structure audit: [`tooling/scripts/validate-foundation.mjs`](../../tooling/scripts/validate-foundation.mjs)

## Dependency path and boundary

```text
historical WEX authority + accepted colour ADRs
  -> authored chromatic Base values
  -> accepted chromatic derivation
  -> generated primitive delivery tokens
  -> @weerax/wex semantic colour foundation
  -> shared UI and consuming applications
```

For Accent, Warning, Success, and Error, the authored Base values feed the
accepted derivation and generated primitive delivery tokens before `colour.css`
maps them to semantic roles. WEX is the presentation authority and has no
internal package dependency. Consumers use semantic WEX roles through the
package bundle; they do not define competing palettes or make WEX depend on
application code.

## Safe change routing

- Confirm whether the change is already governed by historical WEX authority or an accepted colour ADR.
- Resolve an authority gap through an ADR before changing primitives, semantic roles, theme relationships, or compatibility aliases.
- Treat Accent, Warning, Success, and Error Base values as the authored chromatic inputs. Dark and Light are generated outputs and must not be independently authored.
- For a future Base change, run the deterministic generator/check and revalidate registered contrast contracts before accepting the result.
- Change the WEX foundation and focused checks together, then run the repository foundation audit.
- Keep component-specific colour decisions with the relevant component authority rather than widening this foundation map.

## Important operating guidance

Use this map before opening the historical Colour section or colour foundation.
For chromatic families, only Base is authored; generated tone tokens and the
registered contrast checks are part of the change boundary.

## Related documents

- [Code Map entrypoint](README.md)
- [Foundation entrypoint](../foundation/README.md)
- [Interaction and focus map](interaction-focus.md)
