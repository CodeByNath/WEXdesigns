# Repository Map

| Package | Purpose | Allowed dependencies | Forbidden dependencies | Authority | Status |
| --- | --- | --- | --- | --- | --- |
| `@weerax/wex` | Canonical visual and structural design system | None internally | Schemas, adapters, UI, apps, domain code | WEX source | Canonical source and CSS foundations landed |
| `@weerax/catalogue` | File-backed Elements, Guidelines, and Components content structure | None internally | Presentation and domain behavior | Catalogue organization | Structure established; entry contract unresolved |
| `@weerax/schemas` | Serializable runtime and compile-time contracts | Zod only at foundation | WEX, UI, adapters, apps, React, Preact, Vite, DOM, CSS | Contract definitions | Identity, action, and tier primitives established |
| `@weerax/adapters` | Framework-neutral WEX storage and future domain-owner integration | `@weerax/schemas` | WEX, UI, apps, React, Preact | Portable storage contract / domain owners | Local-folder WEX Identity reference adapter implemented; no domain adapter |
| `@weerax/identity` | Portable WEX Identity Plugin + Tool runtime | `@weerax/schemas`; injected approved storage-adapter boundary | WEX, UI, apps, Station, React, browser UI, host/domain systems | ADRs 0016–0019 | Bootstrap and portable allocation lifecycle implemented; no host integration or registry |
| `@weerax/ui` | Shared rendering and interaction structures | `@weerax/schemas`, `@weerax/wex` | Application-specific domain owners | Shared UI + WEX | Button presentation resolver implemented; other shared components remain unimplemented |
| `@weerax/identity-station` | Optional PostgreSQL WEX identity storage-adapter proof | `@weerax/schemas`, PostgreSQL client | WEX, UI, adapters, web runtime, domain records | Portable storage contract | Persists supplied registration and allocation records with PostgreSQL atomicity; not portable identity core |
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
apps/identity-station ----> PostgreSQL identity space (optional adapter proof)
```

`@weerax/ui` may also consume `@weerax/wex`. Applications remain outside reusable core packages. The graph must remain acyclic.

WEX Identity is a portable Plugin + Tool with host-local identity spaces.
`@weerax/identity` is its approved permanent runtime residence and consumes an
injected framework-neutral storage-adapter boundary. Its bootstrap and portable
allocation lifecycle orchestrate CSPRNG issuance, lifecycle transitions, and
exact identity-address lookup without importing an adapter or resolving a host
target. The local-folder proof covers the authorised root/header sequence and
test-fixture targeting; it creates no registry or host traversal layer. The
PostgreSQL adapter is optional and must not be treated as universal WEX identity
authority.

## Foundation Stop Gate

The Global Components catalogue currently has no registered component family. Any component family, page layout, customer UI, admin UI, demo screen, or entity-specific presentation requires a separately approved phase.
