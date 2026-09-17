import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const buttons = readFileSync(resolve(root, 'src/foundations/buttons.css'), 'utf8');

test('defines accepted Button variants through component-semantic tokens', () => {
  for (const variant of ['primary', 'neutral', 'subtle', 'warning', 'danger']) {
    assert.match(buttons, new RegExp(`--wex-button-${variant}-background-default:`));
    assert.match(buttons, new RegExp(`\\.wex-button--${variant}`));
  }
  assert.doesNotMatch(buttons, /wex-button--(?:secondary|ghost)/);
});

test('keeps ordinary Button state transient and accessible', () => {
  assert.match(buttons, /:hover/);
  assert.match(buttons, /:active/);
  assert.match(buttons, /:focus-visible/);
  assert.match(buttons, /:disabled/);
  assert.match(buttons, /--wex-button-disabled-opacity/);
  assert.doesNotMatch(buttons, /aria-pressed|data-wex-button-state/);
});

test('does not invent Button geometry or raw colour values', () => {
  assert.doesNotMatch(buttons, /padding|border-radius|min-(?:height|block-size)|font-size|line-height/);
  assert.doesNotMatch(buttons, /#[0-9a-f]{3,8}|rgb\(|hsl\(/i);
});
