import { createSystemIcon } from './admin-station-system-icons.js';

export const ADMIN_DRAWER_SAVE_EVENT = 'wex:admin-drawer-save';
export const ADMIN_DRAWER_DISCARD_EVENT = 'wex:admin-drawer-discard';
export const ADMIN_DRAWER_PUBLISH_EVENT = 'wex:admin-drawer-publish';

/** @typedef {{ dirty: boolean, publishable: boolean }} DrawerActionState */

/** The requester supplies availability; the footer never infers domain readiness.
 * @param {DrawerActionState} state */
export function drawerActionChoices({ dirty, publishable }) {
  return [
    ...(publishable ? [{ action: 'publish', label: 'Publish', disabled: false }] : []),
    { action: 'save', label: 'Save', disabled: !dirty },
    { action: 'discard', label: 'Discard', disabled: !dirty },
  ];
}

/** @param {HTMLElement} shell */
function footerParts(shell) {
  const drawer = shell.querySelector('[data-admin-drawer-shell]');
  const root = drawer?.querySelector('[data-admin-drawer-action-menu]');
  const toggle = root?.querySelector('[data-admin-drawer-action-toggle]');
  const label = toggle?.querySelector('[data-admin-drawer-action-label]');
  const menu = root?.querySelector('[data-admin-drawer-action-choices]');
  return drawer instanceof HTMLElement && root instanceof HTMLElement
    && toggle instanceof HTMLButtonElement && label instanceof HTMLElement && menu instanceof HTMLElement
    ? { drawer, root, toggle, label, menu } : null;
}

/** Closes transient menu state, including when the Drawer is reopened.
 * @param {HTMLElement} shell */
export function closeAdminDrawerActionMenu(shell) {
  const parts = footerParts(shell);
  if (!parts) return;
  parts.menu.hidden = true;
  parts.toggle.setAttribute('aria-expanded', 'false');
}

/** Availability is presentation input only; successful actions are reported by
 * the requester, never assumed when a command is emitted.
 * @param {HTMLElement} shell @param {DrawerActionState} state */
export function setAdminDrawerActionState(shell, state) {
  const parts = footerParts(shell);
  if (!parts) return;
  parts.drawer.toggleAttribute('data-admin-drawer-dirty', state.dirty);
  parts.drawer.toggleAttribute('data-admin-drawer-publishable', state.publishable);
  const choices = drawerActionChoices(state);
  parts.label.textContent = choices[0]?.label ?? 'Save';
  parts.toggle.disabled = choices.every(({ disabled }) => disabled);
  for (const action of ['publish', 'save', 'discard']) {
    const button = parts.menu.querySelector(`[data-admin-drawer-${action}]`);
    if (!(button instanceof HTMLButtonElement)) continue;
    const choice = choices.find((choice) => choice.action === action);
    button.hidden = !choice;
    button.disabled = choice?.disabled ?? true;
  }
  closeAdminDrawerActionMenu(shell);
}

/** Backwards-compatible dirty-state input; publish readiness stays independent.
 * @param {HTMLElement} shell @param {boolean} dirty */
export function setAdminDrawerDirty(shell, dirty) {
  const parts = footerParts(shell);
  if (!parts) return;
  setAdminDrawerActionState(shell, {
    dirty, publishable: parts.drawer.hasAttribute('data-admin-drawer-publishable'),
  });
}

/** @param {HTMLElement} shell */
export function mountAdminDrawerFooter(shell) {
  const parts = footerParts(shell);
  if (!parts) return;
  for (const [attribute, icon] of /** @type {const} */ ([
    ['previous', 'chevron-left'], ['next', 'chevron-right'],
  ])) {
    shell.querySelector(`[data-admin-drawer-${attribute}]`)?.append(createSystemIcon(shell.ownerDocument, icon));
  }
  parts.toggle.append(createSystemIcon(shell.ownerDocument, 'chevron-down'));
  setAdminDrawerActionState(shell, { dirty: false, publishable: false });
  const enabledItems = () => Array.from(parts.menu.querySelectorAll('button'))
    .filter((button) => !button.hidden && !button.disabled);
  /** @param {boolean} [last] */
  const open = (last = false) => {
    if (parts.toggle.disabled) return;
    parts.menu.hidden = false;
    parts.toggle.setAttribute('aria-expanded', 'true');
    const items = enabledItems();
    (last ? items.at(-1) : items[0])?.focus();
  };
  parts.toggle.addEventListener('click', () => {
    if (parts.menu.hidden) open();
    else closeAdminDrawerActionMenu(shell);
  });
  parts.toggle.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    open(event.key === 'ArrowUp');
  });
  parts.root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeAdminDrawerActionMenu(shell);
      parts.toggle.focus();
    } else if (event.key === 'Tab') {
      closeAdminDrawerActionMenu(shell);
      parts.toggle.focus();
    } else if (!parts.menu.hidden && ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      const items = enabledItems();
      const index = items.findIndex((item) => item === shell.ownerDocument.activeElement);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1
        : (index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
      items[next]?.focus();
    }
  });
  /** @type {Array<[string, string]>} */
  const commands = [
    ['save', ADMIN_DRAWER_SAVE_EVENT], ['discard', ADMIN_DRAWER_DISCARD_EVENT],
    ['publish', ADMIN_DRAWER_PUBLISH_EVENT],
  ];
  for (const [action, name] of commands) {
    const button = parts.menu.querySelector(`[data-admin-drawer-${action}]`);
    if (!(button instanceof HTMLButtonElement)) continue;
    button.addEventListener('click', () => {
      if (button.disabled || button.hidden) return;
      closeAdminDrawerActionMenu(shell);
      parts.toggle.focus();
      shell.dispatchEvent(new CustomEvent(name));
    });
  }
  shell.ownerDocument.addEventListener('click', (event) => {
    if (event.target instanceof Node && parts.root.contains(event.target)) return;
    closeAdminDrawerActionMenu(shell);
  });
  parts.root.addEventListener('focusout', (event) => {
    if (event.relatedTarget instanceof Node && parts.root.contains(event.relatedTarget)) return;
    closeAdminDrawerActionMenu(shell);
  });
}
