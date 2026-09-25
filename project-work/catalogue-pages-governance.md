# Repository Governance + Pages Separation Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: 2 — Typography authority modularisation submitted

## Reviewer verdict

**Proceed**

Phase 1 is accepted at pushed candidate `509d07ea9274fd68bf250f7c3a8355e1a37e0ab2`.

Independent review confirmed:
- candidate is exactly one commit ahead of `main` `2e0ac6e313d24b424dd1933f85eaf203f6f3eb04`;
- only the seven authorised governance/navigation files changed;
- no runtime, workflow, schema, component, or presentation source changed;
- remote heads are exactly `main`, `Project-work-instructions`, and `feat/catalogue-pages-governance`;
- tracked >1,000-line text authorities are independently measured as:
  - `packages/wex/src/source/WEX-SOURCE.md` — 3,008 lines;
  - `docs/architecture/composition-architecture.md` — 1,953 lines;
  - `packages/wex/src/foundations/typography.css` — 1,559 lines;
- new Foundation governance stays scoped to repository operability and does not replace architecture/ADR/source authority;
- Code Maps now provide the required first-stop metadata, authority routing, dependency boundary, checks, and safe-change route.

No GitHub Actions run/status is attached to the Phase-1 commit. Builder-reported `pnpm audit:foundation`, web-runtime tests, and `git diff --check` are therefore supporting evidence only; the pushed documentation diff itself was independently inspected and is sufficient for this phase.

## Phase 2 authorised scope

Resolve the Typography absolute-ceiling gate before Typography Pages work.

Builder must:
1. Work only on existing branch `feat/catalogue-pages-governance`.
2. Split `packages/wex/src/foundations/typography.css` into semantics-preserving modules.
3. Keep every new/changed authored file <=600 lines unless an Owner-approved exception is explicitly recorded; no new/changed file may exceed 1,000 lines.
4. Preserve the canonical `packages/wex/src/index.css` entrypoint, effective import/cascade order, selectors, declarations, registered values, tier semantics, and font delivery.
5. Update the Typography Code Map with new paths, current verified ref/SHA, latest work first, and verification route.
6. Do not change runtime Pages, visual design, component catalogue, Outer states, schemas, or domain/application behaviour.

Required evidence:
- `pnpm audit:foundation`
- `pnpm --filter @weerax/wex test`
- `pnpm --filter @weerax/web-runtime test`
- `pnpm check`
- `git diff --check`
- exact changed-file line counts and a concise proof that CSS import/cascade ordering is preserved.

Builder commits/pushes the bounded Phase-2 work, updates this same file to `AWAITING REVIEWER REVIEW` with exact remote SHA/evidence, then stops.

## Later authorised direction — not yet executable

After Phase 2 Reviewer acceptance:
- separate GitHub Pages surfaces for Colour, Typography, Actions, and Design Tokens;
- remove the temporary static Outer states section;
- keep Components deferred.

## Builder handoff

Candidate branch/SHA: `feat/catalogue-pages-governance` at
`d99b1d51047d25beae9003744c4916ef5d7d900c`.

Phase 2 changes only: canonical `typography.css`, four Typography modules,
the Typography module test, and the Typography Code Map. No runtime, Pages,
visual-design, catalogue, schema, or application/domain files changed.

Line counts: entrypoint 4; core 179; Heading 595; Title 405;
Navigation/Body 376; module test 27; Code Map 78. Every changed file is below
600 lines.

Cascade proof: `index.css` retains its existing Typography import; the canonical
entrypoint imports core → Heading → Title → Navigation/Body. Concatenated module
content matches the pre-split stylesheet after removal of only its three
section-ending blank delimiters. Declaration and selector order are unchanged.

Evidence passed: `pnpm audit:foundation`; WEX tests (11/11); web-runtime tests
(8/8); `pnpm check` (35 tasks); `git diff --check`; and a Vite production build.
`pnpm check` retained its existing non-fatal Turborepo lockfile parsing warning.

Chrome verified the exact local candidate: registered Typography values and IBM
Plex rendered across the specimen system, Dark theme toggled, and keyboard focus
reached the visible Skip to content link. The preview was restored to Light.
Production Pages remains main-only; no runtime presentation file changed.

The two separate hash-bound >1,000-line historical authorities remain an Owner
decision gate and were not changed. Builder stops for Reviewer.
