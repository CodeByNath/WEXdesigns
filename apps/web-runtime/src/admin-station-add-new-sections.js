import { ADMIN_DRAWER_TAB_EVENT } from './admin-station-drawer-sidebar.js';
import { adminDrawerCompartment, setAdminDrawerMode } from './admin-station-drawer.js';
import { ADMIN_DRAWER_DISCARD_EVENT, ADMIN_DRAWER_EDIT_EVENT, setAdminDrawerActionState } from './admin-station-drawer-footer.js';
import { setAdminDrawerHeaderLocation } from './admin-station-drawer-header.js';
import { createProductSummary } from './admin-station-product-summary.js';
import { createProductOverviewEditor } from './admin-station-product-overview-editor.js';
import { createProductPricingEditor } from './admin-station-product-pricing-editor.js';
import { createConnectionsToggle } from './admin-station-connections-toggle.js';
import { discardProductEditors, productEditorsState } from './admin-station-product-editors.js';
import { createProductPricing } from './admin-station-product-pricing.js';
import { createProductDescription } from './admin-station-product-description.js';
import { createProductMedia } from './admin-station-product-media.js';
import { createProductSnapshot } from './admin-station-product-snapshot.js';
import { createProductMeeting } from './admin-station-product-meeting.js';
import { createProductItinerary } from './admin-station-product-itinerary.js';
import { createProductInfo } from './admin-station-product-info.js';
import { createProductKeywords } from './admin-station-product-keywords.js';
import { createProductFaqBooking } from './admin-station-product-faq-booking.js';
import { activityCount, createActivityCards, createActivityHeading } from './admin-station-activity.js';
import { activePromotionCount, createPromotionCards, createPromotionsHeading } from './admin-station-promotions.js';
import { createProductSections } from './admin-station-product-sections.js';
import { createQuickActions } from './admin-station-form-builder.js';
import { createEditorFooter } from './admin-station-editor-footer.js';

/**
 * Add New Drawer sections. Each Sidebar tab owns one section: its name prints in
 * the Drawer Header right below the Drawer label, and its content prints into the
 * Drawer Body shell. Each section is one unit: one element holds all its pieces (the Promotions row with its cards,
 * the Activity row with its cards), so the pieces always stay together (Owner-directed, 2026-11-15). Hovering a tab previews
 * its section, leaving returns to the selected tab's section and clicking a tab
 * keeps it. Presentation prints the Product Summary, the Promotions row (active
 * count, green Active pill, See all) with the promotion cards below it while any
 * are active, then the Activity row (label, See all) with the two most recent activity cards; the other sections are empty until the Owner defines them.
 */

/** @type {WeakSet<HTMLElement>} */
const listening = new WeakSet();

/**
 * One section as one unit: a single element that holds every piece of the section.
 * @param {Document} document @param {string} name @param {string} label @param {ReadonlyArray<Node>} pieces
 */
function sectionUnit(document, name, label, pieces) {
  const unit = document.createElement('section');
  unit.className = 'wex-admin-drawer-section';
  unit.dataset.adminDrawerUnit = name;
  unit.setAttribute('aria-label', label);
  unit.append(...pieces);
  return unit;
}

/** The main content shell: stays in place while the product navigation loads a section into it. @param {Document} document @param {ReadonlyArray<Node>} sections */
function mainShell(document, sections) {
  const shell = document.createElement('div');
  shell.className = 'wex-admin-drawer-main';
  shell.append(...sections);
  return shell;
}

/** The connections shell: holds the Promotions and Activity units so Full mode can scroll them together. @param {Document} document @param {ReadonlyArray<Node>} units */
function connectionsShell(document, units) {
  const shell = document.createElement('div');
  shell.className = 'wex-admin-drawer-connections';
  shell.append(...units);
  return shell;
}

/** @param {HTMLElement} shell @param {string} id @param {string} label */
export function mountAddNewSection(shell, id, label) {
  const body = adminDrawerCompartment(shell, 'body');
  if (!body) return;
  body.dataset.adminDrawerSection = id;
  setAdminDrawerHeaderLocation(shell, label);
  const document = shell.ownerDocument;
  const next = shell.querySelector('[data-admin-drawer-next]');
  const nextButton = next instanceof HTMLButtonElement ? next : undefined;
  const previous = shell.querySelector('[data-admin-drawer-previous]');
  const previousButton = previous instanceof HTMLButtonElement ? previous : undefined;
  for (const control of [previousButton, nextButton]) {
    if (control) { control.hidden = true; control.disabled = true; control.onclick = null; }
  }
  body.replaceChildren(...(id === 'presentation'
    ? [
      createProductSections(body, nextButton, previousButton),
      mainShell(document, [createProductSummary(shell), createProductPricing(shell), createProductDescription(shell), createProductMedia(shell), createProductSnapshot(shell), createProductMeeting(shell), createProductItinerary(shell), createProductInfo(shell), createProductKeywords(shell), createProductFaqBooking(shell), createProductOverviewEditor(shell), createProductPricingEditor(shell)]),
      connectionsShell(document, [
        sectionUnit(document, 'promotions', 'Promotions', [createPromotionsHeading(document, activePromotionCount), ...(activePromotionCount > 0 ? [createPromotionCards(document)] : [])]),
        sectionUnit(document, 'activity', 'Activity', [createActivityHeading(document, activityCount), createActivityCards(document)]),
        createQuickActions(document),
        createEditorFooter(document),
        createConnectionsToggle(document),
      ]),
    ]
    : []));
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
  // Edit opens the editor view: Full (the section navigation is its frame) and Publish as the main action.
  // The Drawer itself carries `data-admin-drawer-editing`; `admin-station-drawer-editor.css` shapes the view.
  shell.addEventListener(ADMIN_DRAWER_EDIT_EVENT, () => {
    const drawer = shell.querySelector('[data-admin-drawer-shell]');
    if (!(drawer instanceof HTMLElement) || drawer.dataset.adminDrawerOwner !== owner) return;
    setAdminDrawerMode(shell, 'full');
    setAdminDrawerActionState(shell, productEditorsState(shell));
  });
  // Discard returns every section editor's fields to their starting values; the state then reports clean.
  shell.addEventListener(ADMIN_DRAWER_DISCARD_EVENT, () => {
    const drawer = shell.querySelector('[data-admin-drawer-shell]');
    if (!(drawer instanceof HTMLElement) || drawer.dataset.adminDrawerOwner !== owner) return;
    discardProductEditors(shell);
  });
}
