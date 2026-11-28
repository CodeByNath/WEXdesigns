import { createOutlinedField } from './admin-station-outlined-field.js';
import { createSystemIcon } from './admin-station-system-icons.js';

/**
 * Repeater field: one field (`data-field-name`) holding a list of items, each item a group of outlined fields
 * (Price list: Price, Label and Note; Badges: one text field). The box and its label pill are the outlined
 * field's; an item ends with a Remove button and the list ends with an Add button (existing Action Button Icon
 * Only Small, system x and plus icons). Add, Remove and typing are content changes (input events), never
 * Form configuration changes. Built only from existing tokens; not a registered Global Component.
 * @typedef {{ key: string, label: string, required?: boolean }} RepeaterPart
 * @typedef {Record<string, string>} RepeaterValue
 * @typedef {{ name: string, label: string, itemLabel: string, parts: RepeaterPart[], values: RepeaterValue[] }} RepeaterOptions
 */

/** @type {WeakMap<Element, { options: RepeaterOptions, build: (values: RepeaterValue[]) => void }>} */
const repeaters = new WeakMap();
let sequence = 0;

/** @param {Document} document @param {RepeaterOptions} options */
export function createFieldRepeater(document, options) {
  const box = document.createElement('div');
  box.className = 'wex-admin-field-repeater';
  box.dataset.fieldName = options.name;
  box.dataset.fieldLabel = options.label;
  box.setAttribute('role', 'group');
  const label = document.createElement('span');
  label.className = 'wex-admin-outlined-field__label wex-type-body-small-regular';
  label.textContent = options.label;
  label.id = `wex-admin-field-${options.name}-label`;
  box.setAttribute('aria-labelledby', label.id);
  const items = document.createElement('div');
  items.className = 'wex-admin-field-repeater__items';
  const add = iconButton(document, 'plus', `Add ${options.itemLabel}`);
  add.dataset.repeaterAdd = '';
  add.addEventListener('click', () => {
    const item = createItem(document, options, Object.fromEntries(options.parts.map((part) => [part.key, ''])));
    items.append(item);
    item.querySelector('textarea')?.focus();
    box.dispatchEvent(new Event('input', { bubbles: true }));
  });
  /** @param {RepeaterValue[]} values */
  const build = (values) => items.replaceChildren(...values.map((value) => createItem(document, options, value)));
  build(options.values);
  repeaters.set(box, { options, build });
  box.append(label, items, add);
  return box;
}

/** @param {Document} document @param {RepeaterOptions} options @param {RepeaterValue} value */
function createItem(document, options, value) {
  const id = ++sequence;
  const item = document.createElement('div');
  item.className = 'wex-admin-field-repeater__item';
  item.dataset.repeaterParts = String(options.parts.length);
  for (const part of options.parts) {
    const field = createOutlinedField(document, { name: `${options.name}-${id}-${part.key}`, label: part.label, value: value[part.key] ?? '', required: part.required === true });
    field.dataset.repeaterPart = part.key;
    item.append(field);
  }
  const remove = iconButton(document, 'x', `Remove ${options.itemLabel}`);
  remove.addEventListener('click', () => {
    const box = item.closest('.wex-admin-field-repeater');
    item.remove();
    box?.dispatchEvent(new Event('input', { bubbles: true }));
  });
  item.append(remove);
  return item;
}

/** @param {Document} document @param {import('./admin-station-system-icons.js').SystemIconName} icon @param {string} label */
function iconButton(document, icon, label) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'wex-button wex-button--small wex-button--neutral wex-action-button-icon-only--small wex-admin-field-repeater__action';
  button.setAttribute('aria-label', label);
  button.title = label;
  button.append(createSystemIcon(document, icon));
  return button;
}

/** The repeater's current values, item by item. @param {Element} box @returns {RepeaterValue[]} */
export function fieldRepeaterValues(box) {
  return [...box.querySelectorAll('.wex-admin-field-repeater__item')].map((item) => Object.fromEntries(
    [...item.querySelectorAll('[data-repeater-part]')].map((field) => [field.getAttribute('data-repeater-part') ?? '', field.querySelector('textarea')?.value ?? '']),
  ));
}

/** Rebuilds the items from values (Discard). @param {Element} box @param {RepeaterValue[]} values */
export function setFieldRepeaterValues(box, values) {
  repeaters.get(box)?.build(values);
}
