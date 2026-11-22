import { createOutlinedField } from './admin-station-outlined-field.js';
import { productSummaryFixture } from './admin-station-product-summary.js';

/** The Overview fields the editor offers, from the Product Summary values. Platform ID is system-owned (read only); Rating, Type and Labels are not edited here yet. */
const overviewFields = [
  { name: 'name', label: 'Name', key: 'name' },
  { name: 'platform-id', label: 'Platform ID', key: 'id', readOnly: true },
  { name: 'booking-id', label: 'Booking ID', key: 'productCode' },
  { name: 'marketing-title', label: 'Marketing Title', key: 'marketingTitle' },
  { name: 'tagline', label: 'Tagline', key: 'tagline' },
  { name: 'price', label: 'Price', key: 'price' },
  { name: 'duration', label: 'Duration', key: 'duration' },
  { name: 'language', label: 'Language', key: 'language' },
  { name: 'category', label: 'Category', key: 'category' },
];

/**
 * The Overview editor: one outlined field per editable Overview value. It sits in the main content
 * shell and shows only in the editor view of the Overview section (`admin-station-drawer-editor.css`).
 * @param {HTMLElement} shell
 * @param {import('./admin-station-product-summary.js').ProductSummary} [product]
 */
export function createProductOverviewEditor(shell, product = productSummaryFixture) {
  const document = shell.ownerDocument;
  const section = document.createElement('section');
  section.className = 'wex-admin-product-editor';
  section.dataset.adminProductEditor = 'overview';
  section.setAttribute('aria-label', 'Overview editor');
  for (const { key, ...field } of overviewFields) {
    section.append(createOutlinedField(document, { ...field, value: String(product[/** @type {keyof typeof product} */ (key)] ?? '') }));
  }
  return section;
}
