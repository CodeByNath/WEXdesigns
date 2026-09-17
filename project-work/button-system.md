# Button System Work Cycle

Status: BUILDER ACTION REQUIRED  
Phase: Slice 1A correction — keep transient presentation state out of schema

## Reviewer Verdict

**Stop — architectural risk**

Reviewer independently inspected `feat/button-foundation-slice` at `46549a79a138621295889f49288960c5c39d977a` against accepted ADR 0005, the authority model, and current `main`.

The candidate is otherwise tightly scoped and the Node 24 handoff evidence is acceptable, but one contract boundary must be corrected before this slice can move to `main`.

## Blocking Finding

`packages/schemas/src/components/button.schema.ts` serializes `state: default | hover | pressed | disabled | focus`, and shared UI then consumes that serialized state.

That places transient presentation/runtime states (`hover`, `pressed`, `focus`) inside the serializable Button definition. Repository authority says schemas define serializable contracts while WEX owns visual/interaction presentation and visual states. ADR 0005 defines the ordinary Button state model as presentation behaviour; it does not require hover/focus/press to become persisted/composed data.

This would bake browser/native interaction state into the framework-neutral definition contract and make future runtimes responsible for accepting artificial hover/focus state as authored data.

## Authorised Builder Correction

Correct only this boundary on the existing topic branch:

- remove transient `hover`, `pressed`, and `focus` from the serializable Button definition;
- remove `ButtonStateSchema` if it exists only for those transient presentation states;
- retain a serializable `disabled` boolean if needed for authored availability/accessibility state;
- WEX CSS must continue to implement native `:hover`, `:active`, `:focus-visible`, and `:disabled` presentation according to ADR 0005;
- shared UI may expose the resolved native disabled flag/class contract, but must not require callers to serialize hover/press/focus;
- update focused tests and the Button-only audit accordingly;
- do not widen into runtime rendering, geometry, catalogue, Pages, adapters, actions, icons, toggle behaviour, or other components;
- do not modify `WEX-SOURCE.md`.

Also keep the application test change minimal: `apps/web-runtime/test/catalogue.test.mjs` may stop asserting that UI is component-empty or assert the Button-only platform-neutral boundary, but it must not become the authority for Button presentation rules; the foundation audit/shared-package tests remain the deterministic authority checks.

## Verification / Handoff

Run touched-package tests and `pnpm check` under Node 24. Push the corrected topic branch, verify the remote SHA, update this SAME file to `Status: AWAITING REVIEWER REVIEW` with exact changed files/checks/Node version, and stop.

Do not move this candidate to `main` until Reviewer re-inspects the corrected remote commit.
