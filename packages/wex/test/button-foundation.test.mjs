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
  assert.match(buttons, /\.wex-button:not\(:disabled\):hover:not\(:focus\)/);
  assert.match(buttons, /:active/);
  assert.match(buttons, /:focus/);
  assert.doesNotMatch(buttons, /:focus-visible/);
  assert.match(buttons, /:disabled/);
  assert.match(buttons, /--wex-button-disabled-opacity/);
  assert.doesNotMatch(buttons, /--wex-button-focus-outline/);
  assert.doesNotMatch(buttons, /aria-pressed|data-wex-button-state/);
});

test('keeps neutral and subtle Action backgrounds theme-semantic', () => {
  assert.match(buttons, /--wex-button-neutral-background-hover: var\(--wex-color-background-secondary\);/);
  assert.match(buttons, /--wex-button-subtle-background-hover: var\(--wex-color-background-secondary\);/);
  assert.match(buttons, /--wex-button-neutral-background-pressed: var\(--wex-color-light-grey\);/);
  assert.match(buttons, /--wex-button-subtle-background-pressed: var\(--wex-color-light-grey\);/);
  assert.match(buttons, /\[data-wex-theme='dark'\]\s*\{[\s\S]*--wex-button-neutral-background-pressed: var\(--wex-color-dark-grey\);[\s\S]*--wex-button-subtle-background-pressed: var\(--wex-color-dark-grey\);/);
});

test('uses the approved secondary-text foreground for every neutral Button state', () => {
  assert.match(buttons, /--wex-button-neutral-foreground-default: var\(--wex-color-text-secondary\);/);
  assert.match(buttons, /--wex-button-neutral-foreground-hover: var\(--wex-color-text-secondary\);/);
  assert.match(buttons, /--wex-button-neutral-foreground-pressed: var\(--wex-color-text-secondary\);/);
  assert.match(buttons, /--wex-button-neutral-border-default: var\(--wex-color-text-secondary\);/);
  assert.match(buttons, /--wex-button-neutral-border-hover: var\(--wex-color-text-secondary\);/);
  assert.match(buttons, /--wex-button-neutral-border-pressed: var\(--wex-color-text-secondary\);/);
});

test('implements the accepted shared Button geometry for every tier', () => {
  const tiers = [
    ['small', /min-block-size: var\(--wex-button-small-target-size\);/, 'small'],
    ['default', /min-block-size: var\(--wex-button-default-target-size\);/, 'default'],
    ['large', /min-block-size: var\(--wex-button-large-target-size\);/, 'large'],
  ];

  for (const [tier, blockSize, typographyTier] of tiers) {
    const match = buttons.match(new RegExp(`\\.wex-button--${tier}\\s*\\{([\\s\\S]*?)\\}`));
    assert.ok(match, `missing ${tier} tier`);
    assert.match(match[1], blockSize);
    assert.match(match[1], /padding-block: var\(--wex-button-padding-block\);/);
    assert.match(match[1], /padding-inline: var\(--wex-button-padding-inline\);/);
    assert.doesNotMatch(match[1], /border-radius:/);
    assert.match(match[1], new RegExp(`wex-type-navigation-${typographyTier}-font-size`));
    assert.match(match[1], new RegExp(`wex-type-navigation-${typographyTier}-line-height`));
  }

  assert.match(buttons, /display: inline-flex/);
  assert.match(buttons, /--wex-button-small-target-size: 2\.25rem;/);
  assert.match(buttons, /--wex-button-default-target-size: var\(--wex-space-40\);/);
  assert.match(buttons, /--wex-button-large-target-size: 2\.75rem;/);
  assert.match(buttons, /--wex-button-content-gap: var\(--wex-space-4\);/);
  assert.match(buttons, /--wex-button-padding-block: var\(--wex-space-4\);/);
  assert.match(buttons, /--wex-button-padding-inline: var\(--wex-space-12\);/);
  assert.match(buttons, /--wex-button-radius: var\(--wex-radius-default\);/);
  assert.match(buttons, /gap: var\(--wex-button-content-gap\)/);
  assert.match(buttons, /border-radius: var\(--wex-button-radius\);/);
  assert.doesNotMatch(buttons, /--wex-button-boundary-width/);
  assert.match(buttons, /border: var\(--wex-button-border-width\) solid var\(--wex-button-border-default\)/);
  const baseButton = buttons.match(/\.wex-button\s*\{([\s\S]*?)\}/);
  assert.ok(baseButton, 'missing Button base rule');
  assert.doesNotMatch(baseButton[1], /border: var\(--wex-outer-ring-width\) solid/);
  assert.match(buttons, /position: relative;/);
  assert.match(buttons, /outline: none;/);
  assert.match(geometry, /--wex-border-width-default: 1px;/);
  assert.match(geometry, /--wex-outer-ring-width: 2px;/);
  assert.match(geometry, /--wex-outer-ring-gap: var\(--wex-space-2\)/);
  assert.match(
    geometry,
    /--wex-outer-ring-inner-width: calc\(var\(--wex-outer-ring-width\) - var\(--wex-border-width-default\)\);/,
  );
  assert.match(geometry, /--wex-outer-ring-gap-color: var\(--wex-color-background\);/);
  assert.match(geometry, /--wex-outer-ring-color: var\(--wex-color-border-focus\);/);
  const pressed = buttons.match(/\.wex-button:not\(:disabled\):active\s*\{([\s\S]*?)\}/);
  assert.ok(pressed, 'missing transient pressed state');
  const stateBoundary = buttons.match(
    /\.wex-button:not\(:disabled\):active,\s*\.wex-button:focus\s*\{([\s\S]*?)\}/,
  );
  assert.ok(stateBoundary, 'missing shared perimeter state boundary');
  assert.match(stateBoundary[1], /border-color: var\(--wex-outer-ring-color\);/);
  const insetState = buttons.match(
    /\.wex-button:not\(:disabled\):active::after,\s*\.wex-button:focus::after\s*\{([\s\S]*?)\}/,
  );
  assert.ok(insetState, 'missing shared inset pressed/focus treatment');
  assert.match(insetState[1], /inset: 0;/);
  assert.match(insetState[1], /border: var\(--wex-outer-ring-inner-width\) solid var\(--wex-outer-ring-color\);/);
  assert.match(
    insetState[1],
    /border-radius: calc\(var\(--wex-button-radius\) - var\(--wex-button-border-width\)\);/,
  );
  const insetGap = buttons.match(
    /\.wex-button:not\(:disabled\):active::before,\s*\.wex-button:focus::before\s*\{([\s\S]*?)\}/,
  );
  assert.ok(insetGap, 'missing shared internal state gap');
  assert.match(insetGap[1], /inset: var\(--wex-outer-ring-inner-width\);/);
  assert.match(insetGap[1], /border: var\(--wex-outer-ring-gap\) solid var\(--wex-outer-ring-gap-color\);/);
  assert.match(
    insetGap[1],
    /border-radius: calc\(var\(--wex-button-radius\) - var\(--wex-outer-ring-width\)\);/,
  );
  assert.doesNotMatch(insetGap[1], /(?:inline-size|block-size|width|height|min-size|min-width|min-height):/);
  assert.doesNotMatch(buttons, /outline-offset:/);
  assert.doesNotMatch(buttons, /box-shadow:/);
  assert.doesNotMatch(insetState[1], /(?:inline-size|block-size|width|height|min-size|min-width|min-height):/);
  assert.doesNotMatch(buttons, /--wex-button-(?:outer-ring|state-inset)/);
  assert.doesNotMatch(buttons, /--wex-outer-ring-inset/);
  assert.doesNotMatch(buttons, /\b2px\b/);
  for (const variant of ['primary', 'neutral', 'subtle', 'warning', 'danger']) {
    const match = buttons.match(new RegExp(`\\.wex-button--${variant}\\s*\\{([\\s\\S]*?)\\}`));
    assert.ok(match, `missing ${variant} variant`);
    assert.doesNotMatch(match[1], /padding|min-block-size|font-size|line-height|border-radius/);
  }
});

test('uses no raw colour values in the Button foundation', () => {
  assert.doesNotMatch(buttons, /#[0-9a-f]{3,8}|rgb\(|hsl\(/i);
});
