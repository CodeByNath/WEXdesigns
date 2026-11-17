import { createProductSectionHead } from './admin-station-product-sections.js';
import { allServicesPreviewSnapshot } from './admin-station-services.js';

/** @typedef {{ id: string, productCode: string, name: string, imageUrl: string, category: string, labels: ReadonlyArray<string>, ratings: string, reviews: number, price: string, duration: string, language: string }} ProductSummary */

const previewService = allServicesPreviewSnapshot.services[0];

/* The first PADI course listed at qldscubadive.com.au/padi-courses-gold-coast; product code (the Rezdy product code), labels, ratings, review count and language are preview values. */
/** @type {ProductSummary} */
const productSummaryFixture = Object.freeze({
  id: previewService?.id ?? '',
  productCode: 'PFT4KA',
  name: previewService?.name ?? '',
  imageUrl: previewService?.imageUrl ?? '',
  category: previewService?.category ?? '',
  labels: Object.freeze(['Top rated', 'Best seller']),
  ratings: '4.8',
  reviews: 1280,
  price: '$' + (previewService?.value ?? 0).toFixed(2),
  duration: 'Approx. 3 days (approx. 6-hrs per day)',
  language: 'English',
});

/** @param {Document} document @param {keyof HTMLElementTagNameMap} tag @param {string} className @param {string} [text] */
export function node(document, tag, className, text) {
  const element = document.createElement(tag);
  element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

/**
 * The chips list carries `data-wrapped` while its chips run onto a second row,
 * so the label beside it moves from centred on the first chip to the top.
 * @param {Document} document @param {ReadonlyArray<string>} items
 */
export function chips(document, items) {
  const list = node(document, 'ul', 'wex-admin-product-summary__chips');
  items.forEach((item) => list.append(node(document, 'li', 'wex-admin-product-summary__chip', item)));
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(() => {
      const first = /** @type {HTMLElement | null} */ (list.firstElementChild);
      const last = /** @type {HTMLElement | null} */ (list.lastElementChild);
      list.toggleAttribute('data-wrapped', first !== null && last !== null && first.offsetTop !== last.offsetTop);
    }).observe(list);
  }
  return list;
}

/**
 * Label and value rows: one label column as wide as the longest label.
 * @param {Document} document @param {ReadonlyArray<readonly [string, Node]>} entries
 */
export function labelledRows(document, entries) {
  const list = node(document, 'dl', 'wex-admin-product-summary__rows');
  entries.forEach(([label, value]) => {
    const row = node(document, 'div', 'wex-admin-product-summary__row');
    const term = node(document, 'dt', 'wex-admin-product-summary__label wex-type-body-small-regular', label);
    const definition = node(document, 'dd', 'wex-admin-product-summary__value');
    definition.append(value);
    if (value instanceof HTMLElement && value.tagName === 'SPAN') definition.setAttribute('title', value.textContent ?? '');
    row.append(term, definition);
    list.append(row);
  });
  return list;
}

/**
 * Two columns: the title and the label and value rows at the start, and the
 * framed product image at the end. The rows are Platform ID (regular weight),
 * Booking ID (the Rezdy product code, bold), no pills, then Rating, Price, Duration, Language, Category (bold
 * text, no pill) and Labels (chips).
 * @param {HTMLElement} shell
 * @param {ProductSummary} [product]
 * @returns {HTMLElement}
 */
export function createProductSummary(shell, product = productSummaryFixture) {
  const document = shell.ownerDocument;
  const section = node(document, 'section', 'wex-admin-product-summary');
  section.setAttribute('aria-label', 'Product summary');
  const picture = node(document, 'div', 'wex-admin-product-summary__image');
  const image = document.createElement('img');
  image.src = product.imageUrl;
  image.alt = '';
  picture.append(image);

  const details = node(document, 'div', 'wex-admin-product-summary__details');
  const identity = node(document, 'div', 'wex-admin-product-summary__identity');
  identity.append(
    node(document, 'h3', 'wex-admin-product-summary__name wex-type-title-small-semibold', product.name),
  );
  const facts = labelledRows(document, [
    ['Platform ID', node(document, 'span', 'wex-type-body-small-regular', product.id)],
    ['Booking ID', node(document, 'span', 'wex-type-navigation-small-semibold', product.productCode)],
    ['Rating', node(document, 'span', 'wex-type-navigation-small-semibold', product.ratings + ' | ' + product.reviews)],
    ['Price', node(document, 'span', 'wex-type-navigation-small-semibold', product.price)],
    ['Duration', node(document, 'span', 'wex-type-navigation-small-semibold', product.duration)],
    ['Language', node(document, 'span', 'wex-type-navigation-small-semibold', product.language)],
    ['Category', node(document, 'span', 'wex-type-navigation-small-semibold', product.category)],
    ['Labels', chips(document, product.labels)],
  ]);
  details.append(identity, facts);
  const media = node(document, 'div', 'wex-admin-product-summary__media');
  media.append(picture);
  section.append(createProductSectionHead(document, 'overview', 'wex-admin-product-summary__heading'), media, details);
  return section;
}
