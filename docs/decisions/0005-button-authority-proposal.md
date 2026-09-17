# 0005: Button Authority Proposal

## Status

Proposed — Reviewer approval required before implementation.

## Purpose and authority

This proposal resolves Button colour/state authority only. It does not approve a Button schema, CSS foundation, renderer, runtime preview, catalogue entry, geometry, or audit change.

It is based on the historical WEX Button and Interaction foundations, accepted decisions [0002](./0002-inversion-ready-colour-system.md) and [0004](./0004-core-colour-tokens.md), and the verified `main` colour foundation. Historical `WEX-SOURCE.md` remains unchanged.

## Variant contract

The proposed closed Button language is `primary | neutral | subtle | warning | danger`.

| Proposed variant | Existing authority | Proposed meaning |
| --- | --- | --- |
| Primary | Historical Primary | The single highest-emphasis action in a context. |
| Neutral | Historical Secondary | A supporting high-emphasis action without a competing accent fill. |
| Subtle | Historical Ghost | A lower-emphasis action with no persistent resting container. |
| Warning | New Button decision using accepted Yellow semantics | A consequential action requiring caution, but not destructive treatment. |
| Danger | Historical Danger plus accepted Red semantics | A destructive or irreversible action. |

`secondary` and `ghost` are retained only as historical names; they are not proposed serialized variants. Selected remains excluded from Button behaviour.

## State model: hover and pressed

Button states are `default | hover | pressed | disabled | focus`. Pressed is a transient native `:active`/tap-down treatment. It must not be implemented with `aria-pressed`, which represents persistent selection and needs a separately approved toggle-button contract.

Hover is a restrained change; pressed is the third, stronger state. Focus is an independent two-pixel WEX accessibility layer. Disabled controls use native disabled behaviour and the accepted universal `--wex-opacity-disabled` once at the outer control; they expose no hover, pressed, or focus state.

The accepted core layer has Default, Hover, and Selected swatches for chromatic/status backgrounds but no Active swatch. This proposal maps that third swatch to the **Button pressed** component token only; it does not add Button Selected state.

## Exact theme mappings

| Variant | Light mapping: default / hover / pressed | Dark mapping: default / hover / pressed | Foreground |
| --- | --- | --- | --- |
| Primary | Accent / Accent Dark / Accent Light | Accent / Accent Dark / Accent Light | On Accent / On Accent Hover / On Accent Selected |
| Neutral | White / Light / Light Grey | Black / Dark / Dark Grey | Text Primary; Border Primary at every state |
| Subtle | Transparent / Light / Light Grey | Transparent / Dark / Dark Grey | Text Accent at every state |
| Warning | Yellow / Yellow Dark / Yellow Light | Yellow / Yellow Dark / Yellow Light | On Warning at every state |
| Danger | Red / Red Dark / Red Light | Red / Red Dark / Red Light | On Error / On Error Hover / On Error Selected |

Primary, Warning, and Danger reuse accepted component-independent background and on-colour semantics. Neutral and Subtle require the only new visual resolution: Button-scoped pressed surface tokens that resolve to Light Grey in light theme and Dark Grey in dark theme. That preserves the historical neutral direction—darker in light, lighter in dark—without adding a global neutral-interaction family.

## Proposed component-token contract

Implementation, if later approved, must expose component-semantic tokens only:

```text
--wex-button-{primary|neutral|subtle|warning|danger}-background-{default|hover|pressed}
--wex-button-{primary|neutral|subtle|warning|danger}-foreground-{default|hover|pressed}
--wex-button-{primary|neutral|subtle|warning|danger}-border-{default|hover|pressed}
--wex-button-focus-outline
--wex-button-disabled-opacity
```

Transparent or borderless treatments still resolve through the token contract. Consumer code must not address primitives, theme selectors, or state values directly.

## Scoped audit transition proposal

The current no-components audit remains unchanged during this proposal phase. Only after Reviewer accepts this ADR and separately authorises implementation may it transition to a Button-only allowlist. That future audit must permit only the approved Button contract, WEX foundation, platform-neutral presentation boundary, and their focused tests; it must continue rejecting other components, browser/framework dependencies in shared packages, domain callbacks, catalogue demos, and unrelated runtime work. Future implementation targets would be `packages/schemas/src/components/button.schema.ts`, `packages/wex/src/foundations/buttons.css`, `packages/ui/src/components/button.ts`, their tests, and only separately authorised runtime integration.

## Recovery-branch comparison

The preserved `review/button-local-recovery` candidate is evidence only. Its tier structure and serializable action-boundary direction may be reconsidered later. Its `secondary`/`ghost` names would become Neutral/Subtle; it lacks Warning; its selected styling and `aria-pressed` treatment conflict with this proposal; and its Accepted ADR, schema, CSS, UI resolver, runtime preview, catalogue/documentation changes, and audit rewrite remain unapproved. Nothing from that branch is adopted by this proposal.

## Open review decisions

Reviewer must explicitly approve the five-variant language, the use of accepted third chromatic swatches for transient pressed treatment, and the new Button-scoped neutral/subtle pressed tokens before implementation begins. Button geometry, icon treatment, and persistent toggle behaviour remain out of scope.
