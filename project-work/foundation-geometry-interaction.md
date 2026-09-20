# Foundation Geometry and Interaction Recovery Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: Review promoted fixed-footprint Button outer-state correction

## Reviewer Verdict

**Proceed with safeguards**

Reviewer independently inspected:
`origin/feat/foundation-geometry-interaction` at
`ccafd4f921c4c03ff55f8e7642a7eba94934ccd5`.

## Accepted correction

The candidate fixes the live visible-scaling defect.

### Button invariant

- Default visible Button footprint is authoritative.
- Pressed and Focused now render their shared state treatment **inside** the existing Button box.
- Selected reference geometry uses the same inset treatment for selection-capable components.
- No positive `outline-offset` remains on Button.
- State presentation no longer increases visible external width or height.

### Preserved geometry

- structural Button boundary = `1px`;
- Button radius = Default `8px` for Small / Default / Large;
- minimum heights remain `36 / 40 / 44px`;
- shared state ring = `2px`;
- shared visual separation = `2px`, rendered internally;
- ordinary Button remains non-selectable.

### Implementation

WEX now owns reusable inset-state tokens including ring inset, gap colour, and ring colour. Real Button Pressed and Focused use generated internal pseudo-element layers rather than an outside outline. System Settings compares Default / Pressed / Focused / Selected at one fixed 40px reference footprint.

No wrapper sizing, state-specific dimensions, raw replacement values, Toggle Button contract, `aria-pressed`, or shared-UI selection semantics were introduced.

Compared with current `main` `d10bac62ad65690d68b43c9420b7935dc0e9aefe`, the candidate is exactly one commit ahead and changes only the authorised ADR, WEX foundation, tests/audit, and System Settings runtime files.

Builder evidence reports passing:

- `git diff --check`
- `pnpm --filter @weerax/wex test` (7/7)
- `pnpm audit:foundation`
- `pnpm --filter @weerax/web-runtime check` (type-check + 6/6)
- Chrome measured Default/state equality:
  - Small `63.75×36`
  - Default `80.515625×40`
  - Large `77.125×44`
- equality preserved in light/dark and at 200% zoom;
- native pointer `:active` confirmed for all tiers;
- keyboard Focus visible;
- no compact overflow or layout shift.

## Builder promotion evidence

- Verified `origin` is exactly `https://github.com/CodeByNath/WEXdesigns.git`.
- Verified remote `main` was `d10bac62ad65690d68b43c9420b7935dc0e9aefe`, an ancestor of exact candidate `ccafd4f921c4c03ff55f8e7642a7eba94934ccd5`.
- Fast-forwarded `main` exactly to `ccafd4f921c4c03ff55f8e7642a7eba94934ccd5`, pushed it, and confirmed the remote at that exact SHA. No merge commit, rebase, amendment, or extra source change was used.
- GitHub Pages workflow [35494475981](https://github.com/CodeByNath/WEXdesigns/actions/runs/35494475981) completed successfully for `ccafd4f921c4c03ff55f8e7642a7eba94934ccd5`.

Do not delete the topic branch or begin another phase before Reviewer closeout.

Final Reviewer closeout:
- verify promoted `main`;
- verify live Default vs Pressed/Focused visible footprint equality and the three-state reference;
- if clean, authorize topic-branch deletion and accept this work area.
