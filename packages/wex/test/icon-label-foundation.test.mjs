import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const index = readFileSync(resolve(root, 'src/index.css'), 'utf8');
const iconLabel = readFileSync(resolve(root, 'src/foundations/icon-label.css'), 'utf8');

test('registers the global Icon Label rule: icon one text line high, aligned to the first line', () => {
  assert.match(index, /@import "\.\/foundations\/icon-label\.css";/);
  assert.match(iconLabel, /\.wex-icon-label\s*\{[^}]*display: flex;[^}]*align-items: flex-start;[^}]*gap: var\(--wex-space-8\);/);
  assert.match(iconLabel, /\.wex-icon-label__icon\s*\{[^}]*inline-size: var\(--wex-icon-size-16\);[^}]*block-size: 1lh;/);
  assert.match(iconLabel, /\.wex-icon-label__icon > svg\s*\{[^}]*inline-size: var\(--wex-icon-size-16\);[^}]*block-size: var\(--wex-icon-size-16\);/);
  assert.doesNotMatch(iconLabel.replace(/\/\*[\s\S]*?\*\//g, ''), /#[0-9a-f]{3,8}\b|rgb\(|hsl\(|\d+(?:px|rem)/i);
  assert.doesNotMatch(iconLabel.replace(/\/\*[\s\S]*?\*\//g, ''), /--wex-icon-label-/);
});
