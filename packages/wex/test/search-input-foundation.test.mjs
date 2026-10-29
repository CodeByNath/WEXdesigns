import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const index = readFileSync(resolve(root, 'src/index.css'), 'utf8');
const searchInput = readFileSync(resolve(root, 'src/foundations/search-input.css'), 'utf8');

test('registers WEX Search Input Default entirely through existing foundation references', () => {
  assert.match(index, /@import "\.\/foundations\/search-input\.css";/);
  for (const token of [
    'icon-size', 'gap', 'target-size', 'padding-inline', 'border-width', 'border-color',
    'radius', 'background', 'foreground', 'input-foreground', 'focus-color',
    'focus-inner-width', 'focus-outer-width', 'focus-gap', 'focus-gap-color',
  ]) assert.match(searchInput, new RegExp('--wex-search-input-default-' + token + ': var\\(--wex-'));
  assert.match(searchInput, /\.wex-search-input\s*\{[\s\S]*display: flex;[\s\S]*min-block-size: var\(--wex-search-input-default-target-size\);[\s\S]*border-radius: var\(--wex-search-input-default-radius\);/);
  assert.match(searchInput, /\.wex-search-input svg\s*\{[\s\S]*inline-size: var\(--wex-search-input-default-icon-size\);/);
  assert.match(searchInput, /\.wex-search-input:focus-within::after\s*\{[\s\S]*border: var\(--wex-search-input-default-focus-inner-width\) solid var\(--wex-search-input-default-focus-color\);/);
  assert.match(searchInput, /\.wex-search-input:focus-within::before\s*\{[\s\S]*border: var\(--wex-search-input-default-focus-gap\) solid var\(--wex-search-input-default-focus-gap-color\);/);
  assert.doesNotMatch(searchInput, /#[0-9a-f]{3,8}|rgb\(|hsl\(/i);
});
