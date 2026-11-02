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
  assert.match(overview, /export function mountOverviewModule\(mount, snapshot\)/);
  assert.match(overview, /heading\.textContent = 'Overview';/);
  assert.match(overview, /snapshot\.services\.filter\(\(\{ status \}\) => status === 'active'\)\.length/);
  assert.match(overview, /wex-button wex-button--small wex-button--neutral wex-admin-overview__scope-action/);
  assert.match(overview, /wex-button wex-button--small wex-button--neutral wex-admin-overview__scope-toggle/);
  assert.match(overview, /scopeToggle\.setAttribute\('aria-expanded', String\(!scopeMenu\.hidden\)\)/);
  assert.match(products, /import \{ mountOverviewModule \} from '\.\/admin-station-overview\.js';/);
  assert.match(products, /import \{ allServicesPreviewSnapshot, mountAllServicesBody \} from '\.\/admin-station-services\.js';/);
  assert.match(products, /mountOverviewModule\(overviewMount, allServicesPreviewSnapshot\);/);
  assert.match(products, /mountAllServicesBody\(page, allServicesPreviewSnapshot\);/);
  assert.match(navigation, /import \{ mountProductsBody \} from '\.\/admin-station-products\.js';/);
  assert.match(navigation, /mountProductsBody\(shell\);/);
  assert.doesNotMatch(services, /Overview|overview/);
});

test('uses registered WEX tokens for Overview with desktop, tablet, and compact layouts', () => {
  assert.match(overviewCss, /padding: var\(--wex-space-16\);/);
  assert.match(overviewCss, /border: var\(--wex-border-width-default\) solid var\(--wex-color-border-subtle\);/);
  assert.match(overviewCss, /grid-template-columns: repeat\(4, minmax\(0, 1fr\)\);/);
  assert.match(overviewCss, /\.wex-admin-overview__scope-toggle \{[\s\S]*inline-size: var\(--wex-button-small-target-size\);[\s\S]*border-inline-start: 0;/);
  assert.match(overviewCss, /\.wex-admin-overview__scope-toggle svg \{[\s\S]*inline-size: var\(--wex-icon-size-14\);/);
  assert.match(overviewCss, /\.wex-admin-overview__scope-menu-item \{[\s\S]*min-block-size: var\(--wex-tab-navigation-small-dropdown-target-size\);/);
  assert.match(overviewCss, /@media \(max-width: 1024px\) \{[\s\S]*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);/);
  assert.match(overviewCss, /@media \(max-width: 767px\) \{[\s\S]*grid-template-columns: minmax\(0, 1fr\);/);
  assert.match(productsCss, /padding-inline: var\(--wex-space-8\);/);
  assert.doesNotMatch(overviewCss, /#[0-9a-f]{3,8}|rgb\(|hsl\(/i);
});
