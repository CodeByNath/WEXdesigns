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

test('wires only Dashboard navigation to request the Admin Body shell', () => {
  assert.match(navigation, /import \{ requestAdminBodyShell \} from '\.\/admin-station-body\.js';/);
  assert.match(navigation, /import \{ mountDashboardBody \} from '\.\/admin-station-dashboard\.js';/);
  assert.match(navigation, /const DASHBOARD_BODY_OWNER = 'dashboard';/);
  assert.match(navigation, /if \(selected\.dataset\.sidebarTab === DASHBOARD_BODY_OWNER\) \{[\s\S]*mountDashboardBody\(shell\);[\s\S]*requestAdminBodyShell\(shell, \{ owner: DASHBOARD_BODY_OWNER \}, selected\);/);
  assert.match(dashboard, /view\.className = 'wex-button wex-button--small wex-button--neutral';/);
  assert.match(dashboard, /view\.textContent = 'View';/);
  assert.match(dashboard, /body\.replaceChildren\(view\);/);
  assert.doesNotMatch(dashboard, /fetch\(|localStorage|style\.|#[0-9a-f]{3,8}|rgb\(|hsl\(/i);
});

test('keeps the Admin Body full-width within Sidebar-priority workspace bounds', () => {
  assert.match(layout, /\.wex-admin-shell__body\s*\{[\s\S]*z-index: 1;[\s\S]*grid-area: main;[\s\S]*overflow: auto;/);
  assert.match(layout, /@media \(min-width: 768px\) \{[\s\S]*data-admin-body="open"\]\[data-sidebar="expanded"\]:not\(\[data-admin-drawer="open"\]\)[\s\S]*grid-template-columns: var\(--wex-admin-shell-sidebar-expanded\) minmax\(0, 1fr\);/);
  const compact = layout.match(/@media \(max-width: 767px\) \{([\s\S]*)$/);
  assert.ok(compact, 'missing compact Admin Shell rules');
  assert.match(compact[1], /data-admin-body="open"\]\[data-sidebar-drawer="open"\] \.wex-admin-shell__body\s*\{\s*display: none;/);
});
