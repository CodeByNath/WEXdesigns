# Spacing

## Verification

- Created: 2026-09-19
- Last verified: 2026-09-19
- Verified against: `origin/main` at `b701a9d497442cf714c7ecbd39ee8660635d6f11`

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
