# 0029: WEX Search Input Global Tokens

## Status

Accepted — Owner-authorised direct UI release, 2026-10-29.

## Decision

Global Tokens registers WEX Search Input Default and Small. Default preserves
the existing Admin Header search-field presentation as a reusable WEX class:
.wex-search-input. Small is the paired compact tier:
.wex-search-input--small.

The family references the existing WEX icon, spacing, border, radius, colour,
and interaction foundations for its icon allocation, target size, gap,
padding, border, layer, foreground, and focus treatment. It creates no new
resolved visual value, tier, state, data contract, or runtime behaviour.

The Header retains its Default inline allocation and visibility rule. Services
uses Small, pairing its existing small Button target and icon allocations with
Body Small Regular typography. A consuming surface chooses its own layout allocation and
must use the appropriate WEX Search Input tier rather than recreating the field
presentation.

## Boundaries

This registers presentation tokens only. It does not register a Global
Component, change Header ownership, define search semantics, fetch data, or
change search-result behaviour. The Header and Services surfaces remain
application consumers; their placeholder, accessible label, filtering, and
search actions stay local.

## Evidence

- Canonical tokens and class:
  packages/wex/src/foundations/search-input.css
- WEX entrypoint and focused proof:
  packages/wex/src/index.css,
  packages/wex/test/search-input-foundation.test.mjs
- Existing Header allocation consumer:
  packages/wex/src/foundations/header.css,
  apps/web-runtime/src/admin-station-nav-actions.js
- Services consumer:
  apps/web-runtime/src/admin-station-services.js
