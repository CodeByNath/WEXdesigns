# Foundation Geometry and Interaction Recovery Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: Review shared Pressed / Selected / Focused outer-state candidate

## Reviewer Verdict

**Stop — architectural risk**

Live review exposed an authority mismatch, not merely a showcase defect.

Current ADR 0010 says Selected and Focused share outer-ring geometry but may use different colours. ADR 0005 treats Pressed as a transient Button state without the reusable outer-ring presentation. The deployed System Settings therefore shows Focused and Selected with different ring colours and omits Pressed from the outer-state comparison.

That does not match the clarified WEX direction.

## Clarified WEX direction

Pressed, Selected, and Focused are semantically different states, but their **outer-state visual treatment is the same**:

- component/default boundary remains `1px`;
- outer state ring = `2px`;
- gap between component boundary and outer ring = `2px`;
- same WEX ring colour/treatment for Pressed, Selected, and Focused;
- the distinction between the three states is behavioural/semantic, not a different ring geometry or colour.

State meaning remains separate:

- **Pressed** = transient active/tap-down state;
- **Selected** = persistent/current state, only for components that support selection;
- **Focused** = accessibility focus overlay and may coexist with another state.

Ordinary command Button still must not gain persistent Selected semantics merely to demonstrate the state.

## Builder handoff

Candidate branch: `feat/foundation-geometry-interaction`
Exact remote SHA: `d10bac62ad65690d68b43c9420b7935dc0e9aefe`

Changed files:

- `docs/decisions/0010-foundation-geometry-interaction.md`
- `docs/decisions/0005-button-authority.md`
- `packages/wex/src/foundations/geometry.css`
- `packages/wex/src/foundations/buttons.css`
- `packages/wex/test/button-foundation.test.mjs`
- `tooling/scripts/validate-foundation.mjs`
- `apps/web-runtime/index.html`
- `apps/web-runtime/src/catalogue.css`
- `apps/web-runtime/test/catalogue.test.mjs`

Evidence:

- ADR 0010 now makes Pressed, Selected, and Focused share one outer-state presentation: 1px boundary, 2px ring, 2px gap, and one ring colour. ADR 0005 keeps Button Pressed native/transient while allowing it to consume that shared presentation.
- WEX defines `--wex-outer-ring-color` from the established focus colour. Button `:active` and `:focus-visible` consume it; no Button-local outer-ring colour remains. The System Settings comparison shows all three roles together with semantic labels and one shared treatment.
- Ordinary Button retains its 1px boundary, Default 8px radius, closed variant/state contract, and non-selectability; no `aria-pressed`, toggle contract, schema, or shared-UI change was introduced.
- Passed: `git diff --check`; `pnpm --filter @weerax/wex test` (7/7); `pnpm audit:foundation`; `pnpm --filter @weerax/web-runtime check` (type-check and 6/6 tests).
- Chrome local exact-candidate evidence: shared Pressed/Selected/Focused comparison in light/dark; native Button `:active` exercised; keyboard focus visible; 200% compact layout had no overflow or layout shift. Production Pages remains the post-promotion Reviewer boundary.

Do not promote, delete the topic branch, or begin another component/foundation phase until Reviewer accepts the corrected authority and implementation candidate.
