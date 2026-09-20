# Foundation Geometry and Interaction Recovery Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: Review Button perimeter-state correction

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

## Builder handoff

Candidate: `origin/feat/foundation-geometry-interaction` at
`5e13a35318704c2df15e39b807650af05a22c498` (`fix(wex): place Button states on perimeter`).

Pressed and Focused now change the existing `1px` outer boundary to the shared
state colour, then add the remaining shared `1px` state thickness immediately
inside it. The shared `2px` gap begins only after that perimeter boundary.
Selected reference uses the identical treatment. No default boundary remains
outside the state colour; no nested blue rectangle, external growth, local
state geometry, selection contract, or Button size change was introduced.

Updated ADRs 0010/0005, shared geometry, Button and reference CSS, System
Settings copy, and focused WEX/runtime/audit tests.

Checks passed:

- `git diff --check`
- `pnpm --filter @weerax/wex test` (7/7)
- `pnpm audit:foundation`
- `pnpm --filter @weerax/web-runtime check` (type-check + 6/6)

Chrome local-candidate evidence at `http://localhost:5174/WEXdesigns/`:

- light and dark screenshots show Default beside Pressed/Focused/Selected with
  a continuous perimeter state boundary and no exterior neutral edge;
- native keyboard focus visibly uses that same perimeter boundary;
- measured Small / Default / Large boxes in both themes: `63.75×36`,
  `80.515625×40`, `77.125×44`; state layers are absolute and tests reject any
  state dimensions;
- 200% Chrome zoom screenshot shows no overflow or layout shift.

This is a local exact-branch preview because Pages deploys `main` only.
Do not promote, delete the topic branch, or begin another phase before
independent Reviewer review.
