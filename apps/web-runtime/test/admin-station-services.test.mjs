import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const [services, servicesCss, navigation, appCss] = await Promise.all([
  readFile(new URL('../src/admin-station-services.js', import.meta.url), 'utf8'),
  readFile(new URL('../src/admin-station-services.css', import.meta.url), 'utf8'),
  readFile(new URL('../src/admin-station-navigation.js', import.meta.url), 'utf8'),
  readFile(new URL('../src/admin-station.css', import.meta.url), 'utf8'),
]);

test('mounts one station-scoped All Services view with a shared item renderer', () => {
  assert.match(services, /@typedef \{\{stationId: string, services: readonly ServiceListItem\[\]\}\} ServiceStationSnapshot/);
  assert.match(services, /export function mountAllServicesBody\(shell, snapshot = allServicesPreviewSnapshot\)/);
  assert.match(services, /const services = snapshot\.services\.map/);
  assert.match(services, /visible\.forEach\(\(service\) => collection\.append\(serviceItem\(document, service\)\)\);/);
  assert.match(services, /section\.dataset\.view = view; section\.dataset\.columns = String\(columns\);/);
  assert.doesNotMatch(services, /fetch\(|localStorage|innerHTML|style\./);
});

test('wires All Services navigation to the station-scoped collection', () => {
  assert.match(navigation, /import \{ ALL_SERVICES_OWNER, mountAllServicesBody \} from '\.\/admin-station-services\.js';/);
  assert.match(navigation, /id: ALL_SERVICES_OWNER, label: 'All Services', active: true/);
  assert.match(navigation, /if \(selected\.dataset\.sidebarTab === ALL_SERVICES_OWNER\) \{[\s\S]*mountAllServicesBody\(shell\);/);
  assert.match(navigation, /navigation\.replaceChildren\(list\);\s*mountAllServicesBody\(shell\);/);
});

test('uses WEX tokens and reflows both views into a non-scrolling compact list', () => {
  assert.match(appCss, /@import "\.\/admin-station-services\.css";/);
  assert.match(servicesCss, /var\(--wex-color-background-primary\)/);
  assert.match(servicesCss, /var\(--wex-space-24\)/);
  assert.match(services, /Management Items/);
  assert.match(services, /wex-search-input wex-search-input--small wex-admin-services__search/);
  assert.match(services, /createHeaderActionIcon\(document, 'search'\)/);
  assert.doesNotMatch(servicesCss, /\.wex-admin-services__search input/);
  assert.match(servicesCss, /\[data-view="list"\] \.wex-admin-services__collection \{ grid-template-columns: minmax\(0, 1fr\);/);
  assert.match(servicesCss, /@media \(max-width: 767px\) \{[\s\S]*\.wex-admin-services__collection,[\s\S]*grid-template-columns: minmax\(0, 1fr\);/);
  assert.doesNotMatch(servicesCss, /overflow-x|#[0-9a-f]{3,8}|rgb\(|hsl\(/i);
});

test('uses named system SVGs for Service controls and dismisses a popover from outside', () => {
  assert.match(services, /createSystemIcon\(document, icon\)/);
  assert.doesNotMatch(services, /✓|‹|›/);
  assert.match(services, /document\.addEventListener\('click', \(event\) => \{ if \(!popover/);
  assert.match(services, /activeMenu\.contains\(event\.target\) \|\| activeControl\.contains\(event\.target\)/);
});

test('uses the current WEX small Dropdown Navigation contract for every Services popover row', () => {
  assert.match(services, /function menuOption\(document, label, command, selected\)/);
  assert.match(services, /node\.setAttribute\('aria-pressed', String\(selected\)\)/);
  assert.match(services, /node\.className = 'wex-admin-services__menu-tab'/);
  assert.doesNotMatch(services, /createSystemIcon\(document, 'check'\)/);
  assert.match(services, /columnsMenu\.replaceChildren\(\);/);
  assert.match(services, /filterMenu\.replaceChildren\(\);/);
  assert.match(servicesCss, /\.wex-admin-services__menu-tab/);
  assert.match(servicesCss, /\[aria-pressed="true"\]/);
  assert.match(servicesCss, /--wex-tab-navigation-small-dropdown-selected-background/);
  assert.match(servicesCss, /--wex-tab-navigation-small-dropdown-hover-background/);
  assert.match(servicesCss, /--wex-tab-navigation-small-dropdown-focus-color/);
});

test('uses a Small Dropdown status filter after the Services Search Input', () => {
  assert.match(services, /const statusControl = control\(document, 'All', 'status'\);/);
  assert.match(services, /statusControl\.classList\.add\('wex-admin-services__status-control'\)/);
  assert.match(services, /statusMenu\.dataset\.servicePopover = 'status'/);
  assert.match(services, /tabs\.append\(search, menuControl\(statusControl, statusMenu, 'status'\)\);/);
  assert.match(services, /statusControl\.textContent = state === 'all' \? 'All' : state === 'active' \? 'Active' : 'Non Active';/);
  assert.match(services, /\['all', 'active', 'inactive'\]\.forEach\(\(value\) => statusMenu\.append\(menuOption/);
  assert.match(servicesCss, /\.wex-admin-services__tabs \.wex-search-input\s*\{\s*inline-size: calc\(var\(--wex-space-64\) \* 4\);/);
  assert.match(services, /const menuControl = \(trigger, menu, name\)/);
  assert.match(servicesCss, /\.wex-admin-services__menu-control \{ position: relative;/);
  assert.match(servicesCss, /\.wex-admin-services__menu \{ position: absolute;[\s\S]*inset-inline-start: 0;/);
  assert.match(servicesCss, /\[data-service-menu-control="filter"\] \.wex-admin-services__menu \{ inset-inline-start: auto; inset-inline-end: 0;/);
});

test('keeps every Services popover inside its trigger anchor and preserves the approved heading pair', () => {
  assert.match(services, /menuControl\(columnsControl, columnsMenu, 'columns'\)/);
  assert.match(services, /menuControl\(filterControl, filterMenu, 'filter'\)/);
  assert.match(services, /wex-type-heading-default-semibold/);
  assert.match(services, /wex-type-body-default-regular wex-admin-services__summary/);
  assert.match(servicesCss, /\.wex-admin-services \{ display: grid;[\s\S]*overflow: hidden;/);
});

test('keeps the small-viewport Services toolbar inline with compact actions and expandable search', () => {
  assert.match(services, /node\.setAttribute\('aria-label', label\)/);
  assert.match(services, /let searchExpanded = false;/);
  assert.match(services, /section\.dataset\.searchExpanded = String\(searchExpanded\)/);
  assert.match(services, /search\.addEventListener\('click', \(\) => \{ if \(searchExpanded\) return; searchExpanded = true;/);
  assert.match(servicesCss, /@media \(max-width: 767px\) \{[\s\S]*\.wex-admin-services__toolbar \{ display: flex;/);
  assert.match(servicesCss, /\.wex-admin-services__tools > \.wex-button \{ inline-size: var\(--wex-button-small-target-size\);[\s\S]*font-size: 0;/);
  assert.match(servicesCss, /\[data-search-expanded="true"\] \.wex-admin-services__tabs \{ flex: 1 1 auto;/);
});
