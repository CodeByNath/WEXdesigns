import { comboItineraryGroups } from './admin-station-product-itinerary-combo.js';
import { createProductSectionHead } from './admin-station-product-sections.js';
import { labelledRows, node, productSummaryFixture } from './admin-station-product-summary.js';
import { allServicesPreviewSnapshot } from './admin-station-services.js';

/** @typedef {{ number: number, title: string, description: string, image?: { src: string, alt: string } }} ItineraryStep */

/* Presentation-only steps transcribed from the Owner's itinerary references. */
const referenceSteps = [
  { number: 1, title: 'Brisbane Pick-Up & Gold Coast Scenic Drive', description: 'Begin your day with a comfortable pick-up from selected Brisbane CBD locations. Sit back and enjoy the journey south as the city skyline gives way to coastal landscapes. Your local guide introduces the Gold Coast region, sharing insights into its beaches, waterways and hinterland as you travel toward Australia’s most iconic holiday destination.' },
  { number: 2, title: 'Coombabah Lakelands Conservation Park – Wildlife Encounter', description: 'Step into a protected conservation reserve known for its abundant native wildlife. Wander through open eucalyptus woodland and wetlands where kangaroos are commonly seen grazing and koalas rest high in the trees. This natural bush setting offers an authentic opportunity to observe Australian wildlife in its natural habitat.' },
  { number: 3, title: 'The Spit – Ocean & Broadwater Views', description: 'Visit The Spit, a scenic stretch of coastline where the Pacific Ocean meets the Gold Coast Broadwater. Take a short walk along the seawall, breathe in the fresh sea air and enjoy panoramic coastal views. Marine life such as dolphins and seasonal whales are sometimes sighted from this vantage point.' },
  { number: 4, title: 'Surfers Paradise – Beachfront & Free Time', description: 'Arrive in the heart of Surfers Paradise, the Gold Coast’s most recognised beachside precinct. Enjoy free time to explore Cavill Avenue, stroll along the golden sands or simply relax and take in the vibrant atmosphere. This stop allows you to experience the energy and lifestyle that define the Gold Coast.' },
  { number: 5, title: 'SkyPoint Observation Deck – Lunch with a View', description: 'Enjoy lunch at SkyPoint Observation Deck, located atop the iconic Q1 building. Take in sweeping 360-degree views across the coastline, hinterland and city skyline while enjoying your included meal. This elevated perspective offers a unique look at the full scale of the Gold Coast region.' },
  { number: 6, title: 'Scenic Drive Through Numinbah Valley', description: 'Travel inland through the picturesque Numinbah Valley, where rolling countryside and lush greenery replace the coastal skyline. This tranquil drive showcases the natural diversity of the region as you approach the World Heritage-listed rainforest landscapes.' },
  { number: 7, title: 'Springbrook National Park – Gondwana Rainforest', description: 'Enter the ancient rainforest of Springbrook National Park, part of the Gondwana Rainforests of Australia World Heritage Area. Surrounded by towering trees, dense foliage and fresh mountain air, discover one of Queensland’s most pristine natural environments.' },
  { number: 8, title: 'Return to Brisbane', description: 'Relax on the scenic drive back to your original Brisbane pick-up location, completing your day on the Gold Coast.' },
];

/* Existing Studio preview assets stand in for original itinerary image files. */
/** @type {ReadonlyArray<ItineraryStep>} */
const itineraryFixture = referenceSteps.map((step, index) => {
  const preview = allServicesPreviewSnapshot.services[index % allServicesPreviewSnapshot.services.length];
  return { ...step, ...(preview ? { image: { src: preview.imageUrl, alt: `Studio preview image: ${preview.name}` } } : {}) };
});

/** @param {Document} document @param {{ src: string, alt: string }} value */
function picture(document, value) {
  const frame = node(document, 'div', 'wex-admin-product-summary__image wex-admin-product-media__image');
  const image = document.createElement('img');
  image.src = value.src;
  image.alt = value.alt;
  image.loading = 'lazy';
  frame.append(image);
  return frame;
}

/** @typedef {{ isCombo?: boolean, groups?: ReadonlyArray<{ label: string, steps: ReadonlyArray<ItineraryStep> }> }} ItineraryOptions */

/** @param {Document} document @param {ReadonlyArray<ItineraryStep>} steps */
function itineraryList(document, steps) {
  const list = node(document, 'ol', 'wex-admin-product-itinerary__steps');
  steps.forEach((step) => {
    const item = node(document, 'li', 'wex-admin-product-itinerary__step');
    item.setAttribute('value', String(step.number));
    item.append(
      node(document, 'h4', 'wex-admin-product-itinerary__text wex-type-navigation-small-semibold', `Step ${step.number}`),
      labelledRows(document, [
        ['Step title', node(document, 'p', 'wex-admin-product-itinerary__text wex-type-navigation-small-semibold', step.title)],
        ['Step description', node(document, 'p', 'wex-admin-product-itinerary__text wex-type-navigation-small-semibold', step.description)],
        ...(step.image ? [/** @type {readonly [string, Node]} */ (['Image', picture(document, step.image)])] : []),
      ]),
    );
    list.append(item);
  });
  return list;
}

/** Read-only ordered itinerary in the existing Full Drawer main shell.
 * @param {HTMLElement} shell @param {ReadonlyArray<ItineraryStep>} [steps]
 * @param {ItineraryOptions} [options] */
export function createProductItinerary(shell, steps = itineraryFixture, options = { isCombo: productSummaryFixture.isCombo, groups: comboItineraryGroups }) {
  const document = shell.ownerDocument;
  const section = node(document, 'section', 'wex-admin-product-itinerary');
  section.setAttribute('aria-label', 'Product itinerary');
  section.append(createProductSectionHead(document, 'itinerary'));
  const groups = options.isCombo === true ? options.groups ?? [] : [];
  if (!groups.length) {
    section.append(itineraryList(document, steps));
    return section;
  }
  const activities = groups;
  const firstGroup = activities[0];
  if (!firstGroup) return section;
  const tabs = node(document, 'nav', 'wex-admin-notifications__filters wex-admin-notifications__filters--toggle wex-admin-product-itinerary__groups');
  tabs.setAttribute('aria-label', 'Combo itinerary groups');
  const panel = node(document, 'div', 'wex-admin-product-itinerary__group');
  panel.setAttribute('role', 'region');
  const buttons = activities.map((group, index) => {
    const button = node(document, 'button', 'wex-admin-notifications__tab wex-admin-notifications__tab--small-horizontal', group.label);
    button.setAttribute('type', 'button');
    button.setAttribute('aria-pressed', String(index === 0));
    button.addEventListener('click', () => {
      buttons.forEach((tab, selected) => tab.setAttribute('aria-pressed', String(index === selected)));
      panel.setAttribute('aria-label', group.label);
      panel.replaceChildren(itineraryList(document, group.steps));
    });
    return button;
  });
  tabs.append(...buttons);
  panel.setAttribute('aria-label', firstGroup.label);
  panel.append(itineraryList(document, firstGroup.steps));
  section.append(tabs, panel);
  return section;
}
