import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const index = readFileSync(resolve(root, 'src/index.css'), 'utf8');
const componentTitle = readFileSync(resolve(root, 'src/foundations/component-title.css'), 'utf8');

test('registers WEX Component Title Default from existing Navigation Default and colour foundations', () => {
  assert.match(index, /@import "\.\/foundations\/component-title\.css";/);
  for (const property of ['font-family', 'font-size', 'line-height', 'letter-spacing']) {
    assert.match(componentTitle, new RegExp(`--wex-component-title-default-${property}: var\\(--wex-type-navigation-default-${property}\\);`));
  }
  assert.match(componentTitle, /--wex-component-title-default-font-weight: var\(--wex-type-navigation-default-primary-weight\);/);
  assert.match(componentTitle, /--wex-component-title-default-font-style: var\(--wex-type-style-normal\);/);
  assert.match(componentTitle, /--wex-component-title-default-foreground: var\(--wex-color-text-primary\);/);
  assert.match(componentTitle, /\.wex-component-title\s*\{[\s\S]*font-size: var\(--wex-component-title-default-font-size\);[\s\S]*color: var\(--wex-component-title-default-foreground\);/);
  assert.doesNotMatch(componentTitle, /#[0-9a-f]{3,8}\b|rgb\(|hsl\(|\d+(?:px|rem)/i);
});
