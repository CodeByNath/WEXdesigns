# Admin Shell

Status: BUILDER ACTION REQUIRED
Phase: 2 — Promotion deployment correction

## Reviewer verdict

**Proceed with safeguards**

Accepted Admin Shell implementation:
`f75afb8524c272f62708cc64d163980176150f07`.

Current `main`:
`f75afb8524c272f62708cc64d163980176150f07`.

## Reviewer finding

The Admin Shell implementation remains accepted. The promotion failure is a
deployment/tooling defect, not an Admin Shell architecture defect.

Reviewer independently verified GitHub Pages run 39 for the exact accepted SHA
failed at **Type-check index**. The workflow installs the workspace and then
runs:

`pnpm --filter @weerax/web-runtime type-check`

The web runtime now imports `@weerax/ui`, whose package export resolves from
`dist`. The Pages workflow does not build that workspace dependency before
type-checking the runtime. Root Turbo authority already models dependency
ordering through `^build` / `^type-check`, which explains why local
`pnpm check` succeeds while the isolated workflow command fails.

No hosted Admin Shell deployment exists yet. Keep `feat/admin-shell` until
deployment and hosted verification succeed.

## Builder correction instruction

1. Keep this correction inside the existing `feat/admin-shell` topic branch.
2. Change only the Pages workflow/tooling required to make its web-runtime
   validation respect workspace dependency build order.
3. Prefer the smallest deterministic correction: ensure `@weerax/ui` and any
   required workspace dependency artifacts exist before
   `@weerax/web-runtime` type-check/build. Do not add source aliases or alter
   Shared UI/WEX/component architecture merely to satisfy CI.
4. Preserve the existing Node 24 / pnpm 11.16.0 workflow and deployment chain.
5. Make no Admin Shell, schema, WEX presentation, Component Manager, domain, or
   product-behaviour changes.
6. Validate the corrected workflow command sequence locally from a clean-enough
   workspace state, then run `pnpm check` and `git diff --check`.
7. Commit/push the bounded workflow correction on `feat/admin-shell`, update
   this file to `AWAITING REVIEWER REVIEW` with exact SHA and evidence, and
   stop. Do not promote the correction to `main` until Reviewer accepts it.

## Post-correction boundary

After Reviewer acceptance, promote only the workflow correction, require a
successful Pages run for the resulting `main` SHA, validate hosted Component
Manager with Admin Shell across Large/Medium/Compact/Fluid and light/dark, then
remove the topic branch.

Runtime Admin Station integration and later pluggable components remain
separate work.
