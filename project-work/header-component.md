# Header Component

Status: AWAITING REVIEWER REVIEW
Phase: Header implementation Work Package — candidate submitted for review

## Reviewer verdict

**Proceed**

The Header Code Map metadata promotion is independently verified. Remote
`main` is exactly
`06faa4509926f0f55db3e749dd65a99d5ad1e75c`; the promoted tree matches the
accepted candidate and remote heads are only `main` and
`Project-work-instructions`.

ADR 0020 is accepted Header authority.

The project cycle has also been streamlined: once Reviewer accepts an exact
pushed SHA and explicitly authorises fast-forward promotion, Builder may finish
promotion, deterministic checks, factual verification-metadata refresh, safe
branch deletion, and closeout in the same transaction without a second
promotion-review loop, provided no product/source meaning changes.

## Work Package outcome

Deliver the first reusable Header candidate end-to-end in the isolated
Component Manager, without fitting it into Admin Station.

## Included work

1. **Schema contract**
   - implement the minimum framework-neutral Header/Navigation serializable
     contract required by ADR 0020;
   - enforce exactly one Brand and one Navigation direct child;
   - enforce Navigation slots for location, Search, PrimaryNavigation, and
     MainAction;
   - represent the closed LocationLabel/SidebarTrigger responsive forms without
     serialising CSS, raw breakpoints, callbacks, routes, search behaviour, or
     domain data;
   - child slots may use minimal governed capability/reference descriptors;
     do not invent full child-component families merely to satisfy Header.

2. **WEX presentation**
   - implement Header-specific WEX presentation using existing
     `--wex-space-64`, `--wex-space-16`, `--wex-space-8`, and the existing
     compact <=767px boundary;
   - Header 64px, Brand 64x64, Navigation remaining width;
   - Large/Medium gutters 16px outer + 8px immediate inner;
   - compact gutters 8px outer + 8px immediate inner;
   - responsive LocationLabel/SidebarTrigger presentation/composition rule;
   - Navigation alignment: Location/SidebarTrigger is the left-aligned/start
     region; Search and PrimaryNavigation belong to the right-aligned/end
     utility region; MainAction remains the final inline-end slot;
   - preserve the right-side order as Search -> PrimaryNavigation -> MainAction
     unless later child authority changes that internal child ordering;
   - no local raw visual values where an accepted WEX value exists.

3. **Shared UI structure**
   - implement reusable Header/Navigation structure and accessibility mechanics
     in `@weerax/ui`;
   - consume schemas + WEX only;
   - keep child internals opaque to the parent;
   - no business navigation, search execution, route maps, permissions,
     persistence, account state, or callbacks.

4. **Component Manager proof**
   - mount the Header candidate only in the isolated Component Manager preview;
   - use controlled inert fixture data/capability placeholders for child slots;
   - prove Large/Medium/compact behaviour through existing viewport controls;
   - validate theme continuity, semantic structure, keyboard/focus behaviour
     where applicable, overflow/layout stability, responsive location
     replacement, and the required split alignment: Location at inline-start,
     Search + PrimaryNavigation + MainAction at inline-end;
   - do not register/finalise the Header in Global Components and do not fit it
     into Admin Station in this package.

5. Update focused tests and relevant Code Maps.

## Owner presentation correction — 2026-10-05

The current visual fixture showing Location, Search, and PrimaryNavigation
clustered together on the left is not accepted.

Required Header navigation allocation:
- Brand remains its fixed Header child allocation;
- LocationLabel / SidebarTrigger occupies the Navigation inline-start side;
- Search and PrimaryNavigation are right-aligned within Navigation;
- MainAction remains the final prominent inline-end control;
- Header/Navigation owns this allocation only; Search and PrimaryNavigation
  continue to own their own internals and modes.

This is a Header-specific WEX composition/presentation rule, not domain
navigation behaviour and not permission to create new child component families.

## Hard exclusions

No Admin Station fitting; no real Brand/Search/PrimaryNavigation/MainAction/
SidebarTrigger component-family implementation beyond the minimum opaque
fixture/reference boundary required to prove Header composition; no host/domain
adapter; no WEX Identity allocation/bootstrap work; no bindings; no route/search
business behaviour; no new global tokens/breakpoints; no speculative component
catalogue.

## Stop gates

Stop only if implementation requires:
- a new permanent component-reference/registry abstraction not already justified
  by ADR 0020 and demonstrated Header use;
- a new WEX visual value/breakpoint;
- a new dependency/ownership direction;
- host/domain behaviour;
- destructive migration/runtime state change.

Do not split this package into micro-review gates when work stays inside accepted
authority.

## Evidence and handoff

Use one topic branch within the three-branch limit. Run focused schemas/UI/web
tests, `pnpm audit:foundation`, `pnpm check`, `git diff --check`, and
candidate browser validation in the repository-approved Chromium environment.
Record exact remote SHA, changed files, tests, browser evidence, limitations,
and deviations in this same file; set `AWAITING REVIEWER REVIEW` and stop.

After Reviewer accepts the exact candidate SHA, the streamlined exact-SHA
promotion-closeout rule applies; no second Reviewer promotion gate is required
unless the promoted/runtime evidence differs from the accepted candidate.

## Builder handoff — 2026-10-05

Candidate branch: `feat/header-component`

Exact remote candidate: `e1a2bd722f57f716eb009d881c200180e30f5e71`

Remote verification: `git ls-remote --heads origin refs/heads/feat/header-component`
returned that exact SHA.

### Delivered boundary

- Strict, framework-neutral Header schema with exactly one Brand and one
  Navigation direct child, and closed opaque capability slots for Location,
  Search, PrimaryNavigation, and MainAction.
- WEX Header foundation: 64px Header and Brand, existing 16px/8px gutters,
  existing compact <=767px location replacement, and explicit start/end
  allocation: Location/SidebarTrigger at inline-start; Search,
  PrimaryNavigation, and MainAction at inline-end in that order.
- Browser-free Shared UI presentation resolver, with no route, callback,
  search, persistence, or domain behavior.
- Isolated Component Manager Header fixture with inert placeholder links and
  semantic `header`/`nav` structure. Header remains unregistered and is not
  fitted into Admin Station.

### Changed files

- `apps/web-runtime/component-manager/{index,preview}.html`
- `apps/web-runtime/src/component-manager-preview.js`
- `apps/web-runtime/test/catalogue.test.mjs`
- `packages/schemas/src/{index.ts,components/header.schema.ts}` and
  `packages/schemas/test/foundation.test.mjs`
- `packages/ui/src/{index.ts,components/header.ts}` and
  `packages/ui/test/header.test.mjs`
- `packages/wex/src/{index.css,foundations/header.css}` and
  `packages/wex/test/header-foundation.test.mjs`
- `tooling/scripts/validate-foundation.mjs`
- `docs/code-map/{header-component,component-manager,global-components,admin-shell}.md`

### Evidence

- Passed: `pnpm build`, `pnpm check`, `pnpm audit:foundation`, and
  `git diff --check`.
- Focused schema, UI, WEX, and Component Manager tests all passed. The WEX
  test asserts both compact replacement and the required start/end allocation.
- Chromium fixture validation before the final alignment-only CSS correction:
  Large (1440px) and Medium (1024px) showed Location; Compact (767px)
  replaced it with Open sidebar; dark theme persisted; keyboard focus on Open
  sidebar was visible; semantic Header navigation and inert fixture slots were
  present. The resulting candidate retains that fixture and adds the focused
  allocation regression test.

### Limitations and deviations

- No real child component family, route, search execution, Sidebar behavior,
  Global Components registration, or Admin Station fitting is included by
  design.
- The owner-requested final alignment adjustment was made after the observed
  Chromium pass; its exact start/end behavior is enforced by the focused WEX
  regression test. Reviewer should visually confirm that allocation on the
  exact SHA before authorising promotion.
- No other deviations or stop-gate triggers occurred.
