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

test('implements the accepted shared Button geometry for every tier', () => {
  const tiers = [
    ['small', '--wex-space-32', '--wex-space-4', '--wex-space-12', 'small'],
    ['default', '--wex-space-40', '--wex-space-4', '--wex-space-16', 'default'],
    ['large', '--wex-space-48', '--wex-space-8', '--wex-space-24', 'large'],
  ];

  for (const [tier, blockSize, blockPadding, inlinePadding, typographyTier] of tiers) {
    const match = buttons.match(new RegExp(`\\.wex-button--${tier}\\s*\\{([\\s\\S]*?)\\}`));
    assert.ok(match, `missing ${tier} tier`);
    assert.match(match[1], new RegExp(`min-block-size: var\\(${blockSize}\\);`));
    assert.match(match[1], new RegExp(`padding-block: var\\(${blockPadding}\\);`));
    assert.match(match[1], new RegExp(`padding-inline: var\\(${inlinePadding}\\);`));
    assert.match(match[1], new RegExp(`wex-type-navigation-${typographyTier}-font-size`));
    assert.match(match[1], new RegExp(`wex-type-navigation-${typographyTier}-line-height`));
  }

  assert.match(buttons, /display: inline-flex/);
  assert.match(buttons, /border: 1px solid var\(--wex-button-border-default\)/);
  assert.match(buttons, /border-radius: 0/);
  assert.match(buttons, /outline-offset: var\(--wex-space-2\)/);
  for (const variant of ['primary', 'neutral', 'subtle', 'warning', 'danger']) {
    const match = buttons.match(new RegExp(`\\.wex-button--${variant}\\s*\\{([\\s\\S]*?)\\}`));
    assert.ok(match, `missing ${variant} variant`);
    assert.doesNotMatch(match[1], /padding|min-block-size|font-size|line-height|border-radius/);
  }
});

test('uses no raw colour values in the Button foundation', () => {
  assert.doesNotMatch(buttons, /#[0-9a-f]{3,8}|rgb\(|hsl\(/i);
});
