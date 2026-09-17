# 0005: Button Authority

## Status

Accepted — authority only; implementation requires separate Reviewer authorisation.

## Purpose and authority

This decision resolves Button colour/state authority only. It does not approve a Button schema, CSS foundation, renderer, runtime preview, catalogue entry, geometry, or audit change.

It is based on the historical WEX Button and Interaction foundations, accepted decisions [0002](./0002-inversion-ready-colour-system.md) and [0004](./0004-core-colour-tokens.md), and the verified `main` colour foundation. Historical `WEX-SOURCE.md` remains unchanged.

## Variant contract

The closed Button language is `primary | neutral | subtle | warning | danger`.

| Variant | Existing authority | Meaning |
| --- | --- | --- |
| Primary | Historical Primary | The single highest-emphasis action in a context. |
| Neutral | Historical Secondary | A supporting high-emphasis action without a competing accent fill. |
| Subtle | Historical Ghost | A lower-emphasis action with no persistent resting container. |
| Warning | Button decision using accepted Yellow semantics | A consequential action requiring caution, but not destructive treatment. |
| Danger | Historical Danger plus accepted Red semantics | A destructive or irreversible action. |

`secondary` and `ghost` remain historical names only; they are not serialized variants. Selected remains excluded from ordinary Button behaviour.

## State model: hover and pressed

Button states are `default | hover | pressed | disabled | focus`. Pressed is a transient native `:active`/tap-down treatment. It must not use `aria-pressed`, which represents persistent selection and needs a separately approved toggle-button contract.

Hover is a restrained change; pressed is the third, stronger state. Focus is an independent two-pixel WEX accessibility layer. Disabled controls use native disabled behaviour and the accepted universal `--wex-opacity-disabled` once at the outer control; they expose no hover, pressed, or focus state.

The accepted core layer has Default, Hover, and Selected swatches for chromatic/status backgrounds but no Active swatch. Button maps that third swatch to the **pressed** component token only; it does not add Button Selected state.

## Exact theme mappings

| Variant | Light mapping: default / hover / pressed | Dark mapping: default / hover / pressed | Foreground |
| --- | --- | --- | --- |
| Primary | Accent / Accent Dark / Accent Light | Accent / Accent Dark / Accent Light | On Accent / On Accent Hover / On Accent Selected |
| Neutral | White / Light / Light Grey | Black / Dark / Dark Grey | Text Primary; Border Primary at every state |
| Subtle | Transparent / Light / Light Grey | Transparent / Dark / Dark Grey | Text Accent at every state |
| Warning | Yellow / Yellow Dark / Yellow Light | Yellow / Yellow Dark / Yellow Light | On Warning at every state |
| Danger | Red / Red Dark / Red Light | Red / Red Dark / Red Light | On Error / On Error Hover / On Error Selected |

Primary, Warning, and Danger reuse accepted component-independent background and on-colour semantics. Neutral and Subtle require Button-scoped pressed surface tokens that resolve to Light Grey in light theme and Dark Grey in dark theme. That preserves the historical neutral direction—darker in light, lighter in dark—without adding a global neutral-interaction family.

## Component-token contract

Implementation must expose component-semantic tokens only:

```text
--wex-button-{primary|neutral|subtle|warning|danger}-background-{default|hover|pressed}
--wex-button-{primary|neutral|subtle|warning|danger}-foreground-{default|hover|pressed}
--wex-button-{primary|neutral|subtle|warning|danger}-border-{default|hover|pressed}
--wex-button-focus-outline
--wex-button-disabled-opacity
```

Transparent or borderless treatments still resolve through the token contract. Consumer and shared rendering code must not address primitives, theme selectors, or state values directly.

## Scoped audit transition

The current no-components audit remains in force until implementation is separately authorised. A future Button-only allowlist may permit only the approved Button contract, WEX foundation, platform-neutral presentation boundary, and their focused tests; it must continue rejecting other components, browser/framework dependencies in shared packages, domain callbacks, catalogue demos, and unrelated runtime work. Future implementation targets are `packages/schemas/src/components/button.schema.ts`, `packages/wex/src/foundations/buttons.css`, `packages/ui/src/components/button.ts`, their tests, and only separately authorised runtime integration.

## Recovery-branch comparison

The preserved `review/button-local-recovery` candidate is evidence only. Its tier structure and serializable action-boundary direction may be reconsidered later. Its `secondary`/`ghost` names become Neutral/Subtle; it lacks Warning; its selected styling and `aria-pressed` treatment conflict with this decision; and its schema, CSS, UI resolver, runtime preview, catalogue/documentation changes, and audit rewrite remain unapproved. Nothing from that branch is adopted automatically.

## Acceptance safeguards and limits

Implementation must use the closed five-variant language only and must not retain both serialized vocabularies. Chromatic Light values may resolve Button pressed tokens but never persistent selected behaviour. Geometry, icons, toggle behaviour, catalogue work, and runtime integration remain out of scope until separately authorised.
