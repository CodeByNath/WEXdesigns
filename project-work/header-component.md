# Header Component

Status: BUILDER ACTION REQUIRED
Phase: Header implementation Work Package — contract, WEX, Shared UI, Component Manager proof

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
     where applicable, overflow/layout stability, and the responsive location
     replacement;
   - do not register/finalise the Header in Global Components and do not fit it
     into Admin Station in this package.

5. Update focused tests and relevant Code Maps.

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
