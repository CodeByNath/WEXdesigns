import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const index = readFileSync(resolve(root, 'src/index.css'), 'utf8');
const body = readFileSync(resolve(root, 'src/foundations/drawer-body.css'), 'utf8');

test('the Drawer Body shell lays out columns of at most 560px, left aligned, one full-width column below 767px', () => {
  assert.match(index, /@import "\.\/foundations\/drawer-body\.css";/);
  assert.match(body, /--wex-admin-shell-drawer-body-column-max-inline-size: var\(--wex-admin-shell-drawer-default-inline-size\);/);
  assert.match(body, /\.wex-admin-shell__drawer-body \{\s*display: grid;\s*grid-template-columns: repeat\(auto-fill, minmax\(min\(100%, var\(--wex-admin-shell-drawer-body-column-max-inline-size\)\), var\(--wex-admin-shell-drawer-body-column-max-inline-size\)\)\);\s*justify-content: start;\s*align-content: start;\s*column-gap: var\(--wex-space-24\);/);
  assert.match(body, /@media \(max-width: 767px\) \{\s*\.wex-admin-shell__drawer-body \{\s*grid-template-columns: minmax\(0, 1fr\);/);
  assert.doesNotMatch(body.replace(/\/\*[\s\S]*?\*\//g, ''), /#[0-9a-f]{3,8}\b|\d+(?:px|rem)\b(?!\))/i);
});
