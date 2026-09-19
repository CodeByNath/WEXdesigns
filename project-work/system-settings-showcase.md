# System Settings Showcase Work Cycle

Status: AWAITING REVIEWER REVIEW
Phase: Browser accessibility and compact-view evidence submitted for unchanged candidate

## Goal

Use the existing `apps/web-runtime` / GitHub Pages surface as a human-facing WEX control-centre preview.

This first phase is read-only. It demonstrates current WEX presentation; it does not create editable settings, tenant overrides, or new design-system authority.

## Authorised branch

Create exactly one active topic branch from current `main`:

`feat/system-settings-showcase`

Retain `review/button-local-recovery` as historical recovery evidence; it is not active work.

## Builder scope

Read current Code Maps and linked authority/source before implementation.

Build one page inside the existing WEX runtime shell, headed/grouped as **System Settings**, with stacked sections:

### Colours

Show the currently defined usable WEX colours as compact rows with:
- actual colour swatch;
- human-readable colour name;
- resolved hex value.

Group for readability as Main, Accent, Warning, Success, Error.

Do not duplicate palette hex values into runtime markup/JS as a second source of truth. Resolve displayed values from current WEX CSS/custom properties at runtime or another equally authority-preserving mechanism.

### Typography

Show a concise control-centre summary, not the entire typography specification:
- current font family;
- representative Heading, Title, Navigation, and Body examples;
- registered Small / Default / Large tier presentation where useful.

Do not invent new font families, weights, tiers, or typography values.

### Buttons

Show the five accepted Button variants and current Small / Default / Large presentation sufficiently to exercise live hover, focus, pressed and disabled presentation.

Catalogue examples are explicitly non-domain demonstration controls. Do not invent semantic commands, handlers, fake records, dispatcher logic, or product actions merely to make the samples clickable.

## Live behaviour

Preserve and test the existing light/dark theme control.

The page must support normal browser interaction needed to inspect WEX presentation: keyboard focus, hover, native press/active behaviour, responsive layout, and in-page navigation if introduced.

Do not add editing yet.

## Architecture safeguards

- WEX remains presentation authority.
- System Settings is an application/runtime presentation of existing authority, not a new authority layer.
- Use existing WEX tokens/classes/foundations; no raw visual values in runtime CSS where WEX already owns them.
- Do not create a new shared UI component family, schema, adapter, drawer system, settings schema, tenant/brand override model, persistence model, or permissions model.
- Do not alter WEX foundations or accepted Button contracts to suit the showcase.
- Keep the implementation local to the existing web runtime unless a proven test-only adjustment is required.

## Verification and handoff

Run at minimum:
- `pnpm audit:foundation`
- `pnpm --filter @weerax/web-runtime check`
- `pnpm --filter @weerax/wex test`
- `git diff --check`

Also validate the built page interactively in a browser/dev runtime:
- light/dark theme;
- colour swatches/labels/values;
- typography samples;
- Button hover/focus/press/disabled presentation;
- keyboard access;
- mobile/compact layout.

Commit/push the single topic branch, verify the remote SHA, then update this same work file to `AWAITING REVIEWER REVIEW` with changed files, checks, interactive evidence, limitations, and unresolved issues. Stop for Reviewer.

## Exclusions

No edit/save controls, tenant/business overrides, brand middle layer, drawer editing, persistence, auth/permissions, new WEX values, new component families, or external-repository work in this phase.

## Builder handoff

- Candidate: `origin/feat/system-settings-showcase` at `642ca9eca034f54c2cd7836ce158f8c00403016b`.
- Changed: `apps/web-runtime/index.html`, `src/catalogue.css`, `src/main.js`, and `test/catalogue.test.mjs` within that runtime. Colours are resolved from WEX custom properties at runtime; typography and Button examples consume existing WEX classes/tokens only.
- Passed: `git diff --check`; `pnpm --filter @weerax/web-runtime check`; `pnpm audit:foundation`; `pnpm --filter @weerax/wex test`; and `pnpm --filter @weerax/web-runtime build`.
- Browser evidence (local preview `http://localhost:5173/WEXdesigns/`): light and dark theme toggle, all palette labels/resolved values, typography samples, five Button variants and disabled examples, native button activation, and keyboard focus ring were inspected. GitHub Pages production path is `https://codebynath.github.io/WEXdesigns/`; it remains `main`-only and therefore cannot show this unmerged candidate.
- Limitation: the compact CSS breakpoint is covered by implementation but was not independently inspected at a narrow browser viewport; Reviewer should include that check. Hover/pressed rules are the accepted WEX Button foundation and its focused tests passed; a persistent hover/active screenshot was not captured by the available automation.
- Process note: retain both preview paths above for a future `AGENTS.md` guidance update only if the Reviewer authorises it. No guidance change is included here.


## Reviewer Verdict

**Proceed with safeguards**

The pushed candidate at `642ca9eca034f54c2cd7836ce158f8c00403016b` is structurally within scope: one commit ahead of `main`, zero behind, and limited to the four authorised `apps/web-runtime` files. It consumes current WEX foundations, resolves colour values from CSS custom properties at runtime, uses existing typography/Button classes, adds no product actions or edit model, and introduces no raw colour values into runtime CSS.

Acceptance is blocked only on missing browser evidence that the Builder already identified and that is now mandatory under `project-work/AGENTS.md`.

### Required Builder follow-up — evidence only unless a defect is found

Using the exact candidate SHA in Chrome/approved Chromium local preview:

1. Inspect the compact/mobile layout at a narrow viewport (at minimum the existing <=767px breakpoint) and record the tested viewport size plus result.
2. Run keyboard-only traversal from page start through the theme control and all enabled Button examples; confirm visible focus, sensible order, skip-link operation, and that disabled Buttons are skipped as expected.
3. Use Chrome accessibility inspection/tools to verify the page landmarks/headings/section labelling, theme checkbox accessible name/state, colour rows' readable text output, and Button names/disabled states. Record any issues found.
4. Exercise and record light/dark theme behaviour plus representative hover and native press/active presentation for the accepted Button variants.
5. If any defect is found, fix only that defect on the same branch, rerun the required repository checks, push the updated SHA, and report the diff. If no defect is found, do not change implementation merely to create evidence.
6. Update this same work file back to `AWAITING REVIEWER REVIEW` with exact Chrome evidence and the final remote SHA; stop.

Do not promote to `main` yet. Production GitHub Pages remains a post-promotion Reviewer evidence boundary because the deployment workflow is `main`-only.

## Builder follow-up evidence

- The candidate is unchanged: `origin/feat/system-settings-showcase` remains `642ca9eca034f54c2cd7836ce158f8c00403016b`.
- Chrome local preview: `http://localhost:5173/WEXdesigns/`. At Chrome 250% zoom, its effective CSS viewport was approximately 544px (below the `<=767px` breakpoint). The header compacted correctly, colour groups and Button cards became single-column, and colour values moved beneath their labels without horizontal overflow.
- Keyboard-only traversal from page start was: Skip to content, WEX home, Dark theme, then Primary / Neutral / Subtle / Warning / Danger Small, Default, Large in that order (15 enabled Buttons). All five disabled examples were skipped. The Skip link moved focus to `#main-content`; focus remained visibly outlined on the active Button.
- Chrome accessibility tree confirmed the page header/main/footer structure; H1 System Settings, H2 Colours/Typography/Buttons, labelled group H3s; named theme checkbox with checked/unchecked state; readable colour names and resolved values; and all Buttons' names plus disabled state. No issue was found.
- Light and dark themes were each exercised in Chrome. Native click and Space activation were exercised on representative enabled Buttons without a domain action; disabled examples remained unavailable. Existing accepted WEX Button focused tests cover hover and `:active` state selectors; available browser automation does not expose a durable pointer-hover/press capture.
- Checks remain the prior passing evidence because source is unchanged. Production Pages at `https://codebynath.github.io/WEXdesigns/` remains `main`-only until promotion.
