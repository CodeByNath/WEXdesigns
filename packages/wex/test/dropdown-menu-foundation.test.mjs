import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const index = readFileSync(resolve(root, 'src/index.css'), 'utf8');
const dropdownMenu = readFileSync(resolve(root, 'src/foundations/dropdown-menu.css'), 'utf8');

test('registers WEX Dropdown Menu Default and Small from existing foundations and the Tab Navigation Small Dropdown rows', () => {
  assert.match(index, /@import "\.\/foundations\/dropdown-menu\.css";/);
  assert.match(dropdownMenu, /--wex-dropdown-menu-default-padding: var\(--wex-space-8\);/);
  assert.match(dropdownMenu, /--wex-dropdown-menu-default-gap: var\(--wex-space-4\);/);
  assert.match(dropdownMenu, /--wex-dropdown-menu-default-border-color: var\(--wex-color-border-subtle\);/);
  assert.match(dropdownMenu, /--wex-dropdown-menu-default-radius: var\(--wex-radius-large\);/);
  assert.match(dropdownMenu, /--wex-dropdown-menu-default-background: var\(--wex-color-background-primary\);/);
  assert.match(dropdownMenu, /--wex-dropdown-menu-small-min-inline-size: calc\(var\(--wex-space-64\) \+ var\(--wex-space-48\) \+ var\(--wex-space-8\)\);/);
  assert.match(dropdownMenu, /--wex-dropdown-menu-small-max-inline-size: fit-content;/);
  assert.match(dropdownMenu, /--wex-dropdown-menu-small-padding: var\(--wex-dropdown-menu-default-padding\);/);
  assert.match(dropdownMenu, /\.wex-dropdown-menu--default\s*\{[\s\S]*padding: var\(--wex-dropdown-menu-default-padding\);/);
  assert.match(dropdownMenu, /\.wex-dropdown-menu--small\s*\{[\s\S]*min-inline-size: var\(--wex-dropdown-menu-small-min-inline-size\);[\s\S]*max-inline-size: var\(--wex-dropdown-menu-small-max-inline-size\);/);
  assert.match(dropdownMenu, /\.wex-dropdown-menu__item--default,\s*\.wex-dropdown-menu__item--small\s*\{[\s\S]*min-block-size: var\(--wex-tab-navigation-small-dropdown-target-size\);/);
  assert.match(dropdownMenu, /\.wex-dropdown-menu__item--default\[aria-pressed="true"\]/);
  assert.doesNotMatch(dropdownMenu, /#[0-9a-f]{3,8}\b|rgb\(|hsl\(|\d+(?:px|rem)/i);
});
