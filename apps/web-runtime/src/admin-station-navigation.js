import { announceLocationChange } from './admin-station-location.js';
import { requestAdminBodyShell } from './admin-station-body.js';
import { mountDashboardBody } from './admin-station-dashboard.js';

const ICON_STROKE_WIDTH = '1.75';
const DASHBOARD_BODY_OWNER = 'dashboard';

/** @typedef {'dashboard' | 'site' | 'products' | 'tools' | 'chevron'} SidebarIconName */
/** @typedef {{ id: string, label: string, active?: boolean }} SidebarLeafInput */
/** @typedef {{ id: string, label: string, icon: SidebarIconName, children?: readonly SidebarLeafInput[] }} SidebarTabInput */

/**
 * Local presentation inputs for the first Sidebar navigation component.
 * Commands for these items are deliberately supplied by a future host layer.
 * @type {readonly SidebarTabInput[]}
 */
export const sidebarTabInputs = Object.freeze([
  Object.freeze({ id: 'dashboard', label: 'Dashboard', icon: 'dashboard' }),
  Object.freeze({
    id: 'site',
    label: 'Site',
    icon: 'site',
    children: Object.freeze([
      Object.freeze({ id: 'pages', label: 'Pages' }),
    ]),
  }),
  Object.freeze({
    id: 'product-manager',
    label: 'Services',
    icon: 'products',
    children: Object.freeze([
      Object.freeze({ id: 'all-products', label: 'All Services' }),
      Object.freeze({ id: 'new-product', label: 'Add New', active: true }),
      Object.freeze({ id: 'product-keywords', label: 'Keywords' }),
    ]),
  }),
  Object.freeze({ id: 'tools', label: 'Tools', icon: 'tools', children: Object.freeze([]) }),
]);

/** @type {Record<SidebarIconName, ReadonlyArray<readonly [string, Readonly<Record<string, string>>]>>} */
const iconShapes = {
  dashboard: [
    ['rect', { x: '3.75', y: '3.75', width: '6.5', height: '6.5', rx: '1.25' }],
    ['rect', { x: '13.75', y: '3.75', width: '6.5', height: '6.5', rx: '1.25' }],
    ['rect', { x: '3.75', y: '13.75', width: '6.5', height: '6.5', rx: '1.25' }],
    ['rect', { x: '13.75', y: '13.75', width: '6.5', height: '6.5', rx: '1.25' }],
  ],
  site: [
    ['rect', { x: '3.25', y: '4.25', width: '17.5', height: '15.5', rx: '1.75' }],
    ['path', { d: 'M3.25 8.75h17.5' }],
    ['circle', { cx: '6', cy: '6.5', r: '0.75' }],
  ],
  products: [
    ['path', { d: 'm12 3.75 8.25 4.5L12 12.75 3.75 8.25 12 3.75Z' }],
    ['path', { d: 'M3.75 8.25v7.5L12 20.25l8.25-4.5v-7.5M12 12.75v7.5' }],
  ],
  tools: [
    ['path', { d: 'M4 6.5h16M4 12h16M4 17.5h16' }],
    ['circle', { cx: '8', cy: '6.5', r: '1.5' }],
    ['circle', { cx: '15.5', cy: '12', r: '1.5' }],
    ['circle', { cx: '10.5', cy: '17.5', r: '1.5' }],
  ],
  chevron: [
    ['path', { d: 'm6.75 9.25 5.25 5.25 5.25-5.25' }],
  ],
};

/** @param {Document} document @param {SidebarIconName} name */
function createIcon(document, name) {
  const icon = document.createElement('span');
  icon.classList.add('wex-admin-shell__sidebar-tab-icon');
  if (name === 'chevron') icon.classList.add('wex-admin-shell__sidebar-tab-icon--disclosure');

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('wex-admin-shell__sidebar-tab-icon-svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', ICON_STROKE_WIDTH);
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  iconShapes[name].forEach(([shape, attributes]) => {
    const node = document.createElementNS('http://www.w3.org/2000/svg', shape);
    Object.entries(attributes).forEach(([attribute, value]) => node.setAttribute(attribute, value));
    svg.append(node);
  });
  icon.append(svg);
  return icon;
}

/** @param {Document} document @param {string} label */
function createLabel(document, label) {
  const text = document.createElement('span');
  text.className = 'wex-admin-shell__sidebar-tab-label wex-type-navigation-small-semibold';
  text.textContent = label;
  return text;
}

/** @param {Document} document @param {{ id: string, label: string, active?: boolean }} item */
function createLeafTab(document, item) {
  const tab = document.createElement('button');
  tab.type = 'button';
  tab.className = 'wex-admin-shell__sidebar-tab wex-admin-shell__sidebar-tab--leaf';
  tab.dataset.sidebarTab = item.id;
  tab.dataset.sidebarTabActive = item.active ? 'true' : 'false';
  tab.setAttribute('aria-pressed', String(Boolean(item.active)));
  tab.append(createLabel(document, item.label));
  return tab;
}

/** @param {HTMLElement} control @param {HTMLElement} items @param {boolean} expanded */
function setGroupExpanded(control, items, expanded) {
  control.setAttribute('aria-expanded', String(expanded));
  control.dataset.sidebarTabExpanded = String(expanded);
  items.hidden = !expanded;
}

/** @param {HTMLElement} control @param {HTMLElement} items */
function syncGroupActive(control, items) {
  control.dataset.sidebarTabActive = String(Boolean(
    items.querySelector('.wex-admin-shell__sidebar-tab--leaf[data-sidebar-tab-active="true"]'),
  ));
}

/**
 * Mounts repeated, local Sidebar-tab presentation and its disclosure controls.
 * @param {HTMLElement} shell
 */
export function mountSidebarNavigation(shell) {
  const navigation = shell.querySelector('[data-sidebar-navigation]');
  if (!(navigation instanceof HTMLElement)) return;

  const document = shell.ownerDocument;
  const list = document.createElement('ul');
  list.className = 'wex-admin-shell__sidebar-tab-list';

  sidebarTabInputs.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.className = 'wex-admin-shell__sidebar-tab-item';
    if (!('children' in item)) {
      const tab = createLeafTab(document, item);
      tab.prepend(createIcon(document, item.icon));
      listItem.append(tab);
      list.append(listItem);
      return;
    }

    const group = document.createElement('button');
    const groupId = `admin-station-sidebar-group-${item.id}`;
    group.type = 'button';
    group.className = 'wex-admin-shell__sidebar-tab wex-admin-shell__sidebar-tab--group';
    group.dataset.sidebarTab = item.id;
    group.setAttribute('aria-controls', groupId);
    group.append(createIcon(document, item.icon), createLabel(document, item.label), createIcon(document, 'chevron'));

    const children = document.createElement('ul');
    children.id = groupId;
    children.className = 'wex-admin-shell__sidebar-tab-children';
    (item.children ?? []).forEach((child) => {
      const childItem = document.createElement('li');
      childItem.append(createLeafTab(document, child));
      children.append(childItem);
    });
    // Groups are disclosure controls, but reflect the selected child context.
    syncGroupActive(group, children);
    setGroupExpanded(group, children, Boolean((item.children ?? []).some((child) => child.active)));
    group.addEventListener('click', () => setGroupExpanded(group, children, group.getAttribute('aria-expanded') !== 'true'));
    listItem.append(group, children);
    list.append(listItem);
  });

  list.addEventListener('click', (event) => {
    const selected = event.target instanceof Element ? event.target.closest('.wex-admin-shell__sidebar-tab--leaf') : null;
    if (!(selected instanceof HTMLButtonElement)) return;
    list.querySelectorAll('.wex-admin-shell__sidebar-tab--leaf').forEach((tab) => {
      if (!(tab instanceof HTMLButtonElement)) return;
      const active = tab === selected;
      tab.dataset.sidebarTabActive = String(active);
      tab.setAttribute('aria-pressed', String(active));
    });
    list.querySelectorAll('.wex-admin-shell__sidebar-tab--group').forEach((group) => {
      if (!(group instanceof HTMLElement)) return;
      const groupId = group.getAttribute('aria-controls');
      const children = groupId ? document.getElementById(groupId) : null;
      if (!(children instanceof HTMLElement)) return;
      syncGroupActive(group, children);
      setGroupExpanded(group, children, children.contains(selected));
    });
    if (selected.dataset.sidebarTab === DASHBOARD_BODY_OWNER) {
      mountDashboardBody(shell);
      requestAdminBodyShell(shell, { owner: DASHBOARD_BODY_OWNER }, selected);
    }
    announceLocationChange(shell);
  });

  navigation.replaceChildren(list);
}
