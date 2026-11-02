import { createHeaderActionIcon } from './admin-station-nav-actions.js';
import { createMoreActionIcon, createSystemIcon } from './admin-station-system-icons.js';

const ALL_SERVICES_OWNER = 'all-products';
const PAGE_SIZE = 8;

/** @typedef {{id: string, name: string, category: string, value: number, status: 'pending'|'disabled'|'active', imageUrl: string}} ServiceListItem */
/** @typedef {{stationId: string, services: readonly ServiceListItem[]}} ServiceStationSnapshot */

/** @type {readonly (readonly [string, string, string, number, 'pending'|'disabled'|'active', string])[]} */
const previewRows = [
  ['Nath', 'Tours', 'QSDXXXXX', 333, 'active', '1500534623283-312aade485b7'],
  ['Paradise Watersports', 'Activities', 'QSDX0002', 520, 'active', '1530053969600-caed2596d242'],
  ['Quack R Duck', 'Tours', 'QSDX0003', 140, 'active', '1500375592092-40eb2168fd21'],
  ['Ocean Explorer', 'Experiences', 'QSDX0004', 275, 'pending', '1507525428034-b723cf961d3e'],
  ['Island Discovery', 'Tours', 'QSDX0005', 450, 'active', '1473116763249-2faaef81ccda'],
  ['Coastal Adventures', 'Activities', 'QSDX0006', 180, 'disabled', '1510414842594-a61c69b5ae57'],
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
/** @param {Document} document @param {string} label @param {string} command @param {'list'|'table'|'columns'|'filter'} icon */
function iconControl(document, label, command, icon) { const node = control(document, '', command); node.setAttribute('aria-label', label); const visual = createSystemIcon(document, icon); visual.classList.add('wex-admin-services__system-icon'); node.append(visual, document.createTextNode(label)); return node; }
/** @param {HTMLButtonElement} node @param {Document} document @param {string} label @param {'list'|'table'|'columns'|'filter'} icon */
function setIconControlLabel(node, document, label, icon) { node.setAttribute('aria-label', label); const visual = createSystemIcon(document, icon); visual.classList.add('wex-admin-services__system-icon'); node.replaceChildren(visual, document.createTextNode(label)); }
/** @param {Document} document @param {string} label @param {string} command @param {boolean} selected */
function menuOption(document, label, command, selected) { const node = document.createElement('button'); node.type = 'button'; node.className = 'wex-admin-services__menu-tab'; node.dataset.serviceControl = command; node.setAttribute('aria-pressed', String(selected)); node.textContent = label; return node; }
/** @param {Document} document @param {string} label @param {string} command @param {'chevron-left'|'chevron-right'} icon */
function pagerIconControl(document, label, command, icon) { const node = control(document, '', command); node.setAttribute('aria-label', label); const visual = createSystemIcon(document, icon); visual.classList.add('wex-admin-services__system-icon'); node.append(visual); return node; }
/** @param {number} value */
function money(value) { return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(value); }

/** @param {Document} document @param {readonly ServiceListItem[]} services */
function overview(document, services) {
  const section = document.createElement('section'); section.className = 'wex-admin-services__overview'; section.setAttribute('aria-labelledby', 'wex-admin-services-overview-title');
  const header = document.createElement('div'); header.className = 'wex-admin-services__overview-header';
  const heading = document.createElement('h2'); heading.id = 'wex-admin-services-overview-title'; heading.className = 'wex-type-navigation-default-semibold'; heading.textContent = 'Overview';
  const scope = document.createElement('span'); scope.className = 'wex-admin-services__overview-scope wex-type-navigation-small-semibold'; scope.append(text(document, 'All services'), createSystemIcon(document, 'chevron-down'));
  header.append(heading, scope);
  const metrics = document.createElement('dl'); metrics.className = 'wex-admin-services__overview-metrics';
  [
    ['All services', services.length],
    ['Active', services.filter(({ status }) => status === 'active').length],
    ['Pending', services.filter(({ status }) => status === 'pending').length],
    ['Disabled', services.filter(({ status }) => status === 'disabled').length],
  ].forEach(([label, count]) => {
    const metric = document.createElement('div'); metric.className = 'wex-admin-services__overview-metric';
    const term = document.createElement('dt'); term.className = 'wex-type-body-small-regular'; term.textContent = String(label);
    const definition = document.createElement('dd'); definition.className = 'wex-type-title-small-semibold'; definition.textContent = String(count);
    metric.append(term, definition); metrics.append(metric);
  });
  section.append(header, metrics); return section;
}

/** @param {Document} document @param {ServiceListItem} service @param {string|null} openServiceMenuId */
function serviceItem(document, service, openServiceMenuId) {
  const item = document.createElement('article'); item.className = 'wex-admin-services__item'; item.dataset.serviceId = service.id;
  const picture = document.createElement('div'); picture.className = 'wex-admin-services__image';
  const image = document.createElement('img'); image.src = service.imageUrl; image.alt = ''; image.loading = 'lazy'; picture.append(image);
  const identity = document.createElement('div'); identity.className = 'wex-admin-services__identity';
  const title = document.createElement('h2'); title.className = 'wex-type-navigation-small-semibold'; title.textContent = service.name;
  const category = text(document, service.category, 'wex-type-body-small-regular wex-admin-services__category'); identity.append(title, category);
  const compactMetadata = document.createElement('div'); compactMetadata.className = 'wex-admin-services__compact-metadata'; compactMetadata.append(text(document, service.category, 'wex-type-body-small-regular'), text(document, '•', 'wex-type-body-small-regular'), text(document, money(service.value), 'wex-type-navigation-small-semibold'));
  const content = document.createElement('div'); content.className = 'wex-admin-services__content'; content.append(identity, compactMetadata);
  /** @param {string} label @param {string} value @param {string} name */
  const field = (label, value, name) => { const node = document.createElement('div'); node.className = `wex-admin-services__${name}`; node.append(text(document, label, 'wex-type-body-small-regular wex-admin-services__detail-label'), text(document, value, 'wex-type-body-small-regular')); return node; };
  const fields = document.createElement('div'); fields.className = 'wex-admin-services__details'; fields.append(field('ID', service.id, 'identifier'));
  const footer = document.createElement('div'); footer.className = 'wex-admin-services__item-footer';
  const value = text(document, money(service.value), 'wex-type-navigation-small-semibold wex-admin-services__value');
  const statusLabel = service.status === 'active' ? 'Active' : service.status === 'pending' ? 'Pending' : 'Disabled';
  const status = text(document, statusLabel, `wex-type-navigation-small-semibold wex-admin-services__status wex-admin-services__status--${service.status}`);
  const itemMenu = document.createElement('div'); itemMenu.className = 'wex-admin-services__item-menu'; itemMenu.dataset.serviceItemMenu = service.id;
  const action = control(document, '', `menu:${service.id}`); action.classList.replace('wex-button--neutral', 'wex-button--subtle'); action.classList.add('wex-admin-services__item-action'); action.setAttribute('aria-label', `Actions for ${service.name}`); action.setAttribute('aria-expanded', String(openServiceMenuId === service.id)); action.append(createMoreActionIcon(document, 'small'));
  const actionMenu = document.createElement('div'); actionMenu.className = 'wex-admin-services__menu wex-admin-services__item-menu-options'; actionMenu.hidden = openServiceMenuId !== service.id;
  actionMenu.append(menuOption(document, 'View', `service-view:${service.id}`, false), menuOption(document, 'Edit', `service-edit:${service.id}`, false));
  itemMenu.append(action, actionMenu); footer.append(value, status);
  const compactFooter = document.createElement('div'); compactFooter.className = 'wex-admin-services__compact-footer'; compactFooter.append(fields, footer);
  item.append(picture, content, compactFooter, itemMenu); return item;
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
  let view = 'list'; let state = 'all'; let group = 'all'; let query = ''; let columns = 4; let page = 1; let searchExpanded = false;
  /** @type {string|null} */
  let openServiceMenuId = null;
  /** @type {'columns'|'filter'|'status'|null} */
  let popover = null;
  const section = document.createElement('section'); section.className = 'wex-admin-services'; section.dataset.stationId = snapshot.stationId; section.setAttribute('aria-labelledby', 'wex-admin-services-title');
  const header = document.createElement('header'); header.className = 'wex-admin-services__header';
  const heading = document.createElement('h1'); heading.id = 'wex-admin-services-title'; heading.className = 'wex-type-title-small-semibold'; heading.textContent = 'Manager'; header.append(heading);
  const tabs = document.createElement('div'); tabs.className = 'wex-admin-services__tabs'; tabs.setAttribute('aria-label', 'Service search and status filter');
  const tools = document.createElement('div'); tools.className = 'wex-admin-services__tools';
  const viewControl = iconControl(document, 'List', 'view', 'list'); const columnsControl = iconControl(document, 'Columns', 'columns', 'columns'); const filterControl = iconControl(document, 'Filter', 'filter', 'filter');
  const search = document.createElement('label'); search.className = 'wex-search-input wex-search-input--small wex-admin-services__search'; search.append(createHeaderActionIcon(document, 'search')); const input = document.createElement('input'); input.type = 'search'; input.placeholder = 'Search Product'; input.setAttribute('aria-label', 'Search products'); search.append(input);
  const statusControl = control(document, '', 'status'); statusControl.classList.add('wex-admin-services__status-control'); statusControl.setAttribute('aria-label', 'Filter services by status'); const statusControlLabel = text(document, 'All', 'wex-admin-services__status-control-label'); const statusControlMeasure = text(document, 'Disabled', 'wex-admin-services__status-control-measure'); const statusControlChevron = createSystemIcon(document, 'chevron-down'); statusControlChevron.classList.add('wex-admin-services__status-control-chevron'); statusControl.append(statusControlLabel, statusControlMeasure, statusControlChevron);
  /** @param {HTMLButtonElement} trigger @param {HTMLDivElement} menu @param {'columns'|'filter'|'status'} name */
  const menuControl = (trigger, menu, name) => { const wrapper = document.createElement('div'); wrapper.className = 'wex-admin-services__menu-control'; wrapper.dataset.serviceMenuControl = name; wrapper.append(trigger, menu); return wrapper; };
  const columnsMenu = document.createElement('div'); columnsMenu.id = 'wex-admin-services-columns-menu'; columnsMenu.className = 'wex-admin-services__menu'; columnsMenu.dataset.servicePopover = 'columns'; columnsControl.setAttribute('aria-controls', columnsMenu.id);
  const filterMenu = document.createElement('div'); filterMenu.id = 'wex-admin-services-filter-menu'; filterMenu.className = 'wex-admin-services__menu'; filterMenu.dataset.servicePopover = 'filter'; filterControl.setAttribute('aria-controls', filterMenu.id); const columnsMenuControl = menuControl(columnsControl, columnsMenu, 'columns'); tools.append(columnsMenuControl, viewControl, menuControl(filterControl, filterMenu, 'filter'));
  const statusMenu = document.createElement('div'); statusMenu.id = 'wex-admin-services-status-menu'; statusMenu.className = 'wex-admin-services__menu'; statusMenu.dataset.servicePopover = 'status'; statusControl.setAttribute('aria-controls', statusMenu.id); tabs.append(search, menuControl(statusControl, statusMenu, 'status'));
  const toolbar = document.createElement('div'); toolbar.className = 'wex-admin-services__toolbar'; toolbar.append(tabs, tools);
  const serviceOverview = overview(document, services);
  const results = document.createElement('div'); results.className = 'wex-admin-services__results'; results.setAttribute('aria-live', 'polite');
  const footer = document.createElement('footer'); footer.className = 'wex-admin-services__footer'; const total = text(document, '', 'wex-type-body-small-regular wex-admin-services__total'); const pager = document.createElement('div'); pager.className = 'wex-admin-services__pager'; footer.append(total, pager);
  const availableColumns = () => {
    const window = document.defaultView; const minCardSize = Number.parseFloat(window?.getComputedStyle(results).minInlineSize ?? '0'); const gap = Number.parseFloat(window?.getComputedStyle(section).rowGap ?? '0'); const availableWidth = results.getBoundingClientRect().width;
    return [1, 2, 3, 4].filter((count) => minCardSize === 0 || availableWidth >= minCardSize * count + gap * (count - 1));
  };
  const positionItemMenus = () => {
    const window = document.defaultView; if (!window) return;
    const bounds = section.getBoundingClientRect(); const inlineStart = Math.max(0, bounds.left); const inlineEnd = Math.min(window.innerWidth, bounds.right);
    section.querySelectorAll('[data-service-item-menu]').forEach((wrapper) => {
      const trigger = wrapper.querySelector('.wex-admin-services__item-action'); const menu = wrapper.querySelector('.wex-admin-services__item-menu-options');
      if (!(trigger instanceof HTMLElement) || !(menu instanceof HTMLElement) || menu.hidden) return;
      const triggerBounds = trigger.getBoundingClientRect(); const menuWidth = menu.offsetWidth; const menuHeight = menu.offsetHeight;
      const spaceAbove = triggerBounds.top; const spaceBelow = window.innerHeight - triggerBounds.bottom; const spaceLeft = triggerBounds.right - inlineStart; const spaceRight = inlineEnd - triggerBounds.left;
      menu.dataset.serviceMenuBlock = spaceBelow >= menuHeight || spaceBelow > spaceAbove ? 'below' : 'above';
      menu.dataset.serviceMenuInline = spaceRight >= menuWidth || spaceRight > spaceLeft ? 'right' : 'left';
    });
  };
  const renderMenus = () => {
    const available = availableColumns(); if (!available.includes(columns)) columns = available.at(-1) ?? 1;
    columnsMenuControl.hidden = view === 'list'; columnsMenu.hidden = view === 'list' || popover !== 'columns'; filterMenu.hidden = popover !== 'filter'; statusMenu.hidden = popover !== 'status'; columnsControl.setAttribute('aria-expanded', String(view !== 'list' && popover === 'columns')); filterControl.setAttribute('aria-expanded', String(popover === 'filter')); statusControl.setAttribute('aria-expanded', String(popover === 'status')); columnsMenu.replaceChildren();
    available.forEach((count) => columnsMenu.append(menuOption(document, `${count} column${count === 1 ? '' : 's'}`, `columns:${count}`, columns === count)));
    filterMenu.replaceChildren();
    ['all', ...new Set(services.map((service) => service.category))].forEach((value) => filterMenu.append(menuOption(document, value === 'all' ? 'All' : value, `group:${value}`, group === value)));
    statusMenu.replaceChildren();
    ['all', 'pending', 'disabled', 'active'].forEach((value) => statusMenu.append(menuOption(document, value === 'all' ? 'All' : value === 'pending' ? 'Pending' : value === 'disabled' ? 'Disabled' : 'Active', `state:${value}`, state === value)));
  };
  const render = () => {
    const filtered = services.filter((service) => (state === 'all' || service.status === state) && (group === 'all' || service.category === group) && [service.name, service.category, service.id, String(service.value)].join(' ').toLocaleLowerCase().includes(query));
    const maxPage = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)); page = Math.min(page, maxPage); const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    section.dataset.view = view; section.dataset.columns = String(columns); section.dataset.searchExpanded = String(searchExpanded); setIconControlLabel(viewControl, document, view === 'grid' ? 'List' : 'Grid', view === 'grid' ? 'list' : 'table'); statusControlLabel.textContent = state === 'all' ? 'All' : state === 'pending' ? 'Pending' : state === 'disabled' ? 'Disabled' : 'Active'; renderMenus(); results.replaceChildren();
    if (view === 'list') { const labels = document.createElement('div'); labels.className = 'wex-admin-services__list-head wex-type-body-small-regular'; ['Item / Group', 'ID', 'Value', 'Status', 'Actions'].forEach((label) => labels.append(text(document, label))); results.append(labels); }
    const collection = document.createElement('div'); collection.className = 'wex-admin-services__collection'; visible.forEach((service) => collection.append(serviceItem(document, service, openServiceMenuId))); if (!visible.length) collection.append(text(document, 'No matching items', 'wex-type-body-default-regular wex-admin-services__empty')); results.append(collection);
    total.textContent = `${filtered.length} items`; pager.replaceChildren(); [page - 1, ...Array.from({ length: maxPage }, (_, index) => index + 1), page + 1].forEach((number, index) => { const previous = index === 0; const next = index === maxPage + 1; const node = previous ? pagerIconControl(document, 'Previous page', `page:${number}`, 'chevron-left') : next ? pagerIconControl(document, 'Next page', `page:${number}`, 'chevron-right') : control(document, String(number), `page:${number}`); node.disabled = (previous && page === 1) || (next && page === maxPage); node.setAttribute('aria-current', String(!previous && !next && number === page)); pager.append(node); }); positionItemMenus();
  };
  section.addEventListener('click', (event) => { const node = event.target instanceof Element ? event.target.closest('[data-service-control]') : null; if (!(node instanceof HTMLButtonElement)) return; const command = node.dataset.serviceControl ?? ''; if (command === 'view') { view = view === 'grid' ? 'list' : 'grid'; popover = null; openServiceMenuId = null; } else if (command === 'columns' || command === 'filter' || command === 'status') { popover = popover === command ? null : command; openServiceMenuId = null; } else if (command.startsWith('menu:')) { const serviceId = command.slice(5); openServiceMenuId = openServiceMenuId === serviceId ? null : serviceId; popover = null; } else if (command.startsWith('service-view:') || command.startsWith('service-edit:')) openServiceMenuId = null; else if (command.startsWith('state:')) { state = command.slice(6); page = 1; popover = null; } else if (command.startsWith('group:')) { group = command.slice(6); page = 1; popover = null; } else if (command.startsWith('columns:')) { columns = Number(command.slice(8)); popover = null; } else if (command.startsWith('page:')) { page = Number(command.slice(5)); popover = null; } render(); });
  document.addEventListener('click', (event) => { if ((!popover && !openServiceMenuId) || !(event.target instanceof Node)) return; if (event.target instanceof Element && event.target.closest('[data-service-item-menu]')) return; const activeMenu = popover === 'columns' ? columnsMenu : popover === 'filter' ? filterMenu : popover === 'status' ? statusMenu : null; const activeControl = popover === 'columns' ? columnsControl : popover === 'filter' ? filterControl : popover === 'status' ? statusControl : null; if (activeMenu?.contains(event.target) || activeControl?.contains(event.target)) return; popover = null; openServiceMenuId = null; render(); });
  const syncSearchCompact = () => { const targetSize = Number.parseFloat(document.defaultView?.getComputedStyle(search).getPropertyValue('--wex-search-input-target-size') ?? '0'); search.dataset.compact = String(targetSize > 0 && search.getBoundingClientRect().width <= targetSize); };
  search.addEventListener('click', () => { if (search.dataset.compact !== 'true' || searchExpanded) return; searchExpanded = true; render(); input.focus(); }); input.addEventListener('blur', () => { if (!searchExpanded) return; searchExpanded = false; render(); }); input.addEventListener('input', () => { query = input.value.trim().toLocaleLowerCase(); page = 1; render(); });
  section.append(header, serviceOverview, toolbar, results, footer); main.replaceChildren(section); syncSearchCompact(); const SearchResizeObserver = document.defaultView?.ResizeObserver; if (SearchResizeObserver) { const observer = new SearchResizeObserver(() => { syncSearchCompact(); render(); }); observer.observe(search); observer.observe(results); } render();
}

export { ALL_SERVICES_OWNER };
