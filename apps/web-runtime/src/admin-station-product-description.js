import { createProductSectionHead } from './admin-station-product-sections.js';
import { chips, labelledRows, node } from './admin-station-product-summary.js';

/** @typedef {{ description: string, highlights: ReadonlyArray<string> }} ProductDescription */

/* Presentation-only preview copy from the Owner's Description reference. */
/** @type {ProductDescription} */
const productDescriptionFixture = Object.freeze({
  description: 'Experience the best of the Gold Coast on a full-day tour from Brisbane, combining wildlife, coastal views and rainforest landscapes in one seamless journey. Begin your day at Coombabah Lakelands Conservation Park, where you’ll have the chance to spot kangaroos and koalas in their natural habitat.',
  highlights: Object.freeze([
    'Visit Coombabah Lakelands Conservation Park where kangaroos and koalas are common sights',
    'Enjoy a scenic drive along the Gold Coast coastline and The Spit, with opportunity to see whales (seasonal) and dolphins',
    'Learn the history, culture and customs of the local Yugambeh aboriginal First Nations people from expert guides',
    'Lunch with 360° views at Skypoint Observation Deck at Queensland’s tallest building, Q1',
    'Free time in Surfers Paradise to explore, shop or relax on the beach',
    'ECO certified, small group tours with our friendly guide offers a personalised experience',
    'Optional upgrades including jet boating and Aquaduck experiences at discounted rates',
    'Explore the UNESCO World Heritage listed Springbrook National Park with a fully guided rainforest walk to Natural Bridge',
  ]),
});

/**
 * Read-only Description in the Full Drawer's main content shell. Uses the same
 * section heading and label/value rows as Overview and Pricing, with plain text
 * and the same neutral highlights chips as Pricing, never editing controls or HTML from a provider.
 * @param {HTMLElement} shell
 * @param {ProductDescription} [product]
 * @returns {HTMLElement}
 */
export function createProductDescription(shell, product = productDescriptionFixture) {
  const document = shell.ownerDocument;
  const section = node(document, 'section', 'wex-admin-product-description');
  section.setAttribute('aria-label', 'Product description');
  section.append(
    createProductSectionHead(document, 'description'),
    labelledRows(document, [
      ['Product description', node(document, 'p', 'wex-admin-product-description__copy wex-type-navigation-small-semibold', product.description)],
      ['Quick Highlights', chips(document, product.highlights)],
    ]),
  );
  return section;
}
