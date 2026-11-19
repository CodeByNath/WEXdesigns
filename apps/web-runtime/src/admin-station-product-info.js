import { createProductSectionHead } from './admin-station-product-sections.js';
import { chips, labelledRows, node } from './admin-station-product-summary.js';

/** @typedef {{ included: ReadonlyArray<string>, notIncluded: ReadonlyArray<string>, bring: ReadonlyArray<string>, details: ReadonlyArray<readonly [string, ReadonlyArray<string>]> }} ProductInfo */

/* Presentation-only reference copy, including Owner-supplied complete list entries. */
/** @type {ProductInfo} */
const productInfoFixture = {
  included: [
    'Return transfers from Brisbane CBD and Southbank',
    'Conservation & national park fees',
    'Entry fee to Skypoint Observation Deck',
    'Lunch',
    'Expert tour guide providing in vehicle and guided walking commentary',
  ],
  notIncluded: [
    'Morning tea',
    'Entry for additional activities such as Aquaduck or Paradise Jet Boating',
    'Luggage, pram/stroller storage on the bus',
  ],
  bring: ['Camera', 'Hat', 'Sunscreen', 'Water bottle', 'Insect repellent', 'Warm jacket'],
  details: [
    ['Fitness & accessibility', [
      'Suitable for most ages and general fitness levels. The tour includes a guided rainforest walk on formed tracks, which may include uneven natural surfaces and gentle inclines. Comfortable enclosed walking shoes are recommended. This experience is not wheelchair accessible.',
      'Walking Grade 2. More information about the walking grades.',
    ]],
    ['Weather policy', [
      'This extensive hinterland and coastal tour operates in most weather conditions. Coastal rain or showers in one region may not affect inland sections like wildlife reserves, rainforest or lookout stops. Light rain typically does not impact the experience and rainforest environments rely on rain for their lush beauty.',
      'However, for your safety, the tour may be altered, rescheduled or cancelled should conditions such as severe weather, road closures or national park access restrictions occur. If a section of the itinerary cannot proceed, we’ll work to ensure alternatives, and in rare cases where the whole tour is affected you’ll be offered a reschedule or a refund under our normal terms. Guests should wear weather-appropriate clothing and comfortable footwear.',
    ]],
    ['Cancellation', [
      'Plans can change, so we aim to keep things simple and flexible:',
      'Full refund available for cancellations made 48 hours or more prior to departure\nCancellations within 48 hours incur a 100% cancellation fee\nReschedules are permitted up to 24 hours prior (subject to availability)\nNo changes are permitted within 24 hours of departure',
      'Late arrivals and no-shows are treated as cancellations.',
    ]],
    ['Child / Infant info', [
      'This is a family-friendly experience designed to be enjoyed together:',
      'Infants (0–1 years) are welcome (subject to availability) and must be advised at time of booking\nInfant fare is typically 50% of the child rate and does not include refreshments\nChildren (2–16 years) are welcome on tour\nAll children under 16 years must be accompanied by an adult (18+)\nCar seats and booster seats are available on request (limited availability)',
      'Please note: due to the nature of the rainforest walk, prams and strollers are not suitable.',
    ]],
    ['Safety', [
      'Your safety and comfort are central to the experience:',
      'Guided by experienced, fully trained local guides with all required permits\nModern vehicles are maintained to high safety standards and equipped with first aid kits\nGuided walks at Coombabah Lakelands Conservation Park and Natural Bridge are conducted along marked tracks and designated viewing areas\nGuests must remain with the guide at all times during walks and national park visits\nWildlife encounters occur in natural environments and sightings cannot be guaranteed\nNational park conditions may vary due to weather and natural terrain',
      'For comfort and safety, guests are encouraged to wear enclosed walking shoes, bring sun protection and carry a light jacket, particularly during cooler months in the hinterland.',
    ]],
    ['Tour disclaimer', [
      'Southern Cross Tours may alter or cancel any section of any of the itinerary which may result from road closures, weather, suppliers or any other condition of an operational nature. Alternate vehicles may be used in the event that a Southern Cross vehicle is unavailable.',
    ]],
    ['Why Book Direct', [
      'Best price guaranteed\nFlexible booking options\nFree cancellation\nLocal experts and trusted operators\nInstant confirmation\nPersonalised customer support',
    ]],
  ],
};

/** Read-only Info with shared list chips and readable policy paragraphs.
 * @param {HTMLElement} shell @param {ProductInfo} [product] */
export function createProductInfo(shell, product = productInfoFixture) {
  const document = shell.ownerDocument;
  const section = node(document, 'section', 'wex-admin-product-info');
  section.setAttribute('aria-label', 'Product info');
  const details = product.details.map(([label, paragraphs]) => {
    const copy = node(document, 'div', 'wex-admin-product-info__copy');
    paragraphs.forEach((text) => copy.append(node(document, 'p', 'wex-admin-product-info__paragraph wex-type-navigation-small-semibold', text)));
    return /** @type {readonly [string, Node]} */ ([label, copy]);
  });
  section.append(
    createProductSectionHead(document, 'info'),
    labelledRows(document, [
      ['What’s Included', chips(document, product.included)],
      ['What’s Not Included', chips(document, product.notIncluded)],
      ['What to bring', chips(document, product.bring)],
      ...details,
    ]),
  );
  return section;
}
