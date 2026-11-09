import { mountOverviewModule } from './admin-station-overview.js';
import { adminDrawerCompartment, requestAdminDrawer } from './admin-station-drawer.js';
import { listenAddNewSections, mountAddNewSection } from './admin-station-add-new-sections.js';
import { allServicesPreviewSnapshot, mountAllServicesBody } from './admin-station-services.js';

const ADD_NEW_OWNER = 'add-new';
/** @type {import('./admin-station-drawer-sidebar.js').AdminDrawerSidebarTab} */
const ADD_NEW_FIRST_TAB = { id: 'details', label: 'Details', icon: 'list', active: true };
/** @type {import('./admin-station-drawer-sidebar.js').AdminDrawerSidebarTab[]} */
const ADD_NEW_TABS = [
  ADD_NEW_FIRST_TAB,
  { id: 'pricing', label: 'Pricing', icon: 'table' },
  { id: 'options', label: 'Options', icon: 'columns' },
  { id: 'settings', label: 'Settings', icon: 'filter' },
];

/**
 * Composes independent Overview and Manager modules for the current local
 * Services station. Each module retains ownership of its own structure.
 * @param {HTMLElement} shell
 */
export function mountProductsBody(shell) {
  const main = shell.querySelector('[data-admin-station-region="main"]'); if (!(main instanceof HTMLElement)) return;
  const document = shell.ownerDocument;
  const page = document.createElement('div'); page.className = 'wex-admin-products';
  const overviewMount = document.createElement('div'); overviewMount.className = 'wex-admin-products__overview';
  const managerMount = document.createElement('div'); managerMount.className = 'wex-admin-products__manager'; managerMount.dataset.adminStationRegion = 'main';
  page.append(overviewMount, managerMount); main.replaceChildren(page);
  const drawer = shell.querySelector('[data-admin-drawer-shell]');
  mountOverviewModule(overviewMount, allServicesPreviewSnapshot, {
    onAddNew: (trigger) => {
      if (drawer instanceof HTMLElement && drawer.dataset.adminDrawerOwner !== ADD_NEW_OWNER) adminDrawerCompartment(shell, 'body')?.replaceChildren();
      requestAdminDrawer(shell, { owner: ADD_NEW_OWNER, header: { icon: 'plus', label: 'Add New', status: 'pending' }, sidebar: ADD_NEW_TABS }, trigger);
      listenAddNewSections(shell, ADD_NEW_TABS, ADD_NEW_OWNER);
      mountAddNewSection(shell, ADD_NEW_FIRST_TAB.id, ADD_NEW_FIRST_TAB.label);
    },
  });
  mountAllServicesBody(page, allServicesPreviewSnapshot);
}
