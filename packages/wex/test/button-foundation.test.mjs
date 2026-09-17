import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const buttons = readFileSync(resolve(root, 'src/foundations/buttons.css'), 'utf8');

test('defines all Button variants and global WEX tiers', () => {
  for (const variant of ['primary', 'secondary', 'ghost', 'danger']) {
    assert.match(buttons, new RegExp(`\\.wex-button--${variant}`));
  }
  for (const tier of ['small', 'default', 'large']) {
    assert.match(buttons, new RegExp(`\\.wex-button--${tier}`));
  }
});

test('uses semantic tokens for interaction, focus, and disabled treatment', () => {
  assert.match(buttons, /--wex-color-background-accent/);
  assert.match(buttons, /--wex-color-background-error/);
  assert.match(buttons, /--wex-color-focus/);
  assert.match(buttons, /--wex-opacity-disabled/);
  assert.doesNotMatch(buttons, /#[0-9a-f]{3,8}|rgb\(|hsl\(/i);
});
