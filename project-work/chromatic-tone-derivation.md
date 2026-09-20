# Chromatic Tone Derivation Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: Promote accepted chromatic-tone authority candidate to main

## Reviewer Verdict

**Proceed with safeguards**

Reviewer independently inspected:
`origin/feat/chromatic-tone-derivation` at
`305481452ba94cede56a8ba6bc81a07423c3d8af`.

Compared with `main` `5e13a35318704c2df15e39b807650af05a22c498`, the candidate changes only:
`docs/decisions/0011-chromatic-tone-derivation.md`.

## Accepted authority

Scope remains limited to Accent / Warning / Success / Error.

Main neutrals remain untouched:
Black / Dark / Dark Grey / White / Light / Light Grey.

Each chromatic family has one Base. Dark and Light are deterministic derived tones, not independently authored values.

The accepted derivation model is the per-family calibrated OKLCH transform documented in ADR 0011:

```text
Base
├─ Dark  = registered family transform
└─ Light = registered family transform
```

At the current accepted Bases it reproduces all existing WEX targets exactly after 8-bit sRGB quantisation:

| Family | Dark | Light |
| --- | --- | --- |
| Accent | `#0043CE` | `#78A9FF` |
| Warning | `#B28600` | `#FDDC69` |
| Success | `#198038` | `#6FDC8C` |
| Error | `#A2191F` | `#FA4D56` |

The candidate also correctly rejects the earlier sRGB-mix authority because several tones had material perceptual drift.

## Required safeguards

Future implementation must preserve all of the following:

- Base remains the sole editable chromatic input for each family.
- Tone derivation is deterministic and reproducible outside the browser.
- Out-of-gamut results use the documented chroma-reduction mapping rather than independent RGB clamping.
- Generated tones must retain existing semantic-role mappings.
- Registered `on-*` foreground pairings must be revalidated at WCAG AA normal-text contrast after any future Base change.
- A Base change that cannot satisfy the registered contrast contract must be rejected; do not silently change semantic roles.
- No Main-neutral change.
- No editor, schema, persistence, adapter, or admin UI is authorised by this authority phase.

## Builder promotion instruction

Promote only exact candidate SHA:
`305481452ba94cede56a8ba6bc81a07423c3d8af`.

Builder must:

1. verify `origin` is exactly `CodeByNath/WEXdesigns`;
2. verify remote `main` is still `5e13a35318704c2df15e39b807650af05a22c498`;
3. verify `main` is an ancestor of the exact candidate;
4. fast-forward `main` only to `305481452...`; no amendment, rebase, merge commit, or extra change;
5. verify remote `main` at that exact SHA;
6. update this same work file to `AWAITING REVIEWER REVIEW` with promotion evidence and stop.

Do not implement colour CSS yet. Implementation requires a separate Reviewer-authorised phase after authority promotion is verified.
