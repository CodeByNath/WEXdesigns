# Platform Identity System

Status: AWAITING REVIEWER REVIEW
Phase: 2 — Draft WEX UI identity architecture decision

## Reviewer verdict

**Proceed with safeguards**

Phase 1 audit is accepted as a sound boundary analysis, with one correction:
`SemanticAction.id` is an action identifier, not UI composition/allocation
identity. `SemanticAction.recordId` is an opaque domain-record reference.
Neither currently defines the proposed WEX UI identity namespace.

Verified `main` authority supports the remaining findings:

- Domain owns authoritative record identity, data, lifecycle, persistence and
  commands.
- Composition definitions may carry serializable IDs and mappings.
- Schemas define framework-neutral serializable contracts only.
- Adapters may depend on schemas but not UI/WEX/apps.
- Shared UI consumes schemas/WEX and must not own application-domain authority.
- Atomic composition permits ID-less primitives addressed by composition ID +
  structural path/slot.

## Accepted identity separation

The next authority must keep four concepts distinct:

1. **Reusable definition/capability identity** — identifies an approved reusable
   UI definition/type where independent identity is required.
2. **WEX UI composition/allocation identity** — identifies a concrete UI
   composition/allocation instance.
3. **Platform/domain identity** — opaque authoritative identity owned by the
   consuming platform/domain.
4. **Binding/reference** — explicit serializable mapping between a WEX
   allocation/slot and an external platform/domain reference.

Neither prefix similarity nor parent naming may establish a relationship.

## Required bidirectional model

```text
Platform/domain identity
→ adapter/binding
→ WEX composition/allocation
→ component/element/atom
```

```text
UI interaction/composition
→ WEX allocation identity
→ adapter/binding
→ platform/domain identity
→ authoritative data/action
```

Dynamic atoms may resolve through this binding path. Manual/static atoms remain
composition-local.

## Phase 2 Builder action

Draft the smallest bounded architecture note + ADR needed to decide, but do not
implement:

- whether WEX allocation IDs are globally unique and immutable;
- closed family vocabulary and where it is authoritative;
- fixed suffix length/alphabet and exact validation rule;
- candidate families `WEXAM + 5-char suffix` and
  `WEXAMH + 5-char suffix`;
- definition identity versus allocation identity;
- explicit parent allocation ID + slot/direct-child relationship;
- minimum serializable binding contract;
- issuance/reservation ownership;
- whether persistence, reverse lookup, retirement/tombstones are required and
  under which lifecycle conditions;
- collision handling and non-reuse policy;
- package ownership for schema, adapter, runtime/configuration responsibilities.

CompuZign remains read-only precedent only. Do not import its prefixes, storage,
entity model or domain lifecycle.

## Guardrails

Do not assume a reusable-core registry merely because CompuZign has one.
Do not place persistence/generation in `@weerax/schemas`, `@weerax/wex`, or
Shared UI. Do not introduce executable callbacks into bindings.

Do not implement generators, registries, persistence, prefixes, schemas,
adapters, runtime bindings, Header IDs or migrations in this phase.

Return this same file to `AWAITING REVIEWER REVIEW` with the proposed authority
files/ADR, unresolved decisions, exact scope, and required tests for the first
implementation phase.

## Builder handoff — 2026-10-01

Candidate: `docs/platform-identity-architecture` at
`16fd8ca7eea465e54318540091655d6417b0e263`.

Changed only: `docs/architecture/platform-identity.md`, its architecture index,
proposed `docs/decisions/0013-wex-ui-platform-identity.md`, and the decisions
index. The proposal defines the four identity layers, explicit binding and
parent/slot boundary, closed candidate-family validation, allocation lifecycle,
and package ownership. `pnpm audit:foundation` and `git diff --check` passed.

Reviewer/Owner must accept or reject the proposed global-uniqueness,
configuration-service, lifecycle/tombstone, and `WEXAM`/`WEXAMH` full-form
parsing policy. The first implementation remains strict schema shapes/tests
only: format/family, binding serializability, parent/slot, and callback/extra
field rejection. No generator, registry, persistence, adapter, runtime, Header,
or other product source changed.
