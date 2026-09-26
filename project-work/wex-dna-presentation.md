# WEX DNA Presentation

Status: AWAITING REVIEWER REVIEW
Phase: 1A — Correct Page Heading Light authority before presentation

## Reviewer verdict

**Proceed with safeguards**

Baseline: accepted `main` at
`40d815e7743eae8832f59e311af89fd5fcafd502`.

The Owner has clarified the intended Page Heading colour model. The current
accepted ADR maps `Light` to `--wex-color-text-inverse`, which swaps with the
global theme. That no longer matches the Owner-approved behaviour and must be
corrected before the catalogue presents Page Heading DNA.

## Binding Owner clarification

Page Heading colour behaviour is:

- **Default** uses the platform Page Heading colour and follows WEX theme
  inversion dynamically. Its existing mapping remains
  `--wex-color-text-primary`.
- **Light** is an explicit DNA colour override for headings used on dark or
  coloured surfaces. Once selected it remains light in both global light and
  dark themes; the global theme must not invert that override.
- The existing theme-independent WEX foundation token
  `--wex-color-light` is the intended Light atom reference. Do not create a
  new colour token or hardcode its resolved value.
- **Accent** remains the currently accepted Accent mapping; this correction does
  not reopen it.
- A Page Heading colour attribute changes the heading foreground only. It does
  not own or set its parent background.

Conceptual rule:

```text
Default -> --wex-color-text-primary -> theme resolves dark/light

Light attribute -> --wex-color-light -> remains light
```

A later catalogue specimen may place the Light heading on a dark demonstration
surface in both themes. That surface is presentation scaffolding only and must
never become part of Heading DNA.

## Authority correction scope

Before any WEX DNA runtime/catalogue work, Builder must on one topic branch:

1. update ADR 0012 so `Light` references `--wex-color-light`, not
   `--wex-color-text-inverse`;
2. preserve Default as `--wex-color-text-primary` and all other accepted Page
   Heading mappings/attributes unchanged;
3. update the focused Page Heading DNA test to prove the persistent Light token
   reference and reject regression back to `text-inverse`;
4. refresh the Heading DNA Code Map only as required for authority/check
   routing and verification metadata;
5. do **not** modify `colour.css`: `--wex-color-light` already exists as
   authoritative theme-independent WEX foundation colour;
6. do not change runtime/catalogue presentation in Phase 1A.

## Exclusions

No new DNA roles, Heading component, HTML heading ownership, schema, page
builder, background attribute, brand customisation, loading/shimmer, colour
foundation token, or other DNA family.

## Required evidence / handoff

Builder must verify remote heads, remain within the three-branch limit, inspect
the Heading DNA and Colour Code Maps first, then run:

- focused Page Heading DNA test;
- `git diff --check`;
- `pnpm check`.

Push the candidate, then update this SAME file to
`Status: AWAITING REVIEWER REVIEW` with exact branch/SHA, changed files,
checks, and deviations. Stop for Reviewer.

Only after this authority correction is accepted will the WEX DNA GitHub Pages
presentation phase resume.

## Builder handoff — 2026-09-26

Candidate: `fix/page-heading-light-authority` at
`5f428ceb3948247688d53019b0972157c4b2a601`, pushed and verified on origin.

Changed files: `docs/decisions/0012-page-heading-dna.md`,
`packages/wex/test/page-heading-dna.test.mjs`, and
`docs/code-map/heading-dna.md`. The accepted `Light` mapping now references
the existing theme-independent `--wex-color-light` token; Default and all
other mappings are unchanged. The focused test requires that mapping and
rejects `Light -> --wex-color-text-inverse`. No `colour.css` or runtime files
changed.

Checks passed: focused `node --test packages/wex/test/page-heading-dna.test.mjs`;
`git diff --check`; and `pnpm check` (Foundation audit and 35 Turbo tasks).
The existing missing-`pnpm-lock.yaml` and Turbo output warnings did not prevent
success. Browser validation: n/a; Phase 1A excludes runtime/catalogue changes.
No deviations or unresolved authority gaps.
