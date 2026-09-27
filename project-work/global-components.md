# Global Components Catalogue

Status: AWAITING REVIEWER REVIEW
Phase: 1 — Establish Global Components page and ecosystem entrypoint

## Reviewer verdict

**Proceed with safeguards**

Prerequisite accepted `main`:
`e62818163b21bff94c77f2b4a0b6dfb889d7b971`.

Global Tokens / Typography DNA is closed after Owner live-browser validation and the Reviewer-accepted Light-demo card border correction through `e62818163b21bff94c77f2b4a0b6dfb889d7b971`.
The completed remote `feat/global-tokens-remaining` branch must be removed
before a new topic branch is opened.

## Builder handoff

Candidate: `feat/global-components` at
`6f35b0de00940902d2a298c91724950b8362a2b5`.

Housekeeping completed before the candidate branch was opened: the remote
`feat/global-tokens-remaining` branch was deleted, and the remote then exposed
only `main` and `Project-work-instructions`. The candidate starts from accepted
`main` `e62818163b21bff94c77f2b4a0b6dfb889d7b971`.

Changed files: `apps/web-runtime/{index,colour/index,typography/index,actions/index,layout/index,global-tokens/index,global-components/index}.html`,
`apps/web-runtime/{vite.config.ts,test/catalogue.test.mjs}`, and
`docs/{architecture/repository-map.md,code-map/README.md,code-map/global-components.md}`.

Checks passed: `git diff --check`; `pnpm --filter @weerax/web-runtime test`
(9 tests); `pnpm --filter @weerax/web-runtime build`; and `pnpm check` (35
tasks). Chrome candidate validation covered the new route and shared navigation
on desktop and compact viewports, light and dark themes, and keyboard skip-link
transfer to main. The Registered components section is visibly empty.

Owner-directed deviation from the original Builder brief: Button is deliberately
not registered, linked, or shown on this page. The catalogue is an empty
entrypoint; existing Actions/Button implementation is untouched. Reviewer
should assess and reconcile this explicit direction before acceptance. Pages is
main-only, so candidate browser evidence used the local Vite preview.

## Owner direction

Create a first-class **Global Components** page and join it to the existing WEX
catalogue/navigation ecosystem. This page becomes the catalogue entrypoint for
approved shared/global component families.

Button is the first proven component family and should appear as the initial
registered component. This phase does **not** authorise new component families.

## Required Builder work

1. Reconfirm `main` is exactly
   `e62818163b21bff94c77f2b4a0b6dfb889d7b971`.
2. Delete the completed remote `feat/global-tokens-remaining` branch; verify
   only `main` and `Project-work-instructions` remain before creating one new
   topic branch for this phase.
3. Start from `docs/code-map/button-system.md`, ADRs 0005–0008, repository map,
   and current runtime navigation. Treat them as authority; do not infer Button
   architecture from old catalogue presentation.
4. Create a Global Components Code Map as the new demonstrated-subject
   entrypoint before source implementation. It should route to Button authority,
   shared UI/WEX/schema source, tests, and future component-registration rules;
   it must not invent future component families.
5. Add `/global-components/` to `apps/web-runtime` using the existing
   catalogue shell and WEX presentation only.
6. Integrate **Global Components** into the root page and shared navigation of
   all existing catalogue routes, after Global Tokens.
7. On the new page, present **Button** as the first registered global component.
   Reuse/point to the already-approved Button system; do not duplicate or
   redesign Button authority, variants, states, schema, or runtime invocation.
8. Keep Actions as its existing Button presentation page unless repository
   authority demonstrates a safe non-duplicative relationship. Do not move
   source or rename Actions casually.
9. Correct only stale repository-map wording made false by the already-existing
   Button implementation or this new catalogue entrypoint. Do not widen package
   responsibilities.
10. Add/update focused runtime/navigation tests for the new route and Button
    registration. No new CSS values, component family, schema, adapter, domain
    behavior, or framework dependency.
11. Run focused tests, `git diff --check`, `pnpm check`, and Chrome
    desktop/compact + light/dark + keyboard/focus validation.
12. Commit/push one topic candidate, update this same file to
    `AWAITING REVIEWER REVIEW` with exact SHA, changed files, checks, browser
    evidence, housekeeping proof, and any limitation; stop.

## Boundary

This phase establishes the Global Components **catalogue surface and registry
entrypoint**, with Button only. Any next component requires its own demonstrated
need and authority.
