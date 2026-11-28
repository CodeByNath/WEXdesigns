import { createProductSectionHead } from './admin-station-product-sections.js';
import { chips, labelledRows, node, productSummaryFixture } from './admin-station-product-summary.js';
import { formatPrice } from './admin-station-currency-field.js';
import { syncPresentationFieldStatus } from './admin-station-field-status.js';

/** @typedef {{ type: string, customLabel: string, price: string, note: string }} PriceRow */
/** @typedef {{ currency: import('./admin-station-currency-field.js').Currency, priceFrom: string, prices: ReadonlyArray<PriceRow>, badges: ReadonlyArray<{ value: string, featured: boolean }> }} ProductPricing */

/* Preview values copied from the Owner's reference (Tour Product Editor, Pricing): Price (From), the Price list rows (Type, Price, Note; a custom label only when Type is Other) and the Badges / Chips with their Featured flag.
 * Prices are amounts; the one Currency (AUD, shown as A$) is written before each price in presentation. */
/** @type {ProductPricing} */
export const productPricingFixture = Object.freeze({
  currency: Object.freeze({ mode: /** @type {const} */ ('list'), value: 'AUD' }),
  priceFrom: '259',
  prices: Object.freeze([
    { type: 'Adult', customLabel: '', price: '259', note: '' },
    { type: 'Child', customLabel: '', price: '207', note: '2-16' },
    { type: 'Concession / Senior', customLabel: '', price: '246', note: '' },
    { type: 'Infant', customLabel: '', price: '129', note: 'must be pre-booked' },
  ]),
  badges: Object.freeze([
    { value: 'Free cancellation', featured: false },
    { value: 'Duration 11 hours 50 minutes', featured: false },
    { value: 'Expert local guide with live commentary', featured: false },
    { value: 'Pickup included', featured: false },
    { value: 'Small group experience', featured: false },
    { value: 'Instant confirmation', featured: false },
    { value: 'Coastline to rainforest', featured: true },
  ]),
});

/**
 * The Pricing section of the product, shown as labels and values (never inputs): Advertised price (the reference's Price (From)), the Price list as one
 * row whose value lines up each fare (price, then type with its note), then the Badges and the Featured badges as chips.
 * @param {HTMLElement} shell
 * @param {ProductPricing} [pricing]
 * @returns {HTMLElement}
 */
export function createProductPricing(shell, pricing = productPricingFixture) {
  const document = shell.ownerDocument;
  const section = node(document, 'section', 'wex-admin-product-pricing');
  section.setAttribute('aria-label', 'Product pricing');
  const featured = pricing.badges.filter((badge) => badge.featured).map((badge) => badge.value);

  /** The Price list is one value of its row: each fare is its price in bold at the start, then its type (the custom label when Other) with the note in small text beside it, or right below it when the line has no room. */
  const fares = node(document, 'ul', 'wex-admin-product-pricing__fares');
  pricing.prices.forEach((row) => {
    const fare = node(document, 'li', 'wex-admin-product-pricing__fare');
    const kind = node(document, 'span', 'wex-admin-product-pricing__kind');
    kind.append(node(document, 'span', 'wex-type-body-small-regular', row.type === 'Other' && row.customLabel !== '' ? row.customLabel : row.type));
    if (row.note !== '') kind.append(node(document, 'small', 'wex-admin-product-pricing__note wex-type-body-small-light', '(' + row.note + ')'));
    fare.append(node(document, 'span', 'wex-type-navigation-small-semibold', formatPrice(pricing.currency, row.price)), kind);
    fares.append(fare);
  });

  const rows = labelledRows(document, [
      ['Advertised price', node(document, 'span', 'wex-type-navigation-small-semibold', formatPrice(pricing.currency, pricing.priceFrom))],
      ['Price list', fares],
      ['Badges', chips(document, pricing.badges.map((badge) => badge.value))],
      ...(featured.length > 0 ? [/** @type {readonly [string, Node]} */ (['Featured', chips(document, featured)])] : []),
  ]);
  /* Each row is its Pricing editor field, so an Off field reads "(inactive)" here (Currency has no row). */
  const fieldNames = new Map([['Advertised price', 'advertised-price'], ['Price list', 'price-list'], ['Badges', 'badges'], ['Featured', 'featured']]);
  for (const row of rows.children) {
    const name = fieldNames.get(row.querySelector('dt')?.textContent ?? '');
    if (name) row.setAttribute('data-presentation-field', name);
  }
  section.append(createProductSectionHead(document, 'pricing'), rows);
  syncPresentationFieldStatus(section, productSummaryFixture.id);
  return section;
}
