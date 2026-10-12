import { initialiseAdminStation } from './admin-station-runtime.js';

const shell = document.querySelector('[data-admin-station-layout]');
if (shell instanceof HTMLElement) initialiseAdminStation(shell);
