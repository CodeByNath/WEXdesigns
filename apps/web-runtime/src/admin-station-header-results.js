/** @typedef {'popover' | 'full-span' | 'end-rail'} HeaderResultsMode */

/** @type {ReadonlyArray<HeaderResultsMode>} */
export const HEADER_RESULTS_MODES = Object.freeze([
  'popover',
  'full-span',
  'end-rail',
]);

const HEADER_RESULTS_REQUEST_EVENT = 'wex:header-results-request';

/** @param {unknown} mode @returns {mode is HeaderResultsMode} */
function isHeaderResultsMode(mode) {
  return typeof mode === 'string' && HEADER_RESULTS_MODES.includes(/** @type {HeaderResultsMode} */ (mode));
}

/** @param {HTMLElement} shell */
function resultsShell(shell) {
  const results = shell.querySelector('[data-header-results-shell]');
  return results instanceof HTMLElement ? results : null;
}

/**
 * Opens the Header-owned results compartment in one approved structural mode.
 * Content mounting and every content state belong to the requesting component.
 * @param {HTMLElement} shell
 * @param {unknown} mode
 */
export function openHeaderResultsShell(shell, mode) {
  const results = resultsShell(shell);
  if (!results || !isHeaderResultsMode(mode)) return false;

  results.dataset.headerResultsMode = mode;
  results.hidden = false;
  return true;
}

/** @param {HTMLElement} shell */
export function closeHeaderResultsShell(shell) {
  const results = resultsShell(shell);
  if (!results) return false;

  results.hidden = true;
  return true;
}

/**
 * Mounts the Header Results shell boundary. A requesting component selects an
 * approved structural mode; this shell never supplies result content or its
 * loading, empty, error, or element-level states.
 * @param {HTMLElement} shell
 */
export function mountHeaderResultsShell(shell) {
  const results = resultsShell(shell);
  if (!results) return;

  shell.addEventListener(HEADER_RESULTS_REQUEST_EVENT, (event) => {
    if (!(event instanceof CustomEvent)) return;
    openHeaderResultsShell(shell, event.detail?.mode);
  });
}

/**
 * Requests a Header Results mode without coupling the requesting component to
 * the shell's DOM or presentation details.
 * @param {HTMLElement} shell
 * @param {HeaderResultsMode} mode
 */
export function requestHeaderResultsShell(shell, mode) {
  shell.dispatchEvent(new CustomEvent(HEADER_RESULTS_REQUEST_EVENT, { detail: { mode } }));
}
