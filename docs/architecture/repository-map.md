# Repository Map

| Package | Purpose | Allowed dependencies | Forbidden dependencies | Authority | Status |
| --- | --- | --- | --- | --- | --- |
| `@weerax/wex` | Canonical visual and structural design system | None internally | Schemas, adapters, UI, apps, domain code | WEX source | Canonical source and CSS foundations landed |
| `@weerax/catalogue` | File-backed Elements, Guidelines, and Components content structure | None internally | Presentation and domain behavior | Catalogue organization | Structure established; entry contract unresolved |
| `@weerax/schemas` | Serializable runtime and compile-time contracts | Zod only at foundation | WEX, UI, adapters, apps, React, Preact, Vite, DOM, CSS | Contract definitions | Identity, action, and tier primitives established |
| `@weerax/adapters` | Framework-neutral WEX storage and future domain-owner integration | `@weerax/schemas` | WEX, UI, apps, React, Preact | Portable storage contract / domain owners | Local-folder WEX Identity reference adapter implemented; no domain adapter |
| `@weerax/identity` | Portable WEX Identity Plugin + Tool runtime | `@weerax/schemas`; injected approved storage-adapter boundary | WEX, UI, apps, Station, React, browser UI, host/domain systems | ADRs 0016–0019 | Permanent residence accepted; runtime not yet implemented |
| `@weerax/ui` | Shared rendering and interaction structures | `@weerax/schemas`, `@weerax/wex` | Application-specific domain owners | Shared UI + WEX | Button presentation resolver implemented; other shared components remain unimplemented |
| `@weerax/identity-station` | Historical PostgreSQL allocation-ledger proof awaiting portable-adapter conversion | `@weerax/schemas`, PostgreSQL client | WEX, UI, adapters, web runtime, domain records | Optional WEX Identity storage-adapter proof | Bootstrap ledger, reserve/assign/lookup operations, and local PostgreSQL proof implemented; not portable identity core |
| `@weerax/studio-agent-runner` | Node validation and future agent/n8n tooling | Required reusable packages | UI presentation ownership | Runtime application | Schema-consumption shell only |
| `@weerax/web-runtime` | Live WEX shell and future browser application assembly | Required reusable packages | Reusable package authority and stored catalogue structure | Runtime application | Catalogue shell, approved presentation routes, and theme mechanics |
| `@weerax/typescript-config` | Shared strict TypeScript configuration | None | Runtime or presentation code | Repository tooling | Active |

## Dependency Graph

```text
@weerax/wex       (no internal dependencies)
@weerax/schemas   (no internal dependencies)
       ^              ^                    ^
       |              |                    |
@weerax/adapters  @weerax/identity     @weerax/ui
                                           ^
                                           |
                                    apps/web-runtime

@weerax/schemas <------ apps/studio-agent-runner
       ^
       |
apps/identity-station ----> PostgreSQL allocation ledger (optional adapter proof)
```

`@weerax/ui` may also consume `@weerax/wex`. Applications remain outside reusable core packages. The graph must remain acyclic.

WEX Identity is a portable Plugin + Tool with host-local identity spaces.
`@weerax/identity` is its approved permanent runtime residence and consumes an
injected framework-neutral storage-adapter boundary; its runtime remains
separately gated. The storage-adapter contract and first local-folder reference
adapter are accepted and implemented. The current Station must not be treated
as universal WEX identity authority.

## Foundation Stop Gate

The Global Components catalogue currently has no registered component family. Any component family, page layout, customer UI, admin UI, demo screen, or entity-specific presentation requires a separately approved phase.
