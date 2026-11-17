/** Product sections supplied by the Owner's reference. Only Overview has content so far. */
export const productSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'description', label: 'Description' },
  { id: 'media', label: 'Media' },
  { id: 'snapshot', label: 'Snapshot' },
  { id: 'meeting', label: 'Meeting' },
  { id: 'itinerary', label: 'Itinerary' },
  { id: 'info', label: 'Info' },
  { id: 'product-keywords', label: 'Product Keywords' },
  { id: 'faq-booking', label: 'FAQ / Booking' },
];

/** The numbered name of a section, as the navigation prints it. @param {string} id */
export function productSectionHeading(id) {
  const index = productSections.findIndex((section) => section.id === id);
  return `${index + 1}. ${productSections[index].label}`;
}

/**
 * The heading of a section as the reference prints it: the name, with its step count ("1 / 10") in a chip on the same line, space between.
 * @param {Document} document @param {string} id @param {string} [className]
 */
export function createProductSectionHead(document, id, className = '') {
  const index = productSections.findIndex((section) => section.id === id);
  const head = document.createElement('div');
  head.className = `wex-admin-product-section-head ${className}`.trim();
  const name = document.createElement('h3');
  name.className = 'wex-admin-product-section-head__name wex-type-navigation-small-semibold';
  name.textContent = productSections[index].label;
  const count = document.createElement('span');
  count.className = 'wex-admin-product-section-head__count wex-admin-product-summary__chip';
  count.textContent = `${index + 1} / ${productSections.length}`;
  head.append(name, count);
  return head;
}

/** Full-mode product navigation; other Drawer modes retain the original Presentation. @param {HTMLElement} body */
export function createProductSections(body) {
  const document = body.ownerDocument;
  const nav = document.createElement('nav');
  nav.className = 'wex-admin-product-sections';
  nav.setAttribute('aria-label', 'Product sections');
  const list = document.createElement('ol');
  list.className = 'wex-admin-product-sections__list';
  body.dataset.adminProductSection = 'overview';
  const buttons = productSections.map((section, index) => {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'wex-admin-product-sections__tab';
    button.textContent = productSectionHeading(section.id);
    button.setAttribute('aria-pressed', String(section.id === 'overview'));
    button.addEventListener('click', () => {
      body.dataset.adminProductSection = section.id;
      buttons.forEach((candidate) => candidate.setAttribute('aria-pressed', String(candidate === button)));
    });
    item.append(button);
    list.append(item);
    return button;
  });
  nav.append(list);
  return nav;
}
