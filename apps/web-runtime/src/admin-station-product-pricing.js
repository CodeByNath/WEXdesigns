import { createProductSectionHead } from './admin-station-product-sections.js';
import { chips, labelledRows, node } from './admin-station-product-summary.js';

/** @typedef {{ type: string, customLabel: string, price: string, note: string }} PriceRow */
/** @typedef {{ priceFrom: string, prices: ReadonlyArray<PriceRow>, badges: ReadonlyArray<{ value: string, featured: boolean }> }} ProductPricing */

/* Preview values copied from the Owner's reference (Tour Product Editor, Pricing): Price (From), the Price list rows (Type, Price, Note; a custom label only when Type is Other) and the Badges / Chips with their Featured flag. */
/** @type {ProductPricing} */
const productPricingFixture = Object.freeze({
  priceFrom: 'A$259',
  prices: Object.freeze([
    { type: 'Adult', customLabel: '', price: 'A$259', note: '' },
    { type: 'Child', customLabel: '', price: 'A$207', note: '2-16' },
    { type: 'Concession / Senior', customLabel: '', price: 'A$246', note: '' },
    { type: 'Infant', customLabel: '', price: 'A$129', note: 'must be pre-booked' },
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
    fare.append(node(document, 'span', 'wex-type-navigation-small-semibold', row.price), kind);
    fares.append(fare);
  });

  section.append(
    createProductSectionHead(document, 'pricing'),
    labelledRows(document, [
      ['Advertised price', node(document, 'span', 'wex-type-navigation-small-semibold', pricing.priceFrom)],
      ['Price list', fares],
      ['Badges', chips(document, pricing.badges.map((badge) => badge.value))],
      ...(featured.length > 0 ? [/** @type {readonly [string, Node]} */ (['Featured', chips(document, featured)])] : []),
    ]),
  );
  return section;
}
