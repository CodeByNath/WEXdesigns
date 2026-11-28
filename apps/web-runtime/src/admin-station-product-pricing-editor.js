import { createOutlinedField } from './admin-station-outlined-field.js';
import { createFieldRepeater, fieldRepeaterValues, setFieldRepeaterValues } from './admin-station-field-repeater.js';
import { createCurrencyField, currencyFieldValue, setCurrencyFieldValue } from './admin-station-currency-field.js';
import { setAdminDrawerActionState } from './admin-station-drawer-footer.js';
import { keepFieldStatus, syncContentFieldStatus } from './admin-station-field-status.js';
import { formConfigurationAdapterFor, restoreFormConfiguration } from './admin-station-form-configuration.js';
import { productEditorsState, registerProductEditor } from './admin-station-product-editors.js';
import { productPricingFixture } from './admin-station-product-pricing.js';
import { productSummaryFixture } from './admin-station-product-summary.js';

/**
 * The Pricing editor (Owner-directed, 27 November 2026), the same as Overview: one field per Pricing value,
 * in the main content shell, shown only in the editor view of the Pricing section.
 * Currency (editor and form only, not in presentation) comes first. Labels never carry values (Owner rule):
 * the currency symbol is written only in presentation, before each price. Advertised price and Featured are single fields; the Price list is a repeater of
 * Price, Label and Note; Badges is a text repeater. Required: Currency, Advertised price, each Price and Label,
 * each Badge. Values are preview content: Save only emits its event (no value persistence).
 * @param {HTMLElement} shell
 * @param {import('./admin-station-product-pricing.js').ProductPricing} [pricing]
 * @param {string} [scopeId]
 */
export function createProductPricingEditor(shell, pricing = productPricingFixture, scopeId = productSummaryFixture.id) {
  const document = shell.ownerDocument;
  const section = document.createElement('section');
  section.className = 'wex-admin-product-editor';
  section.dataset.adminProductEditor = 'pricing';
  section.setAttribute('aria-label', 'Pricing editor');
  section.dataset.formId = 'pricing';
  section.dataset.formScope = scopeId;
  const featured = pricing.badges.filter((badge) => badge.featured).map((badge) => badge.value).join('\n');
  section.append(
    createCurrencyField(document, { name: 'currency', label: 'Currency', value: pricing.currency }),
    createOutlinedField(document, { name: 'advertised-price', label: 'Advertised price', value: pricing.priceFrom, required: true }),
    createFieldRepeater(document, {
      name: 'price-list',
      label: 'Price list',
      itemLabel: 'price',
      parts: [{ key: 'price', label: 'Price', required: true }, { key: 'label', label: 'Label', required: true }, { key: 'note', label: 'Note' }],
      values: pricing.prices.map((row) => ({ price: row.price, label: row.type === 'Other' && row.customLabel !== '' ? row.customLabel : row.type, note: row.note })),
    }),
    createFieldRepeater(document, {
      name: 'badges',
      label: 'Badges',
      itemLabel: 'badge',
      parts: [{ key: 'text', label: 'Badge', required: true }],
      values: pricing.badges.map((badge) => ({ text: badge.value })),
    }),
    createOutlinedField(document, { name: 'featured', label: 'Featured', value: featured }),
  );
  /* Currency and Advertised price share the first row (Owner-directed), the existing Row share (50% / 50%). */
  section.querySelector(':scope > [data-field-name="currency"]')?.setAttribute('data-field-row', 'first');
  section.querySelector(':scope > [data-field-name="advertised-price"]')?.setAttribute('data-field-row', 'second');
  let initial = pricingEditorValues(section);
  registerProductEditor(section, {
    state: (editor) => pricingEditorState(editor, initial),
    discard: (editor) => discardPricingEditor(editor, initial),
    /* Publish: the published values become the starting values (Discard then returns to them). */
    publish: (editor) => {
      initial = pricingEditorValues(editor);
      for (const input of editor.querySelectorAll('textarea')) input.defaultValue = input.value;
    },
  });
  keepFieldStatus(section, scopeId);
  void restoreFormConfiguration(section, formConfigurationAdapterFor(shell));
  const sync = () => {
    syncContentFieldStatus(section);
    for (const input of section.querySelectorAll('textarea')) input.setAttribute('aria-invalid', String(input.required && input.value.trim() === ''));
    setAdminDrawerActionState(shell, productEditorsState(shell));
  };
  section.addEventListener('input', sync);
  return section;
}

/** @param {Element} editor */
function pricingEditorValues(editor) {
  const field = (/** @type {string} */ name) => editor.querySelector(`:scope > [data-field-name="${name}"]`);
  const currency = field('currency');
  const priceList = field('price-list');
  const badges = field('badges');
  return {
    currency: currency ? currencyFieldValue(currency) : null,
    advertisedPrice: field('advertised-price')?.querySelector('textarea')?.value ?? '',
    priceList: priceList ? fieldRepeaterValues(priceList) : [],
    badges: badges ? fieldRepeaterValues(badges) : [],
    featured: field('featured')?.querySelector('textarea')?.value ?? '',
  };
}

/** Edited once any value differs from the start; publishable once every required value is filled.
 * @param {HTMLElement} editor @param {ReturnType<typeof pricingEditorValues>} initial */
export function pricingEditorState(editor, initial) {
  const current = pricingEditorValues(editor);
  const currency = current.currency;
  return {
    dirty: JSON.stringify(current) !== JSON.stringify(initial),
    publishable: !!currency && currency.value.trim() !== '' && [...editor.querySelectorAll('textarea')].every((input) => !input.required || input.value.trim() !== ''),
  };
}

/** Discard: every value returns to the start, repeater items included. @param {HTMLElement} editor @param {ReturnType<typeof pricingEditorValues>} initial */
function discardPricingEditor(editor, initial) {
  const field = (/** @type {string} */ name) => editor.querySelector(`:scope > [data-field-name="${name}"]`);
  const currency = field('currency');
  if (currency && initial.currency) setCurrencyFieldValue(currency, initial.currency);
  const priceList = field('price-list');
  if (priceList) setFieldRepeaterValues(priceList, initial.priceList);
  const badges = field('badges');
  if (badges) setFieldRepeaterValues(badges, initial.badges);
  for (const input of [field('advertised-price'), field('featured')].map((box) => box?.querySelector('textarea'))) {
    if (input) input.value = input.defaultValue;
  }
  /* Only the value boxes re-measure; the custom Currency text is redrawn by its own field. */
  for (const input of editor.querySelectorAll('.wex-admin-outlined-field__control > textarea')) input.dispatchEvent(new Event('input', { bubbles: true }));
  editor.dispatchEvent(new Event('input', { bubbles: true }));
}
