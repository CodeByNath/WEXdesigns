# Typography Presentation Completeness Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: Restore pre-component typography presentation

## Reviewer verdict

**Proceed**

User has chosen not to continue component-like presentation refinement inside the Typography workstream.

The correct boundary is to preserve Typography as a foundation-verification surface and defer Tabs, comparison-row abstractions, metadata-row patterns, and other reusable presentation structures until the component programme requires them.

## Authoritative restore point

Restore the Typography presentation to the last accepted state **immediately before tier tabs were introduced**:

`99fb0db0ed600d1a14b69f73920effcf6807af65`

That state is the target for the Typography presentation implementation.

Current promoted `main` is `72de1728fa989169c9994a8c1b2651dd53a51e97`, which contains the later tier-tab work.

## Builder instruction

On the existing `feat/typography-presentation-completeness` branch:

1. Remove the Small / Default / Large tab UI and all tab-specific runtime behaviour introduced after `99fb0db0ed600d1a14b69f73920effcf6807af65`.
2. Restore the Typography presentation files to their exact pre-tab presentation behaviour from that restore point.
3. Preserve all work that already existed at `99fb0db0ed600d1a14b69f73920effcf6807af65`, including:
   - all 54 registered typography specimens;
   - canonical WEX typography classes;
   - computed family / size / line-height / weight / style facts;
   - IBM Plex delivery through WEX;
   - the border-width token safeguard;
   - the explicit `dd` margin reset;
   - existing dark/light presentation behaviour.
4. Do not replace Tabs with another local interaction or component abstraction.
5. Do not implement the horizontal reference-row layout in this phase.
6. Remove/update tests that exist only for the tier-tab interaction, while preserving focused verification of the restored 54-style presentation and existing WEX-authority safeguards.
7. The preferred result is semantically equivalent to the relevant Typography presentation state at `99fb0db0ed600d1a14b69f73920effcf6807af65`; do not invent a new intermediate design.

## Why this is the boundary

Typography owns the type foundation. It should demonstrate that foundation without pre-building component architecture.

Tabs, reusable specimen rows, metadata panels, cards/surfaces, and similar structures should be created only when the component programme establishes their actual WEX contracts.

## Exclusions

Do not change typography core, font delivery, historical WEX source, ADRs, schemas, shared UI, Button, colour authority, or unrelated catalogue sections.

Do not rewrite Git history or reset `main`. Implement the restoration as a normal forward commit on the topic branch.

Run `pnpm check` and `git diff --check`, validate the restored presentation in Chrome light/dark, commit/push the same topic branch, update this file to `AWAITING REVIEWER REVIEW` with exact SHA/evidence, and stop.
