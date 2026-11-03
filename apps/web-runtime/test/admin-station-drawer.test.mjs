import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const [shell, drawer, layout] = await Promise.all([
  readFile(new URL('../src/admin-station-shell.js', import.meta.url), 'utf8'),
  readFile(new URL('../src/admin-station-drawer.js', import.meta.url), 'utf8'),
  readFile(new URL('../../../packages/wex/src/foundations/layout.css', import.meta.url), 'utf8'),
]);

test('provides the Admin Drawer shell with four content-empty compartments', () => {
  assert.match(shell, /<aside class="wex-admin-shell__drawer" data-admin-drawer-shell aria-label="Admin drawer" hidden>/);
  for (const [tag, name] of [['header', 'header'], ['div', 'sidebar'], ['div', 'body'], ['footer', 'footer']]) {
    assert.match(shell, new RegExp(`<${tag} class="wex-admin-shell__drawer-${name}" data-admin-drawer-compartment="${name}"></${tag}>`));
  }
  assert.match(drawer, /@typedef \{'header' \| 'sidebar' \| 'body' \| 'footer'\} AdminDrawerCompartmentName/);
  assert.match(drawer, /export function adminDrawerCompartment\(shell, name\)/);
});

test('lays the open Drawer out as a full-height Sidebar beside Header, Body, and Footer using existing tokens', () => {
  const open = layout.match(/\.wex-admin-shell\[data-admin-drawer="open"\] \.wex-admin-shell__drawer \{[\s\S]*?\n\}/);
  assert.ok(open, 'missing open Drawer rule');
  assert.match(open[0], /display: grid;/);
  assert.match(open[0], /"sidebar header"\s*"sidebar body"\s*"sidebar footer"/);
  assert.match(open[0], /grid-template-columns: var\(--wex-admin-shell-sidebar-collapsed\) minmax\(0, 1fr\);/);
  assert.match(open[0], /grid-template-rows: auto minmax\(0, 1fr\) auto;/);
  assert.doesNotMatch(layout, /^\.wex-admin-shell__drawer \{[^}]*display:/m);
  for (const name of ['header', 'sidebar', 'body', 'footer']) {
    assert.match(layout, new RegExp(`\\.wex-admin-shell__drawer-${name} \\{[^}]*grid-area: ${name};`));
  }
  assert.match(layout, /\.wex-admin-shell__drawer-header \{[^}]*min-block-size: var\(--wex-admin-shell-header-size\);[^}]*padding: var\(--wex-space-16\);[^}]*border-block-end: var\(--wex-border-width-default\) solid var\(--wex-color-border-subtle\);/);
  assert.match(layout, /\.wex-admin-shell__drawer-body \{[^}]*overflow: auto;/);
  assert.match(layout, /\.wex-admin-shell__drawer-footer \{[^}]*border-block-start: var\(--wex-border-width-default\) solid var\(--wex-color-border-subtle\);/);
  assert.doesNotMatch(shell.match(/<aside class="wex-admin-shell__drawer"[\s\S]*?<\/aside>/)[0], /style=/);
});

test('keeps the Admin Drawer allocation modes approved and request-owned', () => {
  assert.match(drawer, /@typedef \{'default' \| 'half' \| 'full'\} AdminDrawerMode/);
  assert.match(drawer, /@typedef \{\{ owner: string, mode\?: AdminDrawerMode \}\} AdminDrawerRequest/);
  assert.match(drawer, /const ADMIN_DRAWER_REQUEST_EVENT = 'wex:admin-drawer-request';/);
  assert.match(drawer, /const drawerModes = new Set\(\['default', 'half', 'full'\]\);/);
  assert.match(drawer, /drawer\.dataset\.adminDrawerOwner = request\.owner;/);
  assert.match(drawer, /shell\.dataset\.adminDrawerMode = request\.mode \?\? 'default';/);
  assert.match(drawer, /drawer\.hidden = false;/);
  assert.match(drawer, /drawer\.hidden = true;/);
  assert.match(drawer, /shell\.dispatchEvent\(new CustomEvent\(ADMIN_DRAWER_REQUEST_EVENT, \{ detail: request \}\)\);/);
  assert.match(drawer, /target\?\.closest\('\[data-admin-drawer-trigger\]'\)/);
  assert.match(drawer, /target\?\.closest\('\[data-sidebar-control\]'\)/);
  assert.match(drawer, /target\?\.closest\('\.wex-admin-shell__sidebar-tab--group'\)/);
  assert.match(drawer, /sidebarControl instanceof HTMLElement && shell\.contains\(sidebarControl\)/);
  assert.match(drawer, /sidebarDisclosure instanceof HTMLElement && shell\.contains\(sidebarDisclosure\)/);
  assert.doesNotMatch(drawer, /fetch\(|localStorage|innerHTML|style\./);
});

test('allocates the Admin Drawer in the Sidebar-priority workspace above the Admin Body', () => {
  assert.match(layout, /\.wex-admin-shell\[data-sidebar="expanded"\]\s*\{[\s\S]*--wex-admin-shell-sidebar-current: var\(--wex-admin-shell-sidebar-expanded\);/);
  const hoverRule = layout.match(/\.wex-admin-shell\[data-sidebar-hovered="true"\] \.wex-admin-shell__sidebar \{[\s\S]*?\n  \}/);
  assert.ok(hoverRule, 'missing desktop hover-sidebar overlay rule');
  assert.match(hoverRule[0], /position: absolute;/);
  assert.match(hoverRule[0], /z-index: 2;/);
  assert.doesNotMatch(hoverRule[0], /--wex-admin-shell-sidebar-current/);
  assert.match(layout, /\.wex-admin-shell__drawer\s*\{[\s\S]*z-index: 1;[\s\S]*grid-area: drawer;[\s\S]*overflow: hidden;[\s\S]*background: var\(--wex-color-layer-01\);/);
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
