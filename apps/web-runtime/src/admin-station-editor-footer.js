import { createSystemIcon } from './admin-station-system-icons.js';
import { drawerActionChoices } from './admin-station-drawer-footer.js';
import { resetFormBuilder } from './admin-station-form-builder.js';

export const ADMIN_EDITOR_SAVE_EVENT = 'wex:admin-editor-save';
export const ADMIN_EDITOR_DISCARD_EVENT = 'wex:admin-editor-discard';
export const ADMIN_EDITOR_PUBLISH_EVENT = 'wex:admin-editor-publish';

/** @typedef {'publish' | 'save' | 'discard'} EditorAction */
/** @type {ReadonlyArray<readonly [EditorAction, string, string]>} */
const EDITOR_ACTIONS = [
  ['publish', 'Publish', ADMIN_EDITOR_PUBLISH_EVENT],
  ['save', 'Save', ADMIN_EDITOR_SAVE_EVENT],
  ['discard', 'Discard', ADMIN_EDITOR_DISCARD_EVENT],
];

/**
 * The Editor footer (connections shell, shown while the Editor is open): Cancel at the start and one
 * split button at the end, a label plus chevron whose menu lists Publish, Save and Discard. It follows
 * the Drawer footer's editor action logic (`drawerActionChoices`, editing): untouched, only a disabled
 * Publish is offered, so the button starts disabled; once edited, Publish leads when publishable,
 * otherwise Save leads and Publish stays listed, disabled. Cancel leaves the builder. The Editor
 * supplies availability with `setEditorFooterState`; the footer never infers readiness.
 * Built from the existing Button, Action Button Label Only Small Menu and Dropdown Menu classes.
 * @param {Document} document
 */
export function createEditorFooter(document) {
  const footer = document.createElement('div');
  footer.className = 'wex-admin-editor-footer';
  footer.dataset.adminEditorFooter = '';
  const cancel = document.createElement('button');
  cancel.type = 'button';
  cancel.className = 'wex-button wex-button--small wex-button--neutral';
  cancel.textContent = 'Cancel';
  cancel.addEventListener('click', () => {
    const drawer = footer.closest('[data-admin-drawer-shell]');
    if (drawer instanceof HTMLElement) resetFormBuilder(drawer);
  });
  const root = document.createElement('div');
  root.className = 'wex-admin-shell__drawer-action-menu';
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'wex-button wex-button--small wex-button--primary wex-action-button-label-only--small-menu';
  toggle.setAttribute('aria-haspopup', 'menu');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'admin-editor-action-choices');
  const label = document.createElement('span');
  label.dataset.adminEditorActionLabel = '';
  toggle.append(label, createSystemIcon(document, 'chevron-down'));
  const menu = document.createElement('div');
  menu.id = 'admin-editor-action-choices';
  menu.className = 'wex-dropdown-menu--default wex-admin-shell__drawer-action-choices';
  menu.setAttribute('role', 'menu');
  menu.setAttribute('aria-label', 'Editor actions');
  menu.hidden = true;
  for (const [action, text] of EDITOR_ACTIONS) {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'wex-dropdown-menu__item--default';
    item.setAttribute('role', 'menuitem');
    item.dataset.adminEditorAction = action;
    item.textContent = text;
    item.hidden = true;
    menu.append(item);
  }
  root.append(toggle, menu);
  footer.append(cancel, root);
  refreshEditorFooter(footer);

  const close = () => { menu.hidden = true; toggle.setAttribute('aria-expanded', 'false'); };
  toggle.addEventListener('click', () => {
    if (toggle.disabled) return;
    if (menu.hidden) { menu.hidden = false; toggle.setAttribute('aria-expanded', 'true'); } else close();
  });
  root.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    close();
    toggle.focus();
  });
  for (const item of menu.querySelectorAll('button')) {
    item.addEventListener('click', () => {
      if (item.disabled || item.hidden) return;
      close();
      const found = EDITOR_ACTIONS.find(([action]) => action === item.dataset.adminEditorAction);
      if (found) footer.dispatchEvent(new CustomEvent(found[2], { bubbles: true }));
      toggle.focus();
    });
  }
  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Node) || !root.contains(event.target)) close();
  });
  return footer;
}

/**
 * Shows only the applicable actions in the one button; its menu lists them. The main action is the
 * first enabled one; with nothing enabled the button shows the disabled Publish.
 * @param {HTMLElement} footer
 */
function refreshEditorFooter(footer) {
  const toggle = footer.querySelector('[aria-haspopup="menu"]');
  const label = footer.querySelector('[data-admin-editor-action-label]');
  if (!(toggle instanceof HTMLButtonElement) || !(label instanceof HTMLElement)) return;
  const choices = drawerActionChoices({
    dirty: footer.hasAttribute('data-dirty'), publishable: footer.hasAttribute('data-publishable'), viewEdit: true, editing: true,
  });
  const enabled = choices.filter((choice) => !choice.disabled);
  const main = enabled[0] ?? choices[0];
  for (const item of footer.querySelectorAll('[data-admin-editor-action]')) {
    if (!(item instanceof HTMLButtonElement)) continue;
    const choice = choices.find((candidate) => candidate.action === item.dataset.adminEditorAction);
    item.hidden = !choice;
    item.disabled = choice?.disabled === true;
    item.toggleAttribute('data-admin-drawer-action-main', main?.action === item.dataset.adminEditorAction);
  }
  label.textContent = main?.label ?? '';
  toggle.disabled = enabled.length === 0;
}

/**
 * Availability is presentation input only; the Editor reports it, the footer never assumes it.
 * @param {HTMLElement} footer @param {{ dirty: boolean, publishable: boolean }} state
 */
export function setEditorFooterState(footer, state) {
  footer.toggleAttribute('data-dirty', state.dirty);
  footer.toggleAttribute('data-publishable', state.publishable);
  refreshEditorFooter(footer);
}
