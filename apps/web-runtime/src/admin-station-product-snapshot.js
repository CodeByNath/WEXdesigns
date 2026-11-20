import { createProductSectionHead } from './admin-station-product-sections.js';
import { chips, labelledRows, node, productSummaryFixture } from './admin-station-product-summary.js';

/** @typedef {{ duration: string, walking: string, departureTime: string, returnTime: string, fitness: string, groupSize: string, minAge: string, pickup: string, operatedBy: string, languages: ReadonlyArray<string> }} SnapshotContent */
/** @typedef {SnapshotContent & { isCombo?: boolean, groups?: ReadonlyArray<SnapshotContent & { label: string }> }} ProductSnapshot */

/* Presentation-only preview values from the Owner's Snapshot reference. */
/** @type {ProductSnapshot} */
const productSnapshotFixture = Object.freeze({
  isCombo: productSummaryFixture.isCombo,
  groups: Object.freeze([
    Object.freeze({
      label: 'Natural Bridge Tour', duration: '5 hours', walking: 'Approx: 2.85km',
      departureTime: '8:45 am', returnTime: '1:45 pm', fitness: 'Easy',
      groupSize: 'Max 15', minAge: 'Suitable for all ages', pickup: 'Included',
      operatedBy: 'Southern Cross Tours', languages: Object.freeze(['English']),
    }),
    Object.freeze({
      label: 'Hot Air Balloon Flight', duration: 'Approx. 4 Hours', walking: '',
      departureTime: 'Early morning (pre-sunrise)', returnTime: '', fitness: 'Minimal',
      groupSize: 'Max 24', minAge: '3 years old', pickup: 'Included',
      operatedBy: 'Go Ballooning Gold Coast Pty Ltd', languages: Object.freeze(['English']),
    }),
  ]),
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

/** @param {Document} document @param {SnapshotContent} product */
function snapshotRows(document, product) {
  /** @param {string} value */
  const valuePill = (value) => chips(document, value ? [value] : []);
  return labelledRows(document, [
    ['Duration', valuePill(product.duration)],
    ['Walking', valuePill(product.walking)],
    ['Departure time', valuePill(product.departureTime)],
    ['Return time', valuePill(product.returnTime)],
    ['Fitness', valuePill(product.fitness)],
    ['Group size', valuePill(product.groupSize)],
    ['Min age', valuePill(product.minAge)],
    ['Pickup', valuePill(product.pickup)],
    ['Operated by', valuePill(product.operatedBy)],
    ['Languages', chips(document, product.languages)],
  ]);
}

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
  section.append(createProductSectionHead(document, 'snapshot'));
  const groups = product.isCombo === true ? product.groups ?? [] : [];
  const firstGroup = groups[0];
  if (!firstGroup) {
    section.append(snapshotRows(document, product));
    return section;
  }
  // Match Description's existing Toggle / Small Horizontal presentation.
  const tabs = node(document, 'nav', 'wex-admin-notifications__filters wex-admin-notifications__filters--toggle wex-admin-product-snapshot__groups');
  tabs.setAttribute('aria-label', 'Combo snapshot groups');
  const panel = node(document, 'div', 'wex-admin-product-snapshot__group');
  panel.setAttribute('role', 'region');
  const buttons = groups.map((group, index) => {
    const button = node(document, 'button', 'wex-admin-notifications__tab wex-admin-notifications__tab--small-horizontal', group.label);
    button.setAttribute('type', 'button');
    button.setAttribute('aria-pressed', String(index === 0));
    button.addEventListener('click', () => {
      buttons.forEach((tab, selected) => tab.setAttribute('aria-pressed', String(index === selected)));
      panel.setAttribute('aria-label', group.label);
      panel.replaceChildren(snapshotRows(document, group));
    });
    return button;
  });
  tabs.append(...buttons);
  panel.setAttribute('aria-label', firstGroup.label);
  panel.append(snapshotRows(document, firstGroup));
  section.append(tabs, panel);
  return section;
}
