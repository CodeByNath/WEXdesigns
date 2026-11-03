import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const [overview, overviewCss, products, productsCss, navigation, services] = await Promise.all([
  readFile(new URL('../src/admin-station-overview.js', import.meta.url), 'utf8'),
  readFile(new URL('../src/admin-station-overview.css', import.meta.url), 'utf8'),
  readFile(new URL('../src/admin-station-products.js', import.meta.url), 'utf8'),
  readFile(new URL('../src/admin-station-products.css', import.meta.url), 'utf8'),
  readFile(new URL('../src/admin-station-navigation.js', import.meta.url), 'utf8'),
  readFile(new URL('../src/admin-station-services.js', import.meta.url), 'utf8'),
]);

test('mounts Overview independently from the Manager list/grid module', () => {
  assert.match(overview, /export function mountOverviewModule\(mount, snapshot, actions = \{\}\)/);
  assert.match(overview, /heading\.textContent = 'Overview';/);
  assert.match(overview, /heading\.className = 'wex-component-title';/);
  assert.match(overview, /snapshot\.services\.filter\(\(\{ status \}\) => status === 'active'\)\.length/);
  assert.match(overview, /wex-button wex-button--small wex-button--neutral wex-action-button-icon-only--small-menu/);
  assert.match(overview, /scopeToggle\.append\(createSystemIcon\(document, 'plus'\), createSystemIcon\(document, 'chevron-down'\)\)/);
  assert.match(overview, /scopeToggle\.setAttribute\('aria-label', 'Add new'\)/);
  assert.match(overview, /scopeToggle\.setAttribute\('aria-expanded', String\(!scopeMenu\.hidden\)\)/);
  assert.match(overview, /actions\.onAddNew\?\.\(addNew\);/);
  assert.doesNotMatch(overview, /requestAdminDrawer|data-admin-drawer/);
  assert.match(products, /import \{ requestAdminDrawer \} from '\.\/admin-station-drawer\.js';/);
  assert.match(products, /requestAdminDrawer\(shell, \{ owner: ADD_NEW_OWNER \}, trigger\);/);
  assert.match(products, /import \{ mountOverviewModule \} from '\.\/admin-station-overview\.js';/);
  assert.match(products, /import \{ allServicesPreviewSnapshot, mountAllServicesBody \} from '\.\/admin-station-services\.js';/);
  assert.match(products, /mountOverviewModule\(overviewMount, allServicesPreviewSnapshot, \{/);
  assert.match(products, /mountAllServicesBody\(page, allServicesPreviewSnapshot\);/);
  assert.match(navigation, /import \{ mountProductsBody \} from '\.\/admin-station-products\.js';/);
  assert.match(navigation, /mountProductsBody\(shell\);/);
  assert.doesNotMatch(services, /Overview|overview/);
});

test('uses registered WEX tokens for Overview with desktop, tablet, and compact layouts', () => {
  assert.match(overviewCss, /padding: var\(--wex-space-16\);/);
  assert.match(overviewCss, /border: var\(--wex-border-width-default\) solid var\(--wex-color-border-subtle\);/);
  assert.match(overviewCss, /grid-template-columns: repeat\(4, minmax\(0, 1fr\)\);/);
  assert.match(overview, /className = 'wex-dropdown-menu--default wex-admin-overview__scope-menu'/);
  assert.match(overview, /className = 'wex-dropdown-menu__item--default wex-admin-overview__scope-menu-item'/);
  assert.doesNotMatch(overviewCss, /--wex-tab-navigation-small-dropdown|scope-menu-item|scope-toggle|scope-action|focus-within/);
  assert.match(overviewCss, /\.wex-admin-overview__header \{[^}]*gap: var\(--wex-space-8\);/);
  assert.match(overviewCss, /@media \(max-width: 1024px\) \{[\s\S]*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);/);
  assert.match(overviewCss, /@media \(max-width: 767px\) \{[\s\S]*grid-template-columns: minmax\(0, 1fr\);/);
  assert.match(productsCss, /padding-inline: var\(--wex-space-8\);/);
  assert.doesNotMatch(overviewCss, /#[0-9a-f]{3,8}|rgb\(|hsl\(/i);
});
