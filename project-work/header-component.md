# Header / Admin Station Shell

Status: BUILDER ACTION REQUIRED
Phase: Resolve reusable rendering boundary, then complete Logo fitting

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

Existing topic branch: `feat/logo-header-fitting`
Valid pushed SHA:
`a05902646b9d4bcc4c6c4b93baa56cddb5bfed4e`.

The previous handoff SHA was metadata error only.

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

## Executor capability note — 2026-10-11

Keep Builder ownership and this status. This surface cannot complete the
required checks or local browser proof: its Node 24 binary exits because
`libsimdjson.33.dylib` is unavailable, while the only alternate local Node is
v22.23.1 (below the repository's required v24). Resume the package on a
surface with working Node 24 and a local web-preview browser; no implementation
handoff has been pushed.
