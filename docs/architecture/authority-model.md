# Authority Model

WeeraX Studios separates decisions so each concern has one owner.

## Hierarchy

1. **WEX** owns visual and structural presentation: typography, colour, spacing, tiers, interaction, buttons, icons, layout, grid, and responsive bands.
2. **DesignMaster composition architecture** owns composition, serializable definitions, shared component types, and ownership boundaries.
3. **Product and domain source** owns required behavior and business rules.

Existing application CSS is evidence, not presentation authority.

## Prime Rule

```text
DEFINITION SAYS WHAT.
DOMAIN SAYS WHAT IS ALLOWED.
WEX SAYS HOW.
DESIGN MASTER COMPOSES; IT DOES NOT INVENT VISUAL VALUES.
```

Ownership belongs to data and record handlers. Presentation belongs to shared component types.

## Responsibilities

| Layer | Owns | Must not own |
| --- | --- | --- |
| Domain | Record identity, authoritative data, permissions, validation, lifecycle, relationships, persistence, commands | Visual presentation |
| Composition definition | Serializable component type, IDs, WEX tier, content, mappings, state, permissions, semantic actions | CSS values or executable callbacks |
| Shared UI | Reusable structure, interaction mechanics, accessibility mechanics, WEX presentation | Application-specific domain behavior |
| WEX | Visual tokens, the Small/Default/Large tier system, recursive layout, responsive rules | Domain data or business logic |

## Change Routing

```text
New record type          -> definitions + adapters
New data contract        -> schema
New backend behavior     -> ownership handler
New visual variation     -> registered WEX rule or variant
New structural interaction -> only then consider a shared component type
```

The creation of a new domain is not sufficient reason to create a new presentation component.
