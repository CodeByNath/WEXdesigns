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

test('provides one standalone pill handle that drags the Drawer one approved mode at a time', () => {
  assert.match(shell, /<button type="button" class="wex-button wex-button--small wex-button--subtle wex-admin-shell__drawer-mode-control" data-admin-drawer-mode-control aria-label="Drag to resize drawer" aria-controls="admin-station-drawer"><\/button>/);
  assert.doesNotMatch(shell, /drawer-mode-control-step|drawer-mode-control-handle|icon-only--small wex-admin-shell__drawer-mode-control/);
  assert.doesNotMatch(drawer, /chevron|createSystemIcon|handlebar|grip-vertical|replaceChildren/);
  assert.doesNotMatch(icons, /handlebar|grip-vertical|data-handlebar-half/);
  assert.match(drawer, /function drawerModeWidths\(shell\)[\s\S]*getBoundingClientRect\(\)\.width/);
  assert.match(drawer, /function drawerModeAfter\(shell, mode, direction\)[\s\S]*entry\.width > width : entry\.width < width/);
  assert.match(drawer, /handle\.addEventListener\('pointerdown'[\s\S]*setPointerCapture\(event\.pointerId\)/);
  assert.match(drawer, /const MODE_TRAVEL = 96;/);
  assert.match(drawer, /function syncHandleSeam\(shell\)[\s\S]*toggleAttribute\('data-admin-drawer-mode-control-seam', width\(shell\.dataset\.adminDrawerMode \?\? 'default'\) >= width\('full'\) - 1\)/);
  assert.equal((drawer.match(/syncHandleSeam\(shell\);/g) ?? []).length, 4);
  assert.match(handleCss, /\[data-admin-drawer-mode-control-seam\] \{\s*inset-inline-start: calc\(var\(--wex-space-4\) \/ 2\);\s*transform: translateX\(-50%\);/);
  assert.match(drawer, /const closing = event\.type === 'pointerup' && drag\.closing;\s*if \(closing\) closeAdminDrawer\(shell\);\s*stopDrag\(!closing\);/);
  assert.match(drawer, /const STRETCH_MAX = 40;[\s\S]*const SPRING_BACK = 200;/);
  assert.match(drawer, /drawer\.animate\(\{ inlineSize: `\$\{restWidth \+ delta\}px` \}, \{ duration: 0, fill: 'forwards' \}\)/);
  assert.match(drawer, /setPull\(\(direction === 'decrease' \? 1 : -1\) \* stretchFor\(travel, limit\)\);\s*return;\s*\}\s*releasePull\(false\);/);
  assert.match(drawer, /prefers-reduced-motion: reduce/);
  assert.match(drawer, /event\.buttons === 0\) \{\s*stopDrag\(\);\s*return;/);
  assert.match(drawer, /const limit = Math\.min\(MODE_TRAVEL, widthGap\(mode, next\)\);\s*if \(Math\.abs\(travel\) < limit\) \{/);
  assert.match(drawer, /function availableModeWidths\(shell\)[\s\S]*width\('default'\) >= width\('full'\) - 1[\s\S]*entry\.mode !== 'half' \|\| entry\.width > width\('default'\) \+ 1/);
  assert.match(drawer, /shell\.dataset\.adminDrawerMode = fitMode\(shell, request\.mode \?\? 'default'\);/);
  assert.match(drawer, /resize', \(\) => \{\s*if \(drawer\.hidden\) return;\s*shell\.dataset\.adminDrawerMode = fitMode\(/);
  assert.match(drawer, /const changeMode = \(direction\) => \{[\s\S]*next === mode && direction === 'increase'\) closeAdminDrawer\(shell\)/);
  assert.match(drawer, /pullAnimation\?\.cancel\(\);[\s\S]*drag\.closing = false;\s*if \(next === mode\) \{\s*drag\.closing = direction === 'increase' && travel >= MODE_TRAVEL;/);

  assert.doesNotMatch(drawer, /HALF_FULL|isHalfFullPair|handleCentre|grabOffset|jumpFraction|originX|RUBBER|rubberBand|jumpDistance|modeAfter\(|releaseMode|style\./);
  assert.doesNotMatch(drawer, /FLICK|samples|snapped|pointerSpeed|recordSample/);
  assert.match(drawer, /shell\.dataset\.adminDrawerMode = next;\s*syncHandleSeam\(shell\);\s*restWidth = drawer\.getBoundingClientRect\(\)\.width;\s*drag\.anchorX = event\.clientX;/);
  assert.match(drawer, /handle\.addEventListener\('pointerup', endDrag\);[\s\S]*handle\.addEventListener\('pointercancel', endDrag\);/);
  assert.match(drawer, /event\.key === 'ArrowLeft' \? 'decrease' : 'increase'/);
  assert.doesNotMatch(drawer, /ownerDocument\.addEventListener\('click', \(event\) => \{[\s\S]*changeMode\(/);
  assert.match(drawer, /let pressedHandle = false;\s*shell\.ownerDocument\.addEventListener\('pointerdown', \(event\) => \{\s*pressedHandle = handle instanceof HTMLElement && event\.target instanceof Node && handle\.contains\(event\.target\);\s*\}, true\);/);
  assert.match(drawer, /ownerDocument\.addEventListener\('click', \(event\) => \{\s*if \(pressedHandle\) \{\s*pressedHandle = false;\s*return;\s*\}/);
  assert.match(layout, /\.wex-admin-shell__drawer \{[\s\S]*position: relative;[\s\S]*overflow: visible;/);
  assert.match(layout, /\.wex-admin-shell__drawer-frame \{[\s\S]*overflow: hidden;/);
  assert.doesNotMatch(layout, /drawer-mode-control/);
  const control = handleCss.match(/\.wex-admin-shell__drawer-mode-control \{[\s\S]*?\n\}/);
  assert.ok(control, 'missing Drawer handle rule');
  assert.match(control[0], /--wex-button-radius: var\(--wex-space-4\);/);
  assert.match(control[0], /--wex-button-background-default: var\(--wex-color-layer-01\);/);
  assert.match(control[0], /--wex-button-background-hover: var\(--wex-button-subtle-background-pressed\);/);
  assert.match(layout, /\.wex-admin-shell__drawer-sidebar \{[\s\S]*background: var\(--wex-color-layer-01\);/);
  assert.match(control[0], /inline-size: var\(--wex-space-8\);\s*block-size: var\(--wex-action-button-icon-only-small-target-size\);\s*padding: 0;/);
  assert.match(control[0], /inset-inline-start: var\(--wex-space-4\);[\s\S]*transform: translateX\(-30%\);/);
  assert.match(control[0], /box-shadow: 0 0 0 calc\(var\(--wex-space-4\) \+ var\(--wex-border-width-default\)\) var\(--wex-color-layer-02\);/);
  assert.match(control[0], /cursor: grab;[\s\S]*touch-action: none;/);
  assert.doesNotMatch(control[0], /(?<![-\w])background(?:-[\w-]+)?:|(?<![-\w])color:|outline|(?<![-\w])border(?:-[\w-]+)?:|#[0-9a-f]{3,8}\b|\d+px/);
  assert.match(handleCss, /\.wex-admin-shell__drawer-mode-control\[data-admin-drawer-mode-control-dragging\] \{\s*cursor: grabbing;/);
  assert.doesNotMatch(handleCss, /mask-image|radial-gradient|data-handlebar-half|inset\]/);
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
