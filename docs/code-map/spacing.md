# Spacing

## Current operating status

- Last visited: 2026-09-25
- Last updated: 2026-09-25
- Verified against: `origin/main` at `daf45d1d2138115db766d1011013817647ff24c7`

### Recent work (newest first)

- `3d8bc52` (2026-09-25) added the verified Layout route, which consumes the spacing foundation.
- `5e13a35` (2026-09-20) placed Button states on the registered perimeter while retaining Button's WEX foundation consumption.

## Purpose and scope

This map navigates the demonstrated WEX spacing authority and its consumption by layout, components, and applications. Padding and gap are uses of the spacing system, not separate token authorities.

## Governing authority

- [Authority model](../architecture/authority-model.md)
- [Historical WEX source](../../packages/wex/src/source/WEX-SOURCE.md)
- [Dependency rules](../architecture/dependency-rules.md)
- [ADR 0006: Button Geometry Authority](../decisions/0006-button-geometry-authority.md) for Button-local consumption only

## Source and focused verification

- Spacing foundation: [`packages/wex/src/foundations/spacing.css`](../../packages/wex/src/foundations/spacing.css)
- WEX bundle entrypoint: [`packages/wex/src/index.css`](../../packages/wex/src/index.css)
- Demonstrated WEX consumers: [`packages/wex/src/foundations/layout.css`](../../packages/wex/src/foundations/layout.css), [`packages/wex/src/foundations/buttons.css`](../../packages/wex/src/foundations/buttons.css)
- Focused Button consumption check: [`packages/wex/test/button-foundation.test.mjs`](../../packages/wex/test/button-foundation.test.mjs)
- Authority and CSS-structure audit: [`tooling/scripts/validate-foundation.mjs`](../../tooling/scripts/validate-foundation.mjs)

## Dependency path and boundary

```text
historical WEX spacing authority
  -> @weerax/wex spacing foundation
  -> WEX layout/components
  -> shared UI and consuming applications
```

Spacing values remain WEX presentation authority. A component or application may consume registered spacing but must not establish a parallel global scale through local padding or gap choices.

## Safe change routing

- Treat a global spacing-scale change as WEX authority work and update affected consumers and verification together.
- Route component-local spacing semantics through that component's accepted authority while continuing to consume the WEX scale.
- Do not create independent padding, gap, margin, or geometry authorities merely because those properties consume spacing.

## Related documents

- [Code Map entrypoint](README.md)
- [Foundation entrypoint](../foundation/README.md)
- [Layout map](layout.md)
