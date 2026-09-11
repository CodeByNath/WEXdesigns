# 0003: Self-host IBM Plex Sans

## Status

Accepted

## Decision

Deliver IBM Plex Sans through the `@weerax/wex` package using the self-hosted `@fontsource/ibm-plex-sans` package, pinned to version `5.3.0`.

Load only the weights registered by WEX:

```text
Light     300
Regular   400
Semibold  600
```

Normal and italic files are loaded for each registered weight. The existing `--wex-type-family-sans` token and its fallback stack remain unchanged.

## Boundary

Font delivery belongs to the WEX presentation package. Applications import `@weerax/wex`; they must not independently select, download, or configure another copy of IBM Plex Sans.

This decision fills the font-delivery gap only. It does not change the WEX type scale, weights, styles, type sets, tiers, or component scope.
