import { createSystemIcon } from './admin-station-system-icons.js';
import { drawerActionChoices } from './admin-station-drawer-footer.js';
import { resetFormBuilder } from './admin-station-form-builder.js';
import { ADMIN_FIELD_HISTORY_EVENT, commitFieldChanges, undoAllFieldChanges, undoFieldChange } from './admin-station-field-history.js';
import { formConfigurationAdapterFor, persistFormConfiguration, readFormConfiguration } from './admin-station-form-configuration.js';

export const ADMIN_EDITOR_SAVE_EVENT = 'wex:admin-editor-save';
export const ADMIN_EDITOR_DISCARD_EVENT = 'wex:admin-editor-discard';
export const ADMIN_EDITOR_PUBLISH_EVENT = 'wex:admin-editor-publish';
/** Save or Publish could not be confirmed by the host adapter; `detail` = { action, error }. */
export const ADMIN_EDITOR_PERSIST_FAILED_EVENT = 'wex:admin-editor-persist-failed';

/** @typedef {'publish' | 'save' | 'discard'} EditorAction */
/** @type {ReadonlyArray<readonly [EditorAction, string, string]>} */
const EDITOR_ACTIONS = [
  ['publish', 'Publish', ADMIN_EDITOR_PUBLISH_EVENT],
  ['save', 'Save', ADMIN_EDITOR_SAVE_EVENT],
  ['discard', 'Discard', ADMIN_EDITOR_DISCARD_EVENT],
];

/** The Editor of the Drawer this footer belongs to. @param {HTMLElement} footer */
function editorOf(footer) {
  return footer.closest('[data-admin-drawer-shell]')?.querySelector('[data-admin-product-editor]') ?? null;
}

/**
 * The Editor footer (connections shell, shown while the Editor is open): Cancel at the start and, at
 * the end, a single left chevron that goes back one change at a time and one split button, a label plus chevron whose menu lists Publish, Save and Discard. It follows
 * the Drawer footer's editor action logic (`drawerActionChoices`, editing): untouched, only a disabled
 * Publish is offered, so the button starts disabled; once edited, Publish leads when publishable,
 * otherwise Save leads and Publish stays listed, disabled. Cancel leaves the builder. The Editor
 * supplies availability with `setEditorFooterState`; the footer never infers readiness. Field layout
 * changes are reported by the change history (`admin-station-field-history.js`): each change is a step,
 * the chevron undoes one step, Discard undoes them all, and with no steps left the button is disabled.
 * Save and Publish persist the Form configuration through the host adapter (`persist`); Publish keeps the
 * layout as the new starting point only once the adapter confirms it.
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
  const undo = document.createElement('button');
  undo.type = 'button';
  undo.className = 'wex-button wex-button--small wex-button--neutral wex-action-button-icon-only--small';
  undo.dataset.adminEditorUndo = '';
  undo.setAttribute('aria-label', 'Undo last change');
  undo.title = 'Undo last change';
  undo.disabled = true;
  undo.append(createSystemIcon(document, 'chevron-left'));
  const actions = document.createElement('div');
  actions.className = 'wex-admin-editor-footer__actions';
  actions.append(undo, root);
  footer.append(cancel, actions);
  refreshEditorFooter(footer);
  undo.addEventListener('click', () => {
    const editor = editorOf(footer);
    if (editor) undoFieldChange(editor);
  });
  document.addEventListener(ADMIN_FIELD_HISTORY_EVENT, (event) => {
    const editor = editorOf(footer);
    if (!editor || !(event.target instanceof Node) || !editor.contains(event.target) && event.target !== editor) return;
    const steps = event instanceof CustomEvent ? Number(event.detail?.steps ?? 0) : 0;
    setEditorFooterState(footer, { dirty: steps > 0, publishable: steps > 0 });
    undo.disabled = steps === 0;
    if (steps === 0) close();
  });

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
      const editor = editorOf(footer);
      if (!found || !editor) return;
      if (found[0] === 'discard') {
        footer.dispatchEvent(new CustomEvent(found[2], { bubbles: true }));
        undoAllFieldChanges(editor);
        toggle.focus();
        return;
      }
      void persist(footer, editor, found[0], found[2]);
    });
  }
  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Node) || !root.contains(event.target)) close();
  });
  return footer;
}

/**
 * Save and Publish go through the host's Form configuration adapter. While the request runs the action button is
 * disabled (its existing disabled state). Only a confirmed receipt reports success: the event carries the
 * configuration and receipt, and Publish then makes the layout the new starting point. A failure keeps every
 * change and step, re-enables the button and emits `ADMIN_EDITOR_PERSIST_FAILED_EVENT`.
 * @param {HTMLElement} footer @param {Element} editor @param {'publish' | 'save'} action @param {string} eventName
 */
async function persist(footer, editor, action, eventName) {
  if (footer.hasAttribute('aria-busy')) return;
  const toggle = footer.querySelector('[aria-haspopup="menu"]');
  footer.setAttribute('aria-busy', 'true');
  if (toggle instanceof HTMLButtonElement) toggle.disabled = true;
  const result = await persistFormConfiguration(editor, action, formConfigurationAdapterFor(editor));
  footer.removeAttribute('aria-busy');
  /* Changes made while the request ran were not published, so they stay as steps. */
  if (result.ok && action === 'publish' && sameConfiguration(editor, result.configuration)) commitFieldChanges(editor);
  refreshEditorFooter(footer);
  if (result.ok) footer.dispatchEvent(new CustomEvent(eventName, { bubbles: true, detail: { configuration: result.configuration, receipt: result.receipt } }));
  else footer.dispatchEvent(new CustomEvent(ADMIN_EDITOR_PERSIST_FAILED_EVENT, { bubbles: true, detail: { action, error: result.error } }));
  if (toggle instanceof HTMLButtonElement && !toggle.disabled) toggle.focus();
}

/** @param {Element} editor @param {import('@weerax/schemas').WexFormConfiguration} configuration */
function sameConfiguration(editor, configuration) {
  try { return JSON.stringify(readFormConfiguration(editor)) === JSON.stringify(configuration); } catch { return false; }
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
  toggle.disabled = enabled.length === 0 || footer.hasAttribute('aria-busy');
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
