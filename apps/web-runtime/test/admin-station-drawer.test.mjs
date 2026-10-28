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
  assert.match(drawer, /@typedef \{\{ owner: string, mode\?: AdminDrawerMode \}\} AdminDrawerRequest/);
  assert.match(drawer, /const ADMIN_DRAWER_REQUEST_EVENT = 'wex:admin-drawer-request';/);
  assert.match(drawer, /const drawerModes = new Set\(\['default', 'half', 'full'\]\);/);
  assert.match(drawer, /drawer\.dataset\.adminDrawerOwner = request\.owner;/);
  assert.match(drawer, /shell\.dataset\.adminDrawerMode = request\.mode \?\? 'default';/);
  assert.match(drawer, /drawer\.hidden = false;/);
  assert.match(drawer, /drawer\.hidden = true;/);
  assert.match(drawer, /shell\.dispatchEvent\(new CustomEvent\(ADMIN_DRAWER_REQUEST_EVENT, \{ detail: request \}\)\);/);
  assert.match(drawer, /event\.target\.closest\('\[data-admin-drawer-trigger\]'\)/);
  assert.doesNotMatch(drawer, /fetch\(|localStorage|innerHTML|style\./);
});

test('allocates the Admin Drawer in the Sidebar-priority workspace above the Admin Body', () => {
  assert.match(layout, /\.wex-admin-shell\[data-sidebar="expanded"\]\s*\{[\s\S]*--wex-admin-shell-sidebar-current: var\(--wex-admin-shell-sidebar-expanded\);/);
  const hoverRule = layout.match(/\.wex-admin-shell\[data-sidebar-hovered="true"\] \.wex-admin-shell__sidebar \{[\s\S]*?\n  \}/);
  assert.ok(hoverRule, 'missing desktop hover-sidebar overlay rule');
  assert.match(hoverRule[0], /position: absolute;/);
  assert.doesNotMatch(hoverRule[0], /--wex-admin-shell-sidebar-current/);
  assert.match(layout, /\.wex-admin-shell__drawer\s*\{[\s\S]*z-index: 2;[\s\S]*grid-area: drawer;[\s\S]*overflow: auto;[\s\S]*background: var\(--wex-color-layer-01\);/);
  assert.match(layout, /\.wex-admin-shell\[data-admin-drawer="open"\] \.wex-admin-shell__drawer\s*\{[\s\S]*grid-area: main;[\s\S]*justify-self: end;/);
  assert.match(layout, /data-admin-drawer-mode="default"\] \.wex-admin-shell__drawer\s*\{[\s\S]*inline-size: min\(var\(--wex-admin-shell-drawer-default-inline-size\), 100%\);/);
  assert.match(layout, /data-admin-drawer-mode="half"\] \.wex-admin-shell__drawer\s*\{[\s\S]*inline-size: 50%;/);
  assert.match(layout, /data-admin-drawer-mode="full"\] \.wex-admin-shell__drawer\s*\{[\s\S]*inline-size: 100%;/);
});

test('keeps compact Sidebar priority over an open Admin Drawer', () => {
  const compact = layout.match(/@media \(max-width: 767px\) \{([\s\S]*)$/);
  assert.ok(compact, 'missing compact Admin Shell rules');
  assert.match(compact[1], /\.wex-admin-shell\[data-admin-drawer="open"\]\s*\{[\s\S]*grid-template-columns: minmax\(0, 1fr\);/);
  assert.match(compact[1], /data-admin-drawer="open"\]\[data-sidebar-drawer="open"\] \.wex-admin-shell__drawer\s*\{\s*display: none;/);
});
