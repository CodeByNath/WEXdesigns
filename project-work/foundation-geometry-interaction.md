# Foundation Geometry and Interaction Recovery Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: Reconcile Pressed / Selected / Focused outer-state authority and presentation

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

## Builder correction — one bounded job

1. Correct ADR 0010 so Pressed, Selected, and Focused share the same reusable outer-state presentation geometry **and colour treatment**.
2. Reconcile ADR 0005 only where required so Button Pressed may consume the shared outer-state presentation while remaining transient native `:active`; do not add `aria-pressed` or persistent selection to ordinary Button.
3. Reconcile WEX foundation tokens/CSS so the three outer-state roles consume one approved shared ring treatment rather than separate colours.
4. Preserve the ordinary Button 1px structural boundary, 8px radius, and existing variant/state semantics.
5. Update System Settings so a person can understand the rule visually at a glance:
   - show **Pressed**, **Selected**, and **Focused** together;
   - show the same 1px boundary + 2px gap + 2px ring treatment on all three;
   - clearly label semantic meaning without using different ring colours;
   - do not hide the rule behind interaction-only behaviour.
6. Preserve native keyboard focus behavior and ordinary Button non-selectability.
7. Add/update deterministic tests covering all three specimens and shared ring-token use.
8. Validate light/dark, keyboard focus, active/pressed presentation, compact/200% zoom, and no layout shift.
9. Push on the same topic branch and hand back this file as `AWAITING REVIEWER REVIEW` with exact SHA and evidence.

Do not promote, delete the topic branch, or begin another component/foundation phase until Reviewer accepts the corrected authority + implementation candidate.
