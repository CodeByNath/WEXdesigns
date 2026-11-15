import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const index = readFileSync(resolve(root, 'src/index.css'), 'utf8');
const body = readFileSync(resolve(root, 'src/foundations/drawer-body.css'), 'utf8');

test('the Drawer Body shell caps its content at 560px, left aligned, and at 720px in Half mode until two 560px columns fit, from tokens', () => {
  assert.match(index, /@import "\.\/foundations\/drawer-body\.css";/);
  assert.match(body, /\.wex-admin-shell__drawer \{\s*container-type: inline-size;/);
  assert.match(body, /--wex-admin-shell-drawer-body-max-inline-size: var\(--wex-admin-shell-drawer-default-inline-size\);/);
  assert.match(body, /--wex-admin-shell-drawer-body-half-max-inline-size: calc\(var\(--wex-space-64\) \* 11 \+ var\(--wex-space-16\)\);/);
  assert.match(body, /\.wex-admin-shell\[data-admin-drawer-mode="half"\] \{[^}]*--wex-admin-shell-drawer-body-max-inline-size: calc\(var\(--wex-admin-shell-drawer-body-half-max-inline-size\) - clamp\(calc\(var\(--wex-space-16\) \* 0\), calc\(\(var\(--wex-admin-shell-drawer-body-inline-size\) - var\(--wex-admin-shell-drawer-default-inline-size\) \* 2\) \* 1000\), calc\(var\(--wex-admin-shell-drawer-body-half-max-inline-size\) - var\(--wex-admin-shell-drawer-default-inline-size\)\)\)\);/);
  assert.match(body, /--wex-admin-shell-drawer-content-end-inset: calc\(100cqi - var\(--wex-admin-shell-sidebar-collapsed\) - var\(--wex-space-16\) - var\(--wex-border-width-default\) \* 2 - var\(--wex-admin-shell-drawer-body-max-inline-size\)\);/);
  assert.match(body, /\.wex-admin-shell__drawer-body \{\s*padding-inline-end: max\(var\(--wex-space-16\), var\(--wex-admin-shell-drawer-content-end-inset\)\);/);
  assert.doesNotMatch(body.replace(/\/\*[\s\S]*?\*\//g, ''), /#[0-9a-f]{3,8}\b|\d+(?:px|rem)\b(?!\))/i);
});

test('the Drawer Header and Footer actions end where the Body content ends, using the same end inset', () => {
  const header = readFileSync(resolve(root, 'src/foundations/drawer-header.css'), 'utf8');
  const footer = readFileSync(resolve(root, 'src/foundations/drawer-footer.css'), 'utf8');
  assert.match(header, /padding-inline-end: max\(var\(--wex-space-16\), var\(--wex-admin-shell-drawer-content-end-inset\)\);/);
  assert.match(footer, /padding-inline-end: max\(var\(--wex-space-16\), var\(--wex-admin-shell-drawer-content-end-inset\)\);/);
});
