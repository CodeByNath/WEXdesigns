import { createSystemIcon } from './admin-station-system-icons.js';
import { createRowControl } from './admin-station-field-row-control.js';
import { endChangeGroup, trackFieldChange } from './admin-station-field-history.js';

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
  const widthRow = row(document, 'Width', createWidthProgress(document, layout, apply, editor, selected));
  widthRow.classList.add('wex-admin-field-option--progress');
  group.append(widthRow);

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

/**
 * Width as a progress bar in the Editor mode: the grey Editor track, the selected-look fill growing with the
 * value and a value popover that travels along the end of the fill. A visually hidden range input on the track
 * takes the drag and the keys (arrows, Home, End), so it stays native and accessible. The popover is a text
 * field holding the whole percentage, so a value can be typed. Default shows the full bar (100%, no separate
 * Default label); Delete or Backspace on the bar goes back to it. The fill and popover position are
 * drawn from `data-width-progress` by fixed rules (no inline styles). A drag is one history step per field.
 * @param {Document} document @param {FieldLayout} layout @param {() => void} apply @param {Element | null} editor @param {Element} selected
 */
function createWidthProgress(document, layout, apply, editor, selected) {
  const root = document.createElement('div');
  root.className = 'wex-admin-field-layout__width-control';
  const rail = document.createElement('div');
  rail.className = 'wex-admin-editor-progress__rail';
  const bubble = document.createElement('div');
  bubble.className = 'wex-admin-editor-progress__bubble';
  const value = document.createElement('input');
  value.type = 'text';
  value.inputMode = 'numeric';
  value.size = 3;
  value.maxLength = 3;
  value.pattern = '[0-9]{1,3}';
  value.className = 'wex-admin-editor-progress__value';
  value.setAttribute('aria-label', 'Width percentage');
  const unit = document.createElement('span');
  unit.textContent = '%';
  unit.setAttribute('aria-hidden', 'true');
  const edit = document.createElement('span');
  edit.className = 'wex-admin-editor-progress__edit';
  edit.append(value, unit);
  bubble.append(edit);
  rail.append(bubble);
  const track = document.createElement('div');
  track.className = 'wex-admin-editor-control wex-admin-editor-progress';
  const fill = document.createElement('span');
  fill.className = 'wex-admin-editor-progress__fill';
  const range = document.createElement('input');
  range.type = 'range';
  range.className = 'wex-admin-editor-progress__input';
  range.min = '0';
  range.max = '100';
  range.step = '1';
  track.append(fill, range);
  root.append(rail, track);
  const refresh = () => {
    const isDefault = layout.width === 'default';
    const percent = isDefault ? 100 : Number(layout.width);
    const text = `${percent}%`;
    root.setAttribute('data-width-progress', String(percent));
    if (document.activeElement !== value) value.value = String(percent);
    value.size = Math.max(1, value.value.length);
    value.setAttribute('aria-invalid', 'false');
    range.value = String(percent);
    range.setAttribute('aria-label', `Width: ${text}`);
    range.setAttribute('aria-valuetext', isDefault ? `${text}, default` : text);
  };
  range.addEventListener('input', () => {
    trackFieldChange(editor, () => { layout.width = range.value; apply(); }, selected);
    refresh();
  });
  range.addEventListener('change', () => endChangeGroup(editor));
  range.addEventListener('blur', () => endChangeGroup(editor));
  /* The popover is a field: type a whole percentage from 0 to 100; anything else is ignored and restored on leaving it. */
  value.addEventListener('input', () => {
    const typed = /^\d{1,3}$/.test(value.value) ? Number(value.value) : null;
    value.size = Math.max(1, value.value.length);
    value.setAttribute('aria-invalid', String(typed === null || typed > 100));
    if (typed === null || typed > 100) return;
    trackFieldChange(editor, () => { layout.width = String(typed); apply(); }, selected);
    refresh();
  });
  /* Editing starts with the text cursor at the end of the number (before the %), wherever the popover is clicked. */
  const caretToEnd = () => value.setSelectionRange(value.value.length, value.value.length);
  value.addEventListener('focus', caretToEnd);
  bubble.addEventListener('mousedown', (event) => {
    if (document.activeElement === value && event.target === value) return;
    event.preventDefault();
    value.focus();
    caretToEnd();
  });
  value.addEventListener('blur', () => { endChangeGroup(editor); refresh(); });
  value.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === 'Escape') { event.preventDefault(); value.blur(); } });
  range.addEventListener('keydown', (event) => {
    if (event.key !== 'Delete' && event.key !== 'Backspace') return;
    event.preventDefault();
    trackFieldChange(editor, () => { layout.width = 'default'; apply(); });
    refresh();
  });
  refresh();
  return root;
}
