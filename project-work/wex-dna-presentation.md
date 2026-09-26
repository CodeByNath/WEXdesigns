# WEX DNA Presentation

Status: BUILDER ACTION REQUIRED
Phase: 1B closeout — promote accepted Page Heading DNA presentation

## Reviewer verdict

**Proceed with safeguards**

Accepted candidate:
`feat/wex-dna-presentation-v1` at
`d6aa97dec8b817bdf80eb930df68a512b0f6797a`.

Accepted baseline:
`main` at `5f428ceb3948247688d53019b0972157c4b2a601`.

## Independent Reviewer verification — 2026-09-27

The pushed topic tip is unchanged from the reviewed candidate and remains three
commits ahead of accepted `main`. The diff is still limited to:

- `apps/web-runtime/design-tokens/index.html`;
- `apps/web-runtime/index.html`;
- `apps/web-runtime/src/catalogue.css`;
- `apps/web-runtime/test/catalogue.test.mjs`;
- `docs/code-map/heading-dna.md`.

Verified source boundaries remain correct:

- `/design-tokens/` is preserved while visible identity becomes **WEX DNA**;
- only `Heading DNA -> Page Heading` is presented;
- registered attributes are exactly `Small`, `Light`, `Accent`, `Bold`,
  `Thin`, and `Italic`;
- Default remains theme-aware through existing WEX authority;
- `Light` remains persistent via `--wex-color-light` and is demonstrated on a
  black catalogue-only scaffold;
- no background ownership, raw values, new DNA roles, schemas, components,
  page-builder logic, brand customisation, or loading/shimmer entered scope;
- route/name/role boundaries are covered by the focused runtime test.

Builder has now completed the missing exact-candidate Chrome evidence:
desktop, compact layout, keyboard-only navigation, Skip to content focus
transfer, visible focus treatment, semantic heading order, theme switching, and
persistent Light presentation were all recorded as passing without source
changes.

No commit status or Actions run is attached to this topic commit. Builder's
recorded focused runtime test, `git diff --check`, and `pnpm check` remain
the deterministic pre-promotion evidence.

## Safeguard

Because GitHub Pages deploys from `main`, hosted/live behaviour is not yet
proven. Promotion does not itself complete the presentation work. Reviewer must
separately verify the live Pages deployment after Builder closeout.

## Builder closeout instruction

Promote the exact accepted topic tip
`d6aa97dec8b817bdf80eb930df68a512b0f6797a` to `main` using the normal
non-destructive repository path.

Then:

1. verify remote `main` is exactly that accepted SHA;
2. run/confirm post-promotion `pnpm check`;
3. verify the relevant GitHub Pages workflow/deployment state for that SHA when
   available and record its result without treating deployment success as visual
   proof;
4. prove `feat/wex-dna-presentation-v1` is contained in `main`;
5. delete the contained remote topic branch, preserving only `main` and
   `Project-work-instructions`;
6. refresh Heading DNA Code Map verification metadata only if promotion leaves
   stale topic-branch wording;
7. update this SAME file to `Status: AWAITING REVIEWER REVIEW` with final main
   SHA, checks, deployment/workflow evidence, branch-housekeeping evidence, and
   any metadata-only follow-up commit if required;
8. stop for Reviewer.

Do not begin another DNA family or presentation phase.
