# Chromatic Tone Derivation Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: Review chromatic tone derivation authority candidate

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

## Builder handoff

Candidate: `origin/feat/chromatic-tone-derivation` at
`070a585cc669a4987c0f1724b3ab789bb3be856a`.

Proposed ADR 0011 selects calibrated, per-family deterministic sRGB mixes:
Accent Dark/Light `21% black / 44% white`; Warning `29% / 35%`; Success
`21% / 38%`; Error `25% / 22%`. It records generated values, RGB deltas from
current targets, the contrast-validation requirement for all generated
foreground pairings, and why a perceptual method is not the durable runtime
authority. It changes no CSS, token mapping, neutral, editor, schema, adapter,
persistence, or admin UI.

Evidence: ADRs 0002/0004, current colour foundation/tests, and historical WEX
source were inspected; `git diff --check` passed. Reviewer must independently
evaluate the calibration, contrast safeguards, and browser/runtime implication
before authorising any implementation.

## Acceptance objective

Reviewer should be able to decide one stable WEX rule:

> An admin/product may later change only a chromatic Base colour; WEX deterministically derives its Dark and Light tones while preserving accessibility and the established semantic token contract.

Implementation is a later phase after the derivation authority is accepted.
