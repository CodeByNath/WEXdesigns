# Typography Presentation Completeness Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: Presentation completeness implementation

## Reviewer verdict

**Proceed**

Colour closeout is accepted. Reviewer audited `origin/main` at `a2e81e06989c8493cb27d2a284fe5c35148298f7` and found no concrete defect requiring a typography-core change.

## Executor capability note

2026-09-24: This Builder surface has terminal and Git access but no controllable browser surface. The browser inventory exposed no browser, and local Chrome and in-app browser requests were unavailable, so requirement 8 cannot be evidenced here. No source changes or candidate branch were retained. A browser-capable Builder surface must resume this unchanged `BUILDER ACTION REQUIRED` phase.

## Authority read before implementation

Builder must read:
- `packages/wex/src/foundations/typography.css`
- `packages/wex/src/foundations/font-family.css`
- `packages/wex/src/index.css`
- `packages/wex/src/source/WEX-SOURCE.md`
- `docs/decisions/0003-self-host-ibm-plex-sans.md`
- `docs/code-map/typography-font-delivery.md`
- current `apps/web-runtime/index.html`, `src/catalogue.css`, and catalogue tests.

## Audit finding

The WEX core already defines the complete system. The presentation is incomplete.

Current System Settings shows only four representative Default samples plus three Body tier samples. It does not demonstrate the complete registered styles.

Canonical presentation surface must cover:
- Heading: Small / Default / Large; Light / Regular / Semibold; normal + italic.
- Title: Small / Default / Large; Light / Regular / Semibold; normal + italic.
- Navigation: Small / Default / Large; Semibold only; normal + italic.
- Body: Small / Default / Large; Light / Regular only; normal + italic.

This is 54 resolved registered style specimens in total.

## Builder instruction

Expand only the System Settings Typography presentation so the complete registered typography system is inspectable and visually comparable.

Requirements:
1. Use the canonical WEX classes from `typography.css`; do not recreate typography values in application CSS.
2. Show the hierarchy by core set, then tier, then allowed weight/style variants.
3. Make each specimen identify its canonical class and expose useful computed foundation facts (family, size, line-height, weight, style/italic) from the actual WEX-loaded presentation rather than copying numeric values into HTML/CSS as a second authority.
4. Preserve the ecosystem tier relationship: comparisons inside a tier must use matching Small/Default/Large across sets.
5. Presentation layout may use existing WEX spacing/layout/colour tokens only. No raw typography sizes, line heights, font weights, colours, spacing, or new presentation primitives.
6. Keep IBM Plex delivery owned by WEX; the app must not import/configure fonts independently.
7. Add/update focused tests so omissions and accidental hardcoded typography values are detectable.
8. Validate desktop and compact/mobile presentation, dark/light themes, and actual rendered IBM Plex weights/styles in browser.
9. Run required repository checks, commit/push the topic branch, then update this same file to `AWAITING REVIEWER REVIEW` with exact branch/SHA, changed files, checks, and browser evidence.

## Exclusions / stop gate

Do not edit `typography.css`, `font-family.css`, WEX historical source, ADRs, or typography architecture merely to complete the presentation.

If implementation exposes a concrete core defect, stop and record the exact defect here as `BLOCKED — DECISION REQUIRED`; do not silently redesign typography.

Do not widen into icons, spacing, colour, Button, schemas, shared UI, or other catalogue work.
