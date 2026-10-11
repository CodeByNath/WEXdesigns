# Header / Admin Station Shell

Status: AWAITING REVIEWER REVIEW
Phase: Builder package complete — independent review required

## Owner decision

Proceed with the minimum abstraction forced by the real Logo use case:

**Shared UI owns one platform-neutral render description for Logo.**
The consuming runtime owns only the generic platform materializer.

Required flow:

```text
Logo schema/value
-> @weerax/ui Logo render description
-> generic runtime materializer
-> Header Brand compartment
```

This must remain narrower than a page builder or general rendering framework.

## Architecture requirements

1. Header remains the existing identified Admin Station shell
   `.wex-admin-shell__header`.
2. Header owns the Brand compartment and its 64px × 64px allocation.
3. Logo owns its internal structure once in Shared UI.
4. Component Manager and Admin Station must consume the **same** Logo render
   description. Neither may re-author Logo-specific internal DOM.
5. The runtime materializer must be generic and platform-facing only; it must
   not know Logo, Header, business data, or CompuZign semantics.
6. Schemas remain serializable and contain no DOM nodes, callbacks, component
   constructors, CSS fragments, or application functions.
7. `@weerax/ui` remains platform-neutral: no `document`, browser lifecycle,
   host/domain ownership, API calls, persistence, or CompuZign imports.
8. WEX continues to own presentation values/classes.

Record this accepted boundary in repository authority (normally a new ADR that
builds on ADR 0021) before implementation.

## Current candidate evidence

Review the exact remote candidate:
`feat/logo-header-fitting` at
`2266dc8c8a38a80b5567fdecaa8c0c65b05513d5`.

The package records ADR 0022 before implementation, emits Logo's complete
platform-neutral structure from Shared UI, and has both Component Manager and
Admin Station materialize that same description through one generic web
materializer. The Logo schema and Header's WEX-owned 64px × 64px Brand
allocation are unchanged.

## Builder work package

On the same topic branch:

1. add the minimum reusable render-description contract/type needed by Logo;
2. refactor Logo so its internal wrapper/label structure is authored once in
   Shared UI;
3. add the minimum generic web-runtime materializer required to render that
   description;
4. make Component Manager and Admin Station both use that same Logo structure;
5. preserve the existing Logo schema unless the render boundary genuinely
   requires a separately justified contract change;
6. keep the Header Brand compartment and 64×64 allocation owned by Header/WEX;
7. correct stale Code Map text about Admin Station Logo fitting;
8. re-run focused tests, `pnpm check`, `pnpm audit:foundation`,
   `git diff --check`, and browser proof in Component Manager + Admin Station.

## Hard exclusions

No Location, Search, Navigation System, Main Action, Sidebar, Main, Footer,
Global Components registration, real-host WEX Identity Phase 7, CompuZign
adapter/API integration, generic page-builder/runtime framework, or new WEX
visual values.

## Standing sequence

```text
Header Shell
-> Logo Component
-> fit Logo into Header
-> record the proven shell/compartment/component pattern
-> only then move to the next Header child
```

Push one corrected exact SHA, update this same file to
`AWAITING REVIEWER REVIEW`, and stop.

## Builder evidence — 2026-10-11

- `pnpm --filter @weerax/ui test`, `pnpm --filter @weerax/web-runtime check`,
  `pnpm check`, `pnpm audit:foundation`, and `git diff --check` pass.
- Chrome proof used the exact local candidate at `127.0.0.1:5173/WEXdesigns/`:
  Component Manager rendered Logo, its compact 767px preview, and dark theme;
  Admin Station rendered Logo in Header and its keyboard skip link reached
  `#admin-station-main`.
- GitHub Pages remains main-only, so the local candidate preview is the
  pre-promotion browser evidence. No Pages deployment or real-host integration
  was performed.
