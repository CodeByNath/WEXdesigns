/**
 * Admin Drawer footer state. The footer reads one flag, `data-admin-drawer-dirty`
 * on the Drawer: with nothing to save, Save is disabled and Close is shown; with
 * something to save or discard, Save is enabled and Discard replaces Close.
 * A requester reports its state with `setAdminDrawerDirty` and listens for
 * `wex:admin-drawer-save` and `wex:admin-drawer-discard` on the Admin shell.
 */

export const ADMIN_DRAWER_SAVE_EVENT = 'wex:admin-drawer-save';
export const ADMIN_DRAWER_DISCARD_EVENT = 'wex:admin-drawer-discard';

/** @param {HTMLElement} shell */
function footerParts(shell) {
  const drawer = shell.querySelector('[data-admin-drawer-shell]');
  const close = drawer?.querySelector('.wex-admin-shell__drawer-footer [data-admin-drawer-close]');
  const discard = drawer?.querySelector('[data-admin-drawer-discard]');
  const save = drawer?.querySelector('[data-admin-drawer-save]');
  return drawer instanceof HTMLElement && close instanceof HTMLElement && discard instanceof HTMLElement && save instanceof HTMLButtonElement
    ? { drawer, close, discard, save }
    : null;
}

/**
 * Tells the Drawer footer whether there is anything to save or discard.
 * @param {HTMLElement} shell
 * @param {boolean} dirty
 */
export function setAdminDrawerDirty(shell, dirty) {
  const parts = footerParts(shell);
  if (!parts) return;
  parts.drawer.toggleAttribute('data-admin-drawer-dirty', dirty);
  parts.save.disabled = !dirty;
  parts.discard.hidden = !dirty;
  parts.close.hidden = dirty;
}

/** @param {HTMLElement} shell */
export function mountAdminDrawerFooter(shell) {
  const parts = footerParts(shell);
  if (!parts) return;
  setAdminDrawerDirty(shell, false);
  parts.save.addEventListener('click', () => {
    shell.dispatchEvent(new CustomEvent(ADMIN_DRAWER_SAVE_EVENT));
    setAdminDrawerDirty(shell, false);
  });
  parts.discard.addEventListener('click', () => {
    shell.dispatchEvent(new CustomEvent(ADMIN_DRAWER_DISCARD_EVENT));
    setAdminDrawerDirty(shell, false);
  });
}
