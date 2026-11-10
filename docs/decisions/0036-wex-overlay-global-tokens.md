# 0036: WEX Overlay Global Tokens

## Status

Accepted — Owner-authorised direct UI session, 2026-11-10.

## Decision

Global Tokens registers WEX Overlay with one mode, Glass, for dimming the
surface behind an open Drawer. The Owner chose the strength in preview: a 35%
tint of the primary background token (`--wex-overlay-glass-tint`,
`--wex-overlay-glass-background`) and a blur of half the 2px spacing token
(`--wex-overlay-glass-blur`, 1px) with the large radius token
(`--wex-overlay-glass-radius`). Consumers use the complete mode and never
recreate the values locally.

## Boundaries

The Drawer consumes the tokens in `drawer-overlay.css`: a `::before` of the
Admin shell in the main grid area, so it covers only the Admin Body and not the
Header, the Sidebar or the Drawer (ADR 0028). The Admin Body itself is not
changed. The 35% tint is the one raw value; everything else references existing
WEX foundations.

## Evidence

- Canonical tokens: `packages/wex/src/foundations/overlay.css`
- Consumer: `packages/wex/src/foundations/drawer-overlay.css`
- Focused proof: `packages/wex/test/overlay-foundation.test.mjs`
