import { createHeaderActionIcon } from './admin-station-nav-actions.js';
import { createMoreActionIcon, createSystemIcon } from './admin-station-system-icons.js';

const ALL_SERVICES_OWNER = 'all-products';
const PAGE_SIZE = 8;

/** @typedef {{id: string, name: string, category: string, value: number, status: 'active'|'inactive', imageUrl: string}} ServiceListItem */
/** @typedef {{stationId: string, services: readonly ServiceListItem[]}} ServiceStationSnapshot */

/** @type {readonly (readonly [string, string, string, number, 'active'|'inactive', string])[]} */
const previewRows = [
  ['Nath', 'Tours', 'QSDXXXXX', 333, 'active', '1500534623283-312aade485b7'],
  ['Paradise Watersports', 'Activities', 'QSDX0002', 520, 'active', '1530053969600-caed2596d242'],
  ['Quack R Duck', 'Tours', 'QSDX0003', 140, 'active', '1500375592092-40eb2168fd21'],
  ['Ocean Explorer', 'Experiences', 'QSDX0004', 275, 'inactive', '1507525428034-b723cf961d3e'],
  ['Island Discovery', 'Tours', 'QSDX0005', 450, 'active', '1473116763249-2faaef81ccda'],
  ['Coastal Adventures', 'Activities', 'QSDX0006', 180, 'inactive', '1510414842594-a61c69b5ae57'],
  ['Sunset Cruise', 'Cruises', 'QSDX0007', 390, 'active', '1544551763-46a013bb70d5'],
  ['Reef Discovery', 'Experiences', 'QSDX0008', 620, 'active', '1469474968028-56623f02e42e'],
];

/** @type {ServiceStationSnapshot} */
export const allServicesPreviewSnapshot = Object.freeze({
  stationId: 'preview-station',
  services: Object.freeze(previewRows.map(([name, category, id, value, status, photo]) => Object.freeze({
    name, category, id, value, status, imageUrl: `https://images.unsplash.com/photo-${photo}?auto=format&fit=crop&w=700&q=80`,
  }))),
});

/** @param {Document} document @param {string} text @param {string} className */
function text(document, text, className = '') { const node = document.createElement('span'); node.className = className; node.textContent = text; return node; }
/** @param {Document} document @param {string} label @param {string} command */
function control(document, label, command) { const node = document.createElement('button'); node.type = 'button'; node.className = 'wex-button wex-button--small wex-button--neutral'; node.dataset.serviceControl = command; node.textContent = label; return node; }
/** @param {Document} document @param {string} label @param {string} command @param {'table'|'columns'|'filter'} icon */
function iconControl(document, label, command, icon) { const node = control(document, '', command); const visual = createSystemIcon(document, icon); visual.classList.add('wex-admin-services__system-icon'); node.append(visual, document.createTextNode(label)); return node; }
/** @param {HTMLButtonElement} node @param {Document} document @param {string} label @param {'table'|'columns'|'filter'} icon */
function setIconControlLabel(node, document, label, icon) { const visual = createSystemIcon(document, icon); visual.classList.add('wex-admin-services__system-icon'); node.replaceChildren(visual, document.createTextNode(label)); }
/** @param {Document} document @param {string} label @param {string} command @param {boolean} selected */
function menuOption(document, label, command, selected) { const node = document.createElement('button'); node.type = 'button'; node.className = 'wex-admin-services__menu-tab'; node.dataset.serviceControl = command; node.setAttribute('aria-pressed', String(selected)); node.textContent = label; return node; }
/** @param {Document} document @param {string} label @param {string} command @param {'chevron-left'|'chevron-right'} icon */
function pagerIconControl(document, label, command, icon) { const node = control(document, '', command); node.setAttribute('aria-label', label); const visual = createSystemIcon(document, icon); visual.classList.add('wex-admin-services__system-icon'); node.append(visual); return node; }
/** @param {number} value */
function money(value) { return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(value); }

/** @param {Document} document @param {ServiceListItem} service */
function serviceItem(document, service) {
  const item = document.createElement('article'); item.className = 'wex-admin-services__item'; item.dataset.serviceId = service.id;
  const picture = document.createElement('div'); picture.className = 'wex-admin-services__image';
  const image = document.createElement('img'); image.src = service.imageUrl; image.alt = ''; image.loading = 'lazy'; picture.append(image);
  const identity = document.createElement('div'); identity.className = 'wex-admin-services__identity';
  const title = document.createElement('h2'); title.className = 'wex-type-navigation-default-semibold'; title.textContent = service.name;
  identity.append(title, text(document, service.category, 'wex-type-body-default-regular wex-admin-services__category'));
  /** @param {string} label @param {string} value @param {string} name */
  const field = (label, value, name) => { const node = document.createElement('div'); node.className = `wex-admin-services__${name}`; node.append(text(document, label, 'wex-type-body-small-regular wex-admin-services__detail-label'), text(document, value, 'wex-type-body-default-regular')); return node; };
  const fields = document.createElement('div'); fields.className = 'wex-admin-services__details'; fields.append(field('ID', service.id, 'identifier'));
  const footer = document.createElement('div'); footer.className = 'wex-admin-services__item-footer';
  const value = text(document, money(service.value), 'wex-type-navigation-default-semibold wex-admin-services__value');
  const status = text(document, service.status === 'active' ? 'Active' : 'Inactive', `wex-type-navigation-small-semibold wex-admin-services__status wex-admin-services__status--${service.status}`);
  const action = control(document, '', `menu:${service.id}`); action.classList.add('wex-admin-services__item-action'); action.setAttribute('aria-label', `Actions for ${service.name}`); action.append(createMoreActionIcon(document, 'small')); footer.append(value, status);
  item.append(picture, identity, fields, footer, action); return item;
}

/**
 * Mounts one station-scoped collection. Grid and list reuse the exact same
 * service elements; only the WEX presentation arrangement changes.
 * @param {HTMLElement} shell
 * @param {ServiceStationSnapshot} [snapshot]
 */
export function mountAllServicesBody(shell, snapshot = allServicesPreviewSnapshot) {
  const main = shell.querySelector('[data-admin-station-region="main"]'); if (!(main instanceof HTMLElement)) return;
  const document = shell.ownerDocument; const services = snapshot.services.map((service) => ({ ...service }));
  let view = 'grid'; let state = 'all'; let group = 'all'; let query = ''; let columns = 4; let page = 1;
  /** @type {'columns'|'filter'|null} */
  let popover = null;
  const section = document.createElement('section'); section.className = 'wex-admin-services'; section.dataset.stationId = snapshot.stationId; section.setAttribute('aria-labelledby', 'wex-admin-services-title');
  const header = document.createElement('header'); header.className = 'wex-admin-services__header';
  const copy = document.createElement('div'); const heading = document.createElement('h1'); heading.id = 'wex-admin-services-title'; heading.className = 'wex-type-heading-default-semibold'; heading.textContent = 'Management Items'; copy.append(heading, text(document, 'Manage your items and groups', 'wex-type-body-default-regular wex-admin-services__summary'));
  const add = document.createElement('button'); add.type = 'button'; add.className = 'wex-button wex-button--default wex-button--primary'; add.textContent = 'Add New'; header.append(copy, add);
  const tabs = document.createElement('div'); tabs.className = 'wex-admin-services__tabs'; tabs.setAttribute('aria-label', 'Filter services by status'); ['all', 'active', 'inactive'].forEach((value) => { const label = value === 'all' ? 'All' : value === 'active' ? 'Active' : 'Non Active'; const node = control(document, label, `state:${value}`); node.classList.replace('wex-button--neutral', 'wex-button--subtle'); tabs.append(node); });
  const tools = document.createElement('div'); tools.className = 'wex-admin-services__tools';
  const viewControl = iconControl(document, 'Table', 'view', 'table'); const columnsControl = iconControl(document, 'Columns', 'columns', 'columns'); const filterControl = iconControl(document, 'Filter', 'filter', 'filter');
  const search = document.createElement('label'); search.className = 'wex-search-input wex-search-input--small wex-admin-services__search'; search.append(createHeaderActionIcon(document, 'search')); const input = document.createElement('input'); input.type = 'search'; input.placeholder = 'Search Product'; input.setAttribute('aria-label', 'Search products'); search.append(input);
  const columnsMenu = document.createElement('div'); columnsMenu.id = 'wex-admin-services-columns-menu'; columnsMenu.className = 'wex-admin-services__menu'; columnsMenu.dataset.servicePopover = 'columns'; columnsControl.setAttribute('aria-controls', columnsMenu.id);
  const filterMenu = document.createElement('div'); filterMenu.id = 'wex-admin-services-filter-menu'; filterMenu.className = 'wex-admin-services__menu'; filterMenu.dataset.servicePopover = 'filter'; filterControl.setAttribute('aria-controls', filterMenu.id); tools.append(viewControl, columnsControl, filterControl, search, columnsMenu, filterMenu);
  const toolbar = document.createElement('div'); toolbar.className = 'wex-admin-services__toolbar'; toolbar.append(tabs, tools);
  const results = document.createElement('div'); results.className = 'wex-admin-services__results'; results.setAttribute('aria-live', 'polite');
  const footer = document.createElement('footer'); footer.className = 'wex-admin-services__footer'; const total = text(document, '', 'wex-type-body-small-regular wex-admin-services__total'); const pager = document.createElement('div'); pager.className = 'wex-admin-services__pager'; footer.append(total, pager);
  const renderMenus = () => {
    columnsMenu.hidden = popover !== 'columns'; filterMenu.hidden = popover !== 'filter'; columnsControl.setAttribute('aria-expanded', String(popover === 'columns')); filterControl.setAttribute('aria-expanded', String(popover === 'filter')); columnsMenu.replaceChildren();
    [1, 2, 3, 4].forEach((count) => columnsMenu.append(menuOption(document, `${count} column${count === 1 ? '' : 's'}`, `columns:${count}`, columns === count)));
    filterMenu.replaceChildren();
    ['all', ...new Set(services.map((service) => service.category))].forEach((value) => filterMenu.append(menuOption(document, value === 'all' ? 'All' : value, `group:${value}`, group === value)));
  };
  const render = () => {
    const filtered = services.filter((service) => (state === 'all' || service.status === state) && (group === 'all' || service.category === group) && [service.name, service.category, service.id, String(service.value)].join(' ').toLocaleLowerCase().includes(query));
    const maxPage = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)); page = Math.min(page, maxPage); const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    section.dataset.view = view; section.dataset.columns = String(columns); setIconControlLabel(viewControl, document, view === 'grid' ? 'Table' : 'Grid', view === 'grid' ? 'table' : 'columns'); tabs.querySelectorAll('button').forEach((node) => node.setAttribute('aria-pressed', String(node.dataset.serviceControl === `state:${state}`))); renderMenus(); results.replaceChildren();
    if (view === 'list') { const labels = document.createElement('div'); labels.className = 'wex-admin-services__list-head wex-type-body-small-regular'; ['Item / Group', 'ID', 'Value', 'Status', 'Actions'].forEach((label) => labels.append(text(document, label))); results.append(labels); }
    const collection = document.createElement('div'); collection.className = 'wex-admin-services__collection'; visible.forEach((service) => collection.append(serviceItem(document, service))); if (!visible.length) collection.append(text(document, 'No matching items', 'wex-type-body-default-regular wex-admin-services__empty')); results.append(collection);
    total.textContent = `${filtered.length} items`; pager.replaceChildren(); [page - 1, ...Array.from({ length: maxPage }, (_, index) => index + 1), page + 1].forEach((number, index) => { const previous = index === 0; const next = index === maxPage + 1; const node = previous ? pagerIconControl(document, 'Previous page', `page:${number}`, 'chevron-left') : next ? pagerIconControl(document, 'Next page', `page:${number}`, 'chevron-right') : control(document, String(number), `page:${number}`); node.disabled = (previous && page === 1) || (next && page === maxPage); node.setAttribute('aria-current', String(!previous && !next && number === page)); pager.append(node); });
  };
  section.addEventListener('click', (event) => { const node = event.target instanceof Element ? event.target.closest('[data-service-control]') : null; if (!(node instanceof HTMLButtonElement)) return; const command = node.dataset.serviceControl ?? ''; if (command === 'view') view = view === 'grid' ? 'list' : 'grid'; else if (command === 'columns' || command === 'filter') popover = popover === command ? null : command; else if (command.startsWith('state:')) { state = command.slice(6); page = 1; popover = null; } else if (command.startsWith('group:')) { group = command.slice(6); page = 1; popover = null; } else if (command.startsWith('columns:')) { columns = Number(command.slice(8)); popover = null; } else if (command.startsWith('page:')) { page = Number(command.slice(5)); popover = null; } render(); });
  document.addEventListener('click', (event) => { if (!popover || !(event.target instanceof Node)) return; const activeMenu = popover === 'columns' ? columnsMenu : filterMenu; const activeControl = popover === 'columns' ? columnsControl : filterControl; if (activeMenu.contains(event.target) || activeControl.contains(event.target)) return; popover = null; render(); });
  input.addEventListener('input', () => { query = input.value.trim().toLocaleLowerCase(); page = 1; render(); }); add.addEventListener('click', () => input.focus());
  section.append(header, toolbar, results, footer); main.replaceChildren(section); render();
}

export { ALL_SERVICES_OWNER };
