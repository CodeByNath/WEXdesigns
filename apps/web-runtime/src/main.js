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

/** @param {string} tag @param {string} [className] @param {string} [content] */
function createElement(tag, className, content) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (content) element.textContent = content;
  return element;
}

function renderTypographySystem() {
  if (!typeSystem) return;
  typographySets.forEach(({ name, key, weights, sample }) => {
    const set = createElement('section', 'type-system__set');
    const setTitleId = `type-set-${key}`;
    set.setAttribute('aria-labelledby', setTitleId);
    const header = createElement('header', 'type-system__set-header');
    const heading = createElement('h3', 'wex-type-title-small-semibold', name);
    heading.id = setTitleId;
    header.append(heading, createElement('p', 'wex-type-body-small-regular', 'Small, Default, and Large'));
    const tiers = createElement('div', 'type-system__tiers');
    typographyTiers.forEach((tier) => {
      const tierElement = createElement('section', 'typography-tier');
      const tierTitleId = `${key}-${tier}-title`;
      tierElement.setAttribute('aria-labelledby', tierTitleId);
      const tierHeading = createElement('h4', `wex-type-navigation-${tier}-semibold`, `${tier.slice(0, 1).toUpperCase()}${tier.slice(1)}`);
      tierHeading.id = tierTitleId;
      const specimens = createElement('div', 'typography-specimens');
      weights.forEach((weight) => ['normal', 'italic'].forEach((style) => {
        const className = `wex-type-${key}-${tier}-${weight}${style === 'italic' ? '-italic' : ''}`;
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
      }));
      tierElement.append(tierHeading, specimens);
      tiers.append(tierElement);
    });
    set.append(header, tiers);
    typeSystem.append(set);
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
