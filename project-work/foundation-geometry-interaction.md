# Foundation Geometry and Interaction Recovery Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: Finalize Button structural border and outer-state geometry as one correction job

## Reviewer Verdict

**Stop — architectural risk**

The live radius correction passed, but the same review exposed one remaining authority contradiction on promoted `main`.

ADR 0010 defines:

- default structural border = `1px`;
- Focused outer treatment = `2px`;
- Selected outer treatment = `2px`;
- outside gap = `2px`.

It then incorrectly gives Button a separate stable `2px` base boundary. That violates the default structural-border rule.

## Final authority direction

Button must follow the WEX structural border rule:

- ordinary Button boundary = Default structural border = `1px`;
- visually borderless appearances still reserve that same `1px` boundary as transparent so state/appearance changes never resize the control;
- Focused = independent `2px` outer ring with `2px` outside gap;
- Selected = independent `2px` outer ring with `2px` outside gap, only for components whose contract supports persistent selection;
- ordinary command Button remains non-selectable under ADR 0005;
- Focused/Selected never replace or thicken the component's own `1px` boundary and never change layout dimensions.

Button radius remains `8px` across Small / Default / Large.

## Builder job — complete as one transaction

1. Correct ADR 0010 so Button no longer has a 2px base-border exception and explicitly consumes the Default `1px` structural border.
2. Reconcile Button CSS so the stable Button boundary consumes the reusable/default structural-border token rather than a Button-specific `2px` width.
3. Preserve transparent 1px boundaries for visually borderless Button appearances.
4. Keep Focused on the existing reusable `2px` outer-ring geometry with the `2px` gap and verify no layout shift.
5. Do not add Selected to ordinary command Button. Preserve the reusable Selected outer-ring geometry for selection-capable components only.
6. Update deterministic Button/foundation tests and validation so:
   - Button base boundary must be 1px via the structural-border authority;
   - Button must not define/consume a special 2px base boundary;
   - focus must remain 2px outer-ring + 2px gap;
   - size tiers must not alter radius;
   - ordinary Button remains non-selectable.
7. Update the existing System Settings showcase only as needed so the Button presentation visibly demonstrates the corrected base border and focus treatment. Do not fabricate an ordinary-Button Selected state.
8. Run `git diff --check`, WEX tests, foundation audit, web-runtime checks, and Chrome validation in light/dark, all variants/tiers, hover/pressed/focus/disabled, compact/200% zoom, and no-layout-shift.
9. Push the corrected topic branch and hand back this same work file as `AWAITING REVIEWER REVIEW` with exact SHA, changed files, and evidence.

## Promotion / closeout boundary

Do not promote to `main`, delete the topic branch, or start another component/foundation phase until Reviewer accepts the corrected candidate.

After acceptance, promotion, Pages deployment, and live visual verification will be treated as the final closeout of this same work area.
