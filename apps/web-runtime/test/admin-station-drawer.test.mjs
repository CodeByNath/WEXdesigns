import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const [shell, drawer, layout] = await Promise.all([
  readFile(new URL('../src/admin-station-shell.js', import.meta.url), 'utf8'),
  readFile(new URL('../src/admin-station-drawer.js', import.meta.url), 'utf8'),
  readFile(new URL('../../../packages/wex/src/foundations/layout.css', import.meta.url), 'utf8'),
]);

test('provides an empty Admin Drawer shell with only approved allocation modes', () => {
  assert.match(shell, /data-admin-drawer="closed" data-admin-drawer-mode="default"/);
  assert.match(shell, /<aside class="wex-admin-shell__drawer" data-admin-drawer-shell aria-label="Admin drawer" hidden><\/aside>/);
  assert.match(drawer, /@typedef \{'default' \| 'half' \| 'full'\} AdminDrawerMode/);
  assert.match(drawer, /const drawerModes = new Set\(\['default', 'half', 'full'\]\);/);
  assert.match(drawer, /shell\.dataset\.adminDrawerMode = mode;/);
  assert.match(drawer, /drawer\.hidden = false;/);
  assert.match(drawer, /drawer\.hidden = true;/);
  assert.doesNotMatch(drawer, /fetch\(|localStorage|innerHTML|style\./);
});

test('allocates the Admin Drawer beside, never over, the Sidebar', () => {
  assert.match(layout, /\.wex-admin-shell\[data-admin-drawer="open"\]\s*\{[\s\S]*grid-template-areas:[\s\S]*"sidebar main drawer"[\s\S]*grid-template-columns: var\(--wex-admin-shell-drawer-sidebar-size\) minmax\(0, 1fr\) var\(--wex-admin-shell-drawer-inline-size\);/);
  assert.match(layout, /\.wex-admin-shell\[data-admin-drawer="open"\]\[data-sidebar="expanded"\],[\s\S]*--wex-admin-shell-drawer-sidebar-size: var\(--wex-admin-shell-sidebar-expanded\);/);
  assert.match(layout, /\.wex-admin-shell__drawer\s*\{[\s\S]*grid-area: drawer;[\s\S]*overflow: auto;/);
  assert.match(layout, /\.wex-admin-shell\[data-admin-drawer-mode="default"\][\s\S]*min\([\s\S]*var\(--wex-admin-shell-drawer-default-inline-size\),[\s\S]*calc\(100% - var\(--wex-admin-shell-drawer-sidebar-size\)\)/);
  assert.match(layout, /\.wex-admin-shell\[data-admin-drawer-mode="half"\][\s\S]*calc\(\(100% - var\(--wex-admin-shell-drawer-sidebar-size\)\) \/ 2\)/);
  assert.match(layout, /\.wex-admin-shell\[data-admin-drawer-mode="full"\][\s\S]*calc\(100% - var\(--wex-admin-shell-drawer-sidebar-size\)\)/);
});

test('keeps compact Sidebar priority over an open Admin Drawer', () => {
  const compact = layout.match(/@media \(max-width: 767px\) \{([\s\S]*)$/);
  assert.ok(compact, 'missing compact Admin Shell rules');
  assert.match(compact[1], /data-admin-drawer="open"\]\[data-sidebar-drawer="open"\] \.wex-admin-shell__drawer\s*\{\s*display: none;/);
});
