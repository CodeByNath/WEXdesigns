import { createNotificationModule } from './admin-station-notifications.js';

/** @typedef {import('./admin-station-notifications.js').Notification} Notification */

/**
 * What the legacy Station lists under a Pending module: each missing required
 * field, with the module and its state. Placeholders until the Drawer's own
 * module state supplies them.
 * @type {ReadonlyArray<Notification>}
 */
const drawerModuleNotifications = Object.freeze([
  { id: 'title-missing', icon: 'warning', title: 'Title missing', description: 'Overview · Pending', time: '', sortIndex: 3, unread: true, actionRequired: true },
  { id: 'category-not-selected', icon: 'warning', title: 'Category not selected', description: 'Overview · Pending', time: '', sortIndex: 2, unread: true, actionRequired: true },
  { id: 'description-missing', icon: 'warning', title: 'Description missing', description: 'Overview · Pending', time: '', sortIndex: 1, unread: true, actionRequired: true },
]);

/** @param {HTMLElement} shell */
function dropdownParts(shell) {
  const dropdown = shell.querySelector('[data-admin-drawer-dropdown]');
  const pill = shell.querySelector('[data-admin-drawer-header-status]');
  return dropdown instanceof HTMLElement && pill instanceof HTMLElement ? { dropdown, pill } : null;
}

/** Closes the Drawer's WEX Dropdown. @param {HTMLElement} shell */
export function closeAdminDrawerDropdown(shell) {
  const parts = dropdownParts(shell);
  if (!parts) return;
  parts.dropdown.hidden = true;
  parts.pill.setAttribute('aria-expanded', 'false');
}

/**
 * Hooks the Drawer header status pill to a WEX Dropdown anchored directly
 * beneath the Drawer header, in Component Mode Notification Module + Small.
 * Action required notifications are listed first. The pill, an outside click
 * or Escape closes it.
 * @param {HTMLElement} shell
 */
export function mountAdminDrawerNotifications(shell) {
  const parts = dropdownParts(shell);
  if (!parts) return;
  const { dropdown, pill } = parts;

  dropdown.replaceChildren(createNotificationModule(shell, {
    initialSort: 'priority',
    initialFilter: 'action-required',
    filters: [['action-required', 'Action required'], ['all', 'All']],
    headerAction: 'close',
    markAllRead: false,
    itemOptions: 'view-edit',
    countStyle: 'action-required',
    titleStyle: 'component-title',
    notifications: drawerModuleNotifications,
    titleId: 'wex-admin-drawer-notifications-title',
    onClose: () => closeAdminDrawerDropdown(shell),
  }));
  pill.addEventListener('click', () => {
    dropdown.hidden = !dropdown.hidden;
    if (!dropdown.hidden) {
      const actionRequiredTab = dropdown.querySelector('[data-notification-filter="action-required"]');
      if (actionRequiredTab instanceof HTMLButtonElement) actionRequiredTab.click();
    }
    pill.setAttribute('aria-expanded', String(!dropdown.hidden));
  });
  shell.ownerDocument.addEventListener('click', (event) => {
    if (dropdown.hidden) return;
    // The module re-renders on a click, which detaches its target; the path still names it.
    const path = event.composedPath();
    if (!path.includes(dropdown) && !path.includes(pill)) closeAdminDrawerDropdown(shell);
  });
  shell.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || dropdown.hidden) return;
    closeAdminDrawerDropdown(shell);
    pill.focus();
  });
}
