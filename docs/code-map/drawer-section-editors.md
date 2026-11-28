# Drawer section editors

Navigation for the product section editors opened from Edit. Authority:
[ADR 0028 section editors companion](../decisions/0028-admin-drawer-section-editors.md);
configuration contract: [Form configuration](form-configuration.md). The
Admin Shell map ([admin-shell.md](admin-shell.md)) is at its line limit.

| Part | Source | Tests |
| --- | --- | --- |
| Editor registry: active editor, combined state, Discard all | `apps/web-runtime/src/admin-station-product-editors.js` | `admin-station-product-pricing-editor.test.mjs` |
| Overview editor | `admin-station-product-overview-editor.js` | `admin-station-drawer-editor.test.mjs` |
| Pricing editor (Currency, Advertised price, Price list, Badges, Featured) | `admin-station-product-pricing-editor.js` | `admin-station-product-pricing-editor.test.mjs` |
| Repeater field | `admin-station-field-repeater.js` | same |
| Currency field, symbols, `formatPrice` | `admin-station-currency-field.js` | same |
| Repeater and Currency styles | `admin-station-product-editor-fields.css` (imported by `admin-station.css`) | same |
| Pricing presentation (currency + amount, field rows) | `admin-station-product-pricing.js` | `admin-station-product-pricing-editor.test.mjs` |
| Editor visibility per section | `admin-station-drawer-editor.css` | `admin-station-drawer-editor.test.mjs` |
| Selected section (`data-admin-product-selected`) | `admin-station-product-sections.js` | same |
| Form Editor / Editor footer follow the active editor | `admin-station-form-builder.js`, `admin-station-editor-footer.js` | `admin-station-drawer-editor.test.mjs` |
| Off status per record and form, presentation mute | `admin-station-field-status.js`, `admin-station-field-status.css` | `admin-station-field-status.test.mjs` |

## Safe change route for the next section

1. Build `createProduct<Section>Editor(shell)` like Pricing: a
   `.wex-admin-product-editor` with `data-admin-product-editor`, `data-form-id`
   and `data-form-scope`, fields with `data-field-name`, `registerProductEditor`,
   `keepFieldStatus`, `restoreFormConfiguration`.
2. Add it to `mainShell` in `admin-station-add-new-sections.js` and its
   visibility selector in `admin-station-drawer-editor.css`.
3. Mark presentation rows with `data-presentation-field` and call
   `syncPresentationFieldStatus`; add the section's presentation class to the
   Off rule in `admin-station-field-status.css`.
4. Field breakdown (single, repeater, chooser) comes from the Owner.
5. Do not add spacing for the new editor: the shared editor gap rule in
   `admin-station-drawer-editor.css` already gives every section the same
   heading-to-first-field gap.
