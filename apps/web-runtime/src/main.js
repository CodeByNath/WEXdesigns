const root = document.documentElement;
/** @type {HTMLInputElement | null} */
const themeToggle = document.querySelector('#theme-toggle');

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
applyTheme(savedTheme ? savedTheme === 'dark' : prefersDark);
