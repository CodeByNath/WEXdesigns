import { createSystemIcon, systemIconNames } from './admin-station-system-icons.js';

/** @typedef {import('./admin-station-system-icons.js').SystemIconName} SystemIconName */
/** @typedef {{ id: string, label: string, icon: SystemIconName, active?: boolean }} AdminDrawerSidebarTab */

/**
 * Drawer Sidebar tabs. The requester supplies the tabs; every tab is icon only
 * in every Drawer mode. Hovering or focusing a tab previews its section in the
 * Drawer Body shell; leaving it returns the Body to the selected tab's section;
 * clicking a tab selects it. The Drawer announces each change as
 * `wex:admin-drawer-tab` on the Admin shell (`{ id, preview }`); the requester
 * mounts that section into `adminDrawerCompartment(shell, 'body')` and owns what
 * it shows. The Body carries `data-admin-drawer-body-preview` while previewing.
 */

export const ADMIN_DRAWER_TAB_EVENT = 'wex:admin-drawer-tab';

/** @param {unknown} tabs @returns {tabs is ReadonlyArray<AdminDrawerSidebarTab>} */
export function isAdminDrawerSidebar(tabs) {
  return Array.isArray(tabs) && tabs.every((tab) => typeof tab === 'object' && tab !== null
    && typeof tab.id === 'string' && typeof tab.label === 'string'
    && typeof tab.icon === 'string' && systemIconNames.has(tab.icon)
    && (tab.active === undefined || typeof tab.active === 'boolean'));
}

/** @param {HTMLElement} shell */
function sidebarCompartment(shell) {
  const compartment = shell.querySelector('[data-admin-drawer-compartment="sidebar"]');
  return compartment instanceof HTMLElement ? compartment : null;
}

/** Empties the Drawer Sidebar. @param {HTMLElement} shell */
export function resetAdminDrawerSidebar(shell) {
  sidebarCompartment(shell)?.replaceChildren();
}

/**
 * Prints the requester's tabs into the Drawer Sidebar.
 * @param {HTMLElement} shell
 * @param {ReadonlyArray<AdminDrawerSidebarTab>} tabs
 */
export function setAdminDrawerSidebar(shell, tabs) {
  const compartment = sidebarCompartment(shell);
  if (!compartment) return;
  const document = shell.ownerDocument;
  const body = shell.querySelector('[data-admin-drawer-compartment="body"]');

  const nav = document.createElement('nav');
  nav.className = 'wex-admin-shell__drawer-tabs';
  nav.setAttribute('aria-label', 'Drawer sections');
  const list = document.createElement('ul');
  list.className = 'wex-admin-shell__drawer-tab-list';
  const buttons = tabs.map((tab) => {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'wex-admin-shell__drawer-tab';
    button.dataset.adminDrawerTab = tab.id;
    button.setAttribute('aria-label', tab.label);
    button.setAttribute('aria-pressed', String(tab.active === true));
    const icon = document.createElement('span');
    icon.className = 'wex-admin-shell__drawer-tab-icon';
    icon.append(createSystemIcon(document, tab.icon));
    button.append(icon);
    item.append(button);
    list.append(item);
    return button;
  });

  /** @type {string | undefined} */
  let selected = tabs.find((tab) => tab.active === true)?.id;
  /** @type {string | undefined} */
  let shown = selected;

  /** @param {string | undefined} id @param {boolean} preview */
  const show = (id, preview) => {
    if (body instanceof HTMLElement) body.toggleAttribute('data-admin-drawer-body-preview', preview);
    if (id === undefined || id === shown) return;
    shown = id;
    shell.dispatchEvent(new CustomEvent(ADMIN_DRAWER_TAB_EVENT, { detail: { id, preview } }));
  };

  buttons.forEach((button) => {
    const id = button.dataset.adminDrawerTab;
    const enter = () => show(id, id !== selected);
    const leave = () => show(selected, false);
    button.addEventListener('pointerenter', enter);
    button.addEventListener('focus', enter);
    button.addEventListener('pointerleave', leave);
    button.addEventListener('blur', leave);
    button.addEventListener('click', () => {
      selected = id;
      buttons.forEach((candidate) => candidate.setAttribute('aria-pressed', String(candidate === button)));
      show(id, false);
    });
  });

  nav.append(list);
  compartment.replaceChildren(nav);
}
