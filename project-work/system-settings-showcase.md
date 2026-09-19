# System Settings Showcase Work Cycle

Status: BUILDER ACTION REQUIRED
Phase: Read-only single-page System Settings showcase

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
