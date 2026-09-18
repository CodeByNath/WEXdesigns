# Studio Operating Model

## Scope

This Foundation rule defines the Studio operating model and its durable ownership boundaries. It does not introduce WEX technical contracts, runtime APIs, permission models, payloads, or AI operating procedures.

```text
WeeraX Studios
= operating model

Consuming business platform
= business/domain operating system and authority

WEX
= reusable horizontal presentation and interaction authority

AI Skills / operators
= bounded operating procedures over approved platform capabilities
```

## Growth model

Consuming products grow vertically through business capability. WEX grows horizontally through reusable presentation and interaction capability. A consuming product may depend on WEX; WEX must not depend on a consuming product.

Adoption is progressive. A consuming product is not required to perform a big-bang rewrite in order to use the operating model or WEX capabilities.

## Ownership boundaries

The consuming business platform owns business identity, persistence, pricing, lifecycle, permissions, validation, workflow legality, and runtime behaviour. It remains the authority for deciding what an action is allowed to do.

WEX owns reusable presentation rules, interaction presentation, accessibility mechanics, structural shared UI, and registered visual authority. It does not own business/domain authority or acquire a dependency on a consuming product.

Product-side adapters translate domain authority into approved serializable contracts. They do not become a second source of truth and do not invent presentation.

## Human and AI operation

Human UI and future AI Skills may invoke the same semantic/domain actions. Both remain subject to the consuming product's runtime/domain validation and authorization.

AI Skills and operators are bounded procedures over approved platform capabilities. They do not become domain authority, and AI-specific behaviour must not be embedded in WEX presentation components.

Orchestration is replaceable. It may coordinate approved capabilities, but it must not become permanent WEX architecture.

## Relationship to existing authority

This rule operates within the scoped authority described by the [Foundation entrypoint](README.md), [architecture](../architecture/), and [accepted decisions](../decisions/). It does not override their technical or decision authority. Changes that alter architecture require the applicable accepted authority decision before this Foundation rule changes.

## Non-goals

This document does not define detailed AI Skill procedures, autonomy policy, permissions models, payloads, runtime APIs, or a consuming product's implementation. Those concerns require separately authorised work and the appropriate authority.
