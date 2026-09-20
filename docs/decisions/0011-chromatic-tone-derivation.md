# 0011: Chromatic Tone Derivation

## Status

Proposed — authority only; implementation requires separate Reviewer authorisation.

## Decision

Accent, Warning, Success and Error each have one future-editable Base colour.
Dark and Light are deterministic derived tones, not separately authored brand
inputs. Main neutrals remain fixed and are outside this decision.

The durable derivation is a calibrated sRGB mix: Dark mixes Base toward black;
Light mixes Base toward white. Each family owns its calibration percentage,
because one universal percentage does not preserve the established palette.
The recipes are deterministic, CSS-runtime compatible through `color-mix()` in
an implementation phase, and can be reproduced server-side without a browser.

| Family | Dark recipe / generated | Dark target / delta | Light recipe / generated | Light target / delta |
| --- | --- | --- | --- | --- |
| Accent | black 21% / `#0C4EC9` | `#0043CE` / RGB 16.6 | white 44% / `#79A7FE` | `#78A9FF` / RGB 2.0 |
| Warning | black 29% / `#AC8B13` | `#B28600` / RGB 20.7 | white 35% / `#F6D76B` | `#FDDC69` / RGB 8.7 |
| Success | black 21% / `#1C7F39` | `#198038` / RGB 3.6 | white 38% / `#77C58E` | `#6FDC8C` / RGB 24.7 |
| Error | black 25% / `#A3161E` | `#A2191F` / RGB 2.9 | white 22% / `#E25057` | `#FA4D56` / RGB 24.0 |

These values are calibration recipes, not an attempt to claim exact legacy hex
identity. Perceptual colour-space mixing was considered but is rejected as the
runtime authority: it cannot reproduce the legacy targets more faithfully
without family-specific non-portable fitting, while sRGB is the smallest rule
that has an equivalent in server/admin validation.

## Accessibility and safeguards

The implementation must calculate contrast for every generated tone against
both registered `on-*` foreground candidates and choose or reject according to
WCAG AA normal-text contrast. It must not retain a foreground pairing merely
because it was valid for the current calibration target. Current pairings are
calibration evidence: White remains valid on Accent Dark and Error Dark; Black
remains valid on Warning Dark/Light and Success Light; generated Success Dark
must be checked rather than assumed.

This decision creates no editor, schema, persistence, adapter, admin UI, CSS
change, semantic-role remap, or Main-neutral change. Existing semantic tokens
continue to consume the registered family roles; a later implementation phase
may replace only chromatic primitive delivery with these derived results.
