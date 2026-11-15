import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const index = readFileSync(resolve(root, 'src/index.css'), 'utf8');
const body = readFileSync(resolve(root, 'src/foundations/drawer-body.css'), 'utf8');

test('the Drawer Body shell keeps its content at most 720px, left aligned, from tokens', () => {
  assert.match(index, /@import "\.\/foundations\/drawer-body\.css";/);
  assert.match(body, /\.wex-admin-shell__drawer \{\s*container-type: inline-size;/);
  assert.match(body, /--wex-admin-shell-drawer-body-max-inline-size: calc\(var\(--wex-space-64\) \* 11 \+ var\(--wex-space-16\)\);/);
  assert.match(body, /padding-inline-end: max\(var\(--wex-space-16\), calc\(100cqi - var\(--wex-admin-shell-sidebar-collapsed\) - var\(--wex-space-16\) - var\(--wex-border-width-default\) \* 2 - var\(--wex-admin-shell-drawer-body-max-inline-size\)\)\);/);
  assert.doesNotMatch(body.replace(/\/\*[\s\S]*?\*\//g, ''), /#[0-9a-f]{3,8}\b|\d+(?:px|rem)\b(?!\))/i);
});
