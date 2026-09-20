# Chromatic Tone Derivation Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: Revised chromatic tone authority submitted for independent review

## Builder handoff

Candidate: `origin/feat/chromatic-tone-derivation` at
`305481452ba94cede56a8ba6bc81a07423c3d8af`.

Changed file: `docs/decisions/0011-chromatic-tone-derivation.md` only.

Evidence:

- compares the calibrated sRGB method with a reproducible calibrated OKLCH
  transform for all four families and both derived tones;
- records each recipe, generated target hex, CIEDE2000 delta, materiality,
  registered WCAG contrast, and browser/server execution boundary;
- reproduces all eight current Dark/Light targets at the current Bases with
  ΔE00 `0.000`, while retaining one editable Base and explicit deterministic
  gamut handling for future edits;
- keeps Main neutrals, CSS, editor, schema, persistence, adapters, admin UI,
  and semantic mappings untouched; and
- `git diff --check` passed. No browser validation applies because this phase
  changes authority documentation only and adds no runtime behaviour.

## Reviewer Verdict

**Stop — architectural risk**

Reviewer independently inspected candidate:
`origin/feat/chromatic-tone-derivation` at
`070a585cc669a4987c0f1724b3ab789bb3be856a`.

The candidate correctly keeps Main neutrals frozen and makes Base the future-editable source, but the proposed sRGB tone recipes do **not** preserve the current WEX chromatic palette closely enough.

Material drifts in the proposed generated values include:

- Accent Dark: `#0C4EC9` vs current `#0043CE`;
- Warning Dark: `#AC8B13` vs current `#B28600`;
- Success Light: `#77C58E` vs current `#6FDC8C`;
- Error Light: `#E25057` vs current `#FA4D56`.

Success Light and Error Light in particular are materially different visual tones. The user requirement is to derive tones that preserve/match the current Dark and Light character, not merely approximate them with the smallest black/white mix.

## Required authority correction

1. Keep scope unchanged:
   - Accent / Warning / Success / Error only;
   - Main neutrals untouched.
2. Keep one editable Base per family.
3. Re-evaluate the derivation method with **current WEX Dark/Light values as hard calibration targets**.
4. Compare deterministic methods capable of preserving hue/chroma as well as lightness, including a perceptual colour-space approach (for example OKLCH/OKLab or an equivalent reproducible transform).
5. Do not reject a perceptual method merely because it is more complex than sRGB. The deciding criteria are:
   - fidelity to the current WEX palette;
   - deterministic derivation from Base;
   - browser/runtime support;
   - reproducibility in server/admin validation;
   - accessibility validation.
6. For each family and each proposed method, report:
   - exact recipe;
   - generated Dark/Light hex;
   - quantitative colour delta from current target;
   - whether the difference is visually material;
   - WCAG contrast for registered foreground pairings;
   - runtime/browser compatibility.
7. Prefer a rule that can reproduce the current targets exactly or with negligible perceptual delta. If exact reproduction requires per-family calibrated tone parameters, that is acceptable.
8. Do not implement CSS, editor, schema, persistence, adapter, or admin UI yet.
9. Do not change semantic role mappings yet.
10. Push the revised authority candidate on the same topic branch and hand back this same work file as `AWAITING REVIEWER REVIEW`.

## Acceptance objective

One durable rule:

> Changing only a chromatic Base colour later deterministically regenerates Dark and Light tones while retaining the established WEX visual character and accessibility contract.

Do not promote or begin implementation until Reviewer accepts the revised authority.
