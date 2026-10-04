# Dependency Rules

The package graph must remain acyclic and point from runtime consumers toward stable authorities.

```text
@weerax/wex        -> no internal runtime dependency
@weerax/schemas    -> no internal, UI, WEX, React, CSS, or application dependency
@weerax/adapters   -> @weerax/schemas only
@weerax/identity   -> @weerax/schemas only; injected approved framework-neutral storage-adapter boundary
@weerax/ui         -> @weerax/schemas + @weerax/wex only
apps/*             -> required reusable packages
```

Forbidden directions:

- `schemas -> ui`
- `schemas -> adapters`
- `schemas -> apps`
- `schemas -> React or browser APIs`
- `wex -> ui, adapters, or apps`
- `ui -> application-specific domain owners`
- `adapters -> React or UI`
- `identity -> WEX, UI, applications, identity-station, React, browser UI, or host/domain systems`

Adapters must expose framework-neutral APIs. Runtime-specific hooks or bindings belong in a separate integration layer when a demonstrated need exists.

`@weerax/identity` receives an approved storage adapter through the portable
operation boundary; it does not import, select, or require an adapter
implementation. This keeps storage persistence/atomicity separate from
portable WEX identity semantics and avoids a dependency on a host integration.

Serializable definitions contain data and semantic command identifiers. They do not contain application functions, component constructors, CSS fragments, or raw visual values.
