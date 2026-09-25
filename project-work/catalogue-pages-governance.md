# Repository Governance + Pages Separation Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: 2 — Typography authority modularisation metadata closeout

## Reviewer verdict

**Proceed with safeguards**

Phase 2 implementation at `d99b1d51047d25beae9003744c4916ef5d7d900c` is technically accepted subject to one bounded Code Map correction before the phase may close.

Independent review confirmed:
- Phase-2 diff from accepted Phase-1 baseline `509d07e...` is limited to Typography modularisation, its focused test, and the Typography Code Map.
- `typography.css` remains the canonical four-import entrypoint in core → Heading → Title → Navigation/Body order.
- Reconstructing those four module files produces the pre-split 1,559-line stylesheet content exactly after removal only of the three section-boundary blank delimiters.
- `packages/wex/src/index.css` is unchanged from `main`, including the existing Typography import position.
- `font-family.css` is unchanged; font delivery remains untouched.
- Changed authored files are all <=600 lines: entrypoint 4; core 179; Heading 595; Title 405; Navigation/Body 376; test 27; Code Map 78.
- Remote branch count remains exactly three.
- No CI/status run is attached to the submitted SHA. Builder-reported audit/tests/check/build/browser results remain supporting evidence; the pushed source invariants above were independently inspected.

## Required safeguard / Builder correction

The Typography Code Map currently says:

`Verified against: feat/catalogue-pages-governance at 1dc001924193d89e1ee1ee24059969df3be2d348`

That is stale. The final candidate is `d99b1d51047d25beae9003744c4916ef5d7d900c`, and that later commit changed Typography module boundaries plus the Code Map itself.

Builder must only:
1. refresh the Typography Code Map's verified ref/SHA to the actual final branch head after the correction commit;
2. put the metadata-closeout work newest-first in Recent work;
3. make no source/runtime/Pages/visual/schema changes;
4. run `git diff --check`;
5. commit/push on the same `feat/catalogue-pages-governance` branch;
6. update this same work file to `AWAITING REVIEWER REVIEW` with exact SHA and stop.

Do not start Pages separation yet.

## Later direction — not yet executable

After this safeguard is accepted:
- separate GitHub Pages surfaces for Colour, Typography, Actions, and Design Tokens;
- remove the temporary static Outer states section;
- keep Components deferred.
