import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const buttons = readFileSync(resolve(root, 'src/foundations/buttons.css'), 'utf8');
const geometry = readFileSync(resolve(root, 'src/foundations/geometry.css'), 'utf8');

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
    ['small', /min-block-size: 2\.25rem;/, '--wex-radius-small', 'small'],
    ['default', /min-block-size: var\(--wex-space-40\);/, '--wex-radius-default', 'default'],
    ['large', /min-block-size: 2\.75rem;/, '--wex-radius-large', 'large'],
  ];

  for (const [tier, blockSize, radius, typographyTier] of tiers) {
    const match = buttons.match(new RegExp(`\\.wex-button--${tier}\\s*\\{([\\s\\S]*?)\\}`));
    assert.ok(match, `missing ${tier} tier`);
    assert.match(match[1], blockSize);
    assert.match(match[1], /padding-block: var\(--wex-space-4\);/);
    assert.match(match[1], /padding-inline: var\(--wex-space-12\);/);
    assert.match(match[1], new RegExp(`border-radius: var\\(${radius}\\);`));
    assert.match(match[1], new RegExp(`wex-type-navigation-${typographyTier}-font-size`));
    assert.match(match[1], new RegExp(`wex-type-navigation-${typographyTier}-line-height`));
  }

  assert.match(buttons, /display: inline-flex/);
  assert.match(buttons, /gap: var\(--wex-space-4\)/);
  assert.match(buttons, /border: var\(--wex-outer-ring-width\) solid var\(--wex-button-border-default\)/);
  assert.match(buttons, /outline-offset: var\(--wex-outer-ring-gap\)/);
  assert.match(geometry, /--wex-border-width-default: 1px;/);
  assert.match(geometry, /--wex-outer-ring-width: 2px;/);
  assert.match(geometry, /--wex-outer-ring-gap: var\(--wex-space-2\)/);
  for (const variant of ['primary', 'neutral', 'subtle', 'warning', 'danger']) {
    const match = buttons.match(new RegExp(`\\.wex-button--${variant}\\s*\\{([\\s\\S]*?)\\}`));
    assert.ok(match, `missing ${variant} variant`);
    assert.doesNotMatch(match[1], /padding|min-block-size|font-size|line-height|border-radius/);
  }
});

test('uses no raw colour values in the Button foundation', () => {
  assert.doesNotMatch(buttons, /#[0-9a-f]{3,8}|rgb\(|hsl\(/i);
});
