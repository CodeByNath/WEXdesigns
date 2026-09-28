const root = document.documentElement;
const savedTheme = window.localStorage.getItem('wex-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

root.dataset.wexTheme = savedTheme ? (savedTheme === 'dark' ? 'dark' : 'light') : (prefersDark ? 'dark' : 'light');
