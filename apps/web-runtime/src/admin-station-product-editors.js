/**
 * The product section editors of one Drawer (Overview, Pricing, ...). Each editor registers how it reports its
 * content state and how it discards; the Drawer footer reads the combined state (edited when any editor is,
 * publishable when every editor is) and Discard resets them all. The active editor is the one of the selected
 * product section: the Form Editor and the Editor footer work on it.
 * @typedef {{ dirty: boolean, publishable: boolean }} EditorState
 * @typedef {{ state: (editor: HTMLElement) => EditorState, discard: (editor: HTMLElement) => void }} EditorBehaviour
 */

/** @type {WeakMap<Element, EditorBehaviour>} */
const behaviours = new WeakMap();

/** @param {HTMLElement} editor @param {EditorBehaviour} behaviour */
export function registerProductEditor(editor, behaviour) {
  behaviours.set(editor, behaviour);
}

/** @param {ParentNode} root @returns {HTMLElement[]} */
const editorsIn = (root) => [...root.querySelectorAll('[data-admin-product-editor]')].filter(/** @returns {editor is HTMLElement} */ (editor) => editor instanceof HTMLElement && behaviours.has(editor));

/** Every editor of the Drawer together. @param {ParentNode} root @returns {EditorState} */
export function productEditorsState(root) {
  const states = editorsIn(root).map((editor) => /** @type {EditorBehaviour} */ (behaviours.get(editor)).state(editor));
  return { dirty: states.some((state) => state.dirty), publishable: states.every((state) => state.publishable) };
}

/** Discard: every editor returns to its starting values. @param {ParentNode} root */
export function discardProductEditors(root) {
  for (const editor of editorsIn(root)) /** @type {EditorBehaviour} */ (behaviours.get(editor)).discard(editor);
}

/** The editor of the selected product section (a hovered section only previews), or null. @param {Element} drawer */
export function activeProductEditor(drawer) {
  const body = drawer.querySelector('[data-admin-product-section]');
  const section = body?.getAttribute('data-admin-product-selected') ?? body?.getAttribute('data-admin-product-section');
  return section ? drawer.querySelector(`[data-admin-product-editor="${section}"]`) : null;
}
