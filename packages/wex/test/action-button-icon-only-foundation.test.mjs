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
  assert.match(actionButton, /--wex-action-button-icon-only-small-menu-padding-inline: var\(--wex-space-8\);/);
  assert.match(actionButton, /--wex-action-button-icon-only-small-menu-gap: var\(--wex-space-4\);/);
  assert.match(actionButton, /\.wex-action-button-icon-only--small-menu\s*\{[\s\S]*min-inline-size: var\(--wex-action-button-icon-only-small-target-size\);[\s\S]*padding-inline: var\(--wex-action-button-icon-only-small-menu-padding-inline\);/);
  assert.doesNotMatch(actionButton, /#[0-9a-f]{3,8}\b|rgb\(|hsl\(|\d+(?:px|rem)/i);
});

test('registers Action Button Icon Only Default, Large and Circular modes from Button foundations', () => {
  assert.match(actionButton, /--wex-action-button-icon-only-default-target-size: var\(--wex-button-default-target-size\);/);
  assert.match(actionButton, /--wex-action-button-icon-only-default-icon-size: var\(--wex-icon-size-20\);/);
  assert.match(actionButton, /--wex-action-button-icon-only-large-target-size: var\(--wex-button-large-target-size\);/);
  assert.match(actionButton, /--wex-action-button-icon-only-large-icon-size: var\(--wex-icon-size-20\);/);
  assert.match(actionButton, /--wex-action-button-icon-only-circular-radius: 50%;/);
  assert.match(actionButton, /\.wex-action-button-icon-only--default\s*\{[\s\S]*inline-size: var\(--wex-action-button-icon-only-default-target-size\);[\s\S]*block-size: var\(--wex-action-button-icon-only-default-target-size\);/);
  assert.match(actionButton, /\.wex-action-button-icon-only--large\s*\{[\s\S]*inline-size: var\(--wex-action-button-icon-only-large-target-size\);[\s\S]*block-size: var\(--wex-action-button-icon-only-large-target-size\);/);
  assert.match(actionButton, /\.wex-action-button-icon-only--circular:focus::before\s*\{\s*border-radius: var\(--wex-action-button-icon-only-circular-radius\);/);
});
