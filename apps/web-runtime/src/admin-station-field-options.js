import { createSystemIcon } from './admin-station-system-icons.js';
import { createRowControl } from './admin-station-field-row-control.js';
import { endChangeGroup, trackFieldChange } from './admin-station-field-history.js';

/** Whole percentage values are applied through fixed CSS rules, never inline styles.
 * @param {string} value */
export function parseFieldWidth(value) {
  if (!/^\d{1,3}$/.test(value)) return null;
  const number = Number(value);
  return number >= 0 && number <= 100 ? number : null;
}
/** @typedef {{ width: string, position: string, alignment: string }} FieldLayout */
/** Layout controls apply only closed, Owner-approved attribute values; no inline styles or host writes.
 * @param {Document} document @param {Element} selected */
export function createFieldOptions(document, selected) {
  /* The data attributes are the one source of truth (so going back a step needs no second copy). */
  const layout = {
    width: selected.getAttribute('data-field-width') ?? 'default',
    position: selected.getAttribute('data-field-position') ?? 'stretch',
    alignment: selected.getAttribute('data-field-alignment') ?? 'left',
  };
  const editor = selected.parentElement;
  const apply = () => {
    selected.setAttribute('data-field-width', layout.width);
    selected.setAttribute('data-field-position', layout.position);
    selected.setAttribute('data-field-alignment', layout.alignment);
  };
  apply();
  const group = document.createElement('div');
  group.className = 'wex-admin-field-options';
  group.append(row(document, 'Width', createWidthDropdown(document, layout, apply, editor, selected)));

  /** @param {'position' | 'alignment'} key @param {string} title @param {string[]} values */
  const choices = (key, title, values) => {
    const controls = document.createElement('div');
    controls.className = 'wex-admin-editor-control';
    controls.setAttribute('role', 'group');
    controls.setAttribute('aria-label', title);
    for (const value of values) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'wex-admin-editor-control__item wex-admin-editor-control__item--icon';
      const label = `${title}: ${value.charAt(0).toUpperCase()}${value.slice(1)}`;
      button.setAttribute('aria-label', label);
      button.title = label;
      button.setAttribute('aria-pressed', String(layout[key] === value));
      button.append(createSystemIcon(document, /** @type {import('./admin-station-system-icons.js').SystemIconName} */ (`${key}-${value}`)));
      button.addEventListener('click', () => {
        trackFieldChange(editor, () => {
          layout[key] = value;
          apply();
        });
        for (const other of controls.querySelectorAll('button')) other.setAttribute('aria-pressed', String(other === button));
      });
      controls.append(button);
    }
    return row(document, title, controls);
  };
  group.append(choices('position', 'Position', ['start', 'center', 'end', 'stretch']), choices('alignment', 'Alignment', ['left', 'center', 'right', 'justify']));
  /** Moving a field rebuilds the controls (their enabled state follows the new rows) and keeps focus on the pressed one. @param {string} focus */
  const rebuild = (focus) => {
    const next = createFieldOptions(document, selected);
    group.replaceWith(next);
    /** @type {HTMLElement | null} */
    const target = next.querySelector(`[data-field-row-control="${focus}"]:not(:disabled)`) ?? next.querySelector('[data-field-row-control]:not(:disabled)');
    target?.focus();
  };
  group.append(row(document, 'Row', createRowControl(document, selected, resetFieldWidth, rebuild)));
  return group;
}

/** Joining or leaving a row sets the field's Width back to Default. @param {Element} field */
function resetFieldWidth(field) {
  field.setAttribute('data-field-width', 'default');
}

/** @param {Document} document @param {string} title @param {HTMLElement} control */
function row(document, title, control) {
  const row = document.createElement('div');
  row.className = 'wex-admin-field-option';
  const label = document.createElement('span');
  label.className = 'wex-type-body-small-regular';
  label.textContent = title;
  row.append(label, control);
  return row;
}

/** Compact width slider and editable percentage, using the existing Small dropdown surface.
 * Changes while the popup is open (a slider drag, typing) are one history step per field.
 * @param {Document} document @param {FieldLayout} layout @param {() => void} apply @param {Element | null} editor @param {Element} selected */
function createWidthDropdown(document, layout, apply, editor, selected) {
  const root = document.createElement('div');
  root.className = 'wex-admin-field-layout__width-control';
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'wex-admin-editor-control__item wex-admin-editor-control__item--value';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'wex-field-layout-width-options');
  const text = document.createElement('span');
  const menu = document.createElement('div');
  menu.id = 'wex-field-layout-width-options';
  menu.className = 'wex-dropdown-menu--small wex-admin-field-layout__width-options';
  menu.setAttribute('role', 'group');
  menu.setAttribute('aria-label', 'Width controls');
  menu.hidden = true;
  const controls = document.createElement('div');
  controls.className = 'wex-admin-field-layout__width-inputs';
  const rangeGroup = document.createElement('div');
  rangeGroup.className = 'wex-admin-field-layout__range-group';
  const range = document.createElement('input');
  range.type = 'range';
  range.min = '0';
  range.max = '100';
  range.step = '1';
  range.setAttribute('aria-label', 'Width percentage slider');
  const endpoints = document.createElement('div');
  endpoints.className = 'wex-admin-field-layout__range-labels wex-type-body-small-regular';
  for (const value of ['0%', '100%']) {
    const label = document.createElement('span');
    label.textContent = value;
    endpoints.append(label);
  }
  rangeGroup.append(range, endpoints);
  const valueFrame = document.createElement('div');
  valueFrame.className = 'wex-search-input wex-search-input--small';
  const input = document.createElement('input');
  input.type = 'text';
  input.inputMode = 'numeric';
  input.size = 3;
  input.pattern = '[0-9]{1,3}';
  input.setAttribute('aria-label', 'Width percentage');
  const percent = document.createElement('span');
  percent.textContent = '%';
  percent.setAttribute('aria-hidden', 'true');
  valueFrame.append(input, percent);
  controls.append(rangeGroup, valueFrame);
  const reset = document.createElement('button');
  reset.type = 'button';
  reset.className = 'wex-dropdown-menu__item--small';
  reset.textContent = 'Default';
  const refresh = () => {
    text.textContent = layout.width === 'default' ? 'Default' : `${layout.width}%`;
    toggle.setAttribute('aria-label', `Width: ${text.textContent}`);
    input.value = range.value = layout.width === 'default' ? '100' : layout.width;
    range.setAttribute('aria-valuetext', `${range.value}%`);
    input.setAttribute('aria-invalid', 'false');
    reset.setAttribute('aria-pressed', String(layout.width === 'default'));
  };
  const update = (/** @type {string} */ value) => {
    const parsed = parseFieldWidth(value);
    input.setAttribute('aria-invalid', String(parsed === null));
    if (parsed === null) return;
    trackFieldChange(editor, () => { layout.width = String(parsed); apply(); }, selected);
    refresh();
  };
  range.addEventListener('input', () => update(range.value));
  input.addEventListener('input', () => update(input.value));
  input.addEventListener('blur', refresh);
  reset.addEventListener('click', () => { trackFieldChange(editor, () => { layout.width = 'default'; apply(); }); refresh(); });
  menu.append(controls, reset);
  /** @type {AbortController | undefined} */
  let dismissal;
  const close = () => {
    endChangeGroup(editor);
    refresh();
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    dismissal?.abort();
  };
  const open = () => {
    refresh();
    menu.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    range.focus();
    dismissal = new AbortController();
    const outside = (/** @type {Event} */ event) => { if (!(event.target instanceof Node) || !root.contains(event.target)) close(); };
    document.addEventListener('click', outside, { signal: dismissal.signal });
    document.addEventListener('focusin', outside, { signal: dismissal.signal });
  };
  toggle.append(text, createSystemIcon(document, 'chevron-down'));
  toggle.addEventListener('click', () => { if (menu.hidden) open(); else close(); });
  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' || event.key === 'Enter' && event.target === input) {
      event.preventDefault(); close(); toggle.focus(); return;
    }
    if (event.target === toggle && ['ArrowDown', 'ArrowUp'].includes(event.key)) {
      event.preventDefault(); if (menu.hidden) open();
    }
  });
  const track = document.createElement('div');
  track.className = 'wex-admin-editor-control';
  track.append(toggle);
  root.append(track, menu);
  refresh();
  return root;
}
