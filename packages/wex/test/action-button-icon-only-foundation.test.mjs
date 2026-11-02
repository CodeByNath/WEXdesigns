import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const index = readFileSync(resolve(root, 'src/index.css'), 'utf8');
const actionButton = readFileSync(resolve(root, 'src/foundations/action-button-icon-only.css'), 'utf8');

test('registers WEX Action Button Icon Only Small from the existing Small Button foundations', () => {
  assert.match(index, /@import "\.\/foundations\/buttons\.css";\s*@import "\.\/foundations\/action-button-icon-only\.css";/);
  assert.match(actionButton, /--wex-action-button-icon-only-small-target-size: var\(--wex-button-small-target-size\);/);
  assert.match(actionButton, /--wex-action-button-icon-only-small-icon-size: var\(--wex-button-small-icon-size\);/);
  assert.match(actionButton, /\.wex-action-button-icon-only--small\s*\{[\s\S]*inline-size: var\(--wex-action-button-icon-only-small-target-size\);[\s\S]*font-size: 0;[\s\S]*justify-content: center;/);
  assert.match(actionButton, /\.wex-action-button-icon-only--small > svg\s*\{[\s\S]*inline-size: var\(--wex-action-button-icon-only-small-icon-size\);/);
  assert.doesNotMatch(actionButton, /#[0-9a-f]{3,8}\b|rgb\(|hsl\(|\d+(?:px|rem)/i);
});
