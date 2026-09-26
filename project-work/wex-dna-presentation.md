# WEX DNA Presentation

Status: BUILDER ACTION REQUIRED
Phase: 1B — Present accepted Page Heading DNA v1

## Reviewer verdict

**Proceed with safeguards**

Accepted `main`: `5f428ceb3948247688d53019b0972157c4b2a601`.

## Reviewer closeout verification — 2026-09-26

Phase 1A is accepted.

Independently verified:
- remote `main` is exactly the accepted Light-authority SHA;
- only `main` and `Project-work-instructions` remain remotely;
- ADR 0012 on `main` maps Default to `--wex-color-text-primary` and
  `Light` to persistent `--wex-color-light`;
- the focused test rejects regression to `--wex-color-text-inverse`;
- no runtime or colour-foundation source changed.

Safeguard: the Heading DNA Code Map still says it was verified against the
deleted topic branch / old main baseline. Refresh that metadata as part of this
phase; do not change its authority content.

## Presentation scope

Use the existing `apps/web-runtime/design-tokens/` route. Do not rename or
move the route.

Present:
- shared navigation label: **WEX DNA**;
- page title/H1: **WEX DNA**;
- “Design Tokens” only as explanatory terminology;
- only `Heading DNA -> Page Heading`;
- Default as the complete DNA;
- registered sparse attributes only:
  - Size: `Small`
  - Colour: `Light`, `Accent`
  - Weight: `Bold`, `Thin`
  - Style: `Italic`.

Make inheritance clear: every attribute overrides only its registered concern
and inherits everything else from Default.

## Binding colour behaviour

```text
Default -> --wex-color-text-primary -> follows global theme
Light   -> --wex-color-light        -> remains light in both themes
Accent  -> --wex-color-text-accent  -> existing WEX accent role
```

For the `Light` specimen, use a dark demonstration surface in both light and
dark global themes so the persistent-light heading is legible. That surface is
catalogue scaffolding only. It must not be encoded as Heading DNA, a background
attribute, or parent-surface ownership.

## Safeguards / exclusions

- Resolve specimens only through existing WEX foundation/token authority.
- No raw visual values or parallel DNA/token resolver.
- No new DNA roles, Heading component, schema, HTML heading ownership,
  page-builder/composition system, brand customisation, loading/shimmer, or
  background/surface attribute.
- Preserve `/design-tokens/` compatibility.
- Preserve established theme and accessibility behaviour.
- Refresh Heading DNA Code Map runtime paths/checks and verification metadata
  only as needed.

## Required verification / handoff

Builder must:
1. confirm remote heads, then create one topic branch within the three-branch
   maximum;
2. update focused catalogue tests proving WEX DNA naming, route preservation,
   Page Heading-only content, exact registered attributes, persistent Light
   behaviour, and absence of speculative roles/raw values;
3. run focused runtime tests, `git diff --check`, and `pnpm check`;
4. validate the exact candidate in Chrome/local preview for desktop + compact
   layout, keyboard/skip/focus behaviour, and light/dark presentation;
5. push the topic branch;
6. update this SAME file to `Status: AWAITING REVIEWER REVIEW` with exact
   branch/SHA, changed files, checks, browser evidence, deviations, and gaps;
7. stop for Reviewer.
