import { createProductSectionHead } from './admin-station-product-sections.js';
import { chips, labelledRows, node } from './admin-station-product-summary.js';

/** @typedef {{ question: string, answer: string }} ProductFaq */
/** @typedef {{ faqs: ReadonlyArray<ProductFaq>, reviews: string, bookingSystem: string, primaryCode: string, altCode: string, destinations: ReadonlyArray<string>, relatedTours: ReadonlyArray<{ name: string, id: string }> }} ProductFaqBooking */

/* Reference preview copy; related-tour choices are not persisted selections. */
/** @type {ProductFaqBooking} */
const faqBookingFixture = {
  faqs: [
    { question: 'Where does the tour depart from?', answer: 'The tour departs from selected Brisbane CBD locations including Southbank, Sofitel Brisbane Central, and Royal on the Park. Exact pick-up details are confirmed after booking.' },
    { question: 'Will we see kangaroos and koalas?', answer: 'Coombabah Lakelands Conservation Park is known for frequent sightings of kangaroos and koalas in their natural habitat. As wildlife is free roaming, sightings cannot be guaranteed, but the area is recognised for its strong wildlife presence.' },
    { question: 'How much walking is involved?', answer: 'The tour includes short, guided walks at Coombabah Lakelands Conservation Park and Natural Bridge in Springbrook National Park. Tracks may include uneven ground, steps and short inclines. A reasonable level of mobility is required, and enclosed walking shoes are recommended.' },
    { question: 'Is lunch included?', answer: 'Yes. The tour includes lunch at SkyPoint Observation Deck, offering panoramic views across the Gold Coast while you enjoy your meal.' },
    { question: 'Are there optional activities available?', answer: 'Yes. During free time in Surfers Paradise, optional activities such as Aquaduck or jet boat experiences may be available at an additional cost. These activities are not included in the standard tour price. Guests who choose to pre-purchase optional activities before the day of the tour may receive significant discounted rates compared to on-the-day pricing.' },
  ],
  reviews: '',
  bookingSystem: 'Rezdy',
  primaryCode: 'PBASBR',
  altCode: '',
  destinations: [],
  relatedTours: [
    { name: 'Kangaroos & Koalas', id: '805' },
    { name: 'Natural Bridge', id: '806' },
    { name: 'Lamington', id: '807' },
    { name: 'Mt Tamborine', id: '808' },
  ],
};

/** @param {Document} document @param {string} text */
const copy = (document, text) => node(document, 'p', 'wex-admin-product-faq-booking__text wex-type-navigation-small-semibold', text);

/** Read-only FAQ and booking metadata. Supplied shortcode text is never executed.
 * @param {HTMLElement} shell @param {ProductFaqBooking} [product] */
export function createProductFaqBooking(shell, product = faqBookingFixture) {
  const document = shell.ownerDocument;
  const section = node(document, 'section', 'wex-admin-product-faq-booking');
  section.setAttribute('aria-label', 'Product FAQ and booking');
  section.append(createProductSectionHead(document, 'faq-booking'));
  product.faqs.forEach((faq, index) => {
    const group = node(document, 'section', 'wex-admin-product-faq-booking__group');
    group.setAttribute('aria-label', `Q&A ${index + 1}`);
    group.append(
      node(document, 'h4', 'wex-admin-product-faq-booking__text wex-type-navigation-small-semibold', `Q&A ${index + 1}`),
      labelledRows(document, [
        ['Question', copy(document, faq.question)],
        ['Answer', copy(document, faq.answer)],
      ]),
    );
    section.append(group);
  });
  const booking = node(document, 'section', 'wex-admin-product-faq-booking__group');
  booking.setAttribute('aria-label', 'Booking details');
  booking.append(
    node(document, 'h4', 'wex-admin-product-faq-booking__text wex-type-navigation-small-semibold', 'Booking details'),
    labelledRows(document, [
      ['Booking system', copy(document, product.bookingSystem)],
      ['Primary product code', copy(document, product.primaryCode)],
      ...(product.altCode ? [/** @type {readonly [string, Node]} */ (['Alt product code', copy(document, product.altCode)])] : []),
      ...(product.reviews ? [/** @type {readonly [string, Node]} */ (['Reviews embed / shortcode', copy(document, product.reviews)])] : []),
      ...(product.destinations.length ? [/** @type {readonly [string, Node]} */ (['Catalogue destinations', chips(document, product.destinations)])] : []),
      ...(product.relatedTours.length ? [/** @type {readonly [string, Node]} */ (['Related Tours', chips(document, product.relatedTours.map((tour) => `${tour.name} · ID: ${tour.id}`))])] : []),
    ]),
  );
  section.append(booking);
  return section;
}
