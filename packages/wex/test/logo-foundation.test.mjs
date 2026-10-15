import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const logo = readFileSync(resolve(root, 'src/foundations/logo.css'), 'utf8');
const index = readFileSync(resolve(root, 'src/index.css'), 'utf8');

test('contains Logo artwork inside the existing 64px Brand geometry', () => {
  assert.match(index, /@import "\.\/foundations\/logo\.css";/);
  assert.match(logo, /\.wex-logo\s*\{[\s\S]*inline-size: min\(100%, var\(--wex-space-64\)\);[\s\S]*block-size: min\(100%, var\(--wex-space-64\)\);/);
  assert.match(logo, /\.wex-logo__image\s*\{[\s\S]*inline-size: 100%;[\s\S]*block-size: 100%;[\s\S]*object-fit: contain;/);
  assert.doesNotMatch(logo, /(?:#[0-9a-f]{3,8}|rgb\(|hsl\(|\d+px)/i);
});
