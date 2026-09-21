# Chromatic Tone Derivation Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: Implement accepted chromatic derivation in the WEX core

## Reviewer Verdict

**Stop — architectural risk**

The authority-only phase was valid, but closing this work area while core WEX still independently authors Dark/Light values leaves implementation inconsistent with accepted ADR 0011.

Current `packages/wex/src/foundations/colour.css` still hardcodes:

- Accent Base / Dark / Light;
- Warning Base / Dark / Light;
- Success Base / Dark / Light;
- Error Base / Dark / Light.

ADR 0011 now says each family has exactly one Base and Dark/Light are deterministic derived tones. At the core-system stage, Dark/Light must therefore not remain independent authoring inputs.

## Required core implementation

Builder must implement the smallest durable WEX-core path that makes ADR 0011 true in implementation:

1. Preserve the four current Base colours as the authored chromatic inputs.
2. Implement the accepted per-family calibrated OKLCH derivation from ADR 0011 as one deterministic reusable calculation.
3. Make Dark/Light outputs originate from that calculation, not from independently authored duplicate hex values.
4. Existing WEX CSS variable names may remain for compatibility, but their Dark/Light values must be generated/produced from the derivation source of truth.
5. Preserve the current visible palette exactly for the current Bases:
   - Accent `#0043CE / #78A9FF`
   - Warning `#B28600 / #FDDC69`
   - Success `#198038 / #6FDC8C`
   - Error `#A2191F / #FA4D56`
6. Add deterministic calibration tests proving current Bases reproduce those exact 8-bit sRGB outputs.
7. Add contrast validation for all registered `on-*` pairings at WCAG AA normal-text threshold.
8. Ensure the System Settings/showcase reads the resulting WEX tokens and therefore reflects the core output automatically; do not create a second palette or presentation-only colour source.
9. Do not add admin editing, persistence, schemas, adapters, product/domain logic, or a speculative theming framework in this phase.
10. Do not change Main neutrals or semantic-role mappings.

## Architectural invariant

`Base + registered family transform = Dark/Light`.

Dark/Light may exist as generated delivery artifacts/tokens for compatibility, but they must not be separate manually maintained colour authority.

The derivation implementation must remain usable outside a browser, as required by ADR 0011, so a later admin/brand-colour layer can call the same core rule rather than reimplementing it.

## Required evidence

Builder must provide:

- exact pushed branch/SHA;
- changed-file list and diff;
- deterministic tests for all 8 generated tones;
- contrast-validation evidence;
- proof no independent Dark/Light authoring source remains in the core chromatic definition path;
- browser/showcase evidence that current presentation still renders the same palette;
- no unrelated changes.

After implementation, update this same file to `Status: AWAITING REVIEWER REVIEW` and stop.
