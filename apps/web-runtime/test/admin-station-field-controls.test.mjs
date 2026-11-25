import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import test from 'node:test';

const read = (name) => readFileSync(new URL(`../src/${name}`, import.meta.url), 'utf8');
const foundations = new URL('../../../packages/wex/src/foundations/', import.meta.url);
const tokens = readFileSync(new URL('tab-navigation.css', foundations), 'utf8');
const defined = new Set();
for (const name of readdirSync(foundations)) {
  if (!name.endsWith('.css')) continue;
  for (const match of readFileSync(new URL(name, foundations), 'utf8').matchAll(/^\s*(--[\w-]+):/gm)) defined.add(match[1]);
}

test('Tab Navigation Editor mode only points at existing tokens (no raw values)', () => {
  const lines = tokens.split('\n').filter((line) => line.trim().startsWith('--wex-tab-navigation-editor-'));
  assert.ok(lines.length >= 30);
  for (const line of lines) {
    const value = line.split(':').slice(1).join(':').replace(';', '').trim();
    const references = [...value.matchAll(/var\((--[\w-]+)\)/g)].map((match) => match[1]);
    assert.ok(references.length > 0 && value === `var(${references[0]})`, line);
    assert.ok(defined.has(references[0]), `${references[0]} is not defined`);
  }
});

test('Width, Position, Alignment and Row all consume the Editor mode through one stylesheet', () => {
  const css = read('admin-station-field-controls.css');
  assert.doesNotMatch(css, /#[0-9a-f]{3,8}\b|\d+(px|rem)/i);
  for (const name of new Set(css.match(/--wex-tab-navigation-editor-[\w-]+/g))) assert.match(tokens, new RegExp(`${name}:`), name);
  assert.match(css, /\.wex-admin-editor-control__item\[aria-pressed="true"\]:not\(:focus\):not\(:active\)/);
  assert.match(read('admin-station.css'), /@import "\.\/admin-station-field-controls\.css";/);
  const options = read('admin-station-field-options.js');
  assert.equal((options.match(/className = 'wex-admin-editor-control'/g) ?? []).length, 1);
  assert.match(options, /className = 'wex-admin-editor-control wex-admin-editor-progress'/);
  assert.match(options, /wex-admin-editor-control__item wex-admin-editor-control__item--icon/);
  assert.match(read('admin-station-field-row-control.js'), /className = 'wex-admin-editor-control'/);
  assert.doesNotMatch(options + read('admin-station-field-row-control.js'), /wex-admin-notifications__|wex-button--neutral/);
});
