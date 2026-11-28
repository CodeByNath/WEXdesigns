import { createSystemIcon } from './admin-station-system-icons.js';

/** Owner-approved currencies (27 November 2026): code and the symbol written before a price. AUD is the default. */
export const CURRENCIES = /** @type {const} */ ([['AUD', 'A$'], ['NZD', 'NZ$'], ['USD', 'US$'], ['EUR', '€'], ['GBP', '£']]);

/** @typedef {{ mode: 'list' | 'custom', value: string }} Currency */

/** The text written before a price: the listed currency's symbol, or the custom text as typed. @param {Currency} currency */
export function currencySymbol(currency) {
  if (currency.mode === 'custom') return currency.value;
  return CURRENCIES.find(([code]) => code === currency.value)?.[1] ?? currency.value;
}

/** A price as presented: the currency symbol, then the amount. @param {Currency} currency @param {string} amount */
export function formatPrice(currency, amount) {
  return `${currencySymbol(currency)}${amount}`;
}

/**
 * The Currency field (editor and form only, never presentation): an outlined field whose value is chosen in
 * the existing Dropdown Menu Default (the listed currencies, then Custom). Custom shows a text value to type
 * the currency manually. The choice is a content value (an input event), not Form configuration.
 * @param {Document} document @param {{ name: string, label: string, value: Currency }} options
 */
export function createCurrencyField(document, { name, label, value }) {
  const box = document.createElement('div');
  box.className = 'wex-admin-outlined-field wex-admin-currency-field';
  box.dataset.fieldName = name;
  const text = document.createElement('label');
  text.className = 'wex-admin-outlined-field__label wex-type-body-small-regular';
  text.htmlFor = `wex-admin-field-${name}`;
  text.textContent = label;
  const control = document.createElement('div');
  control.className = 'wex-admin-currency-field__control wex-type-navigation-small-semibold';
  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.id = `wex-admin-field-${name}`;
  trigger.className = 'wex-admin-currency-field__trigger';
  trigger.setAttribute('aria-haspopup', 'menu');
  trigger.setAttribute('aria-expanded', 'false');
  const chosen = document.createElement('span');
  trigger.append(chosen, createSystemIcon(document, 'chevron-down'));
  const custom = document.createElement('textarea');
  custom.className = 'wex-admin-outlined-field__input';
  custom.name = `${name}-custom`;
  custom.rows = 1;
  custom.setAttribute('aria-label', `${label} (custom)`);
  const menu = document.createElement('div');
  menu.className = 'wex-dropdown-menu--default wex-admin-currency-field__menu';
  menu.setAttribute('role', 'menu');
  menu.setAttribute('aria-label', label);
  menu.hidden = true;
  /** @type {Currency} */
  let current = { ...value };
  const draw = () => {
    const listed = current.mode === 'list' ? CURRENCIES.find(([code]) => code === current.value) : undefined;
    chosen.textContent = listed ? `${listed[0]} (${listed[1]})` : 'Custom';
    custom.hidden = current.mode !== 'custom';
    if (document.activeElement !== custom) custom.value = current.mode === 'custom' ? current.value : '';
    custom.required = current.mode === 'custom';
    custom.setAttribute('aria-invalid', String(current.mode === 'custom' && current.value.trim() === ''));
    for (const item of menu.querySelectorAll('button')) item.setAttribute('aria-pressed', String(item.dataset.currency === (current.mode === 'custom' ? 'custom' : current.value)));
  };
  const close = () => { menu.hidden = true; trigger.setAttribute('aria-expanded', 'false'); };
  for (const [code, symbol] of [...CURRENCIES, ['custom', '']]) {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'wex-dropdown-menu__item--default';
    item.setAttribute('role', 'menuitemradio');
    item.dataset.currency = code;
    item.textContent = code === 'custom' ? 'Custom' : `${code} (${symbol})`;
    item.addEventListener('click', () => {
      current = code === 'custom' ? { mode: 'custom', value: current.mode === 'custom' ? current.value : '' } : { mode: 'list', value: code };
      close();
      draw();
      if (code === 'custom') custom.focus(); else trigger.focus();
      box.dispatchEvent(new Event('input', { bubbles: true }));
    });
    menu.append(item);
  }
  trigger.addEventListener('click', () => {
    if (menu.hidden) { menu.hidden = false; trigger.setAttribute('aria-expanded', 'true'); /** @type {HTMLElement | null} */ (menu.querySelector('[aria-pressed="true"]'))?.focus(); } else close();
  });
  box.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !menu.hidden) { event.preventDefault(); close(); trigger.focus(); } });
  box.addEventListener('focusout', (event) => { if (!(event.relatedTarget instanceof Node) || !box.contains(event.relatedTarget)) close(); });
  custom.addEventListener('input', () => { current = { mode: 'custom', value: custom.value }; draw(); });
  currencies.set(box, { get: () => current, set: (next) => { current = { ...next }; draw(); } });
  draw();
  control.append(trigger, custom, menu);
  box.append(text, control);
  return box;
}

/** @type {WeakMap<Element, { get: () => Currency, set: (next: Currency) => void }>} */
const currencies = new WeakMap();

/** @param {Element} box @returns {Currency | null} */
export function currencyFieldValue(box) {
  return currencies.get(box)?.get() ?? null;
}

/** @param {Element} box @param {Currency} value */
export function setCurrencyFieldValue(box, value) {
  currencies.get(box)?.set(value);
}
