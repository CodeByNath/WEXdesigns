const LOCATION_CHANGE_EVENT = 'wex-admin-station-location-change';

/** @param {HTMLElement} shell */
function selectedLocationLabel(shell) {
  const selected = shell.querySelector('.wex-admin-shell__sidebar-tab--leaf[data-sidebar-tab-active="true"]');
  if (!(selected instanceof HTMLElement)) return '';

  const leaf = selected.querySelector('.wex-admin-shell__sidebar-tab-label');
  return leaf instanceof HTMLElement ? leaf.textContent?.trim() ?? '' : '';
}

/**
 * Mounts the Header-owned location label from the active local navigation tab.
 * @param {HTMLElement} shell
 */
export function mountHeaderLocation(shell) {
  const location = shell.querySelector('[data-admin-station-location]');
  if (!(location instanceof HTMLElement)) return;

  const printLocation = () => {
    location.textContent = selectedLocationLabel(shell);
  };

  printLocation();
  shell.addEventListener(LOCATION_CHANGE_EVENT, printLocation);
}

/** @param {HTMLElement} shell */
export function announceLocationChange(shell) {
  shell.dispatchEvent(new CustomEvent(LOCATION_CHANGE_EVENT));
}
