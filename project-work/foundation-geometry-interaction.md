# Foundation Geometry and Interaction Recovery Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: Correct Button outer-state rendering so state never enlarges visible Button geometry

## Reviewer Verdict

**Stop — architectural risk**

Live Pages evidence on promoted `main`
`d10bac62ad65690d68b43c9420b7935dc0e9aefe`
shows the current outer-state mechanism is visually wrong for Button.

The current `2px` outline plus `2px` positive outline-offset extends beyond the Button box. Even though CSS layout dimensions do not change, the **visible Button footprint grows by 4px on every side** in Pressed/Focused/Selected presentation. The state therefore appears like a larger Button rather than the same Button in another state.

That violates the intended stable Button geometry.

## Correct WEX invariant

For Button:

- Default visible outer size is authoritative.
- Pressed, Selected, and Focused must **not increase the Button's visible bounding size**.
- Small / Default / Large must remain visually the same external dimensions in every state.
- Base structural boundary remains `1px`.
- Pressed / Selected / Focused retain one shared visual treatment and one shared colour.
- Their semantic meaning remains different; their visual state geometry is the same.
- Ordinary command Button remains non-selectable.

### Rendering direction

The current outside-outline mechanism is not valid for Button.

Implement the state treatment **inside the existing Button boundary/box**, using WEX-owned reusable geometry/tokens. The Carbon CSS supplied by the Reviewer is a reference for the rendering technique only: use inset layers / inset shadow-style treatment to keep the external Button footprint fixed. Do **not** copy Carbon token names, raw values, or architecture.

The resulting WEX state presentation must visibly preserve:

- the Button's existing outer dimensions;
- the registered `1px` structural boundary;
- the accepted state emphasis corresponding to the WEX `2px` state treatment;
- the visual separation/gap required by WEX, rendered within the existing box rather than outside it.

If the current `2px outer gap` wording in ADR 0010 inherently requires external growth, amend the authority so the **visual separation is internal for Button**. Reusable non-Button state geometry may remain separately described only if explicitly justified; do not silently force Button's outside mechanism onto every component.

## Builder correction — one complete job

1. Correct ADR 0010 so Button state geometry explicitly guarantees **no increase in visible external bounds**.
2. Reconcile ADR 0005 where needed so Button Pressed / Focused consume the fixed-footprint state presentation.
3. Replace Button's positive-offset outside outline implementation with an internal/inset WEX treatment.
4. Pressed and Focused on real Buttons must use the same shared treatment. Selected remains a reusable reference for selection-capable components and must visually match.
5. Preserve:
   - 1px default Button boundary;
   - 8px Button radius across Small / Default / Large;
   - existing min heights `36 / 40 / 44px`;
   - existing padding, typography, variant colours, disabled rule;
   - ordinary Button non-selectability.
6. Do not shrink or grow Button dimensions to compensate for the state. Do not add wrapper dimensions or extra external spacing.
7. Update System Settings so Default and state examples can be compared directly and it is visually obvious that the Button footprint is identical.
8. Add deterministic tests that reject:
   - positive `outline-offset` / outside state growth on Button;
   - state-specific width/height/min-size changes;
   - component-local duplicated ring values.
9. Browser-validate exact rendered bounding boxes for Default vs Pressed vs Focused at Small / Default / Large in light/dark and 200% zoom. Record measured dimensions showing equality.
10. Push on the same topic branch and return this file as `AWAITING REVIEWER REVIEW` with exact SHA, changed files, test results, and measured browser evidence.

Do not promote, delete the topic branch, or begin another component/foundation phase until Reviewer accepts this correction.
