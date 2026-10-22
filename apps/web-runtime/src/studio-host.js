import './admin-station.css';

import { mountAdminStation } from './admin-station-shell.js';
import { resolveHeaderPrimaryActionProperties } from './header-primary-action-property-binding.js';
import { resolveLogoImagePropertyBinding } from './logo-property-binding.js';

const MOUNT_SELECTOR = '#qsd-studio-host';
const HOST_OPTIONS_KEY = 'wexStudioHostOptions';

function readStudioHostOptions() {
  const options = Reflect.get(globalThis, HOST_OPTIONS_KEY);
  return typeof options === 'object' && options !== null && !Array.isArray(options)
    ? options
    : {};
}

/**
 * Mounts the WEX-owned Dashboard only when the host has supplied its approved
 * mount point. Its caller owns external record resolution and may supply the
 * approved Logo and Header primary-action presentation values; this module has
 * no QSD API, storage, or identity integration.
 * @param {{
 *   logoImageBinding?: unknown,
 *   primaryActionIcon?: unknown,
 *   primaryActionImageBinding?: unknown,
 *   sourceValues?: unknown,
 * }} [options]
 */
export function mountStudioHost(options = {}) {
  const mount = document.querySelector(MOUNT_SELECTOR);
  if (!(mount instanceof HTMLElement)) {
    document.documentElement.dataset.wexStudioHost = 'mount-unavailable';
    return { state: 'mount-unavailable' };
  }

  try {
    const logoProperties = resolveLogoImagePropertyBinding(
      options.logoImageBinding,
      options.sourceValues,
    );
    const primaryActionProperties = resolveHeaderPrimaryActionProperties(
      options.primaryActionIcon,
      options.primaryActionImageBinding,
      options.sourceValues,
    );
    mountAdminStation(mount, { logoProperties, primaryActionProperties });
    mount.dataset.wexStudioHost = 'mounted';
    return { state: 'mounted' };
  } catch {
    mount.replaceChildren();
    mount.dataset.wexStudioHost = 'mount-error';
    return { state: 'mount-error' };
  }
}

mountStudioHost(readStudioHostOptions());
