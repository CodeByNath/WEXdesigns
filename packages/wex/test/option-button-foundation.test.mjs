import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const index = readFileSync(resolve(root, 'src/index.css'), 'utf8');
const optionButton = readFileSync(resolve(root, 'src/foundations/option-button.css'), 'utf8');

test('registers WEX Option Button Default and Small from existing foundations', () => {
  assert.match(index, /@import "\.\/foundations\/dropdown-menu\.css";\s*@import "\.\/foundations\/option-button\.css";/);
  assert.match(optionButton, /--wex-option-button-default-target-size: var\(--wex-button-small-target-size\);/);
  assert.match(optionButton, /--wex-option-button-default-padding: var\(--wex-space-8\);/);
  assert.match(optionButton, /--wex-option-button-default-radius: calc\(var\(--wex-option-button-default-target-size\) \/ 2\);/);
  assert.match(optionButton, /--wex-option-button-default-icon-size: var\(--wex-more-action-default-icon-size\);/);
  assert.match(optionButton, /--wex-option-button-small-target-size: var\(--wex-space-24\);/);
  assert.match(optionButton, /--wex-option-button-small-padding: var\(--wex-space-4\);/);
  assert.match(optionButton, /--wex-option-button-small-icon-size: var\(--wex-button-small-icon-size\);/);
  assert.match(optionButton, /--wex-option-button-foreground: var\(--wex-color-text-primary\);/);
  assert.match(optionButton, /\.wex-option-button--default\s*\{[\s\S]*inline-size: var\(--wex-option-button-default-target-size\);/);
  assert.match(optionButton, /\.wex-option-button--small\s*\{[\s\S]*inline-size: var\(--wex-option-button-small-target-size\);/);
  assert.match(optionButton, /\.wex-option-button--default\s*\{[\s\S]*block-size: var\(--wex-option-button-default-target-size\);/);
  assert.match(optionButton, /\.wex-option-button--default:focus::before\s*\{\s*border-radius: var\(--wex-option-button-default-radius\);/);
  assert.doesNotMatch(optionButton, /focus-visible|content: none|border-color/);
  assert.doesNotMatch(optionButton, /#[0-9a-f]{3,8}\b|rgb\(|hsl\(|\d+(?:px|rem)|50%/i);
});

test('owns the Option Button hover, pressed and focus states as tokens and never suppresses the Button ring', () => {
  ['background', 'border'].forEach((part) => {
    ['default', 'hover', 'pressed'].forEach((state) => {
      assert.match(optionButton, new RegExp(`--wex-option-button-${part}-${state}: var\\(--wex-button-subtle-${part}-${state}\\);`));
      assert.match(optionButton, new RegExp(`--wex-button-${part}-${state}: var\\(--wex-option-button-${part}-${state}\\);`));
    });
  });
  assert.match(optionButton, /--wex-option-button-focus-color: var\(--wex-color-border-focus\);/);
  assert.match(optionButton, /--wex-outer-ring-color: var\(--wex-option-button-focus-color\);/);
  assert.doesNotMatch(optionButton, /focus-visible|content: none|outline/);
});
