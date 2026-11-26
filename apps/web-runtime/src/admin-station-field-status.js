import { ADMIN_FIELD_HISTORY_EVENT, trackFieldChange } from './admin-station-field-history.js';

/** The fields switched off, per service. The form is shared and never changes; kept in memory only. */
/** @type {Map<string, Set<string>>} */
const offByService = new Map();

/** @param {Element} field */
const fieldName = (field) => field.querySelector('textarea')?.getAttribute('name') ?? '';

/**
 * Gives a newly built form its own service's off fields, then keeps them up to date: a press, a step back
 * and Discard all report through the change history. Another service on the same form keeps every field.
 * @param {Element} editor @param {string} serviceId
 */
export function keepFieldStatus(editor, serviceId) {
  const fields = () => [...editor.querySelectorAll(':scope > .wex-admin-outlined-field')];
  const off = offByService.get(serviceId);
  for (const field of fields()) {
    if (off?.has(fieldName(field))) field.setAttribute('data-field-status', 'off');
  }
  editor.addEventListener(ADMIN_FIELD_HISTORY_EVENT, () => {
    offByService.set(serviceId, new Set(fields().filter((field) => field.getAttribute('data-field-status') === 'off').map(fieldName)));
  });
}

/**
 * The selected field's On / Off switch, in the WEX Tab Navigation Editor mode: one small pill with a round
 * knob and the state word inside it. On (the default): the blue accent, the word at the start and the knob at
 * the end. Off: grey, the knob at the start and the word at the end. The state is a closed data attribute on
 * the field (missing means on) and each press is one history step. Off hides the field from this service's form and
 * disables its Editor. Preview only: nothing is persisted.
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
