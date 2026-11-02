import { createSystemIcon } from './admin-station-system-icons.js';

/** @typedef {{ status: 'pending'|'disabled'|'active' }} OverviewService */
/** @typedef {{ services: readonly OverviewService[] }} OverviewSnapshot */

/** @param {Document} document @param {string} label */
function scopeMenuItem(document, label) { const item = document.createElement('button'); item.type = 'button'; item.className = 'wex-dropdown-menu__item--small wex-admin-overview__scope-menu-item'; item.textContent = label; return item; }

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
  const heading = document.createElement('h2'); heading.id = 'wex-admin-overview-title'; heading.className = 'wex-component-title'; heading.textContent = 'Overview';
  const scope = document.createElement('div'); scope.className = 'wex-admin-overview__scope'; scope.setAttribute('aria-label', 'Overview actions');
  const scopeToggle = document.createElement('button'); scopeToggle.type = 'button'; scopeToggle.className = 'wex-button wex-button--small wex-button--neutral wex-action-button-icon-only--small-menu'; scopeToggle.setAttribute('aria-label', 'Add new'); scopeToggle.setAttribute('aria-expanded', 'false'); scopeToggle.setAttribute('aria-haspopup', 'menu'); scopeToggle.append(createSystemIcon(document, 'plus'), createSystemIcon(document, 'chevron-down'));
  const scopeMenu = document.createElement('div'); scopeMenu.className = 'wex-dropdown-menu--small wex-admin-overview__scope-menu'; scopeMenu.setAttribute('role', 'menu'); scopeMenu.hidden = true; scopeMenu.append(scopeMenuItem(document, 'Add New'));
  scopeToggle.addEventListener('click', () => { scopeMenu.hidden = !scopeMenu.hidden; scopeToggle.setAttribute('aria-expanded', String(!scopeMenu.hidden)); });
  document.addEventListener('click', (event) => { if (event.target instanceof Node && scope.contains(event.target)) return; scopeMenu.hidden = true; scopeToggle.setAttribute('aria-expanded', 'false'); });
  scope.append(scopeToggle, scopeMenu);
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
