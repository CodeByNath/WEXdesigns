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
    button.textContent = `${index + 1}. ${section.label}`;
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
