import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const [shell, drawer, layout, handleCss, index, icons] = await Promise.all([
  readFile(new URL('../src/admin-station-shell.js', import.meta.url), 'utf8'),
  readFile(new URL('../src/admin-station-drawer.js', import.meta.url), 'utf8'),
  readFile(new URL('../../../packages/wex/src/foundations/layout.css', import.meta.url), 'utf8'),
  readFile(new URL('../../../packages/wex/src/foundations/drawer-handle.css', import.meta.url), 'utf8'),
  readFile(new URL('../../../packages/wex/src/index.css', import.meta.url), 'utf8'),
  readFile(new URL('../src/admin-station-system-icons.js', import.meta.url), 'utf8'),
]);

test('provides the Admin Drawer shell with four content-empty compartments', () => {
  assert.match(shell, /<aside id="admin-station-drawer" class="wex-admin-shell__drawer" data-admin-drawer-shell aria-label="Admin drawer" hidden>/);
  for (const [tag, name] of [['header', 'header'], ['div', 'sidebar'], ['div', 'body'], ['footer', 'footer']]) {
    assert.match(shell, new RegExp(`<${tag} class="wex-admin-shell__drawer-${name}" data-admin-drawer-compartment="${name}"></${tag}>`));
  }
  assert.match(drawer, /@typedef \{'header' \| 'sidebar' \| 'body' \| 'footer'\} AdminDrawerCompartmentName/);
  assert.match(drawer, /export function adminDrawerCompartment\(shell, name\)/);
});

test('provides one circular Drawer-edge handle that drags the Drawer one approved mode at a time', () => {
  assert.match(shell, /<button type="button" class="wex-button wex-button--small wex-button--neutral wex-action-button-icon-only--small wex-admin-shell__drawer-mode-control" data-admin-drawer-mode-control aria-label="Drag to resize drawer" aria-controls="admin-station-drawer"><\/button>/);
  assert.doesNotMatch(shell, /drawer-mode-control-step|drawer-mode-control-handle/);
  assert.doesNotMatch(drawer, /chevron-left|chevron-right/);
  assert.match(drawer, /import \{ createSystemIcon \} from '\.\/admin-station-system-icons\.js';/);
  assert.match(drawer, /function drawerModeWidths\(shell\)[\s\S]*getBoundingClientRect\(\)\.width/);
  assert.match(drawer, /function drawerModeAfter\(shell, mode, direction\)[\s\S]*entry\.width > width : entry\.width < width/);
  assert.match(drawer, /createSystemIcon\(shell\.ownerDocument, 'handlebar'\)/);
  assert.doesNotMatch(drawer, /grip-vertical/);
  assert.match(icons, /handlebar: \[\s*\['rect', \{ x: '2\.25', y: '3', width: '19\.5', height: '18', rx: '3' \}\],\s*\['path', \{ d: 'M2\.25 8\.25h19\.5' \}\],\s*\['rect', \{ x: '9', y: '10\.25', width: '6', height: '8\.5', rx: '2', fill: 'currentColor', stroke: 'none' \}\],\s*\],/);
  assert.doesNotMatch(icons.match(/handlebar: \[[\s\S]*?\n  \],/)[0], /chevron/);
  assert.doesNotMatch(icons, /grip-vertical/);
  assert.match(drawer, /handle\.addEventListener\('pointerdown'[\s\S]*setPointerCapture\(event\.pointerId\)/);
  assert.match(drawer, /grabOffset: event\.clientX - handleCentre\(\)/);
  assert.match(drawer, /const direction = target < centre \? 'decrease' : 'increase';[\s\S]*drawerModeAfter\(shell, mode, direction\)/);
  assert.match(drawer, /Math\.abs\(target - nextCentre\) < Math\.abs\(target - centre\)\) shell\.dataset\.adminDrawerMode = next;/);
  assert.doesNotMatch(drawer, /originX|travel/);
  assert.match(drawer, /handle\.addEventListener\('pointerup', endDrag\);[\s\S]*handle\.addEventListener\('pointercancel', endDrag\);/);
  assert.match(drawer, /event\.key === 'ArrowLeft' \? 'decrease' : 'increase'/);
  assert.doesNotMatch(drawer, /ownerDocument\.addEventListener\('click', \(event\) => \{[\s\S]*changeMode\(/);
  assert.match(layout, /\.wex-admin-shell__drawer \{[\s\S]*position: relative;[\s\S]*overflow: visible;/);
  assert.match(layout, /\.wex-admin-shell__drawer-frame \{[\s\S]*overflow: hidden;/);
  const control = handleCss.match(/\.wex-admin-shell__drawer-mode-control \{[\s\S]*?\n\}/);
  assert.ok(control, 'missing Drawer handle rule');
  assert.match(control[0], /--wex-button-radius: 50%;/);
  assert.match(control[0], /inset-inline-start: var\(--wex-space-4\);[\s\S]*transform: translateX\(-30%\);/);
  assert.match(control[0], /box-shadow: 0 0 0 calc\(var\(--wex-space-4\) \+ var\(--wex-border-width-default\)\) var\(--wex-color-layer-02\);/);
  assert.match(control[0], /cursor: grab;[\s\S]*touch-action: none;/);
  assert.doesNotMatch(control[0], /inline-size|block-size|padding|(?<![-\w])border(?:-[\w-]+)?:|background|(?<![-\w])color:|outline/);
  assert.match(handleCss, /\.wex-admin-shell__drawer-mode-control\[data-admin-drawer-mode-control-dragging\] \{\s*cursor: grabbing;/);
  assert.doesNotMatch(layout, /drawer-mode-control/);
  const notch = handleCss.match(/\.wex-admin-shell__drawer-frame \{[\s\S]*?\n\}/);
  assert.ok(notch, 'missing Drawer frame notch rule');
  assert.match(notch[0], /mask-image: radial-gradient\(\s*circle at calc\(var\(--wex-action-button-icon-only-small-target-size\) \* 0\.2\) calc\(var\(--wex-admin-shell-header-size\) - var\(--wex-space-4\)\),/);
  assert.match(notch[0], /transparent calc\(\(var\(--wex-action-button-icon-only-small-target-size\) \/ 2\) \+ var\(--wex-space-4\)\)/);
  assert.match(notch[0], /var\(--wex-border-width-default\)/);
  assert.doesNotMatch(notch[0], /#[0-9a-f]{3,8}\b|\d+px/i);
  assert.match(index, /foundations\/layout\.css";\s*@import "\.\/foundations\/drawer-handle\.css";/);
});

test('lays the open Drawer out as a full-height Sidebar beside Header, Body, and Footer using existing tokens', () => {
  const open = layout.match(/\.wex-admin-shell\[data-admin-drawer="open"\] \.wex-admin-shell__drawer \{[\s\S]*?\n\}/);
  assert.ok(open, 'missing open Drawer rule');
  assert.doesNotMatch(open[0], /display:|grid-template|border|radius/);
  assert.doesNotMatch(layout, /^\.wex-admin-shell__drawer \{[^}]*(?:display|border)/m);
  const frame = layout.match(/\.wex-admin-shell__drawer-frame \{[\s\S]*?\n\}/);
  assert.ok(frame, 'missing Drawer frame rule');
  assert.match(frame[0], /display: grid;/);
  assert.match(frame[0], /"sidebar header"\s*"sidebar body"\s*"sidebar footer"/);
  assert.match(frame[0], /grid-template-columns: var\(--wex-admin-shell-sidebar-collapsed\) minmax\(0, 1fr\);/);
  assert.match(frame[0], /grid-template-rows: auto minmax\(0, 1fr\) auto;/);
  assert.match(frame[0], /border: var\(--wex-border-width-default\) solid var\(--wex-color-border-subtle\);/);
  assert.match(frame[0], /border-radius: var\(--wex-radius-large\);/);
  assert.match(frame[0], /overflow: hidden;/);
  assert.match(shell, /<div class="wex-admin-shell__drawer-frame">/);
  for (const name of ['header', 'sidebar', 'body', 'footer']) {
    assert.match(layout, new RegExp(`\\.wex-admin-shell__drawer-${name} \\{[^}]*grid-area: ${name};`));
  }
  assert.match(layout, /\.wex-admin-shell__drawer-header \{[^}]*min-block-size: var\(--wex-admin-shell-header-size\);[^}]*padding: var\(--wex-space-16\);[^}]*border-block-end: var\(--wex-border-width-default\) solid var\(--wex-color-border-subtle\);/);
  assert.match(layout, /\.wex-admin-shell__drawer-body \{[^}]*overflow: auto;/);
  assert.match(layout, /\.wex-admin-shell__drawer-footer \{[^}]*border-block-start: var\(--wex-border-width-default\) solid var\(--wex-color-border-subtle\);/);
  assert.doesNotMatch(shell.match(/<aside id="admin-station-drawer" class="wex-admin-shell__drawer"[\s\S]*?<\/aside>/)[0], /style=/);
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
  assert.match(layout, /\.wex-admin-shell__drawer\s*\{[\s\S]*position: relative;[\s\S]*z-index: 1;[\s\S]*grid-area: drawer;[\s\S]*padding: var\(--wex-space-4\);[\s\S]*overflow: visible;[\s\S]*background: transparent;/);
  assert.match(layout, /\.wex-admin-shell__drawer-sidebar \{[^}]*background: var\(--wex-color-layer-01\);/);
  for (const name of ['header', 'body', 'footer']) {
    assert.match(layout, new RegExp(`\\.wex-admin-shell__drawer-${name} \\{[^}]*background: var\\(--wex-color-layer-02\\);`));
  }
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
