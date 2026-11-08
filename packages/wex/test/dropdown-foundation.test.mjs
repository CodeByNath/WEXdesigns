import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const index = readFileSync(resolve(root, 'src/index.css'), 'utf8');
const dropdown = readFileSync(resolve(root, 'src/foundations/dropdown.css'), 'utf8');

test('registers WEX Dropdown Default as the anchor with no size modes', () => {
  assert.match(index, /@import "\.\/foundations\/option-button\.css";\s*@import "\.\/foundations\/dropdown\.css";/);
  assert.match(dropdown, /--wex-dropdown-default-z-index: 3;/);
  assert.match(dropdown, /--wex-dropdown-default-inset-block-start: 100%;/);
  assert.match(dropdown, /--wex-dropdown-default-inset-inline-end: 0;/);
  assert.match(dropdown, /--wex-dropdown-default-max-inline-size: 100%;/);
  assert.match(dropdown, /--wex-dropdown-default-max-block-size: calc\(100dvh - var\(--wex-admin-shell-header-size\)\);/);
  assert.match(dropdown, /\.wex-dropdown \{[\s\S]*position: absolute;[\s\S]*z-index: var\(--wex-dropdown-default-z-index\);[\s\S]*inset-block-start: var\(--wex-dropdown-default-inset-block-start\);[\s\S]*inset-inline-end: var\(--wex-dropdown-default-inset-inline-end\);[\s\S]*overflow: auto;/);
  assert.match(dropdown, /\.wex-dropdown\[hidden\] \{\s*display: none;/);
  assert.doesNotMatch(dropdown, /--wex-dropdown-default-(?:small|large)/);
});

test('carries the module and size in the Component Mode attribute', () => {
  assert.match(dropdown, /--wex-dropdown-notification-module-inline-size: min\(calc\(var\(--wex-space-64\) \* 7\), 100%\);/);
  assert.match(dropdown, /--wex-dropdown-notification-module-block-size: min\(calc\(var\(--wex-space-64\) \* 8\), var\(--wex-dropdown-default-max-block-size\)\);/);
  assert.match(dropdown, /\.wex-dropdown\[data-wex-component-mode~="notification-module"\] \{\s*inline-size: var\(--wex-dropdown-notification-module-inline-size\);\s*block-size: var\(--wex-dropdown-notification-module-block-size\);/);
  assert.match(dropdown, /--wex-dropdown-notification-module-small-inline-size: min\(calc\(var\(--wex-space-64\) \* 5\), 100%\);/);
  assert.match(dropdown, /\.wex-dropdown\[data-wex-component-mode~="notification-module"\]\[data-wex-component-mode~="small"\] \{[\s\S]*inline-size: var\(--wex-dropdown-notification-module-small-inline-size\);[\s\S]*block-size: var\(--wex-dropdown-notification-module-small-block-size\);/);
  ['header-padding', 'header-gap', 'item-padding-block', 'item-padding-inline', 'item-gap', 'icon-column-size', 'icon-size', 'glyph-size'].forEach((name) => {
    assert.match(dropdown, new RegExp(`--wex-dropdown-notification-module-small-${name}: var\\(--wex-(?:space|icon-size)-\\d+`));
  });
  assert.doesNotMatch(dropdown, /#[0-9a-f]{3,8}\b|rgb\(|hsl\(|\d+(?:px|rem)/i);
});
