const LOCATION_CHANGE_EVENT = 'wex-admin-station-location-change';

/** @param {HTMLElement} shell */
function selectedLocationLabels(shell) {
  const selected = shell.querySelector('.wex-admin-shell__sidebar-tab--leaf[data-sidebar-tab-active="true"]');
  if (!(selected instanceof HTMLElement)) return [];

  const item = selected.closest('.wex-admin-shell__sidebar-tab-item');
  const group = item?.querySelector(':scope > .wex-admin-shell__sidebar-tab--group .wex-admin-shell__sidebar-tab-label');
  const leaf = selected.querySelector('.wex-admin-shell__sidebar-tab-label');
  return [group, leaf]
    .filter((label) => label instanceof HTMLElement)
    .map((label) => label.textContent?.trim() ?? '')
    .filter(Boolean);
}

/**
 * Mounts the Header-owned location label from the active local navigation tab.
 * @param {HTMLElement} shell
 */
export function mountHeaderLocation(shell) {
  const location = shell.querySelector('[data-admin-station-location]');
  if (!(location instanceof HTMLElement)) return;

  const printLocation = () => {
    location.textContent = selectedLocationLabels(shell).join(' / ');
  };

  printLocation();
  shell.addEventListener(LOCATION_CHANGE_EVENT, printLocation);
}

/** @param {HTMLElement} shell */
export function announceLocationChange(shell) {
  shell.dispatchEvent(new CustomEvent(LOCATION_CHANGE_EVENT));
}
