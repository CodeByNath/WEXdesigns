const ALL_SERVICES_OWNER = 'all-products';

/**
 * @typedef {{ id: string, name: string, category: string, status: 'active' | 'inactive' }} ServiceListItem
 * @typedef {{ stationId: string, services: readonly ServiceListItem[] }} ServiceStationSnapshot
 */

/**
 * A presentation-only station snapshot. The component receives one snapshot,
 * so its list never combines services from more than one station.
 * @type {ServiceStationSnapshot}
 */
export const allServicesPreviewSnapshot = Object.freeze({
  stationId: 'preview-station',
  services: Object.freeze([
    Object.freeze({ id: 'SVC-001', name: 'Reef Discovery', category: 'Experience', status: 'active' }),
    Object.freeze({ id: 'SVC-002', name: 'Coastal Explorer', category: 'Tour', status: 'active' }),
    Object.freeze({ id: 'SVC-003', name: 'Island Adventure', category: 'Experience', status: 'inactive' }),
    Object.freeze({ id: 'SVC-004', name: 'Harbour Cruise', category: 'Cruise', status: 'active' }),
    Object.freeze({ id: 'SVC-005', name: 'Ocean Escape', category: 'Tour', status: 'active' }),
    Object.freeze({ id: 'SVC-006', name: 'Sunset Voyage', category: 'Cruise', status: 'inactive' }),
  ]),
});

/** @param {Document} document @param {string} text @param {string} className */
function textElement(document, text, className) {
  const element = document.createElement('span');
  element.className = className;
  element.textContent = text;
  return element;
}

/** @param {Document} document @param {ServiceListItem} service */
function createServiceItem(document, service) {
  const item = document.createElement('article');
  item.className = 'wex-admin-services__item';

  const identity = document.createElement('div');
  identity.className = 'wex-admin-services__identity';
  const name = document.createElement('h2');
  name.className = 'wex-type-navigation-default-semibold';
  name.textContent = service.name;
  identity.append(name, textElement(document, service.category, 'wex-type-body-small-regular wex-admin-services__category'));

  const details = document.createElement('dl');
  details.className = 'wex-admin-services__details';
  const identifier = document.createElement('div');
  identifier.append(textElement(document, 'Service ID', 'wex-type-body-small-regular wex-admin-services__detail-label'));
  const identifierValue = document.createElement('dd');
  identifierValue.className = 'wex-type-body-default-regular';
  identifierValue.textContent = service.id;
  identifier.append(identifierValue);
  const status = document.createElement('div');
  status.append(textElement(document, 'Status', 'wex-type-body-small-regular wex-admin-services__detail-label'));
  const statusValue = document.createElement('dd');
  statusValue.className = `wex-type-navigation-small-semibold wex-admin-services__status wex-admin-services__status--${service.status}`;
  statusValue.textContent = service.status === 'active' ? 'Active' : 'Inactive';
  status.append(statusValue);
  details.append(identifier, status);

  item.append(identity, details);
  return item;
}

/**
 * Mounts one station-scoped Services collection. Presentation state stays
 * local; a future authorised adapter replaces only the supplied snapshot.
 * @param {HTMLElement} shell
 * @param {ServiceStationSnapshot} [snapshot]
 */
export function mountAllServicesBody(shell, snapshot = allServicesPreviewSnapshot) {
  const main = shell.querySelector('[data-admin-station-region="main"]');
  if (!(main instanceof HTMLElement)) return;

  let view = 'grid';
  let status = 'all';
  let query = '';
  const document = shell.ownerDocument;
  const services = snapshot.services;

  const section = document.createElement('section');
  section.className = 'wex-admin-services';
  section.dataset.stationId = snapshot.stationId;
  section.setAttribute('aria-labelledby', 'wex-admin-services-title');
  const header = document.createElement('header');
  header.className = 'wex-admin-services__header';
  const heading = document.createElement('div');
  const title = document.createElement('h1');
  title.id = 'wex-admin-services-title';
  title.className = 'wex-type-heading-default-semibold';
  title.textContent = 'All Services';
  const summary = document.createElement('p');
  summary.className = 'wex-type-body-default-regular wex-admin-services__summary';
  heading.append(title, summary);
  header.append(heading);

  const controls = document.createElement('div');
  controls.className = 'wex-admin-services__controls';
  const filters = document.createElement('div');
  filters.className = 'wex-admin-services__filters';
  filters.setAttribute('aria-label', 'Filter services by status');
  ['all', 'active', 'inactive'].forEach((value) => {
    const filter = document.createElement('button');
    filter.type = 'button';
    filter.className = 'wex-button wex-button--small wex-button--subtle wex-admin-services__filter';
    filter.dataset.serviceStatus = value;
    filter.textContent = value === 'all' ? 'All' : value === 'active' ? 'Active' : 'Inactive';
    controls.append(filter);
    filters.append(filter);
  });
  controls.replaceChildren(filters);

  const display = document.createElement('div');
  display.className = 'wex-admin-services__display';
  const grid = document.createElement('button');
  grid.type = 'button';
  grid.className = 'wex-button wex-button--small wex-button--neutral';
  grid.dataset.serviceView = 'grid';
  grid.textContent = 'Grid';
  const list = document.createElement('button');
  list.type = 'button';
  list.className = 'wex-button wex-button--small wex-button--neutral';
  list.dataset.serviceView = 'list';
  list.textContent = 'List';
  display.append(grid, list);

  const search = document.createElement('label');
  search.className = 'wex-admin-services__search';
  search.append(textElement(document, 'Search services', 'wex-type-body-small-regular'));
  const input = document.createElement('input');
  input.type = 'search';
  input.placeholder = 'Search services';
  input.setAttribute('aria-label', 'Search services');
  search.append(input);

  const toolbar = document.createElement('div');
  toolbar.className = 'wex-admin-services__toolbar';
  toolbar.append(controls, display, search);
  const results = document.createElement('div');
  results.className = 'wex-admin-services__results';
  results.setAttribute('aria-live', 'polite');

  const render = () => {
    const filtered = services.filter((service) => (
      (status === 'all' || service.status === status)
      && [service.name, service.category, service.id].join(' ').toLocaleLowerCase().includes(query)
    ));
    section.dataset.view = view;
    summary.textContent = `${filtered.length} of ${services.length} services`;
    filters.querySelectorAll('button').forEach((button) => {
      if (!(button instanceof HTMLButtonElement)) return;
      button.setAttribute('aria-pressed', String(button.dataset.serviceStatus === status));
    });
    display.querySelectorAll('button').forEach((button) => {
      if (!(button instanceof HTMLButtonElement)) return;
      button.setAttribute('aria-pressed', String(button.dataset.serviceView === view));
    });
    results.replaceChildren();
    if (filtered.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'wex-type-body-default-regular wex-admin-services__empty';
      empty.textContent = 'No services match the current view.';
      results.append(empty);
      return;
    }
    const collection = document.createElement('div');
    collection.className = 'wex-admin-services__collection';
    filtered.forEach((service) => collection.append(createServiceItem(document, service)));
    results.append(collection);
  };

  controls.addEventListener('click', (event) => {
    const button = event.target instanceof Element ? event.target.closest('[data-service-status]') : null;
    if (!(button instanceof HTMLButtonElement)) return;
    status = button.dataset.serviceStatus ?? 'all';
    render();
  });
  display.addEventListener('click', (event) => {
    const button = event.target instanceof Element ? event.target.closest('[data-service-view]') : null;
    if (!(button instanceof HTMLButtonElement)) return;
    view = button.dataset.serviceView === 'list' ? 'list' : 'grid';
    render();
  });
  input.addEventListener('input', () => {
    query = input.value.trim().toLocaleLowerCase();
    render();
  });

  section.append(header, toolbar, results);
  main.replaceChildren(section);
  render();
}

export { ALL_SERVICES_OWNER };
