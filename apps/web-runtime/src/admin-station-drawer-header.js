import { createMoreActionIcon, createSystemIcon, systemIconNames } from './admin-station-system-icons.js';

/** @typedef {import('./admin-station-system-icons.js').SystemIconName} SystemIconName */
/** @typedef {'active' | 'pending' | 'disabled'} AdminDrawerStatus */
/** @typedef {{ icon?: SystemIconName, label?: string, status?: AdminDrawerStatus }} AdminDrawerHeaderContent */

const DEFAULT_ICON = 'user';
const DEFAULT_STATUS = 'active';
/** @type {Record<AdminDrawerStatus, string>} */
const statusLabels = { active: 'Active', pending: 'Pending', disabled: 'Disabled' };

/** @param {unknown} content @returns {content is AdminDrawerHeaderContent} */
export function isAdminDrawerHeaderContent(content) {
  if (typeof content !== 'object' || content === null) return false;
  const candidate = /** @type {Record<string, unknown>} */ (content);
  return (candidate.icon === undefined || (typeof candidate.icon === 'string' && systemIconNames.has(candidate.icon)))
    && (candidate.label === undefined || typeof candidate.label === 'string')
    && (candidate.status === undefined || (typeof candidate.status === 'string' && candidate.status in statusLabels));
}

/** @param {HTMLElement} shell */
function headerParts(shell) {
  const icon = shell.querySelector('[data-admin-drawer-header-icon]');
  const label = shell.querySelector('[data-admin-drawer-header-label]');
  const status = shell.querySelector('[data-admin-drawer-header-status]');
  return icon instanceof HTMLElement && label instanceof HTMLElement && status instanceof HTMLElement ? { icon, label, status } : null;
}

/** The Header location label, which the Drawer label follows unless a requester sets its own. @param {HTMLElement} shell */
function locationLabel(shell) {
  return shell.querySelector('[data-admin-station-location]')?.textContent?.trim() ?? '';
}

/**
 * Sets any of the Drawer Header's icon, label and status pill. Each one is
 * optional and only the ones given change. A given label stops the Drawer
 * following the Header location until the next reset.
 * @param {HTMLElement} shell
 * @param {AdminDrawerHeaderContent} content
 */
export function setAdminDrawerHeader(shell, content) {
  const parts = headerParts(shell);
  if (!parts || !isAdminDrawerHeaderContent(content)) return false;

  if (content.icon !== undefined) parts.icon.replaceChildren(createSystemIcon(shell.ownerDocument, content.icon));
  if (content.label !== undefined) {
    parts.label.textContent = content.label;
    parts.label.dataset.adminDrawerHeaderLabelOwned = '';
  }
  if (content.status !== undefined) {
    parts.status.dataset.adminDrawerHeaderRequested = content.status;
    renderStatus(shell);
  }
  return true;
}

/**
 * Prints the status pill. Pending wins while anything is pending (the count on
 * its corner); with nothing pending it shows the requester's Active or
 * Disabled, and a requested Pending becomes Active.
 * @param {HTMLElement} shell
 */
function renderStatus(shell) {
  const parts = headerParts(shell);
  if (!parts) return;
  const badge = shell.querySelector('[data-admin-drawer-header-count]');
  const count = badge instanceof HTMLElement ? Number(badge.dataset.adminDrawerHeaderCount ?? 0) : 0;
  const requested = /** @type {AdminDrawerStatus} */ (parts.status.dataset.adminDrawerHeaderRequested ?? DEFAULT_STATUS);
  /** @type {AdminDrawerStatus} */
  const status = count > 0 ? 'pending' : requested === 'pending' ? 'active' : requested;
  Object.keys(statusLabels).forEach((state) => parts.status.classList.remove(`wex-pill-notification-status--${state}`));
  parts.status.classList.add(`wex-pill-notification-status--${status}`);
  parts.status.dataset.adminDrawerHeaderStatus = status;
  parts.status.textContent = statusLabels[status];
}

/**
 * Prints the section the Drawer is showing right below the Drawer label; an
 * empty text hides it.
 * @param {HTMLElement} shell @param {string} text
 */
export function setAdminDrawerHeaderLocation(shell, text) {
  const location = shell.querySelector('[data-admin-drawer-header-location]');
  if (!(location instanceof HTMLElement)) return;
  location.textContent = text;
  location.hidden = text === '';
}

/**
 * Sets how many things are pending. Above zero the pill is Pending and shows the
 * count on its corner; at zero the count is hidden and the pill goes back to
 * Active or Disabled.
 * @param {HTMLElement} shell @param {number} count
 */
export function setAdminDrawerHeaderCount(shell, count) {
  const badge = shell.querySelector('[data-admin-drawer-header-count]');
  if (!(badge instanceof HTMLElement)) return;
  badge.dataset.adminDrawerHeaderCount = String(Math.max(0, count));
  badge.textContent = count > 0 ? String(count) : '';
  badge.hidden = count <= 0;
  renderStatus(shell);
}

/** Back to the defaults: user icon, Header location label, Active pill, no section line. @param {HTMLElement} shell */
export function resetAdminDrawerHeader(shell) {
  const parts = headerParts(shell);
  if (!parts) return false;
  closeAdminDrawerHeaderMenu(shell);
  setAdminDrawerHeaderLocation(shell, '');
  delete parts.label.dataset.adminDrawerHeaderLabelOwned;
  parts.label.textContent = locationLabel(shell);
  return setAdminDrawerHeader(shell, { icon: DEFAULT_ICON, status: DEFAULT_STATUS });
}

/** Closes the Edit options menu. @param {HTMLElement} shell */
export function closeAdminDrawerHeaderMenu(shell) {
  const toggle = shell.querySelector('[data-admin-drawer-header-menu-toggle]');
  const list = shell.querySelector('[data-admin-drawer-header-menu-list]');
  if (list instanceof HTMLElement) list.hidden = true;
  if (toggle instanceof HTMLElement) toggle.setAttribute('aria-expanded', 'false');
}

/** Opens and closes the Edit options menu from its toggle, an outside click, Escape or a chosen option. @param {HTMLElement} shell */
function mountHeaderMenu(shell) {
  const menu = shell.querySelector('[data-admin-drawer-header-menu]');
  const toggle = shell.querySelector('[data-admin-drawer-header-menu-toggle]');
  const list = shell.querySelector('[data-admin-drawer-header-menu-list]');
  if (!(menu instanceof HTMLElement) || !(toggle instanceof HTMLElement) || !(list instanceof HTMLElement)) return;
  toggle.replaceChildren(createMoreActionIcon(shell.ownerDocument));
  toggle.addEventListener('click', () => {
    list.hidden = !list.hidden;
    toggle.setAttribute('aria-expanded', String(!list.hidden));
  });
  list.addEventListener('click', () => closeAdminDrawerHeaderMenu(shell));
  shell.ownerDocument.addEventListener('click', (event) => {
    if (!(event.target instanceof Node) || !menu.contains(event.target)) closeAdminDrawerHeaderMenu(shell);
  });
  shell.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !list.hidden) { closeAdminDrawerHeaderMenu(shell); toggle.focus(); }
  });
}

/**
 * Fills the Header shell with its defaults and keeps the label following the
 * Header location while no requester has set one.
 * @param {HTMLElement} shell
 */
export function mountAdminDrawerHeader(shell) {
  const parts = headerParts(shell);
  if (!parts) return;
  resetAdminDrawerHeader(shell);
  mountHeaderMenu(shell);

  const location = shell.querySelector('[data-admin-station-location]');
  if (!(location instanceof HTMLElement)) return;
  new MutationObserver(() => {
    if (parts.label.dataset.adminDrawerHeaderLabelOwned === undefined) parts.label.textContent = locationLabel(shell);
  }).observe(location, { childList: true, characterData: true, subtree: true });
}
