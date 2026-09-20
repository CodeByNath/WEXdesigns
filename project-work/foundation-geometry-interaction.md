# Foundation Geometry and Interaction Recovery Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: Correct Button state boundary so it replaces the default edge instead of nesting inside it

## Reviewer Verdict

**Stop — architectural risk**

Live Pages evidence on promoted `main`
`ccafd4f921c4c03ff55f8e7642a7eba94934ccd5`
shows the fixed-footprint correction still misinterprets the visual rule.

The Button no longer grows, but the state treatment is now rendered as a smaller nested blue box inside the normal Button boundary. The screenshot shows the normal neutral border still visible outside the blue Focus treatment.

That is not the WEX rule.

## Correct Button state rule

### Default

- Button uses its normal `1px` structural boundary.

### Pressed / Selected / Focused

- all three share **one identical state-boundary treatment**;
- that state boundary occupies the Button's **outer visual edge** while staying inside the existing fixed Button box;
- the normal/default `1px` boundary must not remain visibly outside it;
- do not render a second smaller state box inside the Button;
- do not increase external width or height;
- do not change Button radius, tier dimensions, padding, or content position.

The state treatment may internally use layered/inset rendering to preserve fixed dimensions, but the visible result must read as **one state boundary at the Button perimeter**, not:
`default border -> internal gap -> smaller blue rectangle`.

The supplied Carbon focus CSS is a rendering-technique reference only. Its useful principle is:

- existing outer border participates in the focus treatment;
- inset layers add the remaining state thickness/separation internally;
- external footprint stays unchanged.

Do not copy Carbon token names or raw values.

## Builder correction — one complete job

1. Correct ADR 0010 so Button state presentation explicitly replaces/absorbs the visible default edge while preserving fixed external bounds.
2. Reconcile ADR 0005 where needed for Pressed/Focused consumption.
3. Rework Button state CSS so:
   - Default shows the normal 1px boundary;
   - Pressed / Focused use the shared state boundary at the outer perimeter;
   - any remaining inset layer exists only to complete the accepted WEX 2px state treatment / separation, not to create a nested inner rectangle;
   - ordinary Button Selected semantics remain absent.
4. Selected reference presentation must visually match Pressed/Focused exactly.
5. Preserve:
   - fixed external dimensions;
   - Small / Default / Large heights `36 / 40 / 44px`;
   - 8px Button radius;
   - existing padding/typography/variant colours;
   - disabled behaviour;
   - ordinary Button non-selectability.
6. System Settings must place Default beside Pressed / Focused / Selected and make it visually obvious that:
   - Default = 1px normal boundary;
   - all three states = the same single state boundary at the same outer edge;
   - no extra outer neutral border and no smaller nested blue box exist.
7. Add deterministic tests rejecting:
   - retained visible default border outside the state boundary;
   - nested inner state rectangle treatment;
   - external growth / positive outline-offset;
   - state-specific size changes;
   - duplicated component-local state geometry.
8. Browser-validate all three sizes in light/dark and 200% zoom. Record equal bounding boxes and screenshots showing the state boundary occupies the same outer perimeter as Default.
9. Push on the same topic branch and return this file as `AWAITING REVIEWER REVIEW` with exact SHA and evidence.

Do not promote, delete the topic branch, or begin another component/foundation phase until Reviewer accepts this correction.
