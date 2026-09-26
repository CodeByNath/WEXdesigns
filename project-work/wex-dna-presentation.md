# WEX DNA Presentation

Status: AWAITING REVIEWER REVIEW
Phase: 1B evidence completion — Page Heading DNA presentation

## Reviewer verdict

**Proceed with safeguards**

Candidate reviewed:
`feat/wex-dna-presentation-v1` at
`d6aa97dec8b817bdf80eb930df68a512b0f6797a`.

Accepted baseline:
`main` at `5f428ceb3948247688d53019b0972157c4b2a601`.

## Independent Reviewer verification — 2026-09-27

The candidate is three commits ahead of accepted `main` and changes only:

- `apps/web-runtime/design-tokens/index.html`;
- `apps/web-runtime/index.html`;
- `apps/web-runtime/src/catalogue.css`;
- `apps/web-runtime/test/catalogue.test.mjs`;
- `docs/code-map/heading-dna.md`.

Source/diff matches the authorised presentation boundary:

- existing `/design-tokens/` route is preserved;
- visible identity is **WEX DNA**;
- only `Heading DNA -> Page Heading` is presented;
- registered attributes are exactly `Small`, `Light`, `Accent`, `Bold`,
  `Thin`, and `Italic`;
- Default uses existing Heading Large / Regular / primary-colour presentation;
- `Light` uses `--wex-color-light` on a black catalogue-only demonstration
  surface and does not create a DNA background attribute;
- `Accent` uses `--wex-color-text-accent`;
- no raw colour values, new DNA roles, schemas, components, HTML-heading
  ownership, page-builder system, brand customisation, or loading/shimmer work
  entered the diff;
- focused tests cover route/name/registered-role boundaries and the Light
  specimen scaffold;
- Heading DNA Code Map adds runtime routes/checks without becoming authority.

No commit status or Actions run is attached to the candidate. Builder reports
focused runtime tests, `git diff --check`, and `pnpm check` passing.

## Evidence safeguard

The required browser handoff is incomplete. The work file required Chrome
validation of the **exact candidate** for:

1. desktop presentation;
2. compact/mobile layout;
3. keyboard navigation, skip-link operation, and visible focus;
4. light/dark theme behaviour.

The Builder handoff records light/dark switching, semantic heading hierarchy,
navigation, and the Light scaffold, but does not record compact-layout or
keyboard/skip/focus validation. Source inspection is not a substitute for the
required browser boundary.

## Builder instruction

Do not change source unless browser validation exposes a defect.

On the exact pushed SHA
`d6aa97dec8b817bdf80eb930df68a512b0f6797a`:

- validate compact/mobile layout in Chrome/approved Chromium;
- validate keyboard-only navigation, Skip to content operation, and visible
  focus treatment;
- confirm the Light specimen remains light on its dark demonstration surface in
  both global themes;
- record viewport/context and outcome concisely.

If validation passes without source changes, update this SAME file to
`Status: AWAITING REVIEWER REVIEW` with the missing browser evidence and stop.

If any defect requires a source change, fix only that defect on the same topic
branch, rerun focused tests + `git diff --check` + `pnpm check`, push the new
SHA, record the exact changed scope and browser evidence here, then stop.

Do not promote to `main` yet.

## Builder evidence completion — 2026-09-27

No source changes were required. Validated exact pushed candidate
`feat/wex-dna-presentation-v1` at
`d6aa97dec8b817bdf80eb930df68a512b0f6797a` in Chrome local preview at
`/WEXdesigns/design-tokens/`.

- Desktop: WEX DNA hierarchy, Default, and the six registered attributes render
  correctly in both light and dark themes; Light remains light on its black
  catalogue-only scaffold.
- Compact: at increased Chrome zoom (compact CSS viewport), the established
  responsive layout remains readable and the attribute grid collapses to one
  column without horizontal loss.
- Keyboard: `Tab` exposes the visible Skip to content link; activating it moves
  focus to `#main-content` (`tabindex="-1"`), with the current focus treatment
  visible. Semantic inspection reports ordered H1 through H5 headings.

No deviations or defects found. The candidate SHA and prior test evidence are
unchanged; this handoff adds only the required browser boundary evidence.
