# 0008: Button Runtime Invocation Authority

## Status

Proposed — authority resolution only; runtime and browser implementation require separate Reviewer authorisation.

## Authority inspected

- [ADR 0007](./0007-button-semantic-action-authority.md) makes an ordinary Button action-bound and requires its serialized `SemanticAction` to reach the owning runtime without callbacks, payload, or permission data.
- [Composition architecture](../architecture/composition-architecture.md) assigns record ownership, command legality, validation, lifecycle, persistence, and permissions to the domain owner; its serializable path is semantic command plus record identity to a runtime-resolved owner.
- The [repository map](../architecture/repository-map.md) makes `schemas` and `wex` dependency roots, keeps shared UI platform-neutral, and places application-specific assembly outside reusable packages.
- Current `@weerax/web-runtime` is browser-shell assembly only and has no action dispatcher, handler registry, or domain owner.

## Decision

The first ordinary Button invocation path has three separate boundaries:

```text
action-bound ButtonDefinition.action
        ↓
consuming application browser integration
        ↓ native click invokes executor.execute(action)
application semantic-action executor
        ↓ command lookup
registered domain-owner handler
```

The platform-neutral Button presentation resolver remains pure. It derives presentation data from the definition but does not receive a browser event, bind a native listener, execute an action, or hold a handler. A consuming application's browser integration owns native click handling, retains the serialized `definition.action`, and passes that exact action to its application executor after a native invocation.

The execution API accepts the existing complete `SemanticAction`:

```text
execute(action: SemanticAction): Promise<void>
```

It does not introduce a second `(command, recordId)` action contract, a callback field, or a payload. The executor uses `action.command` to select an owner and `action.recordId` as the domain-record identity; `id` and `label` remain the serialized Button/action identity and displayed label defined by ADR 0007.

The consuming application owns registration of domain handlers under their canonical semantic command. The registration and handler functions are application-internal runtime wiring, never part of a generated definition, schema value, WEX package, or shared UI package. A command absent from that application's registration is an execution failure; the executor must not infer an owner or provide a default handler.

Before completing an action, the selected domain handler must independently re-check that the command is legal for the record, authorization, current record state, and validation. `disabled` remains only an authored availability hint and never grants execution permission. A stale, altered, or bypassed browser invocation therefore receives the same domain checks as any other request.

For the first use case, completion is deliberately minimal and deterministic: the executor's promise fulfills only after the domain handler completes successfully, and rejects when command resolution or domain execution fails. The browser integration may observe that result for its own local interaction handling, but this decision defines no error taxonomy, event bus, retry policy, payload protocol, permission framework, orchestration layer, or AI-specific path.

## Placement and dependency boundary

The executor, registration, browser click binding, and domain handlers belong to the consuming application/integration layer. No executor or registry belongs in `@weerax/schemas`, `@weerax/wex`, `@weerax/ui`, or `@weerax/adapters`. A future browser implementation may place its integration in `@weerax/web-runtime` only when it has a concrete application-owned domain handler; it must still depend inward on reusable packages and must not make reusable packages depend on the application.

## Historical-example clarification

Older illustrative composition examples that contain executable `run: () => ...` callbacks are historical examples superseded by the serializable semantic-action rule. They are not a runtime contract or implementation authority for Buttons. This decision does not edit `composition-architecture.md`; a separately authorised cleanup may remove or annotate those examples later.

## Boundary

This proposal authorises no dispatcher, registry, native Button renderer, schema/UI/CSS change, catalogue or Pages demo, adapter, domain handler, icon, component family, AI/Studio work, or `WEX-SOURCE.md` change.
