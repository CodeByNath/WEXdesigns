# WeeraX Studios

Foundation repository for a schema-driven UI platform in which serializable contracts and domain-owned adapters feed future shared component types governed by WEX.

```text
Schemas / contracts
        -> Domain ownership + adapters
        -> Serializable composition definitions
        -> Shared component types
        -> WEX presentation rules
        -> Runtime applications
```

## Authority Hierarchy

1. WEX owns visual and structural presentation.
2. DesignMaster composition architecture owns composition and ownership boundaries.
3. Product/domain source owns required behavior and business rules.

Prime rule:

```text
DEFINITION SAYS WHAT.
DOMAIN SAYS WHAT IS ALLOWED.
WEX SAYS HOW.
DESIGN MASTER COMPOSES; IT DOES NOT INVENT VISUAL VALUES.
```

## Repository Architecture

| Location | Purpose |
| --- | --- |
| `packages/wex` | Canonical WEX source and organized CSS foundations |
| `packages/schemas` | Framework-neutral Zod and TypeScript contracts |
| `packages/adapters` | Reserved framework-neutral domain adapter boundary |
| `packages/ui` | Reserved shared UI boundary; intentionally contains no components |
| `apps/studio-agent-runner` | Node contract-validation shell |
| `apps/web-runtime` | Live WEX index for Elements, Guidelines, and Components |
| `docs/architecture` | Authority, dependency, composition, and repository maps |
| `tooling` | Shared TypeScript configuration and foundation checks |

See `docs/architecture/repository-map.md` for allowed and forbidden dependencies.

## Development

Requires Node.js 24 or newer and pnpm 11.16.0.

```sh
pnpm install
pnpm type-check
pnpm lint
pnpm test
pnpm build
pnpm check
```

Run the dependency, authority-integrity, CSS-structure, and no-components audit without installed dependencies:

```sh
pnpm audit:foundation
```

## Live Index

The web runtime publishes WEX as a readable system library. Elements currently covers Grid / Theory, Color, Icons, Pictograms, Motion, Spacing, Themes, and Typography. Guidelines exposes composition rules. Components remains an empty registry until its separately approved phase.

## Current Phase

The foundation and live-index application phases are complete in repository structure and source. Shared UI component implementation has not started.

The next phase is gated. It must begin with separate authorization and a decision about the first shared component type, then define its schema, WEX specification, states, accessibility behavior, atomic structure, tests, and runtime integration.
