# Typography Presentation Completeness Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: Reference-layout typography presentation correction

## Reviewer verdict

**Proceed with safeguards**

Post-promotion visual review rejects the current layout. The tier logic is correct, but the presentation structure does not match the supplied reference intent.

Promoted `main` baseline is `72de1728fa989169c9994a8c1b2651dd53a51e97`. Keep its tier semantics and typography authority; correct presentation only on the same topic branch.

## Visual finding

Current WEX presentation uses large full-width dark specimen cards with sample, class name, and facts stacked inside each card. This creates excessive vertical height and does not resemble the requested reference structure.

The supplied reference is authoritative only for **layout/comparison structure**, not its colours, breakpoint model, token names, or typography values.

Required structure:

```text
[ Small ] [ Default ] [ Large ]

Heading
┌───────────────────────────────┬──────────────────────┐
│ rendered specimen             │ canonical metadata   │
│                               │ class                │
│                               │ family               │
│                               │ size / line-height   │
│                               │ weight / style       │
└───────────────────────────────┴──────────────────────┘
(repeat one horizontal row per registered style)

Title
(same row model)

Navigation
(same row model)

Body
(same row model)
```

## Builder correction

1. Preserve the existing Small / Default / Large selector and tier-pure panel logic.
2. Within the active tier, render each registered style as a **single horizontal specimen row**:
   - left region: large rendered sample only;
   - right region: compact canonical metadata.
3. Use a stable two-column proportion similar to the reference (sample visually dominant, metadata narrower) using WEX grid/layout authority. Do not copy reference pixel widths.
4. Remove the current nested full-width black-card presentation. Rows may use WEX layer/border tokens, but must read as comparison rows, not cards inside cards.
5. Keep one concise set heading before the rows for Heading, Title, Navigation, and Body.
6. Metadata should be compact and scannable. Preserve computed WEX facts, but format them more like the reference:
   - canonical class
   - Family
   - Size
   - Line height
   - Weight
   - Style
   No invented type-system labels or duplicate numeric authority.
7. Preserve WEX dark/light themes. **Do not copy the reference white/grey palette.**
8. Preserve tier-purity: all typography-bearing text inside a tier panel derives from that tier.
9. On compact/mobile, the row may stack sample above metadata only when width requires it. This is responsive layout only; it must not change the selected WEX tier.
10. Maintain accessible tab semantics, keyboard behaviour, computed-fact generation, 18 specimens per tier, and 54 total registry.
11. Update tests to cover the horizontal row structure and guard against reintroducing the old stacked-card model.
12. Validate all three tabs in desktop and compact/mobile, light and dark. The desktop comparison should be visually close in **structure and density** to the supplied reference.

## Exclusions

Do not change typography core, font delivery, historical WEX source, ADRs, schemas, shared UI, colour authority, Button, or unrelated catalogue sections.

Do not add breakpoint controls, screen-width sliders, Carbon token names, or reference typography values.

Run `pnpm check`, `git diff --check`, and Chrome validation. Commit/push the same `feat/typography-presentation-completeness` branch, update this file to `AWAITING REVIEWER REVIEW` with exact SHA/evidence, then stop.
