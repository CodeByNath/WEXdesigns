# 0039: WEX Form Configuration Contract

## Status

Accepted — Owner-directed Form Editor work, 27 November 2026. Scope is the
Form Editor only; it does not change Form Editor presentation, controls or
tokens (ADR 0028 companion remains the UI authority).

## Context

The Form Editor (ADR 0028 companion) edited field layout and status in local
preview memory only: Publish cleared the history without persisting anything,
and a refresh reset every change. The Owner asked for a reusable contract so a
host (for example a Scuba deployment) only supplies its business schema, data
and a backend adapter, while WEX owns Form Editor behaviour, configuration and
rendering.

## Decision

1. **One schema.** `wex-form-configuration@1` in `@weerax/schemas`
   (`packages/schemas/src/forms/form-configuration.schema.ts`). A
   configuration has `formId`, `scopeId` (opaque host keys) and the fields in
   display order. Each field has only closed layout and status values: `width`
   (`default` or a whole `0`–`100`), `position` (start, center, end,
   stretch), `alignment` (left, center, right, justify), `row` (own, first,
   second), `reverse` and `status` (on, off). Unknown keys are rejected; names
   are unique. Field values, business rules and host data are never part of it.
2. **Editor and Renderer share it.** `apps/web-runtime/src/admin-station-form-configuration.js`:
   `readFormConfiguration` (Form Editor: fields → configuration) and
   `applyFormConfiguration` (Form Renderer: configuration → field order and
   the existing closed data attributes). The content form and the presentation
   status both follow the applied configuration. No inline styles, no new
   attributes or visual values.
3. **Host adapter.** `WexFormConfigurationAdapter` = `load(key)` →
   `{ published }`, `save(configuration)` and `publish(configuration)` → a
   receipt `{ persisted: true, revision }`. The host passes it as
   `formConfigurationAdapter` in the Studio host options; WEX registers it on
   the mounted Admin shell and only calls it. WEX has no storage of its own.
4. **Publish confirms persistence.** Save and Publish call the adapter. While
   the request runs the Editor action button is disabled (existing disabled
   state). Only a valid receipt is success: `wex:admin-editor-save` /
   `wex:admin-editor-publish` fire with `{ configuration, receipt }`, and
   Publish then makes the layout the new starting point (no steps). No adapter,
   a rejection or an invalid receipt fires `wex:admin-editor-persist-failed`
   (`{ action, error }`) and every change and step is kept. Changes made while
   a Publish was pending are not committed. Discard stays local.
5. **Restore on load.** When the Overview form is built (and so on every
   refresh), WEX loads the published configuration for its key and applies it
   as the starting point with no history steps. It is never applied over
   edits already made; a configuration for another key is ignored. Save keeps
   a working copy only and does not change what is published or restored.
6. **Test adapter.** `apps/web-runtime/studio-host/form-configuration-test-adapter.js`
   implements the contract over a Storage-like object. The fixture uses it
   with `sessionStorage` (`?formStorage=fail` rejects, `?formStorage=off`
   supplies none). It is fixture/test-only, outside the Studio release bundle.

## Consequences

- Without a host adapter (the current QSD Studio host), Save and Publish
  report failure and keep the changes instead of claiming success.
- Not decided (needs Owner): visible failure or progress messaging, restoring
  a saved working copy into the Editor, and configuration for forms other than
  Overview. Existing WEX identity allocation, tokens and component boundaries
  are unchanged.

## Evidence routes

- Code Map: [Form configuration](../code-map/form-configuration.md).
- Tests: `packages/schemas/test/form-configuration.test.mjs`,
  `apps/web-runtime/test/admin-station-form-configuration.test.mjs`.
