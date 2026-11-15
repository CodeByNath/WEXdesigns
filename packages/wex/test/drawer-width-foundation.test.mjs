import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const index = readFileSync(resolve(root, 'src/index.css'), 'utf8');
const width = readFileSync(resolve(root, 'src/foundations/drawer-width.css'), 'utf8');
const layout = readFileSync(resolve(root, 'src/foundations/layout.css'), 'utf8');

test('the Half Drawer is at most 1000px wide, built from tokens, and Full stays full width', () => {
  assert.match(index, /@import "\.\/foundations\/drawer-width\.css";/);
  assert.match(width, /--wex-admin-shell-drawer-half-max-inline-size: calc\(var\(--wex-space-64\) \* 15 \+ var\(--wex-space-48\) - var\(--wex-space-8\)\);/);
  assert.equal(layout.match(/data-admin-drawer-mode="half"\] \.wex-admin-shell__drawer \{\s*inline-size: min\(50%, var\(--wex-admin-shell-drawer-half-max-inline-size\)\);/g)?.length, 2);
  assert.equal(layout.match(/data-admin-drawer-mode="full"\] \.wex-admin-shell__drawer \{\s*inline-size: 100%;/g)?.length, 2);
  assert.doesNotMatch(width.replace(/\/\*[\s\S]*?\*\//g, ''), /#[0-9a-f]{3,8}\b|\d+(?:px|rem)\b(?!\))/i);
});
