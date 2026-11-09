import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const drawerNotifications = await readFile(new URL('../src/admin-station-drawer-notifications.js', import.meta.url), 'utf8');

const [shell, drawer, layout, handleCss, index, icons, headerCss, headerJs, pillCss] = await Promise.all([
  readFile(new URL('../src/admin-station-shell.js', import.meta.url), 'utf8'),
  readFile(new URL('../src/admin-station-drawer.js', import.meta.url), 'utf8'),
  readFile(new URL('../../../packages/wex/src/foundations/layout.css', import.meta.url), 'utf8'),
  readFile(new URL('../../../packages/wex/src/foundations/drawer-handle.css', import.meta.url), 'utf8'),
  readFile(new URL('../../../packages/wex/src/index.css', import.meta.url), 'utf8'),
  readFile(new URL('../src/admin-station-system-icons.js', import.meta.url), 'utf8'),
  readFile(new URL('../../../packages/wex/src/foundations/drawer-header.css', import.meta.url), 'utf8'),
  readFile(new URL('../src/admin-station-drawer-header.js', import.meta.url), 'utf8'),
  readFile(new URL('../../../packages/wex/src/foundations/notification-pill.css', import.meta.url), 'utf8'),
]);

test('provides the Admin Drawer shell with four compartments, two content-empty, the Footer holding its Button row and the Header its two shells', () => {
  assert.match(shell, /<aside id="admin-station-drawer" class="wex-admin-shell__drawer" data-admin-drawer-shell aria-label="Admin drawer" hidden>/);
  assert.match(shell, /<header class="wex-admin-shell__drawer-header" data-admin-drawer-compartment="header">/);
  for (const [tag, name] of [['div', 'sidebar'], ['div', 'body']]) {
    assert.match(shell, new RegExp(`<${tag} class="wex-admin-shell__drawer-${name}" data-admin-drawer-compartment="${name}"></${tag}>`));
  }
  assert.match(shell, /<footer class="wex-admin-shell__drawer-footer" data-admin-drawer-compartment="footer">/);
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
  assert.match(frame[0], /"header header"\s*"sidebar body"\s*"sidebar footer"/);
  assert.match(frame[0], /grid-template-columns: var\(--wex-admin-shell-sidebar-collapsed\) minmax\(0, 1fr\);/);
  assert.match(frame[0], /grid-template-rows: auto minmax\(0, 1fr\) auto;/);
  assert.match(frame[0], /border: var\(--wex-border-width-default\) solid var\(--wex-color-border-subtle\);/);
  assert.match(frame[0], /border-radius: var\(--wex-radius-large\);/);
  assert.match(frame[0], /overflow: hidden;/);
  assert.match(shell, /<div class="wex-admin-shell__drawer-frame">/);
  for (const name of ['header', 'sidebar', 'body', 'footer']) {
    assert.match(layout, new RegExp(`\\.wex-admin-shell__drawer-${name} \\{[^}]*grid-area: ${name};`));
  }
  assert.match(layout, /\.wex-admin-shell__drawer-header \{[^}]*min-block-size: var\(--wex-admin-shell-header-size\);[^}]*padding-block: var\(--wex-space-8\);[^}]*padding-inline: var\(--wex-space-16\);[^}]*border-block-end: var\(--wex-border-width-default\) solid var\(--wex-color-border-subtle\);/);
  assert.match(layout, /\.wex-admin-shell__drawer-body \{[^}]*overflow: auto;/);
  assert.match(layout, /\.wex-admin-shell__drawer-footer \{[^}]*border-block-start: var\(--wex-border-width-default\) solid var\(--wex-color-border-subtle\);/);
  assert.doesNotMatch(shell.match(/<aside id="admin-station-drawer" class="wex-admin-shell__drawer"[\s\S]*?<\/aside>/)[0], /style=/);
});

test('gives the Drawer Header two compartment shells: content-empty start and the action navigation', () => {
  const header = shell.match(/<header class="wex-admin-shell__drawer-header"[\s\S]*?<\/header>/)[0];
  const start = header.match(/<div class="wex-admin-shell__drawer-header-start" data-admin-drawer-header-shell="start">([\s\S]*?)\n          <\/div>/)[1];
  assert.match(start, /<span class="wex-action-button-icon-only--default wex-action-button-icon-only--circular wex-admin-shell__drawer-header-icon" data-admin-drawer-header-icon aria-hidden="true"><\/span>/);
  assert.match(start, /<span class="wex-admin-shell__drawer-header-label wex-component-title" data-admin-drawer-header-label><\/span>/);
  assert.doesNotMatch(start, /wex-pill-notification-status/);
  assert.doesNotMatch(start, /style=/);
  const actions = header.match(/<div class="wex-admin-shell__drawer-header-actions" data-admin-drawer-header-shell="actions">([\s\S]*?)\n          <\/div>/)[1];
  assert.match(actions, /^\s*<button type="button" class="wex-pill-notification-status" data-admin-drawer-header-status aria-haspopup="dialog" aria-expanded="false" aria-controls="admin-station-drawer-notifications"><\/button>\s*<div class="wex-admin-shell__drawer-header-menu" data-admin-drawer-header-menu>\s*<button type="button" class="wex-button wex-button--default wex-button--subtle wex-option-button--default" aria-label="Edit options" aria-expanded="false" aria-haspopup="menu" data-admin-drawer-header-menu-toggle><\/button>/);
  assert.equal((actions.match(/<svg/g) ?? []).length, 1);
  assert.match(actions, /class="wex-button wex-button--small wex-button--borderless wex-action-button-icon-only--small wex-action-button-icon-only--circular" data-admin-drawer-close aria-label="Close drawer"/);
  assert.ok(actions.indexOf('Edit options') < actions.indexOf('Close drawer'), 'close sits at the right corner');
  assert.doesNotMatch(header, /style=/);
  assert.match(drawer, /querySelectorAll\('\[data-admin-drawer-close\]'\)\.forEach\(\(close\) => close\.addEventListener\('click', \(\) => closeAdminDrawer\(shell\)\)\)/);
  assert.match(headerCss, /\.wex-admin-shell__drawer-header \{\s*position: relative;\s*display: flex;\s*align-items: center;\s*justify-content: space-between;/);
  assert.match(index, /@import "\.\/foundations\/drawer-header\.css";/);
});

test('drives the Drawer Header icon, label and status pill dynamically', () => {
  assert.match(headerJs, /export function setAdminDrawerHeader\(shell, content\)/);
  assert.match(headerJs, /parts\.icon\.replaceChildren\(createSystemIcon\(shell\.ownerDocument, content\.icon\)\)/);
  assert.match(headerJs, /const statusLabels = \{ active: 'Active', pending: 'Pending', disabled: 'Disabled' \};/);
  assert.match(headerJs, /const DEFAULT_ICON = 'user';\s*const DEFAULT_STATUS = 'active';/);
  assert.match(headerJs, /new MutationObserver\(\(\) => \{\s*if \(parts\.label\.dataset\.adminDrawerHeaderLabelOwned === undefined\) parts\.label\.textContent = locationLabel\(shell\);/);
  assert.match(headerJs, /\[data-admin-station-location\]/);
  assert.doesNotMatch(headerJs, /style\.|innerHTML|fetch\(|localStorage/);
  assert.match(shell, /<div class="wex-dropdown-menu--default wex-admin-shell__drawer-header-menu-list" role="menu" hidden data-admin-drawer-header-menu-list>/);
  ['edit', 'disabled', 'archive', 'delete'].forEach((action) => {
    assert.match(shell, new RegExp(`<button type="button" class="wex-dropdown-menu__item--default" role="menuitem" data-admin-drawer-header-action="${action}">`));
  });
  assert.match(drawer, /event\.composedPath\(\)\.includes\(drawer\)/);
  assert.match(drawerNotifications, /initialFilter: 'action-required',/);
  assert.match(drawerNotifications, /filters: \[\['action-required', 'Action required'\], \['all', 'All'\]\],\s*selectedTabFirst: true,\s*toggleStretched: true,/);
  assert.match(drawerNotifications, /headerAction: 'close',\s*markAllRead: false,\s*itemOptions: 'view-edit',\s*countStyle: 'action-required',\s*titleStyle: 'component-title',\s*notifications: drawerModuleNotifications,/);
  ['Title missing', 'Category not selected', 'Description missing'].forEach((title) => assert.match(drawerNotifications, new RegExp(`title: '${title}', description: 'Overview · Pending', time: ''`)));
  assert.match(headerJs, /function mountHeaderMenu\(shell\)/);
  assert.match(headerJs, /toggle\.replaceChildren\(createMoreActionIcon\(shell\.ownerDocument\)\);/);
  assert.match(headerJs, /event\.key === 'Escape'/);
  assert.match(headerCss, /\.wex-admin-shell__drawer-header-menu-list \{[^}]*inset-block-start: calc\(100% \+ var\(--wex-space-4\)\);/);
  assert.match(drawer, /resetAdminDrawerHeader\(shell\);\s*closeAdminDrawerDropdown\(shell\);\s*if \(request\.header\) setAdminDrawerHeader\(shell, request\.header\);/);
  assert.match(drawer, /candidate\.header === undefined \|\| isAdminDrawerHeaderContent\(candidate\.header\)/);
  assert.match(drawer, /export \{ setAdminDrawerHeader \};/);
  assert.match(drawer, /mountAdminDrawerHeader\(shell\);/);
  assert.match(icons, /user: \[\s*\['circle', \{ cx: '12', cy: '8\.25', r: '3\.25' \}\],\s*\['path', \{ d: 'M5\.25 20\.25a6\.75 6\.75 0 0 1 13\.5 0' \}\],/);
  for (const state of ['pending', 'active', 'disabled']) {
    assert.match(pillCss, new RegExp(`\\.wex-pill-notification-status--${state} \\{\\s*background: var\\(--wex-pill-notification-status-${state}-background\\);\\s*color: var\\(--wex-pill-notification-status-${state}-foreground\\);`));
  }
  assert.match(headerCss, /\.wex-admin-shell__drawer-header-icon \{[^}]*background: var\(--wex-button-primary-background-default\);[^}]*color: var\(--wex-button-primary-foreground-default\);/);
});

test('keeps the Admin Drawer allocation modes approved and request-owned', () => {
  assert.match(drawer, /@typedef \{'default' \| 'half' \| 'full'\} AdminDrawerMode/);
  assert.match(drawer, /@typedef \{\{ owner: string, mode\?: AdminDrawerMode, header\?: AdminDrawerHeaderContent, sidebar\?: [^}]+\[\] \}\} AdminDrawerRequest/);
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

test('the Drawer footer holds Close or Discard at its start, and Save and a primary Publish at its end', async () => {
  const footerCss = await readFile(new URL('../../../packages/wex/src/foundations/drawer-footer.css', import.meta.url), 'utf8');
  const footer = shell.match(/<footer class="wex-admin-shell__drawer-footer"[\s\S]*?<\/footer>/)[0];
  assert.match(footer, /<button type="button" class="wex-button wex-button--small wex-button--neutral" data-admin-drawer-close>Close<\/button>\s*<button type="button" class="wex-button wex-button--small wex-button--neutral" data-admin-drawer-discard hidden>Discard<\/button>\s*<button type="button" class="wex-button wex-button--small wex-button--neutral" data-admin-drawer-save disabled>Save<\/button>\s*<button type="button" class="wex-button wex-button--small wex-button--primary" data-admin-drawer-publish>Publish<\/button>/);
  assert.match(footerCss, /> \[data-admin-drawer-close\],\s*\.wex-admin-shell__drawer-footer > \[data-admin-drawer-discard\] \{\s*margin-inline-end: auto;/);
  const footerJs = await readFile(new URL('../src/admin-station-drawer-footer.js', import.meta.url), 'utf8');
  assert.match(footerJs, /parts\.save\.disabled = !dirty;\s*parts\.discard\.hidden = !dirty;\s*parts\.close\.hidden = dirty;/);
  assert.match(footerJs, /ADMIN_DRAWER_DISCARD_EVENT[\s\S]*setAdminDrawerDirty\(shell, false\);/);
  assert.doesNotMatch(footer, /style=/);
  assert.match(footerCss, /\.wex-admin-shell__drawer-footer \{[^}]*padding-inline: var\(--wex-space-16\);[^}]*display: flex;[^}]*justify-content: flex-end;[^}]*gap: var\(--wex-space-8\);/);
  assert.match(index, /@import "\.\/foundations\/drawer-footer\.css";/);
});

test('every Drawer compartment pads its left and right sides by 16px', async () => {
  const footerCss = await readFile(new URL('../../../packages/wex/src/foundations/drawer-footer.css', import.meta.url), 'utf8');
  assert.match(layout, /\.wex-admin-shell__drawer-header \{[^}]*padding-inline: var\(--wex-space-16\);/);
  assert.match(layout, /\.wex-admin-shell__drawer-sidebar \{[^}]*padding: var\(--wex-space-8\) var\(--wex-space-16\);/);
  assert.match(layout, /\.wex-admin-shell__drawer-body \{[^}]*padding: var\(--wex-space-16\);/);
  assert.match(footerCss, /\.wex-admin-shell__drawer-footer \{[^}]*padding-inline: var\(--wex-space-16\);/);
});

test('the Drawer Sidebar prints icon-only requester tabs and previews the hovered section in the Body shell', async () => {
  const sidebarJs = await readFile(new URL('../src/admin-station-drawer-sidebar.js', import.meta.url), 'utf8');
  const sidebarCss = await readFile(new URL('../../../packages/wex/src/foundations/drawer-sidebar.css', import.meta.url), 'utf8');
  assert.match(sidebarJs, /export function setAdminDrawerSidebar\(shell, tabs\)/);
  assert.match(sidebarJs, /const enter = \(\) => show\(id, id !== selected\);\s*const leave = \(\) => show\(selected, false\);/);
  assert.match(sidebarJs, /selected = id;[\s\S]*show\(id, false\);/);
  assert.match(sidebarJs, /detail: \{ id, preview \}/);
  assert.match(sidebarJs, /data-admin-drawer-body-preview/);
  assert.doesNotMatch(sidebarJs, /style\.|innerHTML|label\.textContent|sidebar-toggle|drawer-peek/);
  assert.match(drawer, /resetAdminDrawerSidebar\(shell\);\s*if \(request\.sidebar\) setAdminDrawerSidebar\(shell, request\.sidebar\);/);
  assert.doesNotMatch(sidebarCss, /tab-label|data-admin-drawer-sidebar|sidebar-toggle|drawer-peek/);
  assert.doesNotMatch(sidebarCss, /#[0-9a-f]{3,6}\b|\d+px/i);
  assert.match(index, /@import "\.\/foundations\/drawer-sidebar\.css";/);
});

test('Add New Sidebar tabs print each section straight into the Drawer Body shell', async () => {
  const sections = await readFile(new URL('../src/admin-station-add-new-sections.js', import.meta.url), 'utf8');
  assert.match(sections, /ADMIN_DRAWER_TAB_EVENT/);
  assert.match(sections, /adminDrawerCompartment\(shell, 'body'\)/);
  assert.match(sections, /body\.replaceChildren\(heading\)/);
  assert.doesNotMatch(sections, /createElement\('section'\)|wex-admin-add-new-section/);
});
