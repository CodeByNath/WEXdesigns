import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (name) => readFileSync(new URL(`../src/${name}`, import.meta.url), 'utf8');

test('the selected-field label row leads with the edit icon and ends with the status switch', () => {
  assert.match(read('admin-station-form-builder.js'), /heading\.append\(icon, name\);[\s\S]*heading\.after\(createFieldStatus\(heading\.ownerDocument, selected\)\)/);
  assert.match(read('admin-station-form-builder.css'), /\.wex-admin-quick-actions__heading \{[^}]*justify-content: flex-start;[^}]*gap: var\(--wex-space-8\);/);
});

test('the status switch is one pill with On or Off inside it and a knob, and a press is a history step', () => {
  const js = read('admin-station-field-status.js');
  assert.match(js, /setAttribute\('role', 'switch'\)/);
  assert.match(js, /setAttribute\('aria-label', 'Field status'\)/);
  assert.match(js, /word\.textContent = on \? 'On' : 'Off'/);
  assert.match(js, /button\.append\(word, knob\)/);
  assert.match(js, /trackFieldChange\(selected\.parentElement/);
  assert.match(read('admin-station-field-history.js'), /'data-field-status'\];[\s\S]*null, null, 'on'\];/);
});

test('On takes the blue accent, Off is grey with the knob first, existing tokens only', () => {
  const css = read('admin-station-field-status.css');
  assert.match(css, /\.wex-admin-field-status \{[^}]*background: var\(--wex-color-background-accent\);\s*color: var\(--wex-color-on-accent\);/);
  assert.match(css, /\[aria-checked="false"\] \{\s*flex-direction: row-reverse;\s*background: var\(--wex-color-surface-selected\);/);
  assert.match(css, /__word \{[^}]*text-transform: uppercase;/);
  assert.doesNotMatch(css, /#[0-9a-f]{3,8}\b|\d+(px|rem)/i);
  assert.match(read('admin-station.css'), /@import "\.\/admin-station-field-status\.css";/);
});
