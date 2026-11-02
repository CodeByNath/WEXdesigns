import { mountOverviewModule } from './admin-station-overview.js';
import { allServicesPreviewSnapshot, mountAllServicesBody } from './admin-station-services.js';

/**
 * Composes independent Overview and Manager modules for the current local
 * Services station. Each module retains ownership of its own structure.
 * @param {HTMLElement} shell
 */
export function mountProductsBody(shell) {
  const main = shell.querySelector('[data-admin-station-region="main"]'); if (!(main instanceof HTMLElement)) return;
  const document = shell.ownerDocument;
  const page = document.createElement('div'); page.className = 'wex-admin-products';
  const overviewMount = document.createElement('div'); overviewMount.className = 'wex-admin-products__overview';
  const managerMount = document.createElement('div'); managerMount.className = 'wex-admin-products__manager'; managerMount.dataset.adminStationRegion = 'main';
  page.append(overviewMount, managerMount); main.replaceChildren(page);
  mountOverviewModule(overviewMount, allServicesPreviewSnapshot);
  mountAllServicesBody(page, allServicesPreviewSnapshot);
}
