# 0011: Chromatic Tone Derivation

## Status

Proposed — authority only; implementation requires separate Reviewer authorisation.

## Decision

Accent, Warning, Success and Error each have one future-editable Base colour.
Dark and Light are deterministic derived tones, not separately authored brand
inputs. Main neutrals remain fixed and are outside this decision.

WEX derives chromatic tones in OKLCH using a calibrated per-family transform:

```text
Base OKLCH
├─ Dark  = Base + registered Dark ΔL / ΔC / Δh
└─ Light = Base + registered Light ΔL / ΔC / Δh
```

The calibration values are measured from the currently accepted WEX palette.
Applying them to the current Base colours reproduces every accepted Dark and
Light target exactly after sRGB conversion.

| Family | Dark ΔL / ΔC / Δh | Current Dark result | Light ΔL / ΔC / Δh | Current Light result |
| --- | --- | --- | --- | --- |
| Accent | -0.102514 / -0.021972 / +0.679303° | `#0043CE` | +0.179918 / -0.106948 / -0.870887° | `#78A9FF` |
| Warning | -0.187096 / -0.033383 / -5.190601° | `#B28600` | +0.068128 / -0.027175 / +2.997106° | `#FDDC69` |
| Success | -0.096229 / -0.025339 / +0.206128° | `#198038` | +0.186244 / -0.014432 / +2.352889° | `#6FDC8C` |
| Error | -0.109187 / -0.046645 / -0.361739° | `#A2191F` | +0.096967 / -0.008643 / -3.794904° | `#FA4D56` |

The transform is family-specific because the established WEX palette does not
follow one universal black/white-mix percentage. Hue and chroma movement are
part of the accepted visual character and therefore belong to each family's
registered tone recipe.

## Why this method

Simple sRGB mixing toward Black/White was evaluated and rejected as authority
because it materially drifts from accepted WEX colours, especially Success
Light and Error Light.

OKLCH is used as the derivation space because it separates perceptual
lightness, chroma and hue. The rule is deterministic and can be reproduced by
browser, server or admin validation code without depending on CSS as the source
of truth.

Future implementation may emit resolved CSS custom-property values or use
supported CSS colour features, but CSS syntax is delivery only. The registered
Base colour plus WEX tone recipe remains the authority.

## Gamut and accessibility safeguards

For a future edited Base colour:

1. convert Base to OKLCH;
2. apply the registered family Dark or Light deltas;
3. if the result is outside sRGB, gamut-map by reducing chroma while preserving
   target lightness and hue as far as possible;
4. resolve to the delivery colour;
5. validate every registered `on-*` foreground pairing against WCAG AA for
   normal text;
6. reject or require correction when no approved foreground candidate satisfies
   the contrast contract.

Current accepted target contrast evidence:

| Tone | Black contrast | White contrast |
| --- | ---: | ---: |
| Accent Dark | 2.69 | 7.79 |
| Accent Light | 8.92 | 2.35 |
| Warning Dark | 6.30 | 3.33 |
| Warning Light | 15.62 | 1.34 |
| Success Dark | 4.19 | 5.02 |
| Success Light | 12.29 | 1.71 |
| Error Dark | 2.70 | 7.79 |
| Error Light | 6.26 | 3.35 |

This decision does not change the currently registered `on-*` foregrounds or
semantic role mappings. A future implementation must validate generated values
rather than assuming the current pairing remains valid after a Base edit.

## Scope limits

This decision creates no editor, schema, persistence model, adapter, admin UI,
CSS implementation, semantic-role remap, or Main-neutral change.

The fixed Main neutral palette remains:

`Black / Dark / Dark Grey / White / Light / Light Grey`.

A later implementation phase may replace only chromatic Dark/Light primitive
delivery with values generated from each authoritative Base plus its registered
WEX tone recipe.
