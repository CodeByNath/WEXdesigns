import { createButtonPresentation } from '@weerax/ui';

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

const buttonPreview = document.querySelector('#button-preview');
const buttonStatus = document.querySelector('#button-status');

document.addEventListener('wex:semantic-action', (event) => {
  const semanticActionEvent = /** @type {CustomEvent<import('@weerax/schemas').SemanticAction>} */ (
    event
  );
  if (buttonStatus) {
    buttonStatus.textContent = `Preview action requested: ${semanticActionEvent.detail.command}.`;
  }
});

/** @type {import('@weerax/schemas').ButtonDefinitionInput[]} */
const previewButtons = [
  { id: 'primary-action', label: 'Primary action', variant: 'primary' },
  { id: 'secondary-action', label: 'Secondary action', variant: 'secondary' },
  { id: 'ghost-action', label: 'Ghost action', variant: 'ghost', tier: 'small' },
  {
    id: 'delete-action',
    label: 'Delete',
    variant: 'danger',
    tier: 'large',
    action: {
      id: 'delete-action',
      label: 'Delete',
      command: 'catalogue.preview',
      recordId: 'button',
    },
  },
  { id: 'disabled-action', label: 'Unavailable', disabled: true },
];

if (buttonPreview) {
  for (const definition of previewButtons) {
    const presentation = createButtonPresentation(definition);
    const button = document.createElement('button');
    button.id = presentation.id;
    button.type = 'button';
    button.className = presentation.className;
    button.disabled = presentation.disabled;
    button.textContent = presentation.label;

    if (presentation.action) {
      button.dataset.wexAction = presentation.action.id;
      button.addEventListener('click', () => {
        button.dispatchEvent(
          new CustomEvent('wex:semantic-action', {
            bubbles: true,
            detail: presentation.action,
          }),
        );
      });
    }

    buttonPreview.append(button);
  }
}
