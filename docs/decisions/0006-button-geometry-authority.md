# 0006: Button Geometry Authority

## Status

Proposed — authority resolution only; implementation requires separate Reviewer authorisation.

## Context and authority gap

### Authority inspected

- The [historical Button Foundation](../../packages/wex/src/source/WEX-SOURCE.md) establishes the three Button tiers and their Navigation typography: Small `14px / 20px / 600`, Default `16px / 24px / 600`, and Large `20px / 28px / 600`.
- The same historical source establishes global tier inheritance but says each component defines what its own measurements mean; it gives no Button padding, outer-size, border, or radius value.
- The verified [spacing](../../packages/wex/src/foundations/spacing.css), [sizing](../../packages/wex/src/foundations/sizing.css), [typography](../../packages/wex/src/foundations/typography.css), and [interaction](../../packages/wex/src/foundations/interaction.css) foundations provide the current scale, Navigation tokens, and `--wex-focus-width: 2px`. Sizing deliberately introduces no local numeric tier values; no current WEX foundation registers a border-width, radius, or outline-offset token.
- [ADR 0004](./0004-core-colour-tokens.md) keeps disabled presentation as an outer-control responsibility, and [ADR 0005](./0005-button-authority.md) resolves Button colour/state only, requires the independent two-pixel focus layer, and explicitly leaves geometry unresolved. The verified [Button foundation](../../packages/wex/src/foundations/buttons.css) records that same unresolved boundary.

The existing spacing scale is `2, 4, 8, 12, 16, 24, 32, 40, 48, 64px`.

No accepted authority currently sets Button minimum block sizes, tier padding, border width, radius, or focus offset. This proposal resolves that component-level gap using existing WEX tokens; it creates no primitive, fourth tier, or variant-specific geometry.

The preserved recovery branch is not authority. Its tier typography (`12/16`, `14/20`, `16/24`) conflicts with the historical Button mapping and is not adopted.

## Proposed Button geometry contract

All five ordinary Button variants use identical geometry at a given tier. Variants differ only through the semantic colour/state tokens already accepted in ADR 0005.

| Tier | Minimum block size | Block padding | Inline padding | Typography |
| --- | --- | --- | --- | --- |
| Small | `--wex-space-32` (32px) | `--wex-space-4` (4px) | `--wex-space-12` (12px) | Navigation Small Semibold: `14px / 20px / 600` |
| Default | `--wex-space-40` (40px) | `--wex-space-4` (4px) | `--wex-space-16` (16px) | Navigation Default Semibold: `16px / 24px / 600` |
| Large | `--wex-space-48` (48px) | `--wex-space-8` (8px) | `--wex-space-24` (24px) | Navigation Large Semibold: `20px / 28px / 600` |

Minimum block size applies to the total outer Button box, including the border. The line-height and padding provide the label rhythm; the minimum preserves the tiered control target when that intrinsic height is smaller. No tier has an independent width, and Button labels remain content-sized.

The Button has a `1px` solid border in every variant and state, including visually borderless treatments where the colour token resolves to transparent. This keeps the box stable across variants and states. Radius is `0`; WEX has no accepted radius primitive, and a non-zero Button corner treatment would require a future authority decision rather than an invented local value.

## Focus and interaction geometry

Focus remains the independent WEX `2px` outline already required by ADR 0005 and supplied as `--wex-focus-width`. The proposed focus offset is `--wex-space-2` (2px), so the accessibility outline stays visually distinct from the stable border without creating a new measurement. Native disabled Buttons remain excluded from hover, pressed, and focus presentation as ADR 0005 requires.

## Boundaries

This proposal authorises no CSS, schema, shared UI, runtime, catalogue, Pages, icon, action, toggle, link, dropdown, group, adapter, or domain change. It does not modify historical `WEX-SOURCE.md`. A subsequent implementation slice must consume the existing spacing, typography, interaction, and Button semantic colour tokens exactly as resolved here and must add focused geometry verification before it can proceed.
