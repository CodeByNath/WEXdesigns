# 0005: Button Foundation

## Status

Accepted

## Decision

Button is the first approved shared component type. It has a serializable schema in `@weerax/schemas`, a WEX-owned CSS foundation, and a platform-neutral presentation resolver in `@weerax/ui`. Browser runtimes render a native `<button>` and handle the optional semantic action through their domain integration boundary.

## Variants and tiers

The closed variant language is Primary, Secondary, Ghost, and Danger. Each variant supports the global Small, Default, and Large WEX tiers. The contextual Button typography mapping is:

| Tier | Minimum block size | Padding | Typography |
| --- | --- | --- | --- |
| Small | Space 32 | Space 4 × Space 12 | 12 / 16 Semibold |
| Default | Space 40 | Space 8 × Space 16 | 14 / 20 Semibold |
| Large | Space 48 | Space 12 × Space 24 | 16 / 24 Semibold |

Buttons have square corners. Geometry uses existing WEX spacing and typography tokens only.

## States and accessibility

- Primary uses Accent by default, Accent Dark on hover, and Accent Light when selected.
- Danger uses Error by default, Error Dark on hover, and Error Light when selected.
- Secondary and Ghost use semantic interactive text and the standard surface rhythm for hover and selection.
- Focus uses the shared Focus border token and two-pixel focus width.
- Disabled buttons use the native `disabled` attribute, which excludes them from focus and interaction, and apply the universal disabled opacity once at the outer control.
- Native button text supplies the accessible name. The presentation layer carries no executable callback; runtimes must route semantic actions to the owning domain.

## Consequences

This decision opens Button only. It does not authorise speculative inputs, cards, drawers, module components, entity views, or application layouts.
