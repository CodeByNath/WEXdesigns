const root = document.documentElement;
/** @type {HTMLInputElement | null} */
const themeToggle = document.querySelector('#theme-toggle');

/** @param {boolean} dark */
function applyTheme(dark) {
  root.dataset.wexTheme = dark ? 'dark' : 'light';
  if (themeToggle) themeToggle.checked = dark;
  window.localStorage.setItem('wex-theme', dark ? 'dark' : 'light');
}

if (themeToggle) {
  themeToggle.addEventListener('change', () => applyTheme(themeToggle.checked));
}

const savedTheme = window.localStorage.getItem('wex-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme ? savedTheme === 'dark' : prefersDark);
