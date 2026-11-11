import { ADMIN_DRAWER_TAB_EVENT } from './admin-station-drawer-sidebar.js';
import { adminDrawerCompartment } from './admin-station-drawer.js';
import { setAdminDrawerHeaderLocation } from './admin-station-drawer-header.js';
import { createProductSummary } from './admin-station-product-summary.js';
import { activePromotionCount, createPromotionCards, createPromotionsHeading } from './admin-station-promotions.js';

/**
 * Add New Drawer sections. Each Sidebar tab owns one section: its name prints in
 * the Drawer Header right below the Drawer label, and its content prints straight
 * into the Drawer Body shell with no wrapper of its own. Hovering a tab previews
 * its section, leaving returns to the selected tab's section and clicking a tab
 * keeps it. Presentation prints the Product Summary, the Promotions row (active
 * count, green Active pill, See all) with the promotion cards below it while any
 * are active, and the Notifications label; the other sections are empty until the Owner defines them.
 */

/** @type {WeakSet<HTMLElement>} */
const listening = new WeakSet();

/** Labels Presentation prints after the Promotions row: what recently happened. */
const PRESENTATION_LABELS = Object.freeze(['Notifications']);

/** @param {HTMLElement} shell @param {string} id @param {string} label */
export function mountAddNewSection(shell, id, label) {
  const body = adminDrawerCompartment(shell, 'body');
  if (!body) return;
  body.dataset.adminDrawerSection = id;
  setAdminDrawerHeaderLocation(shell, label);
  const document = shell.ownerDocument;
  body.replaceChildren(...(id === 'presentation'
    ? [createProductSummary(shell), createPromotionsHeading(document, activePromotionCount), ...(activePromotionCount > 0 ? [createPromotionCards(document)] : []), ...PRESENTATION_LABELS.map((text) => heading(document, text))]
    : []));
}

/** @param {Document} document @param {string} text */
function heading(document, text) {
  const node = document.createElement('h2');
  node.className = 'wex-type-navigation-small-semibold';
  node.textContent = text;
  return node;
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
