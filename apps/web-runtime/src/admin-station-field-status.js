import { ADMIN_FIELD_HISTORY_EVENT, trackFieldChange } from './admin-station-field-history.js';

/** The fields switched off, per service and per form (Overview, Pricing, ...). Kept in memory only; the Form
 * configuration restores them through the host adapter. */
/** @type {Map<string, Map<string, Set<string>>>} */
const offByService = new Map();

/** @param {Element} field */
const fieldName = (field) => field.getAttribute('data-field-name') ?? field.querySelector('textarea')?.getAttribute('name') ?? '';

/** @param {string} serviceId @param {string} name */
const isOff = (serviceId, name) => [...(offByService.get(serviceId)?.values() ?? [])].some((off) => off.has(name));

/**
 * Gives a newly built form its own service's off fields, then keeps them up to date: a press, a step back
 * and Discard all report through the change history. Another service on the same form keeps every field.
 * @param {Element} editor @param {string} serviceId
 */
export function keepFieldStatus(editor, serviceId) {
  const formId = editor.getAttribute?.('data-form-id') ?? '';
  const fields = () => [...editor.querySelectorAll(':scope > [data-field-name]')];
  const off = offByService.get(serviceId)?.get(formId);
  for (const field of fields()) {
    if (off?.has(fieldName(field))) field.setAttribute('data-field-status', 'off');
  }
  syncContentFieldStatus(editor);
  editor.addEventListener(ADMIN_FIELD_HISTORY_EVENT, () => {
    const forms = offByService.get(serviceId) ?? new Map();
    forms.set(formId, new Set(fields().filter((field) => field.getAttribute('data-field-status') === 'off').map(fieldName)));
    offByService.set(serviceId, forms);
    syncContentFieldStatus(editor);
    const main = editor.closest?.('.wex-admin-drawer-main');
    if (main) syncPresentationFieldStatus(main, serviceId);
  });
}

/**
 * The selected field's On / Off switch, in the WEX Tab Navigation Editor mode: one small pill with a round
 * knob and the state word inside it. On (the default): the blue accent, the word at the start and the knob at
 * the end. Off: grey, the knob at the start and the word at the end. The state is a closed data attribute on
 * the field (missing means on) and each press is one history step. Off keeps the field visible but
 * disabled in this service's content editor, muted in presentation, and disables its Editor. Preview only: nothing is persisted.
 * @param {Document} document @param {Element} selected
 */
export function createFieldStatus(document, selected) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'wex-admin-field-status';
  button.setAttribute('role', 'switch');
  button.setAttribute('aria-label', 'Field status');
  const word = document.createElement('span');
  word.className = 'wex-admin-field-status__word';
  word.setAttribute('aria-hidden', 'true');
  const knob = document.createElement('span');
  knob.className = 'wex-admin-field-status__knob';
  knob.setAttribute('aria-hidden', 'true');
  button.append(word, knob);
  const draw = () => {
    const on = selected.getAttribute('data-field-status') !== 'off';
    button.setAttribute('aria-checked', String(on));
    word.textContent = on ? 'On' : 'Off';
  };
  button.addEventListener('click', () => {
    trackFieldChange(selected.parentElement, () => {
      selected.setAttribute('data-field-status', button.getAttribute('aria-checked') === 'true' ? 'off' : 'on');
    });
    draw();
  });
  draw();
  return button;
}

/** Keeps content values (and a field's own controls, such as a repeater's Add and Remove) locked while Form
 * Editor is active or the field's status is Off. @param {Element} editor */
export function syncContentFieldStatus(editor) {
  const active = !!editor.closest?.('[data-admin-drawer-shell]')?.querySelector('.wex-admin-form-builder[aria-pressed="true"]');
  for (const field of editor.querySelectorAll(':scope > [data-field-name]')) {
    for (const control of field.querySelectorAll('textarea, button')) {
      if ('disabled' in control) control.disabled = active || field.getAttribute('data-field-status') === 'off';
    }
  }
}

/** Original presentation values are retained so On and history restore the presentation exactly. */
/** @type {WeakMap<Element, Node[]>} */
const presentationValues = new WeakMap();

/**
 * Applies the same service-local status to the corresponding presentation values (Overview summary, Pricing,
 * ...): an off value is replaced with "(inactive)"; On restores the original value nodes.
 * @param {Element} root @param {string} serviceId
 */
export function syncPresentationFieldStatus(root, serviceId) {
  for (const field of root.querySelectorAll('[data-presentation-field]')) {
    const off = isOff(serviceId, field.getAttribute('data-presentation-field') ?? '');
    field.setAttribute('data-field-status', off ? 'off' : 'on');
    field.setAttribute('aria-disabled', String(off));
    const value = field.querySelector('dd > span') ?? field.querySelector('dd') ?? field;
    if (!presentationValues.has(value)) presentationValues.set(value, [...value.childNodes]);
    if (off) value.replaceChildren('(inactive)');
    else value.replaceChildren(...(presentationValues.get(value) ?? []));
    field.querySelector('dd')?.setAttribute('title', value.textContent ?? '');
  }
}
