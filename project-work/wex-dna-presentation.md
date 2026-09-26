# WEX DNA Presentation

Status: BUILDER ACTION REQUIRED
Phase: 1 — Present accepted Page Heading DNA v1

## Reviewer verdict

**Proceed**

Baseline: accepted `main` at
`40d815e7743eae8832f59e311af89fd5fcafd502`.

Owner-approved presentation direction:
- primary surface identity is **WEX DNA**;
- “Design Tokens” is explanatory terminology, not the primary page/tab name;
- only registered WEX DNA may appear;
- first visible family is `Heading DNA -> Page Heading`.

## Authority / first operating stops

Read before editing:
- `docs/code-map/heading-dna.md`;
- `docs/decisions/0012-page-heading-dna.md`;
- current WEX typography/colour authority routed by that Code Map;
- current runtime source/tests under `apps/web-runtime/`.

This phase authorises the existing web-runtime/GitHub Pages catalogue as a
read-only consumer of accepted Page Heading DNA v1.

## Scope

Use the existing `apps/web-runtime/design-tokens/` route. **Do not rename or
move the route.**

Update presentation so:

1. Shared foundation navigation labels the existing route **WEX DNA** everywhere
   it is shown, including the root foundation index.
2. The page title/H1 presents **WEX DNA**. “Design Tokens” may appear as concise
   explanatory copy beneath/alongside it.
3. Show only the accepted family:
   `Heading DNA -> Page Heading`.
4. Present `Default` as the complete DNA and the registered attributes only:
   - Size: `Small`
   - Colour: `Light`, `Accent`
   - Weight: `Bold`, `Thin`
   - Style: `Italic`
5. Make inheritance understandable: attributes are sparse overrides and inherit
   every concern they do not own from Default.
6. Where visual specimens are shown, resolve them from existing WEX
   foundation/token authority. Do not duplicate raw values or create a parallel
   DNA resolver/token system.
7. Preserve existing light/dark theme behaviour and established catalogue
   presentation rules.
8. Refresh the Heading DNA Code Map only as needed to add the accepted runtime
   presentation path/checks and current verification metadata.

## Presentation safeguards

- Do not display unregistered heading roles or speculative DNA families.
- Do not add Page Subheading, Layout Heading, Section Heading, or future roles.
- Do not define/modify a Heading component, schema, HTML heading ownership,
  page-builder/composition system, brand customisation, or new DNA authority.
- Do not invent loading/shimmer; it remains absent for Page Heading.
- Do not hardcode visual values already owned by WEX foundations.
- Keep attribute usage governance visible where useful; `Italic` is text
  emphasis only, not decorative styling.
- Keep existing route compatibility: `/design-tokens/` remains valid.

## Required verification

Builder must:
1. confirm remote heads before creating one topic branch and stay within the
   three-branch maximum;
2. add/update focused catalogue tests so they prove WEX DNA naming, registered
   Page Heading-only content, attribute set, route preservation, and no
   speculative roles/raw visual values;
3. run focused runtime tests, `git diff --check`, and `pnpm check`;
4. validate the exact candidate in Chrome/local preview for desktop + compact
   layout, keyboard/skip/focus behaviour, and light/dark presentation;
5. commit and push the topic branch;
6. update this SAME work file to `Status: AWAITING REVIEWER REVIEW` with exact
   branch/SHA, changed files, checks, browser evidence, deviations, and any
   authority gap;
7. stop for Reviewer.

If correct presentation requires inventing a token/reference mechanism or new
DNA authority, stop that item and report the gate instead.


## Owner steering — Light colour specimen — 2026-09-26

**Proceed**

Clarification for Phase 1 presentation only:

- `Page Heading / Light` does **not** own a background.
- Its DNA delta remains the accepted colour override only; all other Page
  Heading concerns inherit from Default.
- The catalogue may use a dark demonstration surface behind the `Light`
  specimen in both global theme views so the foreground role remains legible
  and visually clear.
- That dark specimen surface is presentation scaffolding only. Do not encode it
  into Page Heading DNA, do not add a surface/background attribute, and do not
  imply that the heading controls its parent background.
- The actual heading foreground must continue to resolve dynamically through
  the existing WEX colour/theme authority. Do not hardcode separate light-theme
  or dark-theme values in the DNA presentation.
- Preserve the accepted theme-aware swap behaviour: the registered colour role
  resolves through WEX theme authority when the global theme changes.
- Tests and browser evidence must distinguish the specimen context from the DNA
  contract and prove no background ownership was introduced.

No other Page Heading DNA mapping or attribute is reopened by this clarification.
