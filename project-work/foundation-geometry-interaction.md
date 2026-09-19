# Foundation Geometry and Interaction Recovery Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: Corrected authority proposal pushed — stable boundary scope and outer-ring wording

## Reviewer Verdict

**Proceed with safeguards**

Reviewer independently inspected `origin/docs/foundation-geometry-interaction-authority` at `654f6eb57192793c92c85ec68ec5d4a08dab77dd`.

The branch is one commit ahead of `main`, zero behind, and changes only:

- `docs/decisions/0010-foundation-geometry-interaction.md`

The proposal correctly recovers the intended radius tiers, Button padding/heights, interaction-role separation, shared Focused/Selected outer-ring geometry, and universal disabled opacity at `0.2`.

One authority wording defect must be corrected before acceptance.

## Required correction — ADR only

In **Stable boundary and outer-state geometry**, the sentence:

> A component that adopts this contract has a stable `2px` boundary in every appearance and state.

is too broad and conflicts with the immediately following reusable Default structural border of `1px`.

Correct the authority so that:

- reusable WEX **Default structural border** remains `1px`;
- reusable **Selected outer treatment** is `2px`;
- reusable **Focused outer treatment** is `2px`;
- the shared outer-state gap is `2px`;
- the **Button specifically** reserves a stable `2px` boundary in every appearance/state, transparent where visually borderless;
- no rule implies every WEX component must use a `2px` base border.

Also remove the ambiguous phrase `outer gap/inset`. Record this as an **outer 2px gap between the component boundary and the outside state ring**. The ring is outside the component box, does not alter layout dimensions, and Focused/Selected share this geometry while retaining distinct semantics/colour.

Do not alter the accepted values or broaden scope.

## Preserved authority

Keep unchanged:

- Radius Small/Default/Large = `4 / 8 / 12px`.
- Button padding = `4px` block / `12px` inline.
- Button content relationship gap = `4px`.
- Registered visual-element allowance = `2px` only where explicitly adopted.
- Button minimum heights = `36 / 40 / 44px`.
- Interaction roles = Default / Hover / Pressed / Selected / Focused / Disabled.
- Universal disabled opacity = `--wex-opacity-disabled: 0.2`, applied once at the outermost disabled component.
- Button consumes the universal disabled token.
- Customer/business colour-theme derivation remains deferred.

## Handoff

Amend only `docs/decisions/0010-foundation-geometry-interaction.md` on the same authorised topic branch, run `git diff --check`, verify links, push, update this same file to `AWAITING REVIEWER REVIEW` with the new exact SHA, and stop.

No CSS, tests, schemas, shared UI, runtime, catalogue, Pages, or other ADR work is authorised.

## Builder correction handoff

- Corrected candidate: `origin/docs/foundation-geometry-interaction-authority` at `72bd24a6b6d5b757f4629b00fc5682d1b67e1089`.
- Changed only `docs/decisions/0010-foundation-geometry-interaction.md`; `git diff --check` passed and ADR 0004–0006 links remain valid.
- The reusable Default border is now explicitly `1px`; the `2px` Selected/Focused outer treatments share an unambiguous outside ring with a `2px` gap; and the stable `2px` boundary is explicitly Button-only. No values or phase scope changed.
