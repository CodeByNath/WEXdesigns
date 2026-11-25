/**
 * Change history for the Editor's field layout (Width, Position, Alignment, Row). Each change is one
 * step; the Editor footer reads the step count (steps = edited, none = untouched) and goes back one
 * step at a time. The state lives in closed data attributes and the field order, so a step is a
 * snapshot of those: no inline CSS, nothing is persisted.
 */
export const ADMIN_FIELD_HISTORY_EVENT = 'wex:admin-field-history';

const ATTRIBUTES = ['data-field-width', 'data-field-position', 'data-field-alignment', 'data-field-row', 'data-field-row-reverse'];
/** A missing attribute means the default, so selecting a field (which writes defaults) is not a change. */
const DEFAULTS = ['default', 'stretch', 'left', null, null];

/** @typedef {{ field: Element, values: Array<string | null> }[]} Snapshot */
/** @type {WeakMap<Element, { steps: Snapshot[], group: unknown }>} */
const histories = new WeakMap();

/** @param {Element} editor */
function historyOf(editor) {
  let history = histories.get(editor);
  if (!history) {
    history = { steps: [], group: null };
    histories.set(editor, history);
  }
  return history;
}

/** @param {Element} editor @returns {Snapshot} */
function snapshot(editor) {
  return [...editor.querySelectorAll(':scope > .wex-admin-outlined-field')].map((field) => ({ field, values: ATTRIBUTES.map((name) => field.getAttribute(name)) }));
}

/** @param {Snapshot} a @param {Snapshot} b */
function same(a, b) {
  const normal = (/** @type {Snapshot} */ shot) => shot.map(({ values }) => values.map((value, index) => value ?? DEFAULTS[index]));
  return a.length === b.length && a.every(({ field }, index) => field === b[index]?.field) && JSON.stringify(normal(a)) === JSON.stringify(normal(b));
}

/** @param {Element} editor @param {boolean} restored */
function notify(editor, restored) {
  editor.dispatchEvent(new CustomEvent(ADMIN_FIELD_HISTORY_EVENT, { bubbles: true, detail: { steps: historyOf(editor).steps.length, restored } }));
}

/** @param {Element} editor @param {Snapshot} shot */
function restore(editor, shot) {
  const anchor = shot.at(-1)?.field.nextSibling ?? null;
  for (const { field, values } of shot) {
    editor.insertBefore(field, anchor);
    ATTRIBUTES.forEach((name, index) => {
      const value = values[index];
      if (value === null || value === undefined) field.removeAttribute(name);
      else field.setAttribute(name, value);
    });
  }
}

/**
 * Runs one change and records it as a step when it altered the layout. Consecutive changes that pass
 * the same `group` (a slider drag or typing in one field's Width) are one step, until `endChangeGroup`.
 * @param {Element | null} editor @param {() => void} change @param {unknown} [group]
 */
export function trackFieldChange(editor, change, group = null) {
  if (!editor) { change(); return; }
  const history = historyOf(editor);
  const before = snapshot(editor);
  change();
  if (same(before, snapshot(editor))) return;
  if (group === null || group !== history.group) history.steps.push(before);
  history.group = group;
  notify(editor, false);
}

/** Ends the current change group, so the next change is a new step. @param {Element | null} editor */
export function endChangeGroup(editor) {
  if (editor) historyOf(editor).group = null;
}

/** Goes back one step; returns false when there is none. @param {Element} editor */
export function undoFieldChange(editor) {
  const history = historyOf(editor);
  const previous = history.steps.pop();
  history.group = null;
  if (!previous) return false;
  restore(editor, previous);
  notify(editor, true);
  return true;
}

/** Goes back to the starting layout (Discard). @param {Element} editor */
export function undoAllFieldChanges(editor) {
  const history = historyOf(editor);
  const first = history.steps[0];
  history.steps = [];
  history.group = null;
  if (first) restore(editor, first);
  notify(editor, true);
}

/** @param {Element} editor */
export function fieldChangeCount(editor) {
  return historyOf(editor).steps.length;
}
