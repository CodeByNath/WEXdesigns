# Heading DNA

Status: BUILDER ACTION REQUIRED
Phase: 4 — Promote accepted Heading DNA and close

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


## Reviewer review — 2026-09-26

**Proceed**

Accepted candidate `origin/heading-dna` at
`7cae718e395555e248c3fd05a9df7033ecf1d0de`.

Verified:
- exactly one commit ahead of accepted `main`;
- changed only `AGENTS.md`, `docs/code-map/README.md`, and
  `docs/code-map/heading-dna.md`;
- agent routing is navigation-only;
- the Heading DNA Code Map does not register roles or values;
- all seven Owner questions remain explicit unresolved gates;
- no CSS, schema, component API, runtime, HTML heading semantics, brand
  customisation, or other Design Token family was introduced.

### Owner decision gate

Before Phase 3 may define Heading DNA, Owner must answer:

1. Initial family: exactly `Page Heading`, `Page Subheading`,
   `Layout Heading`, `Section Heading`?
2. Defer `Subsection Heading` and `Group Heading` until demonstrated?
3. Which v1 inputs may Heading DNA carry: typography, colour, responsive,
   theme/inversion, spacing relationship, interaction/state?
4. Which inputs are mandatory versus optional?
5. Semantic-only names, with visual-size names prohibited?
6. Exact no-match escalation rule for AI/agents?
7. DNA version/deprecation rule in v1, or defer?

No Builder action is authorised until these Owner decisions are recorded.


## Owner decisions — 2026-09-26

The seven gates are resolved by a demonstrated-need rule rather than by
pre-building the full future matrix.

1. Do not register a complete heading family in advance. Start with
   `Page Heading` only. Other heading roles are added only when demonstrated.
2. `Page Subheading`, `Layout Heading`, `Section Heading`,
   `Subsection Heading`, `Group Heading`, and any other role remain absent
   until needed; absence is not permission for AI to improvise.
3. Page Heading v1 may carry only presentation inputs demonstrated by the
   current need and existing WEX authority. The Default is the complete DNA.
4. Attributes are sparse overrides: an attribute changes only the concern it
   owns and inherits every other value/behaviour from Default.
5. Base DNA names are semantic. Attribute names may express governed variants
   such as `Small`, `Light`, `Accent`, `Bold`, `Thin`, and
   `Italic`; raw-value naming such as `32px` is not permitted.
6. No-match rule: AI must use registered WEX DNA only. If no registered DNA or
   attribute matches, it must request an Owner decision or consult an
   authorised AI/WEX engineer. It must not invent, approximate, substitute,
   or create a value/token/attribute.
7. Version/deprecation machinery is deferred until a demonstrated change
   requires it.

Attribute usage rules are part of governance. Example: `Italic` is for text
emphasis only and must not be used as decorative styling.

## Phase 3 Builder instruction

Define **Page Heading DNA v1 only** on the existing `heading-dna` topic branch.

Required model:

```text
Page Heading
├── Default
└── Attributes
    ├── Size
    │   └── Small
    ├── Colour
    │   ├── Light
    │   └── Accent
    ├── Weight
    │   ├── Bold
    │   └── Thin
    └── Style
        └── Italic
```

Rules:
- Default carries the complete Page Heading DNA required by current WEX
  presentation, including the existing default typography, default dark
  colour, loading/shimmer behaviour where current WEX authority already
  defines it, and any other already-authoritative default needed for the role.
- Do not invent missing visual values. Resolve mappings from current WEX
  authority/source and existing Code Maps. If a required mapping is ambiguous
  or absent, stop that item and report the authority gap.
- Each attribute stores only its own delta from Default.
- `Small` changes only the approved typography/size concern.
- `Light` and `Accent` change only the approved colour concern.
- `Bold` and `Thin` change only the approved weight concern.
- `Italic` changes only the approved style concern and must carry the usage
  instruction: text emphasis only; not decorative styling.
- Do not duplicate inherited Default values inside attributes.
- Do not create or modify a Heading component, HTML heading semantics,
  component props, page-builder logic, arbitrary margins/layout composition,
  brand customisation, or other DNA families.
- Keep the Heading DNA Code Map as navigation; place normative DNA authority
  in the repository location justified by existing architecture. If no
  authoritative Design Token/DNA storage location exists, stop before
  inventing one and report the architecture gate.

Required evidence:
- exact authority/source mappings used for every Default and attribute value;
- changed-file list and why;
- focused tests/validation appropriate to the chosen representation;
- `git diff --check` and `pnpm check`;
- pushed candidate SHA;
- SAME work file -> `Status: AWAITING REVIEWER REVIEW`;
- stop for Reviewer.


## Owner steering — dynamic atom-to-DNA references — 2026-09-26

This rule is binding for Phase 3 before any Page Heading DNA implementation:

- The connection between WEX foundations/atoms and DNA must be dynamic and
  tokenized.
- DNA owns approved relationships to existing authoritative WEX foundation
  tokens; it must not duplicate resolved raw values when authoritative tokens
  already exist.
- Raw values such as hex colours, pixel sizes, font weights, line heights,
  spacing values, radius/border values, animation/loading values, or other
  governed foundation values must not be copied into DNA when an authoritative
  token/reference already exists.
- If an underlying WEX foundation token changes, consuming DNA must inherit the
  change without redefining duplicated raw values.
- Attribute overrides follow the same rule: each attribute references only the
  approved foundation token(s) for the concern it overrides and must not repeat
  inherited Default values.
- Conceptual resolution is:
  `Foundation token -> Page Heading Default DNA reference -> sparse registered
  attribute override -> consuming component/composition`.
- Do not invent a new token system, raw alias, storage location, or token
  naming convention to satisfy this rule.
- If the repository lacks the required stable token/reference mechanism, stop
  that implementation item and report the architecture gap instead of
  hardcoding values.

Builder must treat this section as part of the Phase 3 acceptance criteria.

## Phase 3 Builder handoff — 2026-09-26

Candidate: `heading-dna` at
`b57d0e6b612f8f5132ccb1b913e86dd2bc3ccdd0`, pushed and verified on
`origin/heading-dna`.

The proposed authority is `docs/decisions/0012-page-heading-dna.md`; this uses
the existing Decisions layer rather than inventing a DNA storage system. It is
explicitly proposed, not yet registered or usable, pending Reviewer acceptance.

Exact token-reference mappings:

- Default: Heading Large family, size, line-height, and letter-spacing tokens;
  `--wex-type-weight-regular`; `--wex-type-style-normal`; and
  `--wex-color-text-primary` with existing theme resolution.
- `Small`: only Heading Small size and line-height token references; all other
  Default concerns inherit.
- `Light` / `Accent`: only `--wex-color-text-inverse` /
  `--wex-color-text-accent` respectively.
- `Bold` / `Thin`: only `--wex-type-weight-semibold` /
  `--wex-type-weight-light` respectively.
- `Italic`: only `--wex-type-style-italic`, restricted to text emphasis and not
  decorative styling.

The binding dynamic atom-to-DNA rule is made explicit in the proposed decision,
Code Map, and focused test: DNA stores only approved relationships to existing
foundation tokens, never their resolved raw values; attributes are sparse. No
heading loading/shimmer authority exists, so no such concern was added.

Changed files: `AGENTS.md` and Code Map index/map route to the proposed
authority; Decisions index and 0012 record it; the WEX focused test detects
mapping drift and raw hex values. No CSS, schema, component, runtime, HTML
heading semantics, layout, or other DNA family changed.

Checks passed: `git diff --check`; focused
`node --test packages/wex/test/page-heading-dna.test.mjs`; `pnpm check`
(Foundation audit and 35 Turbo tasks). The existing missing-`pnpm-lock.yaml`
warning did not prevent success. Browser validation: n/a; no browser-facing
implementation changed.

## Reviewer metadata audit — 2026-09-26

**Proceed with safeguards**

Independent review of `origin/heading-dna` at
`001b5d2ec3ceae20061264fac4461def32403de5` confirms the accepted authority,
runtime evidence, sparse token-reference model, no raw-value duplication, and
all reported checks. The focused test and `pnpm check` also pass independently.

### Required Builder correction

On the SAME `heading-dna` branch only, update
`docs/code-map/heading-dna.md`'s `Verified against` SHA from the prior
`b57d0e6…` candidate to the currently reviewed `001b5d2…` candidate. This is
required because the map itself changed in that correction; its metadata must
identify the current checked source state under repository-governance rules.

Do not change the authority, token references, attribute set, tests, runtime,
or any other source. Run `git diff --check`, commit and push this one-file
metadata correction, then update this SAME work file to
`Status: AWAITING REVIEWER REVIEW` with the exact SHA and stop for Reviewer.

## Metadata correction handoff — 2026-09-26

Candidate: `heading-dna` at
`40d815e7743eae8832f59e311af89fd5fcafd502`, pushed and verified on
`origin/heading-dna`.

Changed only `docs/code-map/heading-dna.md`: its `Verified against` metadata
now identifies the current prior-reviewed candidate
`001b5d2ec3ceae20061264fac4461def32403de5`, rather than the earlier
`b57d0e6…` state. `git diff --check` passed. No authority, mapping, Attribute,
test, runtime, or other source changed; per the bounded Reviewer instruction,
no broader check or browser validation was required.


## Reviewer review — 2026-09-26

**Proceed with safeguards**

Independent review accepts the Phase 3 architecture and token-reference model in
candidate `origin/heading-dna` at
`b57d0e6b612f8f5132ccb1b913e86dd2bc3ccdd0`.

Verified:
- candidate is one commit ahead of the previously accepted Heading DNA
  navigation candidate;
- DNA stores WEX foundation-token references, not duplicated raw values;
- Default is complete and Attributes are sparse concern-only overrides;
- no CSS, schema, component, runtime, HTML heading semantics, layout,
  page-builder, brand-customisation, or other DNA family was introduced;
- focused test rejects raw hex values and checks registered token references;
- no loading/shimmer concern was invented because no current WEX authority
  exists for it.

### Required Builder closeout correction

Before promotion, on the SAME `heading-dna` branch only:

1. Change ADR 0012 from `Proposed` to accepted authority wording now that the
   Reviewer has accepted its content.
2. Update `docs/decisions/README.md`, `AGENTS.md`, and
   `docs/code-map/heading-dna.md` so they no longer describe Page Heading DNA
   v1 as merely proposed/unregistered.
3. The ADR currently states that the current WEX runtime demonstrates Page
   Heading using Heading Large. Preserve that claim only if the Builder can cite
   the exact existing source/runtime path that proves it. Otherwise remove the
   runtime-evidence claim and present Heading Large as the accepted Page Heading
   Default mapping established by ADR 0012.
4. Do not change the accepted mappings, attribute set, token references, or
   architecture unless required by item 3's evidence correction.
5. Update the focused test if wording/status assertions require it; do not turn
   the test into a second specification.
6. Run `git diff --check`, the focused Page Heading DNA test, and `pnpm check`.
7. Commit and push the bounded correction, then update this SAME work file to
   `Status: AWAITING REVIEWER REVIEW` with exact SHA and evidence.
8. Stop for Reviewer. Do not merge to `main` yet.

## Phase 3 closeout correction handoff — 2026-09-26

Candidate: `heading-dna` at
`001b5d2ec3ceae20061264fac4461def32403de5`, pushed and verified on
`origin/heading-dna`.

Changed only the Reviewer-requested closeout files: `AGENTS.md`, the Code Map
index/map, Decisions index, ADR 0012, and the focused test. ADR 0012 now has
accepted authority wording and Page Heading DNA v1 is registered in routing.
The exact runtime evidence is `apps/web-runtime/index.html`, whose root-page
`h1` uses `wex-type-heading-large-semibold`; the ADR limits that evidence to
the Heading Large tier and retains Regular as the accepted Default weight token.

No mapping, Attribute set, token reference, CSS, schema, component, runtime,
HTML semantics, layout, or other DNA family changed. Checks passed:
`git diff --check`; focused
`node --test packages/wex/test/page-heading-dna.test.mjs`; and `pnpm check`
(Foundation audit and 35 Turbo tasks). The existing missing-`pnpm-lock.yaml`
warning did not prevent success. Browser validation: n/a; no browser-facing
implementation changed.


## Final Phase 3 Reviewer verdict — 2026-09-26

**Proceed**

Independent review accepts `origin/heading-dna` at
`40d815e7743eae8832f59e311af89fd5fcafd502`.

Verified:
- metadata correction is exactly one commit after
  `001b5d2ec3ceae20061264fac4461def32403de5`;
- that commit changes only `docs/code-map/heading-dna.md`;
- the only correction is the Code Map verification metadata requested by the
  prior Reviewer instruction;
- the full topic branch remains four commits ahead of accepted `main` and
  contains only the authorised Heading DNA navigation, ADR authority, routing,
  and focused verification work;
- no accepted DNA mapping, Attribute set, token reference, runtime, CSS,
  schema, component, HTML semantics, layout, brand customisation, or other DNA
  family changed.

### Builder closeout

Promote the exact accepted topic branch tip
`40d815e7743eae8832f59e311af89fd5fcafd502` to `main` using the repository's
normal non-destructive path.

Then:
1. verify exact remote `main` SHA and that ADR 0012, Heading DNA Code Map,
   routing, and focused test are present;
2. run/confirm required post-promotion checks, including `pnpm check`;
3. prove the completed topic branch is contained in `main`;
4. delete remote `heading-dna` after containment is proven, preserving only
   `main` and `Project-work-instructions`;
5. update this SAME work file to `Status: AWAITING REVIEWER REVIEW` with final
   main SHA, checks, and branch-housekeeping evidence;
6. stop for final Reviewer closeout.

No further Heading DNA content changes are authorised in this phase.
