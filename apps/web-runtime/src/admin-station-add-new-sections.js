import { ADMIN_DRAWER_TAB_EVENT } from './admin-station-drawer-sidebar.js';
import { adminDrawerCompartment } from './admin-station-drawer.js';

/**
 * Add New Drawer sections. Each Sidebar tab owns one section shell in the Drawer
 * Body. Hovering a tab previews its shell, leaving returns to the selected tab's
 * shell and clicking a tab keeps it. Only the section shells exist here; their
 * fields are the Owner's next step.
 */

/** @type {WeakSet<HTMLElement>} */
const listening = new WeakSet();

/** @param {HTMLElement} shell @param {string} id @param {string} label */
export function mountAddNewSection(shell, id, label) {
  const body = adminDrawerCompartment(shell, 'body');
  if (!body) return;
  const document = shell.ownerDocument;
  const section = document.createElement('section');
  section.className = 'wex-admin-add-new-section';
  section.dataset.adminDrawerSection = id;
  const heading = document.createElement('h2');
  heading.className = 'wex-component-title';
  heading.textContent = label;
  section.append(heading);
  body.replaceChildren(section);
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
