# Typography and Font Delivery

## Current operating status

- Last visited: 2026-09-25
- Last updated: 2026-09-25
- Verified against: `origin/main` at `2e0ac6e313d24b424dd1933f85eaf203f6f3eb04`

### Recent work (newest first)

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

## Required modularisation gate

`packages/wex/src/foundations/typography.css` is 1,558 lines and exceeds the
repository's absolute authored-file ceiling. Before Typography Pages work, a
separate authorised migration must split it without changing semantics: retain
the canonical `index.css` entrypoint, preserve selector names and cascade order,
and run the focused runtime/type checks plus the foundation audit against the
assembled bundle. Do not move typography values into the runtime while doing so.

The historical WEX authority is hash-bound evidence; use its existing headings
and this map to identify the relevant section instead of editing it as a
shortcut for the CSS migration.

## Related documents

- [Code Map entrypoint](README.md)
- [Foundation entrypoint](../foundation/README.md)
- [Sizing and tier system map](sizing-tier-system.md)
