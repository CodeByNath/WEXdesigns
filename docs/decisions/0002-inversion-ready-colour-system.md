# 0002: Inversion-ready Colour System

## Status

Accepted

## Decision

Replace the broad Carbon-derived primitive palette with a compact WEX palette of six neutrals and four semantic colour families. Accent, Yellow, Green, and Red each provide Base, Dark, and Light variants.

Theme controls foreground/background inversion. `Dark` and `Light` variants remain semantic state, hierarchy, and emphasis options, never theme assignments.

The approved primitives are:

| Family | Base | Dark | Light |
| --- | --- | --- | --- |
| Accent | `#0F62FE` | `#0043CE` | `#78A9FF` |
| Yellow | `#F1C21B` | `#B28600` | `#FDDC69` |
| Green | `#24A148` | `#198038` | `#6FDC8C` |
| Red | `#DA1E28` | `#A2191F` | `#FA4D56` |

The neutral primitives are Black `#000000`, Dark `#161616`, Dark Grey `#393939`, White `#FFFFFF`, Light `#F4F4F4`, and Light Grey `#E0E0E0`.

## Usage

- Neutrals provide surfaces, text, borders, containers, and hierarchy.
- Accent provides primary brand and interactive colour.
- Yellow provides warning, attention, and highlight colour.
- Green provides success, positive-state, and confirmation colour.
- Red provides error, destructive-action, and critical-alert colour.
- Components consume semantic tokens, not primitive values.
- Each coloured surface uses its registered `on-*` foreground token.

Light and dark themes change neutral surface and foreground relationships. They do not redefine the Accent, Yellow, Green, or Red families.

## Compatibility

Existing semantic contracts such as `--wex-color-background`, `--wex-color-layer-01`, `--wex-color-text-primary`, and `--wex-color-interactive-primary` remain available. Retired numbered Gray and Blue primitives must not be used by consumers.

The historical `WEX-SOURCE.md` remains unchanged. This accepted decision is the authority for the colour extension implemented by the CSS foundations.
