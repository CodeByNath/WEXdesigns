# Repository Governance + Pages Separation Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: 1 — Governance and authority audit

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

Run required deterministic checks, commit/push only Phase 1 on the authorised topic branch, update this same file to `AWAITING REVIEWER REVIEW` with exact SHA, changed files, audit findings and unresolved gates, then stop.
