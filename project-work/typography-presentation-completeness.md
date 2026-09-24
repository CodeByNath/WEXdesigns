# Typography Presentation Completeness Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: Tier-tab presentation correction

## Reviewer verdict

**Proceed with safeguards**

Reviewer independently inspected `origin/feat/typography-presentation-completeness` at `3ce30a2aa80e83da4b56a86edd56ec4035c44acb` against promoted `origin/main` `99fb0db0ed600d1a14b69f73920effcf6807af65`.

The branch is exactly one commit ahead and zero behind main. Scope is correctly limited to:
- `apps/web-runtime/src/main.js`
- `apps/web-runtime/src/catalogue.css`
- `apps/web-runtime/test/catalogue.test.mjs`

The tier-tab direction is accepted:
- exactly Small / Default / Large;
- Default initially active;
- one visible panel at a time;
- tablist/tab/tabpanel semantics;
- Left/Right/Home/End keyboard movement;
- canonical specimen registry and computed facts preserved;
- no breakpoint or screen-width model introduced.

## Required correction

The active panel still mixes WEX tiers in its own presentation chrome.

Current runtime hard-codes:
- set headings as `wex-type-title-small-semibold`;
- specimen class labels as `wex-type-navigation-small-semibold`.

Therefore a Default or Large panel contains Small typography classes even though the phase requirement says an active tier must not mix Small / Default / Large composition.

Correct this without changing the typography core:

1. Resolve all typography classes used **inside each tier panel** from that panel's tier.
   - Small panel presentation text -> Small WEX tier.
   - Default panel presentation text -> Default WEX tier.
   - Large panel presentation text -> Large WEX tier.
2. This includes set headings, specimen metadata/class labels, fact labels/values, and any other typography-bearing text inside the panel. Do not leave Small or Default helper typography inside a different active panel.
3. The tab selector itself is control chrome outside the panel; it may keep one registered navigation treatment if needed for a stable control, but do not let that choice leak into panel composition.
4. Preserve the existing allowed specimen variants and 18-specimen count per tier. Do not add new typography styles.
5. Strengthen focused tests so they deterministically prove:
   - three tier tabs exist;
   - each panel resolves exactly 18 canonical specimens;
   - all typography classes inside a given panel carry that panel's tier;
   - the union remains 54 canonical specimens;
   - only one panel is active at a time;
   - no font-delivery or numeric typography values are duplicated in the app.

## Preserve / exclusions

Do not change:
- `packages/wex/src/foundations/typography.css`
- `packages/wex/src/foundations/font-family.css`
- WEX historical source or ADRs
- colour/Button/shared UI/schema/unrelated catalogue work
- the accepted tab interaction model or computed-facts approach.

Run `pnpm check`, `git diff --check`, and Chrome validation for all three tier tabs in desktop + compact/mobile, light + dark, including keyboard switching. Commit/push the same topic branch, update this same file to `AWAITING REVIEWER REVIEW` with exact SHA/evidence, and stop.

## Builder correction handoff

- Candidate: `feat/typography-presentation-completeness` at `72de1728fa989169c9994a8c1b2651dd53a51e97` (pushed and verified against origin).
- Changed only `apps/web-runtime/src/main.js` and `apps/web-runtime/test/catalogue.test.mjs`.
- Panel-internal heading, metadata, fact label, and fact value classes now derive from the panel tier. The selector remains stable control chrome outside the panels. Canonical specimen generation, computed facts, 18 specimens per tier, and the 54-specimen union are unchanged.
- Focused regression coverage proves the 18/54 registry counts, exclusive tab panels, keyboard keys, canonical tier filtering, tier-derived panel text classes, and no hard-coded Small helper classes.
- Validation passed: `pnpm check`; `git diff --check`; Chrome on `http://localhost:5173/WEXdesigns/` at desktop (75%) and compact (125%) widths, light and dark themes, all Small/Default/Large panels, plus Small-to-Default Right Arrow switching.
- GitHub Pages remains the post-promotion reviewer validation boundary; no promotion was made in this builder cycle.
