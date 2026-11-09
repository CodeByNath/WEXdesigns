import { ADMIN_DRAWER_TAB_EVENT } from './admin-station-drawer-sidebar.js';
import { adminDrawerCompartment } from './admin-station-drawer.js';

/**
 * Add New Drawer sections. Each Sidebar tab owns one section printed straight
 * into the Drawer Body shell, with no wrapper of its own. Hovering a tab previews its section, leaving
 * returns to the selected tab's section and clicking a tab keeps it. Only the section titles exist here; the
 * fields are the Owner's next step.
 */

/** @type {WeakSet<HTMLElement>} */
const listening = new WeakSet();

/** @param {HTMLElement} shell @param {string} id @param {string} label */
export function mountAddNewSection(shell, id, label) {
  const body = adminDrawerCompartment(shell, 'body');
  if (!body) return;
  const heading = shell.ownerDocument.createElement('h2');
  heading.className = 'wex-component-title';
  heading.textContent = label;
  body.dataset.adminDrawerSection = id;
  body.replaceChildren(heading);
}

/**
 * Mounts the section of every tab change the Drawer Sidebar announces.
 * @param {HTMLElement} shell
 * @param {ReadonlyArray<{ id: string, label: string }>} tabs
 * @param {string} owner
 */
export function listenAddNewSections(shell, tabs, owner) {
  if (listening.has(shell)) return;
  listening.add(shell);
  shell.addEventListener(ADMIN_DRAWER_TAB_EVENT, (event) => {
    const drawer = shell.querySelector('[data-admin-drawer-shell]');
    if (!(drawer instanceof HTMLElement) || drawer.dataset.adminDrawerOwner !== owner) return;
    const { id } = /** @type {CustomEvent<{ id: string }>} */ (event).detail;
    const tab = tabs.find((candidate) => candidate.id === id);
    if (tab) mountAddNewSection(shell, tab.id, tab.label);
  });
}
