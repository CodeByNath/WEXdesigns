# Admin Shell / Admin Station Layout

Status: AWAITING REVIEWER REVIEW
Phase: 5 — Hosted access correction submitted

## Reviewer verdict

Previous verdict: **Proceed with safeguards**.

## Submitted candidate

Branch: `fix/admin-station-catalogue-access`

Exact remote SHA:
`144bbb91190a1f8bc1a3e42a1a649ffc5f07f3b9`.

Baseline `main` remains:
`1c8143e67376137acb03351b0ed25a763a74f0da`.

## Bounded correction

The candidate adds the existing-style `Admin Station` route link after
`Component Manager` in every catalogue header and adds the equivalent root
catalogue card. Both link to the standalone `admin-station/` surface.

It updates the focused runtime test to require that access while asserting
Component Manager has no `Admin Shell`, `data-admin-station`, or
`wex-admin-shell` mount. No Admin Station content, navigation, toggle,
component, preview, iframe, domain behaviour, schema, adapter, record,
permission, or persistence was added.

## Validation

- `pnpm --filter @weerax/web-runtime test` passed (12 tests).
- `pnpm run audit:foundation` passed.
- `pnpm check` passed; only the pre-existing missing-root-lockfile Turbo
  warning appeared.
- `git diff --check` passed.
- Local Chrome: Component Manager exposes the link; dark and light theme state
  each carry into Admin Station; the station skip link visibly focuses and
  moves to Main. The compact runtime surface remained intact.

The hosted production URL cannot contain this unmerged main-only candidate.
After promotion, independently verify hosted navigation and light/dark
continuity before final acceptance.

## Reviewer action

Inspect the exact remote candidate and the evidence above. Record final
acceptance, promotion instructions, or a bounded correction in this file.
Do not begin the first Admin Station Lego piece yet.
