import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const [shell, body, dashboard, navigation, runtime, layout] = await Promise.all([
  readFile(new URL('../src/admin-station-shell.js', import.meta.url), 'utf8'),
  readFile(new URL('../src/admin-station-body.js', import.meta.url), 'utf8'),
  readFile(new URL('../src/admin-station-dashboard.js', import.meta.url), 'utf8'),
  readFile(new URL('../src/admin-station-navigation.js', import.meta.url), 'utf8'),
  readFile(new URL('../src/admin-station-runtime.js', import.meta.url), 'utf8'),
  readFile(new URL('../../../packages/wex/src/foundations/layout.css', import.meta.url), 'utf8'),
]);

test('provides a content-empty full-workspace Admin Body request boundary', () => {
  assert.match(shell, /<section class="wex-admin-shell__body" data-admin-body-shell aria-label="Admin body" hidden><\/section>/);
  assert.match(body, /@typedef \{\{ owner: string \}\} AdminBodyRequest/);
  assert.match(body, /const ADMIN_BODY_REQUEST_EVENT = 'wex:admin-body-request';/);
  assert.match(body, /body\.dataset\.adminBodyOwner = request\.owner;/);
  assert.match(body, /body\.hidden = false;/);
  assert.match(body, /body\.hidden = true;/);
  assert.match(body, /shell\.dispatchEvent\(new CustomEvent\(ADMIN_BODY_REQUEST_EVENT, \{ detail: request \}\)\);/);
  assert.match(body, /event\.target\.closest\('\[data-admin-body-trigger\]'\)/);
  assert.match(runtime, /import \{ mountAdminBodyShell \} from '\.\/admin-station-body\.js';/);
  assert.match(runtime, /mountAdminBodyShell\(shell\);/);
  assert.doesNotMatch(body, /fetch\(|localStorage|innerHTML|style\./);
});

test('wires Dashboard View action to request the Admin Body and Drawer shells', () => {
  assert.match(navigation, /import \{ mountDashboardBody \} from '\.\/admin-station-dashboard\.js';/);
  assert.match(navigation, /const DASHBOARD_BODY_OWNER = 'dashboard';/);
  assert.match(navigation, /if \(selected\.dataset\.sidebarTab === DASHBOARD_BODY_OWNER\) \{[\s\S]*mountDashboardBody\(shell\);/);
  assert.doesNotMatch(navigation, /requestAdminBodyShell/);
  assert.match(dashboard, /import \{ requestAdminBodyShell \} from '\.\/admin-station-body\.js';/);
  assert.match(dashboard, /import \{ requestAdminDrawer \} from '\.\/admin-station-drawer\.js';/);
  assert.match(dashboard, /view\.className = 'wex-button wex-button--small wex-button--neutral';/);
  assert.match(dashboard, /view\.textContent = 'View';/);
  assert.match(dashboard, /drawerLabel\.className = 'wex-type-body-small-regular';/);
  assert.match(dashboard, /drawerLabel\.textContent = "I'm the Drawer";/);
  assert.match(dashboard, /drawer\.replaceChildren\(drawerLabel\);/);
  assert.match(dashboard, /requestAdminBodyShell\(shell, \{ owner: DASHBOARD_OWNER \}, view\);/);
  assert.match(dashboard, /requestAdminDrawer\(shell, \{ owner: DASHBOARD_OWNER \}, view\);/);
  assert.match(dashboard, /dashboard\.className = 'wex-admin-dashboard';/);
  assert.match(dashboard, /main\.replaceChildren\(dashboard\);/);
  assert.doesNotMatch(dashboard, /fetch\(|localStorage|style\.|#[0-9a-f]{3,8}|rgb\(|hsl\(/i);
});

test('keeps the Admin Body below Drawer within the Sidebar-priority workspace bounds', () => {
  assert.match(layout, /\.wex-admin-shell__body\s*\{[\s\S]*z-index: 1;[\s\S]*grid-area: main;[\s\S]*overflow: auto;/);
  assert.match(layout, /\.wex-admin-shell\[data-sidebar="expanded"\]\s*\{[\s\S]*--wex-admin-shell-sidebar-current: var\(--wex-admin-shell-sidebar-expanded\);/);
  assert.match(layout, /\.wex-admin-shell\[data-admin-drawer="open"\] \.wex-admin-shell__drawer\s*\{[\s\S]*grid-area: main;/);
  const compact = layout.match(/@media \(max-width: 767px\) \{([\s\S]*)$/);
  assert.ok(compact, 'missing compact Admin Shell rules');
  assert.match(compact[1], /data-admin-body="open"\]\[data-sidebar-drawer="open"\] \.wex-admin-shell__body\s*\{\s*display: none;/);
});
