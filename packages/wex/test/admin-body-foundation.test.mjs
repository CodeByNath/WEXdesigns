import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const index = readFileSync(resolve(root, 'src/index.css'), 'utf8');
const body = readFileSync(resolve(root, 'src/foundations/admin-body.css'), 'utf8');

test('the Admin Body shell caps its content at the wide layout maximum and aligns it left', () => {
  assert.match(index, /@import "\.\/foundations\/admin-body\.css";/);
  assert.match(body, /--wex-admin-shell-body-max-inline-size: var\(--wex-layout-max-wide\);/);
  assert.match(body, /\.wex-admin-shell__body:not\(\[hidden\]\) \{\s*display: grid;\s*grid-template-columns: minmax\(0, var\(--wex-admin-shell-body-max-inline-size\)\);\s*justify-content: start;\s*align-content: start;/);
  assert.doesNotMatch(body.replace(/\/\*[\s\S]*?\*\//g, ''), /#[0-9a-f]{3,8}\b|\d+(?:px|rem)/i);
});
