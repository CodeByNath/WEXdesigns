const root = document.documentElement;
/** @type {HTMLInputElement | null} */
const themeToggle = document.querySelector('#theme-toggle');
/** @type {HTMLElement | null} */
const typeSystem = document.querySelector('#type-system');

const typographySets = [
  { name: 'Heading', key: 'heading', weights: ['light', 'regular', 'semibold'], sample: 'Design with clarity' },
  { name: 'Title', key: 'title', weights: ['light', 'regular', 'semibold'], sample: 'Foundation overview' },
  { name: 'Navigation', key: 'navigation', weights: ['semibold'], sample: 'System settings' },
  { name: 'Body', key: 'body', weights: ['light', 'regular'], sample: 'WEX supplies the presentation language.' },
];
const typographyTiers = ['small', 'default', 'large'];
const typographyFacts = [['Family', 'family'], ['Size', 'size'], ['Line height', 'line-height'], ['Weight', 'weight'], ['Style', 'style']];
const typographySpecimens = typographyTiers.flatMap((tier) => typographySets.flatMap(({ name, key, weights, sample }) => (
  weights.flatMap((weight) => ['normal', 'italic'].map((style) => ({
    setName: name,
    setKey: key,
    tier,
    sample,
    className: `wex-type-${key}-${tier}-${weight}${style === 'italic' ? '-italic' : ''}`,
  })))
)));

/** @param {string} tag @param {string} [className] @param {string} [content] */
function createElement(tag, className, content) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (content) element.textContent = content;
  return element;
}

function renderTypographySystem() {
  if (!typeSystem) return;

  const tabs = createElement('div', 'type-system__tabs');
  tabs.setAttribute('role', 'tablist');
  tabs.setAttribute('aria-label', 'WEX typography tier');

  typographyTiers.forEach((tier) => {
    const tab = document.createElement('button');
    tab.className = 'type-system__tab wex-type-navigation-default-semibold';
    tab.textContent = `${tier.slice(0, 1).toUpperCase()}${tier.slice(1)}`;
    tab.type = 'button';
    tab.id = `type-system-tab-${tier}`;
    tab.dataset.wexTierTab = tier;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', `type-system-panel-${tier}`);
    tab.addEventListener('click', () => activateTypographyTier(tier));
    tab.addEventListener('keydown', (event) => {
      const currentIndex = typographyTiers.indexOf(tier);
      let nextTier;
      if (event.key === 'ArrowLeft') nextTier = typographyTiers[(currentIndex + typographyTiers.length - 1) % typographyTiers.length];
      if (event.key === 'ArrowRight') nextTier = typographyTiers[(currentIndex + 1) % typographyTiers.length];
      if (event.key === 'Home') nextTier = typographyTiers[0];
      if (event.key === 'End') nextTier = typographyTiers[typographyTiers.length - 1];
      if (nextTier) {
        event.preventDefault();
        activateTypographyTier(nextTier, true);
      }
    });
    tabs.append(tab);
  });

  typeSystem.append(tabs);
  typographyTiers.forEach((tier) => {
    const panel = createElement('div', 'type-system__panel');
    panel.id = `type-system-panel-${tier}`;
    panel.dataset.wexTierPanel = tier;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', `type-system-tab-${tier}`);
    panel.tabIndex = -1;
    const sets = createElement('div', 'type-system__sets');

    typographySets.forEach(({ name, key }) => {
      const set = createElement('section', 'type-system__set');
      const setTitleId = `type-set-${tier}-${key}`;
      set.setAttribute('aria-labelledby', setTitleId);
      const header = createElement('header', 'type-system__set-header');
      const heading = createElement('h3', 'wex-type-title-small-semibold', name);
      heading.id = setTitleId;
      header.append(heading);
      const specimens = createElement('div', 'typography-specimens');
      typographySpecimens.filter(({ tier: specimenTier, setKey }) => specimenTier === tier && setKey === key).forEach(({ className, sample }) => {
        const specimen = createElement('article', 'typography-specimen');
        const renderedSample = createElement('p', `typography-specimen__sample ${className}`, sample);
        renderedSample.dataset.wexTypography = '';
        const facts = createElement('dl', 'typography-specimen__facts');
        typographyFacts.forEach(([label, fact]) => {
          const factElement = document.createElement('div');
          const value = document.createElement('dd');
          value.setAttribute(`data-wex-type-${fact}`, '');
          factElement.append(createElement('dt', '', label), value);
          facts.append(factElement);
        });
        specimen.append(renderedSample, createElement('code', 'typography-specimen__class wex-type-navigation-small-semibold', className), facts);
        specimens.append(specimen);
      });
      set.append(header, specimens);
      sets.append(set);
    });
    panel.append(sets);
    typeSystem.append(panel);
  });

  activateTypographyTier('default');
}

/** @param {string} tier @param {boolean} [moveFocus] */
function activateTypographyTier(tier, moveFocus = false) {
  if (!typeSystem) return;
  /** @type {NodeListOf<HTMLElement>} */ (typeSystem.querySelectorAll('[data-wex-tier-tab]')).forEach((tab) => {
    const isActive = tab.dataset.wexTierTab === tier;
    tab.setAttribute('aria-selected', String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
    if (isActive && moveFocus) tab.focus();
  });
  /** @type {NodeListOf<HTMLElement>} */ (typeSystem.querySelectorAll('[data-wex-tier-panel]')).forEach((panel) => {
    panel.hidden = panel.dataset.wexTierPanel !== tier;
  });
}

function resolveTypographyFacts() {
  /** @type {NodeListOf<HTMLElement>} */ (document.querySelectorAll('[data-wex-typography]')).forEach((specimen) => {
    const computedStyle = window.getComputedStyle(specimen);
    const facts = { family: computedStyle.fontFamily, size: computedStyle.fontSize, 'line-height': computedStyle.lineHeight, weight: computedStyle.fontWeight, style: computedStyle.fontStyle };
    Object.entries(facts).forEach(([fact, value]) => {
      const output = specimen.parentElement?.querySelector(`[data-wex-type-${fact}]`);
      if (output) output.textContent = value;
    });
  });
}

function resolveWexValues() {
  const computedStyle = window.getComputedStyle(root);

  /** @type {NodeListOf<HTMLElement>} */ (document.querySelectorAll('[data-wex-value]')).forEach((element) => {
    const token = element.dataset.wexValue;
    if (token) element.textContent = computedStyle.getPropertyValue(token).trim();
  });

  /** @type {NodeListOf<HTMLElement>} */ (document.querySelectorAll('[data-wex-colour]')).forEach((row) => {
    const token = row.dataset.wexColour;
    const value = token ? computedStyle.getPropertyValue(token).trim() : '';
    /** @type {HTMLElement | null} */
    const swatch = row.querySelector('.colour-row__swatch');
    /** @type {HTMLOutputElement | null} */
    const output = row.querySelector('.colour-row__value');
    if (swatch) swatch.style.backgroundColor = value;
    if (output) output.textContent = value;
  });
  resolveTypographyFacts();
}

/** @param {boolean} dark */
function applyTheme(dark) {
  root.dataset.wexTheme = dark ? 'dark' : 'light';
  if (themeToggle) themeToggle.checked = dark;
  window.localStorage.setItem('wex-theme', dark ? 'dark' : 'light');
  resolveWexValues();
}

if (themeToggle) {
  themeToggle.addEventListener('change', () => applyTheme(themeToggle.checked));
}

const savedTheme = window.localStorage.getItem('wex-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
renderTypographySystem();
applyTheme(savedTheme ? savedTheme === 'dark' : prefersDark);
