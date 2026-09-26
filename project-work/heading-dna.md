# Heading DNA

Status: AWAITING REVIEWER REVIEW
Phase: 3 — Page Heading DNA v1 candidate pushed

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
