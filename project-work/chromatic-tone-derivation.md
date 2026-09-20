# Chromatic Tone Derivation Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: Authority analysis — derive Dark / Light tones from chromatic Base colours

## Reviewer Verdict

**Proceed with safeguards**

Button foundation work is closed. This is a new authority-only work area.

## Goal

Make WEX chromatic families future-brandable from a single Base colour while preserving the current visual palette as the calibration target.

In scope only:

- Accent
- Warning
- Success
- Error

Main neutral colours are **frozen and out of scope**:
Black, Dark, Dark Grey, White, Light, Light Grey.

## Intended model

Each chromatic family has one authoritative Base colour.

```text
Base
├─ Dark tone  = deterministic tone from Base
└─ Light tone = deterministic tone from Base
```

Dark / Light must no longer be treated as independently authored brand values once derivation is implemented.

Current Base / Dark / Light hex values remain the visual calibration targets.

## Current calibration targets

| Family | Base | Dark target | Light target |
| --- | --- | --- | --- |
| Accent | #0F62FE | #0043CE | #78A9FF |
| Warning | #F1C21B | #B28600 | #FDDC69 |
| Success | #24A148 | #198038 | #6FDC8C |
| Error | #DA1E28 | #A2191F | #FA4D56 |

## Important constraint

Do not assume one universal percentage works for every family.

A simple sRGB mix toward Black/White can approximate the current palette but does not reproduce every target exactly because some existing tones include hue/chroma shifts.

Therefore this phase must **not implement CSS yet**.

## Builder authority task

1. Read ADR 0002, ADR 0004, current `colour.css`, colour tests, and historical WEX colour source.
2. Evaluate deterministic tone-generation methods suitable for future runtime/admin Base-colour changes.
3. At minimum compare:
   - Base mixed toward Black / White;
   - a perceptual colour-space tone method if supported by the target browser/runtime;
   - any simpler deterministic method that can reproduce or closely preserve current visual targets.
4. For each family, provide:
   - exact derivation recipe;
   - generated Dark/Light values from the current Base;
   - delta from current target values;
   - resulting contrast of registered `on-*` foregrounds;
   - browser/runtime compatibility implications.
5. Prefer the smallest durable rule. Do not create an editor, schema, adapter, persistence model, or admin UI.
6. Do not change Main neutral colours.
7. Do not alter semantic role mappings yet.
8. Do not modify WEX source/CSS in this phase except an authority proposal/ADR candidate if the repository workflow requires it.
9. Push the authority candidate on a new topic branch only after verifying no other active implementation branch exists.
10. Hand back this same work file as `AWAITING REVIEWER REVIEW` with exact SHA and evidence.

## Acceptance objective

Reviewer should be able to decide one stable WEX rule:

> An admin/product may later change only a chromatic Base colour; WEX deterministically derives its Dark and Light tones while preserving accessibility and the established semantic token contract.

Implementation is a later phase after the derivation authority is accepted.
