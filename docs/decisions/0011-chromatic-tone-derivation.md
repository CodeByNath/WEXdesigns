# 0011: Chromatic Tone Derivation

## Status

Accepted — authority only; implementation requires separate Reviewer authorisation.

## Scope

This decision concerns Accent, Warning (Yellow), Success (Green), and Error
(Red) only. Main neutrals, semantic-role mappings, and every delivery surface
remain unchanged.

Each family has one future-editable Base. Dark and Light are derived values,
not independent brand inputs. The approved WEX values in ADR 0002 are hard
calibration targets: changing the derivation rule must not visibly replace the
established palette.

## Evaluation method

The comparison below uses CIEDE2000 (ΔE00) on D65 sRGB values. For this
decision, ΔE00 at or below 1.0 is negligible; a value above 1.0 is material
and fails calibration. Contrast is the WCAG relative-luminance ratio for each
currently registered `on-*` foreground.

The rejected sRGB recipe is component-wise
`round((1 - w) × Base + w × endpoint)`, where endpoint is black for Dark and
white for Light. Its weights are individually fitted to minimise the error for
that method; it still cannot retain the WEX character in every family.

| Family | sRGB Dark recipe / result / ΔE00 | Material? | sRGB Light recipe / result / ΔE00 | Material? | Browser and server compatibility |
| --- | --- | --- | --- | --- |
| Accent | black 21% / `#0C4DC9` / 3.222 | Yes | white 44% / `#79A7FE` / 0.747 | No | `color-mix(in srgb, …)` is directly expressible; a server can reproduce the channel arithmetic. Rejected for fidelity. |
| Warning | black 29% / `#AB8A13` / 3.294 | Yes | white 35% / `#F6D76B` / 1.496 | Yes | Same as Accent; rejected for fidelity. |
| Success | black 21% / `#1C7F39` / 0.465 | No | white 38% / `#77C58E` / 6.825 | Yes | Same as Accent; rejected for fidelity. |
| Error | black 25% / `#A3161E` / 0.292 | No | white 22% / `#E25057` / 4.342 | Yes | Same as Accent; rejected for fidelity. |

## Decision

Use a per-family calibrated OKLCH transform. Convert the editable Base from
encoded sRGB to OKLCH. For the selected Dark or Light calibration, calculate:

```text
L' = clamp(L + ΔL, 0, 1)
C' = C × chromaMultiplier
h' = (h + Δh) mod 360
```

Convert `(L', C', h')` back to encoded sRGB, quantising each channel to the
nearest 8-bit integer (ties upward). If the result is outside sRGB, retain `L'`
and `h'` and binary-search the greatest `C'` in gamut for 16 iterations; do
not independently clamp RGB channels. This produces the closest available
same-lightness, same-hue result while sacrificing only necessary chroma.

The calculation uses the published OKLab/OKLCH D65 matrices and cube-root
transfer, not a browser-specific colour API. Browser output is the derived
`#RRGGBB` token, which is universally supported; the same pure calculation can
be implemented and tested in browser JavaScript and server/admin validation.
The future implementation must provide shared calibration test vectors so both
executors produce byte-identical hex output.

The calibration parameters below are deltas from the current ADR 0002 Base.
They deliberately encode each family’s established Dark/Light character. At
those Bases every result is in-gamut and exactly reproduces the current target
after 8-bit quantisation (ΔE00 `0.000`, therefore not material).

| Family | Tone | ΔL | Chroma multiplier | Δh (degrees) | Generated / target | ΔE00 | Material? |
| --- | --- | ---: | ---: | ---: | --- | ---: | --- |
| Accent | Dark | -0.102514 | 0.909577 | +0.679303 | `#0043CE` | 0.000 | No |
| Accent | Light | +0.179918 | 0.559872 | -0.870887 | `#78A9FF` | 0.000 | No |
| Warning | Dark | -0.187096 | 0.798337 | -5.190601 | `#B28600` | 0.000 | No |
| Warning | Light | +0.068128 | 0.835838 | +2.997106 | `#FDDC69` | 0.000 | No |
| Success | Dark | -0.096229 | 0.847441 | +0.206128 | `#198038` | 0.000 | No |
| Success | Light | +0.186244 | 0.913110 | +2.352889 | `#6FDC8C` | 0.000 | No |
| Error | Dark | -0.109187 | 0.785449 | -0.361739 | `#A2191F` | 0.000 | No |
| Error | Light | +0.096967 | 0.960244 | -3.794904 | `#FA4D56` | 0.000 | No |

## Accessibility and safeguards

| Family | Registered Base foreground / contrast | Dark foreground / contrast | Light foreground / contrast |
| --- | --- | --- | --- |
| Accent | White / 5.00:1 | White / 7.79:1 | Black / 8.92:1 |
| Warning | Black / 12.47:1 | Black / 6.30:1 | Black / 15.62:1 |
| Success | Black / 6.27:1 | White / 5.02:1 | Black / 12.29:1 |
| Error | White / 5.00:1 | White / 7.79:1 | Black / 6.26:1 |

All calibration targets meet WCAG AA normal-text contrast. A later Base edit
must regenerate both tones and recheck every registered pairing at 4.5:1 or
higher; it must be rejected rather than silently changing a foreground or
semantic role. No CSS, editor, schema, persistence, adapter, admin UI, or
semantic-role mapping changes are authorised by this decision.
