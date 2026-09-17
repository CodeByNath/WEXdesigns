# Repository Map

| Package | Purpose | Allowed dependencies | Forbidden dependencies | Authority | Status |
| --- | --- | --- | --- | --- | --- |
| `@weerax/wex` | Canonical visual and structural design system | None internally | Schemas, adapters, UI, apps, domain code | WEX source | Canonical source and CSS foundations landed |
| `@weerax/catalogue` | File-backed Elements, Guidelines, and Components content structure | None internally | Presentation and domain behavior | Catalogue organization | Structure established; entry contract unresolved |
| `@weerax/schemas` | Serializable runtime and compile-time contracts | Zod only at foundation | WEX, UI, adapters, apps, React, Preact, Vite, DOM, CSS | Contract definitions | Identity, action, tier, and Button primitives established |
| `@weerax/adapters` | Future domain-owner integration | `@weerax/schemas` | WEX, UI, apps, React, Preact | Domain owners | Boundary only; no adapters implemented |
| `@weerax/ui` | Shared rendering and interaction structures | `@weerax/schemas`, `@weerax/wex` | Application-specific domain owners and browser APIs | Shared UI + WEX | Platform-neutral Button presentation implemented |
| `@weerax/studio-agent-runner` | Node validation and future agent/n8n tooling | Required reusable packages | UI presentation ownership | Runtime application | Schema-consumption shell only |
| `@weerax/web-runtime` | Live WEX shell and future browser application assembly | Required reusable packages | Reusable package authority and stored catalogue structure | Runtime application | Header, content frame, footer, and theme mechanics only |
| `@weerax/typescript-config` | Shared strict TypeScript configuration | None | Runtime or presentation code | Repository tooling | Active |

## Dependency Graph

```text
@weerax/wex       (no internal dependencies)
@weerax/schemas   (no internal dependencies)
       ^                    ^
       |                    |
@weerax/adapters       @weerax/ui
                            ^
                            |
                     apps/web-runtime

@weerax/schemas <------ apps/studio-agent-runner
```

`@weerax/ui` may also consume `@weerax/wex`. Applications remain outside reusable core packages. The graph must remain acyclic.

## Component Gate

Button is the first approved shared component. Further component types require a separately approved phase; they may not add page layout, customer UI, admin UI, or entity-specific presentation.
