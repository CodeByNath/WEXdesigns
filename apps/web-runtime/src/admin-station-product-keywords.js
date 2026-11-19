import { createProductSectionHead } from './admin-station-product-sections.js';
import { chips, labelledRows, node } from './admin-station-product-summary.js';

/** @typedef {{ activityTypes: ReadonlyArray<string>, audienceLevels: ReadonlyArray<string>, experienceGroups: ReadonlyArray<string> }} ProductKeywords */

/* Reference vocabulary for presentation preview, not persisted selections. */
/** @type {ProductKeywords} */
const productKeywordsFixture = {
  activityTypes: ['Combo', 'Food & Wine', 'Jet Boating', 'Rainforest Walk', 'Sightseeing', 'Wildlife'],
  audienceLevels: ['All Ages', 'Couples', 'Family Friendly', 'Groups', 'Seniors Welcome'],
  experienceGroups: ['Adrenaline', 'Eco', 'Guided', 'Relaxed', 'Scenic'],
};

/** Read-only Keywords with the shared labels and neutral value chips.
 * @param {HTMLElement} shell @param {ProductKeywords} [product] */
export function createProductKeywords(shell, product = productKeywordsFixture) {
  const document = shell.ownerDocument;
  const section = node(document, 'section', 'wex-admin-product-keywords');
  section.setAttribute('aria-label', 'Product keywords');
  section.append(
    createProductSectionHead(document, 'product-keywords'),
    labelledRows(document, [
      ['Activity Type', chips(document, product.activityTypes)],
      ['Audience Level', chips(document, product.audienceLevels)],
      ['Experience Group', chips(document, product.experienceGroups)],
    ]),
  );
  return section;
}
