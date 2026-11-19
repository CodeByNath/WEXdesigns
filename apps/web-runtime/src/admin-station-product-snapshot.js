import { createProductSectionHead } from './admin-station-product-sections.js';
import { chips, labelledRows, node } from './admin-station-product-summary.js';

/** @typedef {{ duration: string, walking: string, departureTime: string, returnTime: string, fitness: string, groupSize: string, minAge: string, pickup: string, operatedBy: string, languages: ReadonlyArray<string> }} ProductSnapshot */

/* Presentation-only preview values from the Owner's Snapshot reference. */
/** @type {ProductSnapshot} */
const productSnapshotFixture = Object.freeze({
  duration: '11.5 hours',
  walking: 'Approx: 3.2 Kilometres',
  departureTime: '7:00 am',
  returnTime: '6:30 pm',
  fitness: 'Easy',
  groupSize: 'Max 15',
  minAge: 'Suitable for all ages',
  pickup: 'Included',
  operatedBy: 'Southern Cross Tours',
  languages: Object.freeze(['English']),
});

/**
 * Read-only Snapshot using the shared label/value rows and Description's neutral chips.
 * @param {HTMLElement} shell
 * @param {ProductSnapshot} [product]
 * @returns {HTMLElement}
 */
export function createProductSnapshot(shell, product = productSnapshotFixture) {
  const document = shell.ownerDocument;
  const section = node(document, 'section', 'wex-admin-product-snapshot');
  section.setAttribute('aria-label', 'Product snapshot');
  section.append(
    createProductSectionHead(document, 'snapshot'),
    labelledRows(document, [
      ['Duration', chips(document, [product.duration])],
      ['Walking', chips(document, [product.walking])],
      ['Departure time', chips(document, [product.departureTime])],
      ['Return time', chips(document, [product.returnTime])],
      ['Fitness', chips(document, [product.fitness])],
      ['Group size', chips(document, [product.groupSize])],
      ['Min age', chips(document, [product.minAge])],
      ['Pickup', chips(document, [product.pickup])],
      ['Operated by', chips(document, [product.operatedBy])],
      ['Languages', chips(document, product.languages)],
    ]),
  );
  return section;
}
