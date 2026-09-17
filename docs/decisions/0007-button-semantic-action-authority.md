# 0007: Button Semantic-Action Binding Authority

## Status

Proposed — authority resolution only; schema and runtime implementation require separate Reviewer authorisation.

## Authority inspected

- [Composition architecture](../architecture/composition-architecture.md) assigns record ownership, permissions, validation, and domain commands to the record owner. It requires the serializable flow `semantic command + record identity → runtime resolves owning domain handler` and prohibits executable functions in generated definitions.
- [SemanticActionSchema](../../packages/schemas/src/actions/semantic-action.schema.ts) already provides the minimal serializable action identity: `id`, `label`, `command`, and `recordId`.
- The current [Button schema](../../packages/schemas/src/components/button.schema.ts) and platform-neutral [Button presentation boundary](../../packages/ui/src/components/button.ts) are visual/presentation contracts: component `id`, `label`, variant, tier, and authored availability only. They accept no callback, command, or transient interaction state.
- [ADR 0005](./0005-button-authority.md) keeps ordinary Button interaction transient and excludes toggle semantics; [ADR 0006](./0006-button-geometry-authority.md) resolves geometry only. Neither decision grants execution or domain ownership to WEX or shared UI.

## Decision

An ordinary actionable Button embeds one `SemanticAction`; it does not reference a separately resolved action ID and is not derived solely from an action. The Button remains the component contract for variant, tier, and authored availability, while the nested action supplies executable semantic intent.

The future actionable shape is conceptually:

```text
ActionableButtonDefinition
├── id              // Button/component identity
├── action          // SemanticAction: id, label, command, recordId
├── variant
├── tier
└── disabled
```

`action.label` is the only actionable Button label. An actionable definition must not also carry a Button `label`, so contradictory labels cannot serialize. The current presentation-only Button shape remains an existing foundation only until a separately authorised schema migration introduces this action-bound form.

An ordinary actionable Button may not exist without its `SemanticAction`. There is no general actionless product Button exception. Documentation or visual samples that need an inert control are outside this executable contract, must not enter a product composition or shared runtime, and must be explicitly isolated as non-actionable examples when such work is separately authorised.

## Runtime and availability boundary

On invocation, a native Button event delivers its serialized `action.command` and `action.recordId` to the owning runtime. The runtime resolves the record owner and invokes that owner’s registered domain handler. The schema and shared UI never carry a callback, function, handler reference, or domain payload.

`disabled` is an availability hint owned by the composition/record owner—for example, a known loading or local validation condition. It is not permission, authorization, or command validity. The owning runtime/domain handler must independently re-check authorization, record state, and validation when executing the semantic command, including if a stale or bypassed client submits it.

## Sufficiency and boundary

For the first Button use case, `SemanticAction` is sufficient: a named command against one record identity with an action-owned label. The composition architecture already defines separately collected changes at runtime for save-like flows. No Button payload, callback, generalized action data, or permission field is authorised by this decision.

A future demonstrated command that cannot be expressed as `(command, recordId)` must establish a new authority decision from its concrete domain requirement before the action schema changes. This proposal authorises no implementation, runtime, adapter, CSS, catalogue, Pages, domain-command definition, or historical-source change.

