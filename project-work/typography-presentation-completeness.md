# Typography Presentation Completeness Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: Tier-tab presentation refinement

## Reviewer verdict

**Proceed with safeguards**

Reviewer verified the promoted baseline:
- `origin/main` is exactly `99fb0db0ed600d1a14b69f73920effcf6807af65`;
- GitHub Actions `Deploy WEX index` run 20 completed successfully for that exact SHA;
- the accepted 54-style computed-facts implementation is now the main baseline.

User visual review accepts the direction but requires one presentation refinement before this workstream closes.

## Refined presentation requirement

Use the supplied reference only for the catalogue interaction/layout idea. Do **not** import its breakpoint model, naming, type tokens, or values.

Replace the simultaneous Small / Default / Large typography columns with a WEX tier selector:

```text
Typography
[ Small ] [ Default ] [ Large ]

active tier
  -> Heading specimens for that tier
  -> Title specimens for that tier
  -> Navigation specimens for that tier
  -> Body specimens for that tier
```

WEX tier is the selector. There is no breakpoint/screen-width selector in this typography presentation.

The purpose is to make the ecosystem pairing rule explicit:

```text
Small   -> Heading Small + Title Small + Navigation Small + Body Small
Default -> Heading Default + Title Default + Navigation Default + Body Default
Large   -> Heading Large + Title Large + Navigation Large + Body Large
```

The presentation must not place different WEX tiers side-by-side in a way that suggests cross-tier composition. Across all three tabs the complete registered system remains represented: 18 valid specimens per tier, 54 total.

## Builder instruction

Refine only the existing Typography System Settings presentation on the current topic branch.

1. Add accessible `Small / Default / Large` tabs, with `Default` initially active.
2. A selected tier displays only the four matching core sets for that tier and their already-registered allowed weight/style variants.
3. Preserve the current canonical class generation and `getComputedStyle` facts. Do not copy typography numeric values into the runtime.
4. Preserve the existing set restrictions:
   - Heading: Light / Regular / Semibold, normal + italic.
   - Title: Light / Regular / Semibold, normal + italic.
   - Navigation: Semibold only, normal + italic.
   - Body: Light / Regular only, normal + italic.
5. Use proper tab semantics and keyboard behaviour: tablist/tab/tabpanel, selected state, Left/Right arrow movement, Home/End where practical, and visible WEX focus presentation.
6. Use existing WEX typography, colour, spacing, geometry, interaction and layout authority. No raw presentation values or new typography primitives.
7. Do not add a breakpoint slider, viewport control, or responsive typography scaling system.
8. Keep compact/mobile behaviour usable; the tier selector may wrap/fit using existing WEX layout rules, but tier meaning must not change with viewport.
9. Update focused tests to prove:
   - exactly three WEX tier tabs;
   - one active tier at a time;
   - each tier resolves the correct 18 registered specimens;
   - tier switching cannot mix Small/Default/Large classes in one active panel;
   - the full 54-style registry remains represented across the three tiers;
   - no typography-core or font-delivery duplication enters the app.
10. Run `pnpm check`, `git diff --check`, and Chrome validation in desktop + compact/mobile, light + dark, including keyboard tab switching.

## Preserve / exclusions

Do not change typography core, font delivery, WEX historical source, ADRs, schemas, shared UI, colour authority, Button, or unrelated catalogue sections.

Do not delete the topic branch. Commit/push the refinement on the same `feat/typography-presentation-completeness` branch, update this same file to `AWAITING REVIEWER REVIEW` with exact SHA/evidence, and stop.
