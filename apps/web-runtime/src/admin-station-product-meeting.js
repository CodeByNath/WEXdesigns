import { createProductSectionHead } from './admin-station-product-sections.js';
import { labelledRows, node } from './admin-station-product-summary.js';

/** @typedef {{ time: string, label: string, address: string, mapUrl: string }} MeetingPoint */

/* Presentation-only values transcribed from the Owner's Meeting reference. */
/** @type {ReadonlyArray<MeetingPoint>} */
const meetingPointsFixture = Object.freeze([
  { time: '7:00 am', label: 'Emporium Hotel, Southbank', address: 'Emporium Hotel South Bank, 267 Grey St, South Brisbane QLD 4101', mapUrl: '' },
  { time: '7:05 am', label: 'Mantra, Southbank', address: 'Mantra South Bank Brisbane, 161 Grey St, South Brisbane QLD 4101', mapUrl: '' },
  { time: '7:15 am', label: 'Sofitel Brisbane Central', address: 'Sofitel Brisbane Central, 249 Turbot St, Brisbane City QLD 4000', mapUrl: '' },
  { time: '7:30 am', label: 'Royal on The Park', address: 'Royal on The Park Brisbane, 152 Alice St, Brisbane City QLD 4001', mapUrl: '' },
]);

/**
 * Read-only meeting points; optional map URLs print only when supplied.
 * @param {HTMLElement} shell
 * @param {ReadonlyArray<MeetingPoint>} [points]
 * @returns {HTMLElement}
 */
export function createProductMeeting(shell, points = meetingPointsFixture) {
  const document = shell.ownerDocument;
  const section = node(document, 'section', 'wex-admin-product-meeting');
  section.setAttribute('aria-label', 'Product meeting');
  section.append(createProductSectionHead(document, 'meeting'));
  points.forEach((point, index) => {
    const group = node(document, 'section', 'wex-admin-product-meeting__point');
    const title = `Meeting point ${index + 1}`;
    group.setAttribute('aria-label', title);
    group.append(
      node(document, 'h4', 'wex-admin-product-meeting__title wex-type-navigation-small-semibold', title),
      labelledRows(document, [
        ['Time', node(document, 'p', 'wex-admin-product-meeting__value wex-type-navigation-small-semibold', point.time)],
        ['Label', node(document, 'p', 'wex-admin-product-meeting__value wex-type-navigation-small-semibold', point.label)],
        ['Address', node(document, 'p', 'wex-admin-product-meeting__value wex-type-navigation-small-semibold', point.address)],
        ...(point.mapUrl ? [/** @type {readonly [string, Node]} */ (['Map URL', node(document, 'p', 'wex-admin-product-meeting__value wex-type-navigation-small-semibold', point.mapUrl)])] : []),
      ]),
    );
    section.append(group);
  });
  return section;
}
