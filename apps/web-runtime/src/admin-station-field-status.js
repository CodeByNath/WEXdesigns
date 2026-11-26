import { trackFieldChange } from './admin-station-field-history.js';

/**
 * The selected field's On / Off switch, in the WEX Tab Navigation Editor mode: one small pill with a round
 * knob and the state word inside it. On (the default): the blue accent, the word at the start and the knob at
 * the end. Off: grey, the knob at the start and the word at the end. The state is a closed data attribute on
 * the field (missing means on) and each press is one history step. Preview only: nothing is persisted and
 * the field itself does not change.
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
