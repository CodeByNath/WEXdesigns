# Typography and Font Delivery

## Current operating status

- Last visited: 2026-09-25
- Last updated: 2026-09-25
- Verified against: `origin/main` at `daf45d1d2138115db766d1011013817647ff24c7`

### Recent work (newest first)

- `d99b1d5` (2026-09-25) preserved the Typography module boundaries, now included in the verified main baseline.
- `1dc0019` (2026-09-25) split Typography into ordered, semantics-preserving modules.
- `2e0ac6e` (2026-09-25) restored the pre-tab typography presentation.
- `72de172` (2026-09-24) kept runtime panels tier-pure.
- `3ce30a2` (2026-09-24) organised runtime typography by WEX tier.

## Purpose and scope

This map navigates the demonstrated WEX typography system and the package-owned delivery of its registered font. It links to the type authority, CSS implementation, font dependency, and current verification without restating the type scale or font-file list.

## Governing authority

- [Authority model](../architecture/authority-model.md)
- [Repository map](../architecture/repository-map.md)
- [Historical WEX source](../../packages/wex/src/source/WEX-SOURCE.md)
- [ADR 0003: Self-host IBM Plex Sans](../decisions/0003-self-host-ibm-plex-sans.md)

## Source and focused verification

- Canonical Typography entrypoint: [`packages/wex/src/foundations/typography.css`](../../packages/wex/src/foundations/typography.css)
- Ordered Typography modules: [`core.css`](../../packages/wex/src/foundations/typography/core.css), [`heading.css`](../../packages/wex/src/foundations/typography/heading.css), [`title.css`](../../packages/wex/src/foundations/typography/title.css), and [`navigation-body.css`](../../packages/wex/src/foundations/typography/navigation-body.css)
- Font delivery imports: [`packages/wex/src/foundations/font-family.css`](../../packages/wex/src/foundations/font-family.css)
- Package dependency and scripts: [`packages/wex/package.json`](../../packages/wex/package.json)
- WEX bundle entrypoint: [`packages/wex/src/index.css`](../../packages/wex/src/index.css)
- Typography module structure/line-limit check: [`packages/wex/test/typography-modules.test.mjs`](../../packages/wex/test/typography-modules.test.mjs)
- Package boundary, authority-hash, and CSS-structure audit: [`tooling/scripts/validate-foundation.mjs`](../../tooling/scripts/validate-foundation.mjs)

The module test preserves the original core → Heading → Title → Navigation/Body
import order and the 600-line module limit. Repository and consuming-package
checks verify the assembled canonical WEX bundle.

## Dependency path and boundary

```text
historical typography authority + font-delivery ADR
  -> typography.css canonical ordered imports
  -> Typography modules + @weerax/wex font CSS
  -> shared UI and consuming applications
```

The font package is an external dependency of `@weerax/wex`. Applications import WEX rather than selecting or delivering a parallel font configuration.

## Safe change routing

- Route type-scale, set, tier, weight, or style changes through WEX authority before editing typography CSS.
- Route font-source or delivery changes through an accepted decision and the WEX package manifest.
- Update imports, manifest evidence, and affected verification together; do not move typography ownership into an application.

## Modularisation verification

`typography.css` is now the four-line canonical importer. Its four modules are
the original stylesheet's contiguous sections in core → Heading → Title →
reset/Navigation/Body/icon-alias order. Their declarations and selectors retain
the pre-split order; only the three section-ending blank delimiters were removed
to satisfy whitespace checks. The module test locks the order and line limit.
The canonical `index.css` entrypoint, selectors,
declarations, registered values, tiers, and font delivery remain unchanged.

Typography presentation is accepted on this verified main baseline. Future
changes must continue to route typography values through WEX authority rather
than moving them into the runtime.

The historical WEX authority is hash-bound evidence; use its existing headings
and this map to identify the relevant section instead of editing it as a
shortcut for the CSS migration.

## Related documents

- [Code Map entrypoint](README.md)
- [Foundation entrypoint](../foundation/README.md)
- [Sizing and tier system map](sizing-tier-system.md)
