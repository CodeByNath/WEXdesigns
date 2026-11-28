import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (name) => readFileSync(new URL(`../src/${name}`, import.meta.url), 'utf8');

test('Edit opens the editor view: Full, Publish as the main action, owner-checked', () => {
  const js = read('admin-station-add-new-sections.js');
  assert.match(js, /addEventListener\(ADMIN_DRAWER_EDIT_EVENT, \(\) => \{[\s\S]*adminDrawerOwner !== owner\) return;\s*setAdminDrawerMode\(shell, 'full'\);\s*setAdminDrawerActionState\(shell, productEditorsState\(shell\)\);/);
  assert.match(js, /addEventListener\(ADMIN_DRAWER_DISCARD_EVENT[\s\S]*adminDrawerOwner !== owner\) return;\s*discardProductEditors\(shell\);/);
});

test('the Overview editor reports dirty and publishable to the footer: every editable field is required, Discard restores the starting values', () => {
  const editor = read('admin-station-product-overview-editor.js');
  assert.equal((editor.match(/required: true/g) ?? []).length, 8);
  assert.doesNotMatch(editor, /name: 'platform-id'[^}]*required/);
  assert.match(editor, /dirty: inputs\.some\(\(input\) => input\.value !== input\.defaultValue\)/);
  assert.match(editor, /publishable: inputs\.every\(\(input\) => !input\.required \|\| input\.value\.trim\(\) !== ''\)/);
  assert.match(editor, /section\.addEventListener\('input', sync\)/);
  assert.match(editor, /input\.value = input\.defaultValue;/);
  assert.match(read('admin-station-outlined-field.js'), /input\.defaultValue = value;\s*input\.required = required;/);
});

test('editor view empties the connections shell and keeps the navigation and each section heading', () => {
  const css = read('admin-station-drawer-editor.css');
  assert.match(css, /\[data-admin-drawer-editing\] \.wex-admin-drawer-connections > :not\(\[data-admin-drawer-unit="quick-actions"\], \.wex-admin-editor-footer\) \{\s*display: none;/);
  assert.match(css, /\[data-admin-drawer-editing\] \.wex-admin-drawer-main > :not\(\.wex-admin-product-editor\) > :not\(\.wex-admin-product-section-head\) \{\s*display: none;/);
  assert.doesNotMatch(css.replace(/@container[^{]*/, ''), /wex-admin-product-sections|drawer-connections \{|#[0-9a-f]{3,8}\b|\d+px/i);
  assert.match(read('admin-station.css'), /@import "\.\/admin-station-drawer-editor\.css";/);
});

test('the Overview editor is one outlined field per value, label on the border, Search Input states, existing tokens only', () => {
  const js = read('admin-station-outlined-field.js');
  assert.match(js, /createElement\('div'\)[\s\S]*createElement\('label'\)[\s\S]*createElement\('textarea'\)/);
  assert.match(js, /control\.dataset\.value = input\.value/);
  assert.match(js, /wex-admin-outlined-field__control wex-type-navigation-small-semibold/);
  assert.match(js, /text\.htmlFor = `wex-admin-field-\$\{name\}`/);
  const editor = read('admin-station-product-overview-editor.js');
  for (const label of ['Name', 'Platform ID', 'Booking ID', 'Marketing Title', 'Tagline', 'Price', 'Duration', 'Language', 'Category']) assert.match(editor, new RegExp(`label: '${label}'`));
  assert.match(editor, /name: 'platform-id', label: 'Platform ID', key: 'id', readOnly: true/);
  assert.match(read('admin-station-add-new-sections.js'), /createProductFaqBooking\(shell\), createProductOverviewEditor\(shell\), createProductPricingEditor\(shell\)\]/);
  const css = read('admin-station-outlined-field.css');
  assert.match(css, /border: var\(--wex-border-width-default\) solid var\(--wex-color-border-subtle\);\s*border-radius: var\(--wex-radius-large\);/);
  assert.doesNotMatch(css, /:hover/);
  assert.match(css, /\.wex-admin-outlined-field \{\s*position: relative;\s*isolation: isolate;/);
  assert.match(css, /__control::after \{[^}]*content: attr\(data-value\) ' ';/);
  assert.match(css, /__input \{\s*grid-area: 1 \/ 1;[^}]*overflow: hidden;[^}]*resize: none;/);
  assert.match(css, /:focus-within \.wex-admin-outlined-field__input \{\s*padding-block: calc\(var\(--wex-space-12\) \+ var\(--wex-space-8\)\);/);
  assert.match(css, /__input \{[^}]*padding: var\(--wex-space-12\);/);
  assert.match(css, /\.wex-admin-outlined-field \{[^}]*padding: 0;/);
  assert.match(css, /__label \{[^}]*color: var\(--wex-color-text-primary\);/);
  assert.match(css, /__input \{[^}]*color: var\(--wex-color-text-secondary\);/);
  assert.match(css, /:focus-within \.wex-admin-outlined-field__label \{\s*color: var\(--wex-color-text-secondary\);/);
  assert.match(css, /:focus-within \.wex-admin-outlined-field__input \{\s*color: var\(--wex-color-text-primary\);/);
  assert.match(css, /:active,\s*\.wex-admin-outlined-field:focus-within,\s*\.wex-admin-outlined-field\[data-form-builder-selected\] \{[^}]*border-color: var\(--wex-outer-ring-color\);/);
  assert.match(css, /:focus-within::after,\s*\.wex-admin-outlined-field\[data-form-builder-selected\]::after \{[^}]*inset: 0;[^}]*border: var\(--wex-outer-ring-inner-width\) solid var\(--wex-outer-ring-color\);/);
  assert.match(css, /:focus-within::before,\s*\.wex-admin-outlined-field\[data-form-builder-selected\]::before \{[^}]*inset: var\(--wex-outer-ring-inner-width\);[^}]*border: var\(--wex-outer-ring-gap\) solid var\(--wex-outer-ring-gap-color\);/);
  assert.match(css, /__label \{[^}]*inset-block-start: 0;[^}]*block-size: var\(--wex-space-24\);[^}]*padding-inline: var\(--wex-pill-notification-status-padding-inline\);[^}]*border: var\(--wex-border-width-default\) solid var\(--wex-color-border-subtle\);[^}]*border-radius: var\(--wex-pill-notification-status-radius\);[^}]*background: var\(--wex-color-background-secondary\);[^}]*transform: translateY\(-50%\);/);
  assert.match(css, /\.wex-admin-outlined-field \.wex-admin-outlined-field__input:focus-visible \{\s*outline: none;/);
  assert.doesNotMatch(css.replace(/@container[^{]*/, ''), /#[0-9a-f]{3,8}\b|\d+(px|rem)/i);
  const editorCss = read('admin-station-drawer-editor.css');
  assert.match(editorCss, /\.wex-admin-product-editor \{\s*display: none;/);
  assert.match(editorCss, /\[data-admin-product-section="overview"\] \.wex-admin-product-editor\[data-admin-product-editor="overview"\],\s*[^{]*\[data-admin-product-section="pricing"\] \.wex-admin-product-editor\[data-admin-product-editor="pricing"\] \{\s*display: grid;\s*gap: var\(--wex-space-24\);\s*(?:\/\*[^*]*\*\/\s*)?margin-block-start: var\(--wex-space-12\);/);
  assert.match(read('admin-station.css'), /@import "\.\/admin-station-outlined-field\.css";/);
});

test('editor proportion: the editor keeps the view 2 : 5 : 3 split, with no grid override of its own', () => {
  const css = read('admin-station-drawer-editor.css');
  assert.doesNotMatch(css, /grid-template-columns|drawer-editor-navigation/);
});

test('editor with the top navigation (Drawer below 840px) centres the main content shell', () => {
  assert.match(read('admin-station-drawer-full.css'), /@container wex-admin-drawer \(width < 840px\) \{[\s\S]*\[data-admin-drawer-editing\] \.wex-admin-drawer-main \{\s*inline-size: min\(calc\(100% \+ var\(--wex-admin-shell-drawer-body-start-inset\) \+ var\(--wex-admin-shell-drawer-body-end-inset\)\), var\(--wex-admin-shell-drawer-column-max-inline-size\)\);\s*justify-self: center;\s*(?:\/\*[^*]*\*\/\s*)?border-block-end: 0;/);
});

test('the editor main content shell never passes the content maximum in any layout', () => {
  assert.match(read('admin-station-drawer-editor.css'), /\[data-admin-drawer-editing\] \.wex-admin-drawer-main \{\s*max-inline-size: var\(--wex-admin-shell-drawer-column-max-inline-size\);/);
});

test('the Form Builder card (icon tile, title, description) shows only in the editor view; clicking it dims the form and navigation and the hovered one returns', () => {
  const js = read('admin-station-form-builder.js');
  assert.match(js, /createElement\('button'\)/);
  assert.match(js, /createSystemIcon\(document, 'columns'\)/);
  assert.match(js, /title\.textContent = 'Form Editor'/);
  assert.match(js, /card\.addEventListener\('click', \(\) => setFormBuilder\(card, card\.getAttribute\('aria-pressed'\) !== 'true'\)\)/);
  assert.match(js, /card\.setAttribute\('aria-pressed', String\(active\)\)/);
  assert.match(read('admin-station-add-new-sections.js'), /createActivityCards\(document\)\]\),\s*createQuickActions\(document\),\s*createEditorFooter\(document\),\s*createConnectionsToggle\(document\),\s*\]\)/);
  assert.match(read('admin-station-drawer-footer.js'), /export function exitAdminDrawerEditor[\s\S]*resetFormBuilder\(parts\.drawer\)/);
  const css = read('admin-station-form-builder.css');
  assert.match(css, /\[data-admin-drawer-unit="quick-actions"\] \{\s*display: none;/);
  assert.match(css, /\[data-admin-drawer-editing\] \.wex-admin-drawer-section\[data-admin-drawer-unit="quick-actions"\] \{\s*display: grid;/);
  assert.match(js, /heading\.textContent = 'Quick actions'/);
  assert.match(css, /:is\(\.wex-admin-product-editor > \[data-field-name\], \.wex-admin-product-sections__tab\) \{\s*opacity: var\(--wex-opacity-disabled\);/);
  assert.match(css, /:hover \{\s*opacity: 1;/);
  assert.doesNotMatch(css.replace(/@container[^{]*/, ''), /#[0-9a-f]{3,8}\b|\d+(px|rem)/i);
  assert.match(read('admin-station.css'), /@import "\.\/admin-station-form-builder\.css";/);
});

test('while the Form Builder is active every value is locked and dimmed, hovered or selected', () => {
  const js = read('admin-station-form-builder.js');
  assert.match(js, /if \(active\) input\.blur\(\);\s*input\.disabled = active;/);
  assert.match(js, /setFormBuilder\(card, false\)/);
  const css = read('admin-station-form-builder.css');
  assert.match(css, /\.wex-admin-outlined-field__input \{\s*opacity: var\(--wex-opacity-disabled\);\s*pointer-events: none;/);
});

test('the content, connections and Editor panel shells scroll with no visible scrollbar', () => {
  const full = read('admin-station-drawer-full.css');
  assert.match(full, /:is\(\.wex-admin-drawer-main, \.wex-admin-drawer-connections\) \{\s*scrollbar-width: none;/);
  assert.match(full, /:is\(\.wex-admin-drawer-main, \.wex-admin-drawer-connections\)::-webkit-scrollbar \{\s*display: none;/);
  const builder = read('admin-station-form-builder.css');
  assert.match(builder, /\.wex-admin-form-tab-panels \{[^}]*overflow-y: auto;[^}]*scrollbar-width: none;/);
  assert.match(builder, /\.wex-admin-form-tab-panels::-webkit-scrollbar \{\s*display: none;/);
});

test('an editor always opens from the top: Edit, choosing a section while editing, and the Form Editor', () => {
  assert.match(read('admin-station-product-editors.js'), /export function showEditorFromTop\(drawer\) \{\s*drawer\.querySelector\('\.wex-admin-drawer-main'\)\?\.scrollTo\(\{ top: 0 \}\);/);
  const sections = read('admin-station-add-new-sections.js');
  assert.match(sections, /setAdminDrawerActionState\(shell, productEditorsState\(shell\)\);\s*showEditorFromTop\(drawer\);/);
  assert.match(sections, /!drawer\.hasAttribute\('data-admin-drawer-editing'\)\) return;\s*if \(event\.target instanceof Element && event\.target\.closest\('\.wex-admin-product-sections__tab'\)\) showEditorFromTop\(drawer\);/);
  assert.match(read('admin-station-form-builder.js'), /\*\/\n\s*showEditorFromTop\(drawer\);\n\s*syncEditor\(drawer\);/);
});

test('Publish makes the published values every editor\'s starting values, so Publish returns to disabled', () => {
  assert.match(read('admin-station-add-new-sections.js'), /addEventListener\(ADMIN_DRAWER_PUBLISH_EVENT[\s\S]*adminDrawerOwner !== owner\) return;\s*publishProductEditors\(shell\);\s*setAdminDrawerActionState\(shell, productEditorsState\(shell\)\);/);
  assert.match(read('admin-station-product-editors.js'), /export function publishProductEditors\(root\)/);
  assert.match(read('admin-station-product-overview-editor.js'), /input\.defaultValue = input\.value;/);
  assert.match(read('admin-station-product-pricing-editor.js'), /publish: \(editor\) => \{\s*initial = pricingEditorValues\(editor\);/);
});

test('Form Editor names a field by its form label (never a value) and a click on any field selects it', () => {
  for (const name of ['admin-station-outlined-field.js', 'admin-station-currency-field.js', 'admin-station-field-repeater.js']) {
    assert.match(read(name), /box\.dataset\.fieldLabel = (options\.)?label;/);
  }
  assert.match(read('admin-station-form-builder.js'), /name\.textContent = `\$\{selected\.getAttribute\('data-field-label'\) \?\? ''\} \(Field\)`;/);
  assert.doesNotMatch(read('admin-station-form-builder.js'), /outlined-field__label'\)\?\.textContent/);
  const css = read('admin-station-form-builder.css');
  assert.match(css, /\.wex-admin-product-editor > \[data-field-name\] :is\(textarea, button, input, select\) \{\s*pointer-events: none;/);
  assert.match(css, /\[data-form-builder-selected\] :is\(\.wex-admin-outlined-field__input, \.wex-admin-currency-field__control\) \{\s*visibility: hidden;/);
});

test('while the Form Builder is active a pressed field never shows the selected padding', () => {
  const css = read('admin-station-form-builder.css');
  assert.match(css, /\[data-field-name\]:active \.wex-admin-outlined-field__input \{\s*padding-block: var\(--wex-space-12\);/);
});

test('activating the Form Builder selects the first field (no hover step) and a clicked field is selected with an accent label', () => {
  const js = read('admin-station-form-builder.js');
  assert.match(js, /closest\('\.wex-admin-product-editor > \[data-field-name\]'\)/);
  assert.match(js, /field\.setAttribute\('data-form-builder-selected', ''\)/);
  assert.match(js, /clearSelection\(drawer\);\n\s*\/\*[^\n]*\*\/\n\s*if \(active\) firstField\(drawer\)\?\.setAttribute\('data-form-builder-selected', ''\)/);
  const css = read('admin-station-form-builder.css');
  assert.doesNotMatch(css, /:first-child/);
  assert.match(css, /\[data-form-builder-selected\] > \.wex-admin-outlined-field__label \{\s*background: var\(--wex-color-background-accent\);\s*color: var\(--wex-color-text-inverse\);/);
  assert.doesNotMatch(css.replace(/@container[^{]*/, ''), /#[0-9a-f]{3,8}\b|\d+(px|rem)/i);
});

test('activating the builder hides the card, reads Editor and shows the two Editor tabs (General, Global) in the Tab Navigation Toggle', () => {
  const js = read('admin-station-form-builder.js');
  assert.match(js, /description\.textContent = 'Choose a field or section to edit\.'/);
  assert.match(js, /\['General', 'Global'\]/);
  assert.match(js, /wex-admin-notifications__filters wex-admin-notifications__filters--toggle wex-admin-notifications__filters--toggle-stretched wex-admin-form-tabs/);
  assert.match(js, /wex-admin-notifications__tab wex-admin-notifications__tab--small-horizontal/);
  assert.match(js, /const label = open \? 'Editor' : 'Quick actions'/);
  assert.match(js, /part\.hidden = !open/);
  const css = read('admin-station-form-builder.css');
  assert.match(css, /\[data-editor-active\] > \.wex-admin-form-builder \{\s*display: none;/);
  assert.match(css, /\.wex-admin-form-tabs\[hidden\] \{\s*display: none;/);
});

test('side by side the Editor tab track spans the whole connections shell and the tabs keep their position', () => {
  const css = read('admin-station-form-builder.css');
  assert.match(css, /@container wex-admin-drawer \(width >= 840px\) \{\s*\.wex-admin-shell\[data-admin-drawer-mode="full"\] \.wex-admin-drawer-section > \.wex-admin-form-tabs \{\s*margin-inline: calc\(-1 \* var\(--wex-space-24\)\) calc\(-1 \* var\(--wex-space-16\)\);\s*padding-inline: calc\(var\(--wex-space-24\) \+ var\(--wex-tab-navigation-toggle-padding\)\) calc\(var\(--wex-space-16\) \+ var\(--wex-tab-navigation-toggle-padding\)\);/);
});

test('the Editor opens only once a field is selected; its General tab holds the Layout and Advanced accordion; the builder disables the footer', () => {
  const js = read('admin-station-form-builder.js');
  assert.match(js, /field\.setAttribute\('data-form-builder-selected', ''\);\s*syncEditor\(drawer\);/);
  assert.match(js, /const generalSections = \['Layout', 'Advanced'\]/);
  assert.match(js, /aria-expanded/);
  assert.match(js, /footer\.inert = active/);
  const css = read('admin-station-form-builder.css');
  assert.match(css, /\.wex-admin-accordion \{\s*border-block-end: var\(--wex-border-width-default\) solid var\(--wex-color-border-subtle\);/);
  assert.match(css, /\[data-admin-drawer-compartment="footer"\] \{\s*opacity: var\(--wex-opacity-disabled\);/);
});

test('the Editor footer: Cancel at the start, one split button of Publish, Save and Discard at the end, disabled until edited, Drawer footer logic', () => {
  const js = read('admin-station-editor-footer.js');
  assert.match(js, /import \{ drawerActionChoices \} from '\.\/admin-station-drawer-footer\.js'/);
  assert.match(js, /cancel\.textContent = 'Cancel'/);
  assert.match(js, /\['publish', 'Publish', ADMIN_EDITOR_PUBLISH_EVENT\],\s*\['save', 'Save', ADMIN_EDITOR_SAVE_EVENT\],\s*\['discard', 'Discard', ADMIN_EDITOR_DISCARD_EVENT\]/);
  assert.match(js, /viewEdit: true, editing: true/);
  assert.match(js, /toggle\.disabled = enabled\.length === 0/);
  assert.match(js, /resetFormBuilder\(drawer\)/);
  assert.doesNotMatch(js, /data-admin-drawer-(action-menu|action-toggle|footer-close|close|publish|save|discard)\b/);
  const css = read('admin-station-editor-footer.css');
  assert.match(css, /\[data-admin-drawer-editing\] \.wex-admin-drawer-connections:has\(\[data-editor-active\]\) > \.wex-admin-editor-footer \{\s*display: flex;/);
  assert.match(css, /border-inline-start: var\(--wex-border-width-default\) solid var\(--wex-color-border-subtle\);/);
  assert.match(css, /grid-template-rows: minmax\(0, 1fr\) auto;/);
  assert.doesNotMatch(css, /#[0-9a-f]{3,8}\b|\d+(px|rem)/i);
  assert.match(read('admin-station.css'), /@import "\.\/admin-station-editor-footer\.css";/);
});


test('the Editor unit keeps its heading and tabs at full height and scrolls only the panel, so an open accordion never squeezes the tabs', () => {
  const css = read('admin-station-form-builder.css');
  assert.match(css, /\[data-editor-active\] \{\s*grid-template-rows: auto auto minmax\(0, 1fr\);/);
  assert.match(css, /\[data-editor-active\] > \.wex-admin-form-tab-panels \{\s*min-block-size: 0;\s*overflow-y: auto;/);
});

test('the whole accordion row toggles its section, not only the header button', () => {
  assert.match(read('admin-station-form-builder.js'), /section\.addEventListener\('click', \(event\) => \{ if \(event\.target === section\) header\.click\(\); \}\)/);
  assert.match(read('admin-station-form-builder.css'), /\.wex-admin-accordion \{\s*cursor: pointer;/);
});

test('the Editor unit runs down to the footer, with no empty band above it', () => {
  const css = read('admin-station-editor-footer.css');
  assert.match(css, /drawer-connections:has\(\[data-editor-active\]\) \{\s*row-gap: 0;/);
  assert.match(css, /\.wex-admin-drawer-section\[data-editor-active\] \{\s*padding-block-end: 0;/);
});

test('Form Editor: the selected field is at full opacity and its value is hidden', () => {
  const css = read('admin-station-form-builder.css');
  assert.match(css, /:is\(\.wex-admin-product-editor > \[data-field-name\], \.wex-admin-product-sections__tab\)\[data-form-builder-selected\] \{\s*opacity: 1;/);
});
