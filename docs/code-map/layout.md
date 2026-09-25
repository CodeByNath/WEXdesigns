# Layout

## Verification

- Created: 2026-09-19
- Last verified: 2026-09-25
- Verified against: `feat/catalogue-pages-governance` Phase 5 candidate (exact tip recorded in the active work file)

## Purpose and scope

This map navigates the demonstrated WEX page-frame, grid, recursive allocation, and responsive presentation foundation. It does not reproduce layout values or authorize component- or product-specific composition.

## Governing authority

- [Authority model](../architecture/authority-model.md)
- [Repository map](../architecture/repository-map.md)
- [Historical WEX source](../../packages/wex/src/source/WEX-SOURCE.md)
- [ADR 0001: Live Design System Index](../decisions/0001-live-design-system-index.md) for the current application shell boundary

## Source and focused verification

- Layout foundation: [`packages/wex/src/foundations/layout.css`](../../packages/wex/src/foundations/layout.css)
- WEX bundle entrypoint: [`packages/wex/src/index.css`](../../packages/wex/src/index.css)
- Demonstrated application consumption: [`apps/web-runtime/layout/index.html`](../../apps/web-runtime/layout/index.html), [`apps/web-runtime/src/catalogue.css`](../../apps/web-runtime/src/catalogue.css)
- Shell/bundle checks: [`apps/web-runtime/test/catalogue.test.mjs`](../../apps/web-runtime/test/catalogue.test.mjs)
- Authority and CSS-structure audit: [`tooling/scripts/validate-foundation.mjs`](../../tooling/scripts/validate-foundation.mjs)

## Dependency path and boundary

```text
historical WEX layout authority
  -> @weerax/wex layout foundation
  -> shared structures and consuming application composition
```

WEX owns reusable layout and responsive presentation rules. Each parent owns direct-child allocation; applications assemble approved structures without making WEX depend on application markup or business concerns.

## Safe change routing

- Resolve global layout, grid, recursive allocation, or responsive-rule changes through WEX authority before editing CSS.
- Update the WEX foundation and affected shell/check evidence together.
- Keep product composition and domain-specific arrangements outside WEX; create shared structure only when the interaction structure is independently demonstrated and authorised.

## Related documents

- [Code Map entrypoint](README.md)
- [Foundation entrypoint](../foundation/README.md)
- [Spacing map](spacing.md)
