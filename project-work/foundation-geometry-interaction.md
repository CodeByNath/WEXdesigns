# Foundation Geometry and Interaction Recovery Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: Closeout accepted authority branch before implementation

## Reviewer Verdict

**Proceed**

Reviewer independently verified the authority promotion.

- Current `main` is exactly `72bd24a6b6d5b757f4629b00fc5682d1b67e1089`.
- `main` is identical to the accepted authority candidate.
- `docs/decisions/0010-foundation-geometry-interaction.md` is now authoritative on `main`.
- No CSS, tests, schemas, shared UI, runtime, catalogue, Pages, historical source, theme editing, or unrelated Button-family implementation was introduced during promotion.

## Accepted authority now on main

- Radius tiers: Small `4px`, Default `8px`, Large `12px`.
- Default structural border `1px`.
- Selected outer ring `2px`.
- Focused outer ring `2px`.
- Shared outside ring gap `2px`.
- Registered visual-element allowance `2px` only where explicitly adopted.
- Button content relationship gap `4px`.
- Button padding `4px` block / `12px` inline.
- Button-specific stable boundary `2px`.
- Button minimum heights `36 / 40 / 44px`.
- Interaction roles remain distinct: Default / Hover / Pressed / Selected / Focused / Disabled.
- Universal disabled opacity is `--wex-opacity-disabled: 0.2`.


## Execution surface requirement

This closeout must run on a Git-capable Builder surface that supports safe remote branch deletion.

- Do not assign this deletion to a connector-only surface that cannot delete Git refs.
- Verify branch ancestry before deletion.
- Delete only `docs/foundation-geometry-interaction-authority`.
- Record the exact remote-state evidence and hand back to Reviewer.

## Builder closeout action

Delete only the completed remote authority branch:

`docs/foundation-geometry-interaction-authority`

Requirements:

1. Verify `origin` is exactly `CodeByNath/WEXdesigns`.
2. Verify remote `main` remains at `72bd24a6b6d5b757f4629b00fc5682d1b67e1089`.
3. Verify the topic branch resolves to the same accepted authority history and is fully contained in `main`.
4. Delete only that remote topic branch.
5. Retain `main`, `Project-work-instructions`, and `review/button-local-recovery`.
6. Update this same work file to `AWAITING REVIEWER REVIEW` with exact branch-closeout evidence and stop.

Do not begin CSS/tests implementation until Reviewer verifies this closeout and opens the next implementation phase.
