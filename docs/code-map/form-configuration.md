# Form configuration

Navigation for the WEX Form configuration contract. Authority:
[ADR 0039](../decisions/0039-wex-form-configuration-contract.md). Form Editor
UI and controls remain in [Admin Shell](admin-shell.md) and the ADR 0028
companion.

| Part | Source | Tests |
| --- | --- | --- |
| Schema `wex-form-configuration@1`, receipt, load result, adapter type | `packages/schemas/src/forms/form-configuration.schema.ts` | `packages/schemas/test/form-configuration.test.mjs` |
| Read (Editor), apply (Renderer), restore, persist, adapter registry | `apps/web-runtime/src/admin-station-form-configuration.js` | `apps/web-runtime/test/admin-station-form-configuration.test.mjs` |
| Baseline after restore (`replaceFieldBaseline`) | `apps/web-runtime/src/admin-station-field-history.js` | same |
| Save / Publish through the adapter, `wex:admin-editor-persist-failed` | `apps/web-runtime/src/admin-station-editor-footer.js` | same; `admin-station-field-history.test.mjs` |
| Form key (`data-form-id="overview"`, `data-form-scope` = record id), restore on build | `apps/web-runtime/src/admin-station-product-overview-editor.js` | same |
| Host option `formConfigurationAdapter` | `apps/web-runtime/src/studio-host.js` → `admin-station-runtime.js` | `studio-host.test.mjs` |
| Test storage adapter (fixture only) | `apps/web-runtime/studio-host/form-configuration-test-adapter.js`, `studio-host/fixture.html` | `admin-station-form-configuration.test.mjs` |

## Safe change routes

- New layout property: schema enum/field first, then read/apply, then the
  history attribute list; Owner approval for any new control or value.
- A host integrates by implementing `load`, `save`, `publish` and passing the
  adapter in `wexStudioHostOptions`; it never edits WEX source.
- Fixture check: open Add New → footer Edit → Form Editor, change a field,
  Publish, refresh, reopen: the layout is restored. `?formStorage=fail` shows
  that nothing is reported as published.
