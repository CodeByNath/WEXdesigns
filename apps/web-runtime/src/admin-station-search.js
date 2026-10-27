import { closeHeaderResultsShell, requestHeaderResultsShell } from './admin-station-header-results.js';
import { createHeaderActionIcon } from './admin-station-nav-actions.js';
import { sidebarTabInputs } from './admin-station-navigation.js';

const SEARCH_OWNER = 'search';

/** @typedef {'all' | 'dashboard' | 'site' | 'services' | 'tools'} SearchFilter */
/** @typedef {{ id: string, label: string, detail: string, filter: Exclude<SearchFilter, 'all'> }} SearchEntry */

/** @type {ReadonlyArray<SearchEntry>} */
const searchEntries = Object.freeze(/** @type {SearchEntry[]} */ (sidebarTabInputs.flatMap((item) => {
  /** @type {Exclude<SearchFilter, 'all'>} */
  const filter = item.id === 'dashboard'
    ? 'dashboard'
    : item.id === 'site'
      ? 'site'
      : item.id === 'product-manager'
        ? 'services'
        : 'tools';
  const detail = item.label;
  const entries = (item.children ?? []).map((child) => ({
    id: child.id,
    label: child.label,
    detail,
    filter,
  }));
  return entries.length > 0 ? entries : [{ id: item.id, label: item.label, detail: 'Dashboard', filter }];
})));

/** @param {string} query @param {SearchEntry} entry */
function resultRank(query, entry) {
  const normalizedLabel = entry.label.toLocaleLowerCase();
  if (normalizedLabel === query) return 0;
  if (normalizedLabel.startsWith(query)) return 1;
  return 2;
}

/** @param {Document} document @param {string} text @param {string} className */
function element(document, text, className) {
  const node = document.createElement('span');
  node.className = className;
  node.textContent = text;
  return node;
}

/**
 * Mounts the local Header Search Results component. Its local navigation
 * presentation inputs supply searchable labels only; route resolution remains
 * outside this UI boundary.
 * @param {HTMLElement} shell
 * @param {HTMLInputElement} input
 */
export function mountHeaderSearch(shell, input) {
  const results = shell.querySelector('[data-header-results-shell]');
  if (!(results instanceof HTMLElement)) return;

  const document = shell.ownerDocument;
  /** @type {SearchFilter} */
  let filter = 'all';
  /** @type {string[]} */
  const recentQueries = [];

  const wrapper = document.createElement('div');
  wrapper.className = 'wex-admin-search__wrapper';
  const panel = document.createElement('section');
  panel.className = 'wex-admin-search';
  panel.setAttribute('aria-labelledby', 'wex-admin-search-title');

  const header = document.createElement('header');
  header.className = 'wex-admin-search__header';
  const heading = document.createElement('div');
  heading.className = 'wex-admin-search__heading';
  const title = document.createElement('h2');
  title.id = 'wex-admin-search-title';
  title.className = 'wex-type-navigation-large-semibold';
  title.textContent = 'Search';
  const count = element(document, '', 'wex-admin-search__count wex-type-navigation-small-semibold');
  heading.append(title, count);

  const filters = document.createElement('nav');
  filters.className = 'wex-admin-search__filters';
  filters.setAttribute('aria-label', 'Search result filters');
  /** @type {ReadonlyArray<readonly [SearchFilter, string]>} */
  const filterInputs = [
    ['all', 'All'],
    ['dashboard', 'Dashboard'],
    ['site', 'Site'],
    ['services', 'Services'],
    ['tools', 'Tools'],
  ];
  const filterButtons = filterInputs.map(([value, label]) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'wex-button wex-button--small wex-button--subtle wex-admin-search__filter';
    button.dataset.searchFilter = value;
    button.setAttribute('aria-pressed', 'false');
    button.textContent = label;
    return button;
  });
  filters.append(...filterButtons);
  header.append(heading, filters);

  const list = document.createElement('div');
  list.className = 'wex-admin-search__list';
  list.setAttribute('aria-live', 'polite');

  const footer = document.createElement('footer');
  footer.className = 'wex-admin-search__footer';
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'wex-button wex-button--small wex-button--neutral';
  close.textContent = 'Close';
  const clear = document.createElement('button');
  clear.type = 'button';
  clear.className = 'wex-button wex-button--small wex-button--primary';
  clear.textContent = 'Clear search';
  footer.append(close, clear);
  panel.append(header, list, footer);
  wrapper.append(panel);

  const isOpen = () => !results.hidden && results.dataset.headerResultsOwner === SEARCH_OWNER;
  const closeSearch = (restoreFocus = false) => {
    if (isOpen()) closeHeaderResultsShell(shell);
    if (restoreFocus) input.focus();
  };
  const recordQuery = () => {
    const query = input.value.trim();
    if (!query) return;
    const existingIndex = recentQueries.findIndex((recent) => recent.toLocaleLowerCase() === query.toLocaleLowerCase());
    if (existingIndex >= 0) recentQueries.splice(existingIndex, 1);
    recentQueries.unshift(query);
  };
  const openSearch = () => {
    if (isOpen()) return;
    results.replaceChildren(wrapper);
    requestHeaderResultsShell(shell, {
      owner: SEARCH_OWNER,
      inlineSize: 'min(calc(var(--wex-space-64) * 7), 100%)',
      blockSize: 'min(calc(var(--wex-space-64) * 8), calc(100dvh - var(--wex-admin-shell-header-size)))',
    }, input);
  };
  /** @param {SearchEntry} entry */
  const createResult = (entry) => {
    const result = document.createElement('button');
    result.type = 'button';
    result.className = 'wex-admin-search__result';
    result.dataset.searchResult = entry.id;
    result.setAttribute('aria-label', `Search result: ${entry.label}`);
    const visual = document.createElement('span');
    visual.className = 'wex-admin-search__result-icon';
    visual.setAttribute('aria-hidden', 'true');
    visual.append(createHeaderActionIcon(document, 'search'));
    const content = document.createElement('span');
    content.className = 'wex-admin-search__result-content';
    content.append(
      element(document, entry.label, 'wex-type-navigation-small-semibold'),
      element(document, entry.detail, 'wex-admin-search__result-detail wex-type-body-small-regular'),
    );
    result.append(visual, content);
    return result;
  };
  /** @param {string} label @param {ReadonlyArray<SearchEntry>} entries */
  const appendGroup = (label, entries) => {
    if (entries.length === 0) return;
    const group = document.createElement('p');
    group.className = 'wex-admin-search__group wex-type-navigation-small-semibold';
    group.textContent = label;
    list.append(group, ...entries.map(createResult));
  };
  const render = () => {
    const query = input.value.trim().toLocaleLowerCase();
    const queryMatches = query
      ? searchEntries.filter((entry) => `${entry.label} ${entry.detail}`.toLocaleLowerCase().includes(query))
      : [];
    const availableFilters = filterInputs.filter(([value]) => value === 'all'
      || queryMatches.some((entry) => entry.filter === value));
    if (!availableFilters.some(([value]) => value === filter)) filter = 'all';
    const matched = queryMatches.filter((entry) => filter === 'all' || entry.filter === filter);
    count.textContent = `${matched.length} result${matched.length === 1 ? '' : 's'}`;
    count.classList.toggle('wex-admin-search__count--empty', matched.length === 0);
    clear.disabled = input.value.length === 0;
    filters.hidden = queryMatches.length === 0;
    filters.replaceChildren(...filterButtons.filter((button) => availableFilters.some(([value]) => value === button.dataset.searchFilter)));
    filterButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.searchFilter === filter));
    });
    list.replaceChildren();
    if (!query) {
      if (recentQueries.length > 0) {
        const group = document.createElement('p');
        group.className = 'wex-admin-search__group wex-type-navigation-small-semibold';
        group.textContent = 'Recent searches';
        list.append(group);
        recentQueries.forEach((recent) => {
          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'wex-admin-search__recent-query wex-type-body-default-regular';
          button.dataset.recentSearch = recent;
          button.append(createHeaderActionIcon(document, 'search'), document.createTextNode(recent));
          list.append(button);
        });
        return;
      }
      const empty = document.createElement('p');
      empty.className = 'wex-admin-search__empty wex-type-body-default-regular';
      empty.textContent = 'Start typing to search navigation.';
      list.append(empty);
      return;
    }
    if (matched.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'wex-admin-search__empty wex-type-body-default-regular';
      empty.textContent = 'No matching results.';
      list.append(empty);
      return;
    }
    appendGroup('Top results', matched.filter((entry) => resultRank(query, entry) === 0));
    appendGroup('Best matches', matched.filter((entry) => resultRank(query, entry) === 1));
    appendGroup('Other results', matched.filter((entry) => resultRank(query, entry) === 2));
  };

  input.addEventListener('focus', () => {
    openSearch();
    render();
  });
  input.addEventListener('input', () => {
    openSearch();
    render();
  });
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      recordQuery();
      render();
      return;
    }
    if (event.key !== 'Escape' || !isOpen()) return;
    event.preventDefault();
    closeSearch(true);
  });
  filters.addEventListener('click', (event) => {
    const button = event.target instanceof Element ? event.target.closest('[data-search-filter]') : null;
    if (!(button instanceof HTMLButtonElement)) return;
    filter = /** @type {SearchFilter} */ (button.dataset.searchFilter ?? 'all');
    render();
  });
  list.addEventListener('click', (event) => {
    const button = event.target instanceof Element ? event.target.closest('button') : null;
    if (!(button instanceof HTMLButtonElement)) return;
    const recent = button.dataset.recentSearch;
    if (recent) {
      input.value = recent;
      recordQuery();
      input.focus();
      render();
      return;
    }
    if (!button.dataset.searchResult) return;
    recordQuery();
    render();
  });
  clear.addEventListener('click', () => {
    input.value = '';
    input.focus();
    render();
  });
  close.addEventListener('click', () => { closeSearch(); });
  render();
}
