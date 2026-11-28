import { resetFormBuilder } from './admin-station-form-builder.js';
import { createSystemIcon } from './admin-station-system-icons.js';

/**
 * Editor view, desktop Full (Owner-directed, 28 November 2026): the connections shell (Quick actions, the
 * Editor and its footer) collapses to a strip that keeps only this chevron, so it works as a small side
 * drawer. Collapsed (the default) the chevron points left; pressed, the shell opens over the content at its
 * own width and the chevron points right to close it again. The chevron is Action Button Icon Only Small,
 * Circular, Neutral (Owner-directed): its size, icon size, shape and states. The state is `data-admin-connections-open` on
 * the Drawer, read by `admin-station-connections-toggle.css`; no inline styles. While the Form Editor is
 * active (Owner-directed) the button is an x that cancels the editor workflow, exactly as the Editor
 * footer's Cancel (`resetFormBuilder`). Closing the Form Editor collapses the shell, and so does a click
 * outside the open shell while the Form Editor is not active.
 * @param {Document} document
 */
export function createConnectionsToggle(document) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'wex-button wex-button--small wex-button--neutral wex-action-button-icon-only--small wex-action-button-icon-only--circular wex-admin-connections-toggle';
  button.dataset.adminConnectionsToggle = '';
  const drawerOf = () => button.closest('[data-admin-drawer-shell]');
  const editorActive = () => !!drawerOf()?.querySelector('[data-editor-active]');
  const draw = () => {
    const open = !!drawerOf()?.hasAttribute('data-admin-connections-open');
    const active = editorActive();
    const label = active ? 'Cancel editor' : open ? 'Hide quick actions' : 'Show quick actions';
    // Open, the shell closes with an x too (Owner-directed); it keeps the open position, not the Form Editor's.
    if (active) button.removeAttribute('aria-expanded');
    else button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', label);
    button.title = label;
    button.replaceChildren(createSystemIcon(document, active || open ? 'x' : 'chevron-left'));
  };
  button.addEventListener('click', () => {
    const drawer = drawerOf();
    if (!(drawer instanceof HTMLElement)) return;
    if (editorActive()) resetFormBuilder(drawer);
    else drawer.toggleAttribute('data-admin-connections-open');
    draw();
  });
  // The Form Editor opens and closes from several places; the button follows it. Closing the Form Editor
  // (the x or the Editor footer's Cancel) collapses the shell with it (Owner-directed).
  let wasActive = false;
  const follow = () => {
    const active = editorActive();
    if (wasActive && !active) drawerOf()?.removeAttribute('data-admin-connections-open');
    wasActive = active;
    draw();
  };
  if (typeof MutationObserver === 'function' && document.documentElement) {
    new MutationObserver(follow).observe(document.documentElement, {
      attributes: true, subtree: true, attributeFilter: ['data-editor-active', 'data-admin-connections-open'],
    });
  }
  // A click outside the open shell collapses it, unless the Form Editor is active (Owner-directed): then a
  // click in the form selects a field.
  document.addEventListener('click', (event) => {
    const drawer = drawerOf();
    if (!drawer?.hasAttribute('data-admin-connections-open') || editorActive()) return;
    const shell = button.closest('.wex-admin-drawer-connections');
    // The path is fixed at dispatch: the chevron redraws its icon on click, so the target may be detached.
    if (shell && event.composedPath().includes(shell)) return;
    drawer.removeAttribute('data-admin-connections-open');
  });
  draw();
  return button;
}
