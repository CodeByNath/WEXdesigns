import { createOutlinedField } from './admin-station-outlined-field.js';
import { setAdminDrawerActionState } from './admin-station-drawer-footer.js';
import { productSummaryFixture } from './admin-station-product-summary.js';
import { keepFieldStatus } from './admin-station-field-status.js';

/** The Overview fields the editor offers, from the Product Summary values. Platform ID is system-owned (read only); Rating, Type and Labels are not edited here yet. Every editable field is required: Publish stays disabled while one is empty. */
const overviewFields = [
  { name: 'name', label: 'Name', key: 'name', required: true },
  { name: 'platform-id', label: 'Platform ID', key: 'id', readOnly: true },
  { name: 'booking-id', label: 'Booking ID', key: 'productCode', required: true },
  { name: 'marketing-title', label: 'Marketing Title', key: 'marketingTitle', required: true },
  { name: 'tagline', label: 'Tagline', key: 'tagline', required: true },
  { name: 'price', label: 'Price', key: 'price', required: true },
  { name: 'duration', label: 'Duration', key: 'duration', required: true },
  { name: 'language', label: 'Language', key: 'language', required: true },
  { name: 'category', label: 'Category', key: 'category', required: true },
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
  keepFieldStatus(section, product.id);
  const sync = () => {
    for (const input of section.querySelectorAll('textarea')) input.setAttribute('aria-invalid', String(input.required && input.value.trim() === ''));
    setAdminDrawerActionState(shell, overviewEditorState(section));
  };
  section.addEventListener('input', sync);
  return section;
}

/** What the footer needs: dirty once any value differs from its starting value; publishable once no required field is empty.
 * @param {HTMLElement} editor */
export function overviewEditorState(editor) {
  const inputs = Array.from(editor.querySelectorAll('textarea'));
  return {
    dirty: inputs.some((input) => input.value !== input.defaultValue),
    publishable: inputs.every((input) => !input.required || input.value.trim() !== ''),
  };
}

/** Discard: every field returns to its starting value.
 * @param {HTMLElement} editor */
export function discardOverviewEditor(editor) {
  for (const input of editor.querySelectorAll('textarea')) {
    input.value = input.defaultValue;
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }
}
