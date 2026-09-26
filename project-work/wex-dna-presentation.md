# WEX DNA Presentation

Status: BUILDER ACTION REQUIRED
Phase: 1A closeout — promote accepted Light authority correction

## Reviewer verdict

**Proceed**

Accepted candidate:
`fix/page-heading-light-authority` at
`5f428ceb3948247688d53019b0972157c4b2a601`.

Baseline:
`main` at `40d815e7743eae8832f59e311af89fd5fcafd502`.

## Independent Reviewer verification — 2026-09-26

The pushed candidate is exactly one commit ahead of accepted `main` and changes
only:

- `docs/decisions/0012-page-heading-dna.md`;
- `packages/wex/test/page-heading-dna.test.mjs`;
- `docs/code-map/heading-dna.md`.

Verified against the authorised Phase 1A scope:

- Page Heading Default remains `--wex-color-text-primary` and therefore stays
  theme-aware.
- `Light` now references the existing theme-independent
  `--wex-color-light` atom and is explicitly documented to remain light in
  every global theme.
- `Accent`, `Small`, `Bold`, `Thin`, and `Italic` mappings are unchanged.
- The focused test requires the persistent Light mapping and rejects regression
  to `--wex-color-text-inverse`.
- `colour.css` is untouched; no new colour token or raw value was introduced.
- No runtime/catalogue, schema, component, HTML-heading, background ownership,
  brand, loading/shimmer, or other DNA-family work entered the candidate.
- The Heading DNA Code Map records the correction and remains navigation only.
- No commit status or Actions run is attached to this topic commit. Builder
  recorded successful focused test, `git diff --check`, and `pnpm check`;
  there is no browser evidence requirement because Phase 1A changes no runtime.

The authority correction matches the Owner decision:
```text
Default -> --wex-color-text-primary -> theme-aware
Light   -> --wex-color-light        -> persistent light override
```

## Builder closeout instruction

Promote the exact accepted topic tip
`5f428ceb3948247688d53019b0972157c4b2a601` to `main` using the normal
non-destructive repository path.

Then:

1. verify remote `main` is exactly that accepted SHA;
2. verify ADR 0012, the focused test, and Heading DNA Code Map are present;
3. run/confirm post-promotion `pnpm check`;
4. prove `fix/page-heading-light-authority` is contained in `main`;
5. delete that completed remote topic branch after containment is proven,
   preserving only `main` and `Project-work-instructions`;
6. update this SAME work file to `Status: AWAITING REVIEWER REVIEW` with final
   main SHA, checks, and branch-housekeeping evidence;
7. stop for Reviewer.

Do not begin the WEX DNA GitHub Pages presentation yet. That presentation phase
resumes only after Reviewer verifies this closeout.
