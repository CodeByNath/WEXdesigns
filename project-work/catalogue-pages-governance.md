# Repository Governance + Pages Separation Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: 1 — Governance and authority audit submitted

## Reviewer verdict

**Proceed**

Typography Presentation is closed. Branch housekeeping is complete and independently verified: remote branches are exactly `main` and `Project-work-instructions`.

Builder may now create exactly one topic branch:
`feat/catalogue-pages-governance`

This keeps the Owner limit at three remote branches total.

## Owner rules to establish

Audit current authority first, then implement the smallest durable governance change.

1. **File length**
   - Authored Markdown and code/config files normally must not exceed **600 lines**.
   - Only the Owner may explicitly approve a file above 600 lines.
   - **1000 lines is absolute; no file may exceed it, even with approval.**
   - Existing current Colour, Typography, and Action/interaction authority files are Owner-approved exemptions from the 600-line limit only.
   - That exemption does not waive the 1000-line ceiling and does not automatically apply to new files.
   - Current `packages/wex/src/foundations/typography.css` is ~1559 lines: record and plan a semantics-preserving modularisation before Pages implementation; do not casually split it.

2. **Branch limit**
   - Maximum **3 remote branches total**, including `main` and `Project-work-instructions`.
   - Normal state: those two permanent branches + one active topic branch.
   - Accepted topic branches must be removed after promotion and Reviewer verification before another topic branch is opened.

3. **Code Maps are the first operating stop**
   - Colour, Typography, and Actions each require a dedicated high-value Code Map that an agent or human can follow without repeatedly opening large source files.
   - At the top: newest work first, `Last visited`, `Last updated`, current verified ref/SHA.
   - Include concise important operating/spec guidance, governing authority, source paths, focused tests/checks, dependency boundary, safe-change route, and recent-work notes.
   - Code Maps remain navigation/operating evidence, never competing architecture authority.

## Phase-1 audit scope

Audit and prepare bounded changes for:
- root `AGENTS.md`;
- `project-work/AGENTS.md` and `PROJECT-RULES.md`;
- `docs/code-map/README.md`;
- Colour, Typography, Actions/interaction Code Maps;
- repository files against 600/1000-line rules;
- current Pages/runtime structure and deployment workflow.

Do not change runtime presentation in Phase 1.

## Planned later phases

After Reviewer accepts Phase 1:
- separate GitHub Pages surfaces for **Colour**, **Typography**, **Actions**, and **Design Tokens**;
- remove the temporary static **Outer states** section;
- keep **Components deferred**;
- modularise over-1000-line Typography authority without semantic changes before/with the relevant migration phase.

## Builder handoff

Candidate branch: `feat/catalogue-pages-governance`
Candidate SHA: `509d07ea9274fd68bf250f7c3a8355e1a37e0ab2`

Changed source files:

- `AGENTS.md`
- `docs/foundation/README.md`
- `docs/foundation/repository-governance.md`
- `docs/code-map/README.md`
- `docs/code-map/colour.md`
- `docs/code-map/typography-font-delivery.md`
- `docs/code-map/interaction-focus.md`

Evidence:

- remote heads were `main` and `Project-work-instructions` before opening the
  authorised topic; the candidate is now the permitted third remote branch;
- audit found only three tracked text files above 1,000 lines: hash-bound
  `WEX-SOURCE.md` (3,007), hash-bound `composition-architecture.md` (1,952),
  and `typography.css` (1,558);
- the candidate establishes Foundation-scoped file, branch, and Code Map
  governance; it records Typography modularisation as a semantics-preserving
  pre-Pages migration gate;
- `pnpm audit:foundation` passed;
- `pnpm --filter @weerax/web-runtime test` passed (8/8);
- `git diff --check` passed before commit.

Pages/runtime audit: deployment is `main`-only and currently builds the single
System Settings shell after web-runtime type-check, tests, and build. The shell
currently combines Colour, Typography, Buttons, and the temporary static Outer
states section. Phase 1 changed none of these runtime or workflow files, so no
browser validation was required or performed.

Unresolved gates for Reviewer:

- Typography Pages must not begin until a separately authorised migration brings
  `typography.css` below the absolute ceiling without selector, cascade, bundle,
  or verification drift.
- The two hash-bound historical authority files above 1,000 lines require an
  Owner decision on a preservation or modularisation path before their next
  substantive change; they were not altered in this documentation-only phase.

Reviewer must independently inspect the pushed candidate and record a permitted
verdict in this file. Builder stops here.
