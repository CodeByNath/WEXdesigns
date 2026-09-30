# Atomic Composition Authority

## Scope

This document records the current architecture authority for atom-level
composition. It supplements the preserved DesignMaster composition architecture
without reopening or expanding that historical document. It does not define an
atom schema family, HTML authoring surface, WEX values, domain behaviour, or a
component implementation.

## Atoms and value sources

An **atom** is an approved primitive UI or content receiver: for example, text,
an icon, input, heading primitive, span, image, or an equivalent governed
primitive.

Every atom value has exactly one source class:

- **manual/static** — explicitly supplied fixed content;
- **dynamic/resolved** — content resolved through the governed composition or
  domain path at runtime.

Atom type, attributes, and permitted value-source forms remain governed by
serializable composition contracts. Definitions must not permit arbitrary HTML
or raw visual values.

## Identity and addressing

Atoms are ID-less by default. An atom receives independent identity only when it
has an independent lifecycle, persistence requirement, external reference,
ownership requirement, or independent addressing requirement.

An ID-less atom remains structurally addressable through its owning composition
identity and its direct structural path or slot:

```text
compositionId + structural path/slot -> atom -> value source
```

This preserves addressability without assigning a global or platform ID to every
primitive receiver.

## Recursive composition boundary

Composition is recursive:

```text
atom -> element/component -> component-as-shell -> larger component
     -> application shell -> runtime
```

Each parent owns only the composition of its direct children. When a child
contains further children, that child becomes their shell and owns their direct
composition boundary. Ancestor spacing, presentation, state, and behaviour do
not automatically cascade through descendants.

Every composition contract may declare its allowed direct-child types and its
minimum and maximum direct-child count. Those limits apply only to that direct
composition boundary; they do not recursively constrain the child's own
descendants.

## Change boundary

Future schema, shared-component, or runtime work must use these constraints
through a separately authorised phase. This authority alone does not authorise
atom schemas, child components, platform identity allocation, or Header
implementation.
