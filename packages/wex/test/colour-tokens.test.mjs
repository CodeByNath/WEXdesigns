import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const colour = readFileSync(resolve(root, 'src/foundations/colour.css'), 'utf8');
const interaction = readFileSync(resolve(root, 'src/foundations/interaction.css'), 'utf8');
const css = `${colour}\n${interaction}`;

const requiredTokens = [
  'background-primary',
  'background-secondary',
  'background-accent',
  'background-accent-hover',
  'background-accent-selected',
  'border-primary',
  'border-subtle',
  'border-interactive',
  'border-focus',
  'text-primary',
  'text-secondary',
  'text-placeholder',
  'text-accent',
  'text-success',
  'text-warning',
  'text-error',
  'link-primary',
  'link-secondary',
  'icon-primary',
  'icon-secondary',
  'icon-accent',
  'background-warning',
  'background-warning-hover',
  'background-warning-selected',
  'background-success',
  'background-success-hover',
  'background-success-selected',
  'background-error',
  'background-error-hover',
  'background-error-selected',
];

test('defines the complete core colour-token contract', () => {
  for (const token of requiredTokens) {
    assert.match(css, new RegExp(`--wex-color-${token}:`), `missing ${token}`);
  }
  assert.match(css, /--wex-opacity-disabled:\s*0\.1;/);
});

test('keeps the approved primitive palette exact', () => {
  const expected = new Set([
    '#000000', '#161616', '#393939', '#ffffff', '#f4f4f4', '#e0e0e0',
    '#0f62fe', '#0043ce', '#78a9ff', '#f1c21b', '#b28600', '#fddc69',
    '#24a148', '#198038', '#6fdc8c', '#da1e28', '#a2191f', '#fa4d56',
  ]);
  const actual = new Set(colour.match(/#[0-9a-f]{6}/g) ?? []);

  assert.deepEqual(actual, expected);
  assert.doesNotMatch(css, /--wex-color-(?:gray|blue)-\d+:/);
});

test('resolves every custom-property reference inside the colour foundations', () => {
  const definitions = new Set(
    [...css.matchAll(/(--[a-z0-9-]+)\s*:/g)].map((match) => match[1]),
  );
  const references = new Set(
    [...css.matchAll(/var\((--[a-z0-9-]+)\)/g)].map((match) => match[1]),
  );
  const missing = [...references].filter((reference) => !definitions.has(reference));

  assert.deepEqual(missing, []);
});
