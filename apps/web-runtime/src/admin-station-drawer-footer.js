import { createSystemIcon } from './admin-station-system-icons.js';

export const ADMIN_DRAWER_SAVE_EVENT = 'wex:admin-drawer-save';
export const ADMIN_DRAWER_DISCARD_EVENT = 'wex:admin-drawer-discard';
export const ADMIN_DRAWER_PUBLISH_EVENT = 'wex:admin-drawer-publish';
export const ADMIN_DRAWER_EDIT_EVENT = 'wex:admin-drawer-edit';

/** @typedef {{ dirty: boolean, publishable: boolean }} DrawerActionState */
/** @typedef {DrawerActionState & { viewEdit: boolean, editing: boolean, stretch: boolean }} DrawerFooterState */
/** @typedef {'view' | 'edit' | 'publish' | 'save' | 'discard'} DrawerAction */

/** @type {Record<DrawerAction, string>} */
const ACTION_LABELS = { view: 'View', edit: 'Edit', publish: 'Publish', save: 'Save', discard: 'Discard' };
/** @type {ReadonlyArray<[DrawerAction, string]>} */
const COMMAND_EVENTS = [
  ['edit', ADMIN_DRAWER_EDIT_EVENT], ['publish', ADMIN_DRAWER_PUBLISH_EVENT],
  ['save', ADMIN_DRAWER_SAVE_EVENT], ['discard', ADMIN_DRAWER_DISCARD_EVENT],
];

/**
 * The one footer action button offers only what applies. A presentation (view/edit)
 * footer offers View (only when the Drawer can still stretch to Full) and Edit until
 * editing starts; otherwise Publish while the requester says it is ready, and Save and
 * Discard only while there is something to save. The requester supplies availability;
 * the footer never infers domain readiness.
 * @param {DrawerActionState & Partial<DrawerFooterState>} state
 * @returns {Array<{ action: DrawerAction, label: string }>}
 */
export function drawerActionChoices({ dirty, publishable, viewEdit = false, editing = false, stretch = false }) {
  /** @type {DrawerAction[]} */
  const actions = viewEdit && !editing
    ? [...(stretch ? /** @type {const} */ (['view']) : []), 'edit']
    : [...(publishable ? /** @type {const} */ (['publish']) : []), ...(dirty ? /** @type {const} */ (['save', 'discard']) : [])];
  return actions.map((action) => ({ action, label: ACTION_LABELS[action] }));
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

/** @param {HTMLElement} shell @param {NonNullable<ReturnType<typeof footerParts>>} parts @returns {DrawerFooterState} */
function footerState(shell, { drawer }) {
  return {
    dirty: drawer.hasAttribute('data-admin-drawer-dirty'),
    publishable: drawer.hasAttribute('data-admin-drawer-publishable'),
    viewEdit: drawer.hasAttribute('data-admin-drawer-view-edit'),
    editing: drawer.hasAttribute('data-admin-drawer-editing'),
    // Full is the only further stretch; it exists only for a two-column request.
    stretch: drawer.dataset?.adminDrawerColumns === '2' && shell.dataset?.adminDrawerMode !== 'full',
  };
}

/** Shows only the applicable actions in the one label + chevron button; its menu lists them.
 * @param {HTMLElement} shell */
export function refreshAdminDrawerFooter(shell) {
  const parts = footerParts(shell);
  if (!parts) return;
  const choices = drawerActionChoices(footerState(shell, parts));
  for (const action of /** @type {DrawerAction[]} */ (Object.keys(ACTION_LABELS))) {
    const item = parts.menu.querySelector(`[data-admin-drawer-${action}]`);
    if (item instanceof HTMLButtonElement) item.hidden = !choices.some((choice) => choice.action === action);
  }
  parts.label.textContent = choices[0]?.label ?? '';
  parts.root.hidden = choices.length === 0;
  closeAdminDrawerActionMenu(shell);
}

/** Availability is presentation input only; successful actions are reported by
 * the requester, never assumed when a command is emitted.
 * @param {HTMLElement} shell @param {DrawerActionState} state */
export function setAdminDrawerActionState(shell, state) {
  const parts = footerParts(shell);
  if (!parts) return;
  parts.drawer.toggleAttribute('data-admin-drawer-dirty', state.dirty);
  parts.drawer.toggleAttribute('data-admin-drawer-publishable', state.publishable);
  refreshAdminDrawerFooter(shell);
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

/** A requester that presents a product starts in view (View and Edit); Edit then
 * brings Publish, Save and Discard as they apply. Reopening always starts in view.
 * @param {HTMLElement} shell @param {boolean} enabled */
export function setAdminDrawerViewEdit(shell, enabled) {
  const parts = footerParts(shell);
  if (!parts) return;
  parts.drawer.toggleAttribute('data-admin-drawer-view-edit', enabled);
  parts.drawer.toggleAttribute('data-admin-drawer-editing', false);
  refreshAdminDrawerFooter(shell);
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
  // The Drawer changes mode in several places; View is offered only until Full.
  if (typeof MutationObserver === 'function' && shell instanceof Node) {
    new MutationObserver(() => refreshAdminDrawerFooter(shell))
      .observe(shell, { attributes: true, attributeFilter: ['data-admin-drawer-mode'] });
  }
  const enabledItems = () => Array.from(parts.menu.querySelectorAll('button'))
    .filter((button) => !button.hidden && !button.disabled);
  /** @param {DrawerAction} action */
  const run = (action) => {
    closeAdminDrawerActionMenu(shell);
    if (action === 'edit') parts.drawer.toggleAttribute('data-admin-drawer-editing', true);
    refreshAdminDrawerFooter(shell);
    const event = COMMAND_EVENTS.find(([name]) => name === action);
    // View is handled by the Drawer (it opens Full); the footer emits no command for it.
    if (event) shell.dispatchEvent(new CustomEvent(event[1]));
  };
  /** @param {boolean} [last] */
  const open = (last = false) => {
    if (parts.root.hidden) return;
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
  for (const action of /** @type {DrawerAction[]} */ (Object.keys(ACTION_LABELS))) {
    const button = parts.menu.querySelector(`[data-admin-drawer-${action}]`);
    if (!(button instanceof HTMLButtonElement)) continue;
    button.addEventListener('click', () => {
      if (button.disabled || button.hidden) return;
      run(action);
      parts.toggle.focus();
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
