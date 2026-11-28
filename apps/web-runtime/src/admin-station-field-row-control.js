import { createSystemIcon } from './admin-station-system-icons.js';
import { trackFieldChange } from './admin-station-field-history.js';
/** @typedef {import('./admin-station-field-rows.js').RowItem} RowItem */
import { canMoveField, moveField, needsShareChoice, rowsOf, setRowReverse } from './admin-station-field-rows.js';

const FIELD = ':scope > [data-field-name]';

/** Reads the form's fields and their row state from closed data attributes. @param {Element} editor @returns {RowItem[]} */
function readItems(editor) {
  return [...editor.querySelectorAll(FIELD)].map((id) => {
    const role = id.getAttribute('data-field-row');
    return { id, role: role === 'first' || role === 'second' ? role : 'own', reverse: id.hasAttribute('data-field-row-reverse') };
  });
}

/**
 * Writes the new order and row state back as data attributes (the stylesheet draws them; no inline CSS).
 * A field that joins or leaves a row gets Width Default, so a shared row is a clean 50% and 50%.
 * @param {Element} editor @param {RowItem[]} items @param {(field: Element) => void} resetWidth
 */
function writeItems(editor, items, resetWidth) {
  const before = new Map(readItems(editor).map((item) => [item.id, item.role]));
  const fields = items.map((item) => /** @type {Element} */ (item.id));
  const anchor = fields.at(-1)?.nextSibling ?? null;
  for (const field of fields) editor.insertBefore(field, anchor);
  for (const item of items) {
    const field = /** @type {Element} */ (item.id);
    if (item.role === 'own') field.removeAttribute('data-field-row');
    else field.setAttribute('data-field-row', item.role);
    field.toggleAttribute('data-field-row-reverse', item.reverse && item.role !== 'own');
    if (before.get(item.id) !== item.role) resetWidth(field);
  }
}

/**
 * The Row property: Up and Down move the selected field between rows, Reverse flips the two fields of a
 * shared row. Same controller as Position and Alignment (the Tab Navigation Toggle in its small
 * horizontal mode). Moving past a lone neighbour asks Share row or Swap position in the existing Small
 * Dropdown Menu surface; sharing gives each field 50% of the row.
 * @param {Document} document @param {Element} selected @param {(field: Element) => void} resetWidth @param {(focus: string) => void} rebuild
 */
export function createRowControl(document, selected, resetWidth, rebuild) {
  const editor = selected.parentElement;
  const root = document.createElement('div');
  root.className = 'wex-admin-field-layout__row-control';
  const controls = document.createElement('div');
  controls.className = 'wex-admin-editor-control';
  controls.setAttribute('role', 'group');
  controls.setAttribute('aria-label', 'Row');
  root.append(controls);
  if (!editor) return root;
  const items = readItems(editor);
  const shared = rowsOf(items).some((row) => row.length === 2 && row.some((item) => item.id === selected));

  /** @param {string} name @param {string} label @param {import('./admin-station-system-icons.js').SystemIconName} icon */
  const button = (name, label, icon) => {
    const control = document.createElement('button');
    control.type = 'button';
    control.className = 'wex-admin-editor-control__item wex-admin-editor-control__item--icon';
    control.dataset.fieldRowControl = name;
    control.setAttribute('aria-label', `Row: ${label}`);
    control.title = `Row: ${label}`;
    control.append(createSystemIcon(document, icon));
    controls.append(control);
    return control;
  };
  const apply = (/** @type {RowItem[] | null} */ next, /** @type {string} */ focus) => {
    if (!next) return;
    trackFieldChange(editor, () => writeItems(editor, next, resetWidth));
    rebuild(focus);
  };

  /** @type {AbortController | undefined} */
  let dismissal;
  const menu = document.createElement('div');
  menu.className = 'wex-dropdown-menu--small wex-admin-field-layout__row-options';
  menu.setAttribute('role', 'group');
  menu.setAttribute('aria-label', 'Share row?');
  menu.hidden = true;
  const close = () => {
    menu.hidden = true;
    dismissal?.abort();
  };
  /** @param {HTMLElement} origin @param {'up' | 'down'} direction */
  const ask = (origin, direction) => {
    menu.replaceChildren();
    for (const [choice, label] of /** @type {const} */ ([['share', 'Share row'], ['swap', 'Swap position']])) {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'wex-dropdown-menu__item--small';
      item.textContent = label;
      item.addEventListener('click', () => { close(); apply(moveField(items, selected, direction, choice), direction); });
      menu.append(item);
    }
    menu.hidden = false;
    menu.querySelector('button')?.focus();
    dismissal = new AbortController();
    const outside = (/** @type {Event} */ event) => { if (!(event.target instanceof Node) || !root.contains(event.target)) close(); };
    document.addEventListener('click', outside, { signal: dismissal.signal });
    document.addEventListener('focusin', outside, { signal: dismissal.signal });
    menu.onkeydown = (event) => { if (event.key === 'Escape') { event.preventDefault(); close(); origin.focus(); } };
  };

  for (const direction of /** @type {const} */ (['up', 'down'])) {
    const label = direction === 'up' ? 'Up' : 'Down';
    const control = button(direction, label, direction === 'up' ? 'row-up' : 'row-down');
    control.disabled = !canMoveField(items, selected, direction);
    control.addEventListener('click', () => {
      if (!menu.hidden) close();
      if (needsShareChoice(items, selected, direction)) ask(control, direction);
      else apply(moveField(items, selected, direction), direction);
    });
  }
  const reverse = button('reverse', 'Reverse', 'row-reverse');
  reverse.disabled = !shared;
  reverse.setAttribute('aria-pressed', String(shared && selected.hasAttribute('data-field-row-reverse')));
  reverse.addEventListener('click', () => apply(setRowReverse(items, selected, reverse.getAttribute('aria-pressed') !== 'true'), 'reverse'));
  root.append(menu);
  return root;
}
