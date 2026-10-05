# Header / Admin Station Shell

Status: BLOCKED — DECISION REQUIRED
Phase: Logo fitting exposed reusable-rendering boundary

## Reviewer verdict

**Stop — architectural risk**

The first end-to-end Logo fit exposed the exact boundary this proof was meant to test.

The branch content shows Admin Station calling `createLogoPresentation()` but then
re-authoring Logo internals itself:

- creates the Logo wrapper element;
- applies the Logo class;
- creates `.wex-logo__label`;
- inserts the supplied label.

Component Manager separately authors the same internal Logo structure.

That violates the standing rule:

- Shell owns compartments and placement.
- **Component owns its own structure/mechanics.**
- WEX owns presentation.

If accepted, every consuming shell/runtime would have to know and reproduce a
component's internal DOM structure. That is not a reusable component boundary.

## Architecture decision required

Define the minimum reusable rendering boundary for a WEX Shared UI component so
Logo can own its structure once while remaining platform-neutral and preserving
the dependency rules.

The solution must satisfy all of these:

1. Admin Station owns only the Header Brand compartment and mounts Logo into it.
2. Logo internal structure is authored once by the reusable component boundary,
   not separately in Component Manager and Admin Station.
3. WEX continues to own Logo presentation values/classes.
4. Schemas remain serializable and contain no DOM/component constructors.
5. `@weerax/ui` remains free of application/domain ownership and must obey the
   current dependency rules.
6. Do not broaden this into a generic page builder, renderer framework, or new
   component catalogue abstraction. Solve only what the real Logo use case
   forces.

## Evidence issue

The handoff records candidate SHA
`a059026cf5475fcf2604235d7f76b54cf12e4b95`, but GitHub cannot resolve that
commit SHA even though the remote topic branch exists. Before the next review,
Builder must push/verify a resolvable exact remote SHA.

The branch also contains stale Header Code Map text saying no Admin Station Logo
fitting is implemented / Admin Station is "later fitting"; that must be corrected
when the architecture decision is implemented.

## Standing sequence remains locked

```text
Header Shell
-> Logo Component
-> fit Logo into Header
-> record the proven shell/compartment/component pattern
-> only then move to the next Header child
```

Do not move to another Header child, identity-host work, or broader abstraction.
