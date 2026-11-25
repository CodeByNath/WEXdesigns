import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (name) => readFileSync(new URL(`../src/${name}`, import.meta.url), 'utf8');

test('Width is an Editor-mode progress bar with a travelling value popover, drag and keys on a native range input', () => {
  const js = read('admin-station-field-options.js');
  assert.match(js, /track\.className = 'wex-admin-editor-control wex-admin-editor-progress'/);
  assert.match(js, /bubble = document\.createElement\('div'\)/);
  assert.match(js, /value\.className = 'wex-admin-editor-progress__value'/);
  assert.match(js, /value\.addEventListener\('focus', caretToEnd\)/);
  assert.match(js, /setSelectionRange\(value\.value\.length, value\.value\.length\)/);
  assert.doesNotMatch(js, /value\.select\(\)/);
  assert.match(js, /edit\.className = 'wex-admin-editor-progress__edit'/);
  assert.match(js, /\/\^\\d\{1,3\}\$\/\.test\(value\.value\)/);
  assert.match(js, /range\.min = '0';\s*range\.max = '100';\s*range\.step = '1';/);
  assert.match(js, /setAttribute\('data-width-progress', String\(percent\)\)/);
  assert.match(js, /const text = `\$\{percent\}%`;/);
  assert.doesNotMatch(js, /bubble\.textContent = 'Default'|\? 'Default' :/);
  assert.match(js, /event\.key !== 'Delete' && event\.key !== 'Backspace'/);
  assert.match(js, /trackFieldChange\(editor, \(\) => \{ layout\.width = range\.value; apply\(\); \}, selected\)/);
  assert.doesNotMatch(js, /\.style\b|style=|cssText|dropdown-menu--small wex-admin-field-layout__width/);
});

test('the progress bar is styled from Editor-mode tokens only, with one position rule per whole percentage', () => {
  const css = read('admin-station-field-width-progress.css');
  const tokens = readFileSync(new URL('../../../packages/wex/src/foundations/tab-navigation.css', import.meta.url), 'utf8');
  for (const name of new Set(css.match(/--wex-tab-navigation-editor-[\w-]+/g))) assert.match(tokens, new RegExp(`${name}:`), name);
  for (let value = 0; value <= 100; value += 1) {
    assert.ok(css.includes(`[data-width-progress="${value}"] { --wex-admin-width-progress: ${value}%; }`), String(value));
  }
  assert.doesNotMatch(css.replace(/\[data-width-progress[^\n]*/g, ''), /#[0-9a-f]{3,8}\b|\d+(px|rem)/i);
  assert.match(css, /\.wex-admin-editor-progress__edit:focus-within \{\s*background: var\(--wex-tab-navigation-editor-edit-background\);/);
  assert.match(css, /__edit \{[^}]*border-radius: var\(--wex-tab-navigation-editor-edit-radius\);/);
  assert.match(css, /\.wex-admin-shell \.wex-admin-editor-progress__value:focus-visible \{\s*outline: none;/);
  assert.match(css, /\.wex-admin-editor-progress \{[^}]*padding-block: var\(--wex-tab-navigation-editor-padding-block\);/);
  assert.match(css, /__fill \{[^}]*block-size: var\(--wex-tab-navigation-editor-gap\);/);
  assert.match(read('admin-station.css'), /@import "\.\/admin-station-field-width-progress\.css";/);
});
