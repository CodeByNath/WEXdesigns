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
  assert.match(services, /visible\.forEach\(\(service\) => collection\.append\(serviceItem\(document, service, openServiceMenuId\)\)\);/);
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
  assert.match(servicesCss, /\.wex-admin-services \{ display: grid; align-content: start;/);
  assert.match(services, /Management Items/);
  assert.match(services, /wex-search-input wex-search-input--small wex-admin-services__search/);
  assert.match(services, /createHeaderActionIcon\(document, 'search'\)/);
  assert.match(servicesCss, /\.wex-admin-services__search \{ min-inline-size: 0;/);
  assert.match(servicesCss, /\[data-view="list"\] \.wex-admin-services__collection \{ grid-template-columns: minmax\(0, 1fr\);/);
  assert.match(servicesCss, /@media \(max-width: 767px\) \{[\s\S]*\.wex-admin-services__collection,[\s\S]*grid-template-columns: minmax\(0, 1fr\);/);
  assert.doesNotMatch(servicesCss, /overflow-x|#[0-9a-f]{3,8}|rgb\(|hsl\(/i);
});

test('uses named system SVGs for Service controls and dismisses a popover from outside', () => {
  assert.match(services, /createSystemIcon\(document, icon\)/);
  assert.doesNotMatch(services, /✓|‹|›/);
  assert.match(services, /document\.addEventListener\('click', \(event\) => \{ if \(\(!popover && !openServiceMenuId\)/);
  assert.match(services, /activeMenu\?\.contains\(event\.target\) \|\| activeControl\?\.contains\(event\.target\)/);
});

test('keeps every Services view tool icon-only while retaining an accessible label', () => {
  assert.match(services, /node\.setAttribute\('aria-label', label\)/);
  assert.match(servicesCss, /\.wex-admin-services__tools \.wex-button \{ inline-size: var\(--wex-button-small-target-size\);[\s\S]*font-size: 0; justify-content: center;/);
});

test('uses a distinct list glyph for the grid-to-list action', () => {
  assert.match(services, /iconControl\(document, 'List', 'view', 'list'\)/);
  assert.match(services, /view === 'grid' \? 'List' : 'Grid', view === 'grid' \? 'list' : 'table'/);
});

test('uses the stateful subtle More Action button treatment from notification list items', () => {
  assert.match(services, /action\.classList\.replace\('wex-button--neutral', 'wex-button--subtle'\)/);
  assert.match(services, /action\.append\(createMoreActionIcon\(document, 'small'\)\)/);
  assert.match(servicesCss, /\.wex-admin-services__item-action \{[^}]*inline-size: var\(--wex-space-24\);[^}]*min-block-size: var\(--wex-space-24\);[^}]*padding: var\(--wex-space-4\);/);
  assert.match(servicesCss, /\.wex-admin-services__item-action \{[^}]*--wex-button-foreground-default: var\(--wex-color-text-primary\);[^}]*--wex-button-foreground-hover: var\(--wex-color-text-primary\);[^}]*--wex-button-foreground-pressed: var\(--wex-color-text-primary\);/);
});

test('binds View and Edit actions to one open Service action dropdown', () => {
  assert.match(services, /action\.setAttribute\('aria-expanded', String\(openServiceMenuId === service\.id\)\)/);
  assert.match(services, /menuOption\(document, 'View', `service-view:\$\{service\.id\}`, false\), menuOption\(document, 'Edit', `service-edit:\$\{service\.id\}`, false\)/);
  assert.match(services, /command\.startsWith\('menu:'\)/);
  assert.match(services, /command\.startsWith\('service-view:'\) \|\| command\.startsWith\('service-edit:'\)/);
  assert.match(servicesCss, /\.wex-admin-services__item-menu-options \{ inset-inline-start: auto; inset-inline-end: 0;/);
});

test('uses only Pending, Disabled, and Active status pills with semantic WEX status tokens', () => {
  assert.match(services, /status: 'pending'\|'disabled'\|'active'/);
  assert.match(services, /'Ocean Explorer'.*'pending'/);
  assert.match(services, /'Coastal Adventures'.*'disabled'/);
  assert.match(services, /status === 'active' \? 'Active' : service\.status === 'pending' \? 'Pending' : 'Disabled'/);
  assert.match(servicesCss, /\.wex-admin-services__status \{ border-radius: 50%;/);
  assert.match(servicesCss, /\.wex-admin-services__status--pending \{ background: var\(--wex-color-background-warning-selected\); color: var\(--wex-color-text-warning\);/);
  assert.match(servicesCss, /\.wex-admin-services__status--disabled \{ background: var\(--wex-color-background-error-selected\); color: var\(--wex-color-text-error\);/);
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
  assert.match(services, /const statusControl = control\(document, '', 'status'\);/);
  assert.match(services, /statusControl\.classList\.add\('wex-admin-services__status-control'\)/);
  assert.match(services, /statusMenu\.dataset\.servicePopover = 'status'/);
  assert.match(services, /tabs\.append\(search, menuControl\(statusControl, statusMenu, 'status'\)\);/);
  assert.match(services, /statusControlLabel\.textContent = state === 'all' \? 'All' : state === 'pending' \? 'Pending' : state === 'disabled' \? 'Disabled' : 'Active';/);
  assert.match(services, /\['all', 'pending', 'disabled', 'active'\]\.forEach\(\(value\) => statusMenu\.append\(menuOption/);
  assert.match(servicesCss, /\.wex-admin-services__tabs \.wex-search-input\s*\{\s*inline-size: calc\(var\(--wex-space-64\) \* 4\);/);
  assert.match(services, /const menuControl = \(trigger, menu, name\)/);
  assert.match(servicesCss, /\.wex-admin-services__menu-control \{ position: relative;/);
  assert.match(servicesCss, /\.wex-admin-services__menu \{ position: absolute;[\s\S]*inset-inline-start: 0;/);
  assert.match(servicesCss, /\[data-service-menu-control="filter"\] \.wex-admin-services__menu \{ inset-inline-start: auto; inset-inline-end: 0;/);
});

test('keeps every Services popover inside its trigger anchor and preserves the approved compact title pair', () => {
  assert.match(services, /menuControl\(columnsControl, columnsMenu, 'columns'\)/);
  assert.match(services, /menuControl\(filterControl, filterMenu, 'filter'\)/);
  assert.match(services, /wex-type-title-small-semibold/);
  assert.match(services, /wex-type-body-small-regular wex-admin-services__summary/);
  assert.match(servicesCss, /\.wex-admin-services \{ display: grid;[\s\S]*overflow: hidden;/);
});

test('keeps the small-viewport Services toolbar inline with responsive search and compact actions', () => {
  assert.match(services, /node\.setAttribute\('aria-label', label\)/);
  assert.match(servicesCss, /@media \(max-width: 767px\) \{[\s\S]*\.wex-admin-services__toolbar \{ position: relative; display: flex;/);
  assert.match(servicesCss, /\.wex-admin-services__tools \.wex-button \{ inline-size: var\(--wex-button-small-target-size\);[\s\S]*font-size: 0;/);
  assert.match(servicesCss, /\.wex-admin-services__tools \{ display: flex;[\s\S]*margin-inline-start: auto;/);
  assert.match(services, /let searchExpanded = false;/);
  assert.match(services, /search\.dataset\.compact = String\(targetSize > 0 && search\.getBoundingClientRect\(\)\.width <= targetSize\);/);
  assert.match(services, /search\.addEventListener\('click', \(\) => \{ if \(search\.dataset\.compact !== 'true'/);
  assert.match(servicesCss, /\.wex-admin-services__tabs \.wex-search-input \{ flex: 1 1 220px;[\s\S]*min-inline-size: var\(--wex-search-input-small-target-size\);/);
  assert.match(servicesCss, /\.wex-admin-services__search\[data-compact="true"\] input \{ display: none;/);
  assert.match(servicesCss, /\[data-search-expanded="true"\] \.wex-admin-services__search \{ position: absolute;[\s\S]*inline-size: 220px;/);
  assert.match(servicesCss, /@media \(max-width: 479px\) \{[\s\S]*\.wex-admin-services__tabs \{ display: contents;/);
  assert.match(servicesCss, /\.wex-admin-services__tabs \.wex-search-input,[\s\S]*grid-column: 1 \/ -1;[\s\S]*inline-size: 100%;/);
  assert.match(servicesCss, /\[data-service-menu-control="status"\] \{ grid-column: 1;/);
  assert.match(servicesCss, /\.wex-admin-services__tools \{ grid-column: 2; justify-self: end;/);
  assert.match(services, /const statusControlMeasure = text\(document, 'Non Active', 'wex-admin-services__status-control-measure'\);/);
  assert.match(servicesCss, /\.wex-admin-services__status-control-label, \.wex-admin-services__status-control-measure \{ grid-area: 1 \/ 1;/);
});
