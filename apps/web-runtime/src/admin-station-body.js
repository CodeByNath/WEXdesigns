/** @typedef {{ owner: string }} AdminBodyRequest */

const ADMIN_BODY_REQUEST_EVENT = 'wex:admin-body-request';

/** @param {unknown} request @returns {request is AdminBodyRequest} */
function isAdminBodyRequest(request) {
  if (typeof request !== 'object' || request === null) return false;
  const candidate = /** @type {Record<string, unknown>} */ (request);
  return typeof candidate.owner === 'string' && candidate.owner.length > 0;
}

/** @param {HTMLElement} shell */
function bodyShell(shell) {
  const body = shell.querySelector('[data-admin-body-shell]');
  return body instanceof HTMLElement ? body : null;
}

/**
 * Opens the Admin-owned full-workspace body frame for one requesting component.
 * Mounted content owns all interior structure, presentation, and state.
 * @param {HTMLElement} shell
 * @param {unknown} request
 */
export function openAdminBodyShell(shell, request) {
  const body = bodyShell(shell);
  if (!body || !isAdminBodyRequest(request)) return false;

  body.dataset.adminBodyOwner = request.owner;
  body.hidden = false;
  shell.dataset.adminBody = 'open';
  return true;
}

/** @param {HTMLElement} shell */
export function closeAdminBodyShell(shell) {
  const body = bodyShell(shell);
  if (!body) return false;

  delete body.dataset.adminBodyOwner;
  body.hidden = true;
  shell.dataset.adminBody = 'closed';
  return true;
}

/** @param {HTMLElement} shell */
export function mountAdminBodyShell(shell) {
  const body = bodyShell(shell);
  if (!body) return;

  shell.addEventListener(ADMIN_BODY_REQUEST_EVENT, (event) => {
    if (event instanceof CustomEvent) openAdminBodyShell(shell, event.detail);
  });

  shell.ownerDocument.addEventListener('click', (event) => {
    if (body.hidden || !(event.target instanceof Node) || body.contains(event.target)) return;
    const trigger = event.target instanceof Element
      ? event.target.closest('[data-admin-body-trigger]')
      : null;
    if (trigger instanceof HTMLElement && shell.contains(trigger)) return;
    closeAdminBodyShell(shell);
  });
}

/**
 * Requests the full Admin Body frame without coupling navigation to its DOM.
 * @param {HTMLElement} shell
 * @param {AdminBodyRequest} request
 * @param {HTMLElement} [trigger]
 */
export function requestAdminBodyShell(shell, request, trigger) {
  const body = bodyShell(shell);
  if (!body || !isAdminBodyRequest(request)) return false;
  if (trigger && shell.contains(trigger)) trigger.dataset.adminBodyTrigger = '';
  if (!body.hidden && body.dataset.adminBodyOwner === request.owner) {
    return closeAdminBodyShell(shell);
  }
  shell.dispatchEvent(new CustomEvent(ADMIN_BODY_REQUEST_EVENT, { detail: request }));
  return true;
}
