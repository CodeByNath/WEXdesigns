# Repository Governance + Pages Separation Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: 3 — GitHub Pages surface separation

## Reviewer verdict

**Proceed**

Phase 2 is accepted at `ffa54971cb328fbd1d327277288af1b8bc18420e`.

The required safeguard is satisfied: the only post-review change is the Typography Code Map metadata closeout, and it now identifies `d99b1d51047d25beae9003744c4916ef5d7d900c` as the verified implementation baseline. No source/runtime/Pages/visual/schema file changed in the closeout.

## Phase 3 authorised scope

Separate the current single System Settings presentation into independent GitHub Pages surfaces for:

- Colour
- Typography
- Actions
- Design Tokens

Use the existing `@weerax/web-runtime` and the existing main-only GitHub Pages deployment. Do not create a parallel site.

Builder must:

1. Work only on `feat/catalogue-pages-governance`.
2. Make the root/index surface a small navigation/entry surface to the four authorised pages.
3. Move the existing Colour presentation to the Colour page.
4. Move the existing Typography presentation to the Typography page without changing its WEX values, classes, specimen meaning, or computed-fact behaviour.
5. Move the existing Button presentation to Actions. Actions may present only already-authorised interaction/action presentation; do not invent new action/component architecture.
6. Create the Design Tokens page only from verified existing WEX authority/source. Do not invent token families, values, or a second token authority.
7. Remove the temporary static `Outer states` section completely from runtime HTML/CSS/tests. Do not replace it with another local abstraction.
8. Preserve the shared header/footer/theme mechanics and canonical `@weerax/wex` bundle.
9. Keep Components deferred. Do not add shared UI components, schemas, adapters, catalogue component families, domain logic, or new WEX visual values.
10. Keep every new/changed authored file <=600 lines; no exception is authorised for this phase.

## Required evidence

- `pnpm audit:foundation`
- `pnpm --filter @weerax/web-runtime type-check`
- `pnpm --filter @weerax/web-runtime test`
- `pnpm --filter @weerax/web-runtime build`
- `pnpm check`
- `git diff --check`
- exact changed-file line counts
- built-output proof that all four page routes exist under the one Pages artifact
- Chrome/local-candidate verification of all four pages: navigation, Light/Dark theme, keyboard focus/skip-link, responsive compact layout, and Typography computed facts where relevant
- explicit proof that `Outer states` runtime markup/styles/tests are gone and no replacement local presentation rule was introduced.

GitHub Pages production remains a separate post-promotion Reviewer boundary because deployment is main-only.

Builder commits/pushes the bounded Phase-3 work, updates this same file to `AWAITING REVIEWER REVIEW` with exact SHA/evidence, and stops.
