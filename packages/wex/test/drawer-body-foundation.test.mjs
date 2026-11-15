import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const index = readFileSync(resolve(root, 'src/index.css'), 'utf8');
const body = readFileSync(resolve(root, 'src/foundations/drawer-body.css'), 'utf8');

test('the Drawer Body content never grows wider than the default Drawer inline size', () => {
  assert.match(index, /@import "\.\/foundations\/drawer-body\.css";/);
  assert.match(body, /\.wex-admin-shell__drawer \{\s*container-type: inline-size;/);
  assert.match(body, /--wex-admin-shell-drawer-body-inset: max\(var\(--wex-space-16\), calc\(\(100cqi - var\(--wex-admin-shell-sidebar-collapsed\) - var\(--wex-admin-shell-drawer-default-inline-size\)\) \/ 2\)\);/);
  assert.match(body, /padding-inline: var\(--wex-admin-shell-drawer-body-inset\);/);
  assert.doesNotMatch(body.replace(/\/\*[\s\S]*?\*\//g, ''), /#[0-9a-f]{3,8}\b|\d+px/i);
});
