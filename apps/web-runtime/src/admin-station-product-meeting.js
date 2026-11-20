import { createProductSectionHead } from './admin-station-product-sections.js';
import { labelledRows, node, productSummaryFixture } from './admin-station-product-summary.js';

/** @typedef {{ time: string, label: string, address: string, mapUrl: string }} MeetingPoint */

/* Presentation-only values transcribed from the Owner's Meeting reference. */
/** @type {ReadonlyArray<MeetingPoint>} */
const meetingPointsFixture = Object.freeze([
  { time: '7:00 am', label: 'Emporium Hotel, Southbank', address: 'Emporium Hotel South Bank, 267 Grey St, South Brisbane QLD 4101', mapUrl: '' },
  { time: '7:05 am', label: 'Mantra, Southbank', address: 'Mantra South Bank Brisbane, 161 Grey St, South Brisbane QLD 4101', mapUrl: '' },
  { time: '7:15 am', label: 'Sofitel Brisbane Central', address: 'Sofitel Brisbane Central, 249 Turbot St, Brisbane City QLD 4000', mapUrl: '' },
  { time: '7:30 am', label: 'Royal on The Park', address: 'Royal on The Park Brisbane, 152 Alice St, Brisbane City QLD 4001', mapUrl: '' },
]);

/** @typedef {{ isCombo?: boolean, groups?: ReadonlyArray<{ label: string, point: MeetingPoint }> }} MeetingOptions */

/* Owner-authorised sample points for the combo presentation preview. */
/** @type {MeetingOptions} */
const meetingOptionsFixture = Object.freeze({
  isCombo: productSummaryFixture.isCombo,
  groups: Object.freeze([
    { label: 'Natural Bridge Tour', point: { time: '8:45 am', label: 'Natural Bridge Tour pickup', address: 'Emporium Hotel South Bank, 267 Grey St, South Brisbane QLD 4101', mapUrl: '' } },
    { label: 'Hot Air Balloon Flight', point: { time: '4:30 am', label: 'Hotel reception pickup', address: 'Sheraton Grand Mirage Resort, 71 Sea World Drive, Main Beach QLD 4217', mapUrl: '' } },
  ]),
});

/**
 * Read-only meeting points; optional map URLs print only when supplied.
 * @param {HTMLElement} shell
 * @param {ReadonlyArray<MeetingPoint>} [points]
 * @param {MeetingOptions} [options]
 * @returns {HTMLElement}
 */
export function createProductMeeting(shell, points = meetingPointsFixture, options = meetingOptionsFixture) {
  const document = shell.ownerDocument;
  const section = node(document, 'section', 'wex-admin-product-meeting');
  section.setAttribute('aria-label', 'Product meeting');
  section.append(createProductSectionHead(document, 'meeting'));
  /** @param {MeetingPoint} point @param {number} index */
  const meetingPoint = (point, index) => {
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
    return group;
  };
  const groups = options.isCombo === true ? options.groups ?? [] : [];
  const firstGroup = groups[0];
  if (!firstGroup) {
    section.append(...points.map(meetingPoint));
    return section;
  }
  const tabs = node(document, 'nav', 'wex-admin-notifications__filters wex-admin-notifications__filters--toggle wex-admin-product-meeting__groups');
  tabs.setAttribute('aria-label', 'Combo meeting groups');
  const panel = node(document, 'div', 'wex-admin-product-meeting__group');
  /** @param {MeetingPoint} point @param {number} index */
  const activityPoints = (point, index) => index === 0 ? points : [point];
  panel.setAttribute('role', 'region');
  const buttons = groups.map((group, index) => {
    const button = node(document, 'button', 'wex-admin-notifications__tab wex-admin-notifications__tab--small-horizontal', group.label);
    button.setAttribute('type', 'button');
    button.setAttribute('aria-pressed', String(index === 0));
    button.addEventListener('click', () => {
      buttons.forEach((tab, selected) => tab.setAttribute('aria-pressed', String(index === selected)));
      panel.setAttribute('aria-label', group.label);
      panel.replaceChildren(...activityPoints(group.point, index).map(meetingPoint));
    });
    return button;
  });
  tabs.append(...buttons);
  panel.setAttribute('aria-label', firstGroup.label);
  panel.append(...activityPoints(firstGroup.point, 0).map(meetingPoint));
  section.append(tabs, panel);
  return section;
}
