import { createSystemIcon } from './admin-station-system-icons.js';

/** @typedef {{ status: 'pending'|'disabled'|'active' }} OverviewService */
/** @typedef {{ services: readonly OverviewService[] }} OverviewSnapshot */

/** @param {Document} document @param {string} value @param {string} className */
function text(document, value, className) { const node = document.createElement('span'); node.className = className; node.textContent = value; return node; }

/**
 * Mounts the station-scoped Overview module. The module receives its values
 * from its caller and does not own Manager cards, grid/list controls, or data.
 * @param {HTMLElement} mount
 * @param {OverviewSnapshot} snapshot
 */
export function mountOverviewModule(mount, snapshot) {
  const document = mount.ownerDocument;
  const overview = document.createElement('section'); overview.className = 'wex-admin-overview'; overview.setAttribute('aria-labelledby', 'wex-admin-overview-title');
  const header = document.createElement('div'); header.className = 'wex-admin-overview__header';
  const heading = document.createElement('h2'); heading.id = 'wex-admin-overview-title'; heading.className = 'wex-type-navigation-default-semibold'; heading.textContent = 'Overview';
  const scope = document.createElement('span'); scope.className = 'wex-admin-overview__scope wex-type-navigation-small-semibold'; scope.append(text(document, 'All services', 'wex-admin-overview__scope-label'), createSystemIcon(document, 'chevron-down'));
  header.append(heading, scope);
  const metrics = document.createElement('dl'); metrics.className = 'wex-admin-overview__metrics';
  [
    ['All services', snapshot.services.length],
    ['Active', snapshot.services.filter(({ status }) => status === 'active').length],
    ['Pending', snapshot.services.filter(({ status }) => status === 'pending').length],
    ['Disabled', snapshot.services.filter(({ status }) => status === 'disabled').length],
  ].forEach(([label, count]) => {
    const metric = document.createElement('div'); metric.className = 'wex-admin-overview__metric';
    const term = document.createElement('dt'); term.className = 'wex-type-body-small-regular'; term.textContent = String(label);
    const definition = document.createElement('dd'); definition.className = 'wex-type-title-small-semibold'; definition.textContent = String(count);
    metric.append(term, definition); metrics.append(metric);
  });
  overview.append(header, metrics); mount.replaceChildren(overview);
}
