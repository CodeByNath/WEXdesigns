import './admin-station.css';

import { mountAdminStation } from './admin-station-shell.js';

const MOUNT_SELECTOR = '#qsd-studio-host';

/**
 * Mounts the WEX-owned Dashboard only when the host has supplied its approved
 * mount point. This phase deliberately has no QSD API, storage, or identity
 * integration.
 */
export function mountStudioHost() {
  const mount = document.querySelector(MOUNT_SELECTOR);
  if (!(mount instanceof HTMLElement)) {
    document.documentElement.dataset.wexStudioHost = 'mount-unavailable';
    return { state: 'mount-unavailable' };
  }

  try {
    mountAdminStation(mount);
    mount.dataset.wexStudioHost = 'mounted';
    return { state: 'mounted' };
  } catch {
    mount.replaceChildren();
    mount.dataset.wexStudioHost = 'mount-error';
    return { state: 'mount-error' };
  }
}

mountStudioHost();
