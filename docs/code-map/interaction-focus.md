# Interaction and Focus

## Verification

- Created: 2026-09-19
- Last verified: 2026-09-19
- Verified against: `origin/main` at `b701a9d497442cf714c7ecbd39ee8660635d6f11`

## Purpose and scope

This map navigates WEX interaction-presentation and focus authority. It covers the shared presentation layer and its demonstrated consumers, not runtime events, application commands, or domain behaviour.

## Governing authority

- [Authority model](../architecture/authority-model.md)
- [Historical WEX source](../../packages/wex/src/source/WEX-SOURCE.md)
- [ADR 0004: Core Colour Tokens](../decisions/0004-core-colour-tokens.md)
- [ADR 0005: Button Authority](../decisions/0005-button-authority.md) for Button-local interaction presentation
- [ADR 0008: Button Runtime Invocation Authority](../decisions/0008-button-runtime-invocation-authority.md) for the separate runtime boundary

## Source and focused verification

- Interaction foundation: [`packages/wex/src/foundations/interaction.css`](../../packages/wex/src/foundations/interaction.css)
- Related focus colour authority: [`packages/wex/src/foundations/colour.css`](../../packages/wex/src/foundations/colour.css)
- Demonstrated component consumer: [`packages/wex/src/foundations/buttons.css`](../../packages/wex/src/foundations/buttons.css)
- Core colour/interaction checks: [`packages/wex/test/colour-tokens.test.mjs`](../../packages/wex/test/colour-tokens.test.mjs)
- Button interaction checks: [`packages/wex/test/button-foundation.test.mjs`](../../packages/wex/test/button-foundation.test.mjs)
- Authority and CSS-structure audit: [`tooling/scripts/validate-foundation.mjs`](../../tooling/scripts/validate-foundation.mjs)

## Dependency path and boundary

```text
historical interaction authority + accepted presentation decisions
  -> @weerax/wex interaction and colour foundations
  -> WEX component presentation
  -> shared UI and consuming applications
```

WEX owns interaction presentation and focus styling. Shared UI owns reusable interaction and accessibility mechanics; consuming applications and domain owners retain runtime and command authority.

## Safe change routing

- Resolve changes to shared visual states or focus presentation through WEX authority and focused presentation checks.
- Keep component-specific state mappings with the component's accepted decision and foundation.
- Route event mechanics to shared UI and application/domain execution to the consuming runtime; do not embed them in WEX CSS.

## Related documents

- [Code Map entrypoint](README.md)
- [Foundation entrypoint](../foundation/README.md)
- [Colour map](colour.md)
- [Studio operating model](../foundation/studio-operating-model.md)
