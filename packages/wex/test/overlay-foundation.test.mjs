import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const index = readFileSync(resolve(root, 'src/index.css'), 'utf8');
const overlay = readFileSync(resolve(root, 'src/foundations/overlay.css'), 'utf8');
const drawerOverlay = readFileSync(resolve(root, 'src/foundations/drawer-overlay.css'), 'utf8');

test('registers WEX Overlay Glass tokens before the layout that consumes them', () => {
  assert.match(index, /@import "\.\/foundations\/overlay\.css";[\s\S]*@import "\.\/foundations\/layout\.css";/);
  assert.match(overlay, /--wex-overlay-glass-tint: 35%;/);
  assert.match(overlay, /--wex-overlay-glass-background: color-mix\(in srgb, var\(--wex-color-background-primary\) var\(--wex-overlay-glass-tint\), transparent\);/);
  assert.match(overlay, /--wex-overlay-glass-blur: calc\(var\(--wex-space-2\) \* 0\.5\);/);
  assert.match(overlay, /--wex-overlay-glass-radius: var\(--wex-radius-large\);/);
  assert.doesNotMatch(overlay, /#[0-9a-f]{3,8}\b|rgb\(|hsl\(|\d+(?:px|rem)/i);
});

test('the Drawer overlay covers only the Admin Body and uses only the Overlay Glass tokens', () => {
  assert.match(drawerOverlay, /\.wex-admin-shell\[data-admin-drawer="open"\]::before\s*\{/);
  assert.match(drawerOverlay, /grid-area: main;/);
  assert.match(drawerOverlay, /border-radius: var\(--wex-overlay-glass-radius\);/);
  assert.match(drawerOverlay, /background: var\(--wex-overlay-glass-background\);/);
  assert.match(drawerOverlay, /backdrop-filter: blur\(var\(--wex-overlay-glass-blur\)\);/);
  assert.doesNotMatch(drawerOverlay, /\d+(?:px|%)|rgb\(|#[0-9a-f]{3,8}\b/i);
});
