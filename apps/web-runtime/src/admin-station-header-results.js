/**
 * @typedef {{
 *   owner: string,
 *   inlineSize?: string,
 *   blockSize?: string,
 * }} HeaderResultsRequest
 */

const HEADER_RESULTS_REQUEST_EVENT = 'wex:header-results-request';
const HEADER_RESULTS_INLINE_SIZE_PROPERTY = '--wex-admin-shell-header-results-inline-size';
const HEADER_RESULTS_BLOCK_SIZE_PROPERTY = '--wex-admin-shell-header-results-block-size';

/** @param {unknown} request @returns {request is HeaderResultsRequest} */
function isHeaderResultsRequest(request) {
  if (typeof request !== 'object' || request === null) return false;
  const candidate = /** @type {Record<string, unknown>} */ (request);
  return typeof candidate.owner === 'string'
    && candidate.owner.length > 0
    && (candidate.inlineSize === undefined || typeof candidate.inlineSize === 'string')
    && (candidate.blockSize === undefined || typeof candidate.blockSize === 'string');
}

/** @param {HTMLElement} shell */
function resultsShell(shell) {
  const results = shell.querySelector('[data-header-results-shell]');
  return results instanceof HTMLElement ? results : null;
}

/**
 * Opens the Header-owned anchor requested by one component. Content mounting,
 * content state, and requested dimensions belong to that component.
 * @param {HTMLElement} shell
 * @param {unknown} request
 */
export function openHeaderResultsShell(shell, request) {
  const results = resultsShell(shell);
  if (!results || !isHeaderResultsRequest(request)) return false;

  results.dataset.headerResultsOwner = request.owner;
  if (request.inlineSize) {
    results.style.setProperty(HEADER_RESULTS_INLINE_SIZE_PROPERTY, request.inlineSize);
  } else {
    results.style.removeProperty(HEADER_RESULTS_INLINE_SIZE_PROPERTY);
  }
  if (request.blockSize) {
    results.style.setProperty(HEADER_RESULTS_BLOCK_SIZE_PROPERTY, request.blockSize);
  } else {
    results.style.removeProperty(HEADER_RESULTS_BLOCK_SIZE_PROPERTY);
  }
  results.hidden = false;
  return true;
}

/** @param {HTMLElement} shell */
export function closeHeaderResultsShell(shell) {
  const results = resultsShell(shell);
  if (!results) return false;

  delete results.dataset.headerResultsOwner;
  results.style.removeProperty(HEADER_RESULTS_INLINE_SIZE_PROPERTY);
  results.style.removeProperty(HEADER_RESULTS_BLOCK_SIZE_PROPERTY);
  results.hidden = true;
  return true;
}

/**
 * Mounts the Header Results shell boundary. A requesting component supplies
 * its identity and optional dimensions; this shell never supplies result
 * content, content state, or element-level behaviour.
 * @param {HTMLElement} shell
 */
export function mountHeaderResultsShell(shell) {
  const results = resultsShell(shell);
  if (!results) return;

  shell.addEventListener(HEADER_RESULTS_REQUEST_EVENT, (event) => {
    if (!(event instanceof CustomEvent)) return;
    openHeaderResultsShell(shell, event.detail);
  });

  shell.ownerDocument.addEventListener('click', (event) => {
    if (results.hidden || !(event.target instanceof Node) || results.contains(event.target)) return;
    const trigger = event.target instanceof Element
      ? event.target.closest('[data-header-results-trigger]')
      : null;
    if (trigger instanceof HTMLElement && shell.contains(trigger)) return;
    closeHeaderResultsShell(shell);
  });
}

/**
 * Requests the Header Results anchor without coupling a component to its DOM.
 * The optional trigger identifies the action as inside the shell boundary for
 * the click that opened it. An action without a results surface simply does
 * not call this function.
 * @param {HTMLElement} shell
 * @param {HeaderResultsRequest} request
 * @param {HTMLElement} [trigger]
 */
export function requestHeaderResultsShell(shell, request, trigger) {
  const results = resultsShell(shell);
  if (!results || !isHeaderResultsRequest(request)) return false;
  if (trigger && shell.contains(trigger)) trigger.dataset.headerResultsTrigger = '';
  if (!results.hidden && results.dataset.headerResultsOwner === request.owner) {
    return closeHeaderResultsShell(shell);
  }
  shell.dispatchEvent(new CustomEvent(HEADER_RESULTS_REQUEST_EVENT, { detail: request }));
  return true;
}
