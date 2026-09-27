# Global Components Catalogue

Status: BUILDER ACTION REQUIRED
Phase: 1 — Establish Global Components page and ecosystem entrypoint

## Reviewer verdict

**Proceed with safeguards**

Prerequisite accepted `main`:
`0fb41926c3ca4ace21e083ce62b0c06f242cbdc4`.

Global Tokens / Typography DNA is closed after Owner live-browser validation.
The completed remote `feat/global-tokens-remaining` branch must be removed
before a new topic branch is opened.

## Owner direction

Create a first-class **Global Components** page and join it to the existing WEX
catalogue/navigation ecosystem. This page becomes the catalogue entrypoint for
approved shared/global component families.

Button is the first proven component family and should appear as the initial
registered component. This phase does **not** authorise new component families.

## Required Builder work

1. Reconfirm `main` is exactly
   `0fb41926c3ca4ace21e083ce62b0c06f242cbdc4`.
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
