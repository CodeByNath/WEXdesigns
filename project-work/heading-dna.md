# Heading DNA

Status: AWAITING REVIEWER REVIEW
Phase: 1 — Agent/index routing, Code Map, and Owner questions

## Reviewer verdict

**Proceed**

Open the first governed WEX Design Token / DNA subject using accepted `main` at:

`bf5f1fd9aebc7b05da75a0d521dcb9a83c3a0a8e`

This phase does not author Heading DNA values yet. It creates the navigation and decision boundary required before DNA is defined.

## Owner direction already accepted

- Design Tokens are **WEX DNA**.
- Components are collections of Design Tokens.
- AI may only use registered WEX Design Tokens.
- If no suitable token exists, AI must not invent, approximate, substitute, or create one.
- Missing DNA must be escalated to the Owner or authorised AI/WEX engineer through governed work.
- Heading DNA is semantic, not component logic.
- Initial heading roles under discussion:
  - Page Heading
  - Page Subheading
  - Layout Heading
  - Section Heading

## Phase 1 scope

Builder must add only the minimum navigation/support structure needed to make Heading DNA a demonstrated subject:

1. update the repository agent/index routing so an agent can discover Design Tokens / Heading DNA without duplicating authority;
2. update `docs/code-map/README.md` with a Heading DNA subject entry;
3. create a concise Heading DNA Code Map that routes to current colour, typography, spacing/layout/interaction authority as evidence only;
4. create/record the explicit Owner questions that must be answered before Heading DNA values are authored;
5. preserve the rule that Code Maps navigate and do not become the specification.

Do not create Heading DNA values, CSS custom properties, schemas, component APIs, runtime rendering, or presentation implementation in this phase.

## Required Owner questions

The Builder must present these as unresolved gates, not answer them:

1. Is the initial registered heading family exactly:
   `Page Heading`, `Page Subheading`, `Layout Heading`, `Section Heading`?
2. Are additional roles such as `Subsection Heading` or `Group Heading` deferred until a demonstrated need exists?
3. What foundation inputs may a Heading DNA token carry in v1:
   typography mapping, colour mapping, responsive mapping, theme/inversion mapping, spacing relationship, interaction/state mapping?
4. Which of those are mandatory for every Heading DNA token versus optional only when demonstrated?
5. Should Heading DNA names be semantic-only and permanently avoid visual-size naming such as XL/L/32px?
6. What exact escalation wording should agents follow when no registered DNA matches the requested role?
7. Does WEX require a version/deprecation rule for DNA changes in v1, or is that deferred?

## Exclusions

Do not:
- define or modify Heading components;
- add HTML semantics such as h1/h2/h3 ownership;
- add margins/layout composition rules to headings unless later authorised as DNA;
- create arbitrary raw values;
- change existing Colour, Typography, Actions, Layout, Button, Spacing, or Sizing authority;
- introduce brand customisation in this phase;
- widen into other Design Token families.

## Builder handoff evidence

- Candidate: `heading-dna` at `7cae718e395555e248c3fd05a9df7033ecf1d0de`,
  verified on `origin/heading-dna`.
- Remote heads at creation: `main` and `Project-work-instructions`; topic is
  permitted third branch.
- Changed files: `AGENTS.md`, `docs/code-map/README.md`, and
  `docs/code-map/heading-dna.md`.
- Checks passed: `git diff --check`; `pnpm check` (Foundation audit; 35 Turbo
  tasks). The existing missing-`pnpm-lock.yaml` warning did not prevent success.
- Browser validation: n/a; no browser presentation changed.
- No deviations. The seven Owner questions remain unresolved; no DNA values,
  contracts, components, or implementation were added.

## Builder handoff

Builder must:
- verify remote heads before topic-branch creation;
- keep within the three-remote-branch limit;
- change only documentation/navigation files required by this phase;
- run `git diff --check` and `pnpm check`;
- commit and push the topic branch;
- update this SAME file to `Status: AWAITING REVIEWER REVIEW` with exact branch/SHA, changed files, checks, and unresolved Owner questions;
- stop for Reviewer.
