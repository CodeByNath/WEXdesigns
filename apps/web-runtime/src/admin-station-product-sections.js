/** Product sections supplied by the Owner's reference. Overview through Meeting have preview content. */
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
  return `${index + 1}. ${productSections[index]?.label ?? ''}`;
}

/**
 * The heading of a section as the reference prints it: the name, with its step count ("1 / 10") in the same count badge the Promotions heading uses, on the same line, space between.
 * @param {Document} document @param {string} id @param {string} [className]
 */
export function createProductSectionHead(document, id, className = '') {
  const index = productSections.findIndex((section) => section.id === id);
  const head = document.createElement('div');
  head.className = `wex-admin-product-section-head ${className}`.trim();
  const name = document.createElement('h3');
  name.className = 'wex-admin-product-section-head__name wex-type-navigation-small-semibold';
  name.textContent = productSections[index]?.label ?? '';
  const count = document.createElement('span');
  count.className = 'wex-admin-product-section-head__count wex-type-body-small-regular';
  count.textContent = `${index + 1} / ${productSections.length}`;
  head.append(name, count);
  return head;
}

/** Full-mode product navigation: hovering or focusing an item previews its section in the main content shell, leaving returns to the selected one, clicking selects it. Other Drawer modes retain the original Presentation.
 * @param {HTMLElement} body @param {HTMLButtonElement} [nextButton] @param {HTMLButtonElement} [previousButton] */
export function createProductSections(body, nextButton, previousButton) {
  const document = body.ownerDocument;
  const nav = document.createElement('nav');
  nav.className = 'wex-admin-product-sections';
  nav.setAttribute('aria-label', 'Product sections');
  const list = document.createElement('ol');
  list.className = 'wex-admin-product-sections__list';
  body.dataset.adminProductSection = 'overview';
  /** The selected section; the one in the main content shell follows it, or the hovered or focused one while previewing (same as the Drawer Sidebar tabs). */
  let selected = 'overview';
  /** @param {string} id */
  const select = (id) => {
    selected = id;
    buttons.forEach((button, index) => button.setAttribute('aria-pressed', String(productSections[index]?.id === id)));
    if (nextButton) nextButton.disabled = productSections.at(-1)?.id === selected;
    if (previousButton) previousButton.disabled = productSections[0]?.id === selected;
    show(id);
  };
  /** @param {string} id */
  const show = (id) => {
    body.dataset.adminProductSection = id;
    if (id === selected) delete body.dataset.adminProductPreview;
    else body.dataset.adminProductPreview = '';
  };
  const buttons = productSections.map((section, index) => {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'wex-admin-product-sections__tab';
    button.textContent = productSectionHeading(section.id);
    button.setAttribute('aria-pressed', String(section.id === selected));
    const enter = () => show(section.id);
    button.addEventListener('pointerenter', enter);
    button.addEventListener('focus', enter);
    button.addEventListener('click', () => select(section.id));
    item.append(button);
    list.append(item);
    return button;
  });
  /** @param {HTMLButtonElement | undefined} control @param {number} direction */
  const bindStep = (control, direction) => {
    if (!control) return;
    control.hidden = false;
    control.onclick = () => {
      if (control.disabled) return;
      const index = productSections.findIndex((section) => section.id === selected) + direction;
      const section = productSections[index];
      if (!section) return;
      select(section.id);
      buttons[index]?.focus();
    };
  };
  bindStep(previousButton, -1);
  bindStep(nextButton, 1);
  select(selected);
  /* The selected section returns only when the pointer or focus leaves the whole list, not each item, so crossing the gap between two items never flashes the selected section. */
  list.addEventListener('pointerleave', () => show(selected));
  list.addEventListener('focusout', (event) => {
    const next = /** @type {Node | null} */ (/** @type {FocusEvent} */ (event).relatedTarget);
    if (next !== null && list.contains(next)) return;
    show(selected);
  });
  nav.append(list);
  return nav;
}
