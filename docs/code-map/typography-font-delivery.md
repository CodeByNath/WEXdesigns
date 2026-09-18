# Typography and Font Delivery

## Verification

- Created: 2026-09-19
- Last verified: 2026-09-19
- Verified against: `origin/main` at `b701a9d497442cf714c7ecbd39ee8660635d6f11`

## Purpose and scope

This map navigates the demonstrated WEX typography system and the package-owned delivery of its registered font. It links to the type authority, CSS implementation, font dependency, and current verification without restating the type scale or font-file list.

## Governing authority

- [Authority model](../architecture/authority-model.md)
- [Repository map](../architecture/repository-map.md)
- [Historical WEX source](../../packages/wex/src/source/WEX-SOURCE.md)
- [ADR 0003: Self-host IBM Plex Sans](../decisions/0003-self-host-ibm-plex-sans.md)

## Source and focused verification

- Typography implementation: [`packages/wex/src/foundations/typography.css`](../../packages/wex/src/foundations/typography.css)
- Font delivery imports: [`packages/wex/src/foundations/font-family.css`](../../packages/wex/src/foundations/font-family.css)
- Package dependency and scripts: [`packages/wex/package.json`](../../packages/wex/package.json)
- WEX bundle entrypoint: [`packages/wex/src/index.css`](../../packages/wex/src/index.css)
- Package boundary, authority-hash, and CSS-structure audit: [`tooling/scripts/validate-foundation.mjs`](../../tooling/scripts/validate-foundation.mjs)

There is no dedicated typography semantic test on the verified ref; the current automated evidence is the repository audit plus consuming-package checks of the canonical WEX bundle.

## Dependency path and boundary

```text
historical typography authority + font-delivery ADR
  -> @weerax/wex typography and font CSS
  -> shared UI and consuming applications
```

The font package is an external dependency of `@weerax/wex`. Applications import WEX rather than selecting or delivering a parallel font configuration.

## Safe change routing

- Route type-scale, set, tier, weight, or style changes through WEX authority before editing typography CSS.
- Route font-source or delivery changes through an accepted decision and the WEX package manifest.
- Update imports, manifest evidence, and affected verification together; do not move typography ownership into an application.

## Related documents

- [Code Map entrypoint](README.md)
- [Foundation entrypoint](../foundation/README.md)
- [Sizing and tier system map](sizing-tier-system.md)
