# 0031: WEX Component Title Global Tokens

## Status

Accepted — Owner-authorised direct UI session, 2026-11-02.

## Decision

Global Tokens registers WEX Component Title Default for the heading of a
component or module. It is promoted from the Admin Station Overview heading,
which previously selected the Navigation Default Semibold Typography class.

The family references only existing WEX foundations: Navigation Default family,
size, line height and letter spacing; the Navigation Default primary weight; the
normal style; and `--wex-color-text-primary`. It creates no resolved value,
tier, state or attribute. Further tiers or modes are registered only when a
consumer needs them. The presentation class is `.wex-component-title`.

## Boundaries

This registers presentation tokens only. It does not define heading semantics,
a component, or an identifier convention. The consuming component keeps its
element level, text and accessible labelling. Overview is the first consumer and the Services Manager heading is the second.

## Evidence

- Canonical tokens and class: `packages/wex/src/foundations/component-title.css`
- Focused proof: `packages/wex/test/component-title-foundation.test.mjs`
- Global Tokens catalogue: `apps/web-runtime/global-tokens/index.html`
- Consumers: `apps/web-runtime/src/admin-station-overview.js`,
  `apps/web-runtime/src/admin-station-services.js`
