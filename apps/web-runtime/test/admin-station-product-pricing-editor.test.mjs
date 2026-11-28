import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { CURRENCIES, currencySymbol, formatPrice } from '../src/admin-station-currency-field.js';

const read = (name) => readFileSync(new URL(`../src/${name}`, import.meta.url), 'utf8');

test('Currency: the Owner-approved list with AUD first, Custom typed as given, symbol before the amount', () => {
  assert.deepEqual(CURRENCIES.map(([code]) => code), ['AUD', 'NZD', 'USD', 'EUR', 'GBP']);
  assert.equal(formatPrice({ mode: 'list', value: 'AUD' }, '259'), 'A$259');
  assert.equal(formatPrice({ mode: 'list', value: 'GBP' }, '12'), '£12');
  assert.equal(formatPrice({ mode: 'custom', value: 'CHF ' }, '40'), 'CHF 40');
  assert.equal(currencySymbol({ mode: 'list', value: 'EUR' }), '€');
  const js = read('admin-station-currency-field.js');
  assert.match(js, /wex-dropdown-menu--default wex-admin-currency-field__menu/);
  assert.match(js, /item\.className = 'wex-dropdown-menu__item--default';/);
  assert.match(js, /\['custom', ''\]/);
});

test('the Pricing editor fields, in order: Currency, Advertised price, Price list, Badges, Featured', () => {
  const js = read('admin-station-product-pricing-editor.js');
  const order = ["name: 'currency'", "name: 'advertised-price'", "name: 'price-list'", "name: 'badges'", "name: 'featured'"].map((text) => js.indexOf(text));
  assert.ok(order.every((index) => index > 0));
  assert.deepEqual([...order].sort((a, b) => a - b), order);
  assert.match(js, /parts: \[\{ key: 'price', label: 'Price', required: true \}, \{ key: 'label', label: 'Label', required: true \}, \{ key: 'note', label: 'Note' \}\]/);
  assert.match(js, /parts: \[\{ key: 'text', label: 'Badge', required: true \}\]/);
  assert.match(js, /section\.dataset\.formId = 'pricing';/);
  assert.match(js, /\[data-field-name="currency"\]'\)\?\.setAttribute\('data-field-row', 'first'\);\s*section\.querySelector\(':scope > \[data-field-name="advertised-price"\]'\)\?\.setAttribute\('data-field-row', 'second'\);/);
  assert.match(js, /registerProductEditor\(section,/);
  assert.match(js, /keepFieldStatus\(section, scopeId\);\s*void restoreFormConfiguration\(section, formConfigurationAdapterFor\(shell\)\);/);
  /* Labels never carry values (Owner rule): no currency symbol, nor any value, is written into a label. */
  assert.doesNotMatch(js, /currencySymbol|label\.textContent =/);
  for (const name of ['admin-station-outlined-field.js', 'admin-station-currency-field.js', 'admin-station-field-repeater.js']) {
    assert.match(read(name), /(text|label)\.textContent = (options\.)?label;/);
  }
});

test('Currency is not presented; presentation writes the symbol before each price and marks the field rows', () => {
  const js = read('admin-station-product-pricing.js');
  assert.match(js, /formatPrice\(pricing\.currency, pricing\.priceFrom\)/);
  assert.match(js, /formatPrice\(pricing\.currency, row\.price\)/);
  assert.match(js, /\['Advertised price', 'advertised-price'\], \['Price list', 'price-list'\], \['Badges', 'badges'\], \['Featured', 'featured'\]/);
  assert.doesNotMatch(js, /\['Currency'/);
  assert.match(js, /priceFrom: '259'/);
  assert.match(read('admin-station-field-status.css'), /\.wex-admin-product-pricing \[data-presentation-field\]\[data-field-status="off"\]/);
});

test('repeater: outlined box and label pill, Remove per item and Add at the end, existing tokens only', () => {
  const js = read('admin-station-field-repeater.js');
  assert.match(js, /wex-button wex-button--small wex-button--neutral wex-action-button-icon-only--small/);
  assert.match(js, /iconButton\(document, 'plus', `Add \$\{options\.itemLabel\}`\)/);
  assert.match(js, /iconButton\(document, 'x', `Remove \$\{options\.itemLabel\}`\)/);
  assert.match(js, /box\.dataset\.fieldName = options\.name;/);
  const css = read('admin-station-product-editor-fields.css');
  assert.doesNotMatch(css, /#[0-9a-f]{3,8}\b|\b\d+(?:px|rem)\b(?![^@]*\{)/i);
  assert.match(css, /\.wex-admin-field-repeater \{[^}]*border: var\(--wex-border-width-default\) solid var\(--wex-color-border-subtle\);[^}]*border-radius: var\(--wex-radius-large\);/);
  assert.match(css, /\.wex-admin-field-repeater \{[^}]*padding: calc\(var\(--wex-space-24\) \+ var\(--wex-space-12\)\) var\(--wex-space-12\) var\(--wex-space-12\);/);
  assert.match(read('admin-station.css'), /@import "\.\/admin-station-product-editor-fields\.css";/);
});

test('every section editor shares the Form Editor, footer, state and Discard; the active one is the selected section', () => {
  const editors = read('admin-station-product-editors.js');
  assert.match(editors, /data-admin-product-selected/);
  assert.match(editors, /dirty: states\.some\(\(state\) => state\.dirty\), publishable: states\.every\(\(state\) => state\.publishable\)/);
  assert.match(read('admin-station-product-sections.js'), /body\.dataset\.adminProductSelected = id;/);
  assert.match(read('admin-station-form-builder.js'), /closest\('\.wex-admin-product-sections__tab'\)[\s\S]*firstField\(drawer\)/);
  assert.match(read('admin-station-editor-footer.js'), /return drawer \? activeProductEditor\(drawer\) : null;/);
  assert.match(read('admin-station-add-new-sections.js'), /discardProductEditors\(shell\);/);
  assert.match(read('admin-station-drawer-editor.css'), /\[data-admin-product-section="pricing"\] \.wex-admin-product-editor\[data-admin-product-editor="pricing"\]/);
});

test('one editor gap for every section: the heading ends with the Drawer heading gap, the editor adds 12px', () => {
  const css = read('admin-station-drawer-editor.css');
  assert.match(css, /\[data-admin-drawer-editing\] \.wex-admin-drawer-main > :not\(\.wex-admin-product-editor\) \{\s*margin-block: 0;\s*padding-block: 0;\s*\}/);
  assert.match(css, /\[data-admin-drawer-editing\] \.wex-admin-drawer-main > :not\(\.wex-admin-product-editor\) > \.wex-admin-product-section-head \{\s*margin-block: 0 var\(--wex-admin-shell-drawer-heading-gap\);\s*\}/);
  assert.match(css, /\.wex-admin-product-editor\[data-admin-product-editor="pricing"\] \{\s*display: grid;\s*gap: var\(--wex-space-24\);\s*(?:\/\*[^*]*\*\/\s*)?margin-block-start: var\(--wex-space-12\);/);
  /* No section may set its own editor gap. */
  assert.doesNotMatch(css, /\[data-admin-product-editor="[a-z-]+"\] \{[^}]*margin-block-start[^}]*\}[\s\S]*\[data-admin-product-editor="[a-z-]+"\] \{[^}]*margin-block-start/);
});
