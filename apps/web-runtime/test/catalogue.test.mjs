import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import test from 'node:test';

const pagePaths = ['index.html', 'colour/index.html', 'typography/index.html', 'actions/index.html', 'layout/index.html', 'global-tokens/index.html', 'global-components/index.html', 'component-manager/index.html'];
const pages = await Promise.all(pagePaths.map(async (path) => [path, await readFile(new URL(`../${path}`, import.meta.url), 'utf8')]));
const pageByPath = Object.fromEntries(pages);
const pageSource = pages.map(([, source]) => source).join('\n');
const css = await readFile(new URL('../src/catalogue.css', import.meta.url), 'utf8');
const runtime = await readFile(new URL('../src/main.js', import.meta.url), 'utf8');
const buttonPresentation = await readFile(new URL('../../../packages/ui/src/components/button.ts', import.meta.url), 'utf8');
const elementDirectories = await readdir(new URL('../../../packages/catalogue/content/elements', import.meta.url));

test('builds a neutral root catalogue entry surface and seven independent routes in order', () => {
  assert.deepEqual(Object.keys(pageByPath), pagePaths);
  assert.match(pageByPath['index.html'], /href="\.\/colour\/"/);
  assert.match(pageByPath['index.html'], /href="\.\/typography\/"/);
  assert.match(pageByPath['index.html'], /href="\.\/actions\/"/);
  assert.match(pageByPath['index.html'], /href="\.\/layout\/"/);
  assert.match(pageByPath['index.html'], /href="\.\/global-tokens\/"/);
  assert.match(pageByPath['index.html'], /href="\.\/global-components\/"/);
  assert.match(pageByPath['index.html'], /href="\.\/component-manager\/"/);
  const routes = ['./colour/', './typography/', './actions/', './layout/', './global-tokens/', './global-components/', './component-manager/'];
  const root = pageByPath['index.html'];
  routes.reduce((lastIndex, route) => {
    const index = root.indexOf(`href="${route}"`);
    assert.ok(index > lastIndex, `${route} must follow the previous foundation route`);
    return index;
  }, -1);
  assert.doesNotMatch(pageByPath['index.html'], /data-wex-colour|type-system|wex-button/);
  assert.match(pageByPath['index.html'], /<h1 id="foundations-title"[^>]*>Catalogue pages<\/h1>/);
  assert.match(pageByPath['index.html'], /aria-label="Catalogue pages"/);
  assert.doesNotMatch(pageByPath['index.html'], /Foundation pages/);
});

test('keeps shared navigation, theme mechanics, and keyboard skip access on every page', () => {
  pages.forEach(([path, source]) => {
    assert.match(source, /<header class="catalogue-header">/);
    assert.match(source, /<footer class="catalogue-footer">/);
    assert.match(source, /id="theme-toggle"/);
    assert.match(source, /href="#main-content"/);
    assert.match(source, /id="main-content"/);
    if (path !== 'index.html') assert.match(source, /aria-label="Catalogue pages"/);
    assert.match(source, /src="(?:\.\/|\.\.\/)+src\/main\.js"/);
    assert.match(source, new RegExp(path === 'index.html' ? 'href="\\.\\/src\\/catalogue\\.css"' : 'href="\\.\\.\\/src\\/catalogue\\.css"'));
    if (path !== 'index.html' && path !== 'global-tokens/index.html') {
      assert.match(source, /href="\.\.\/global-tokens\/">Global Tokens<\/a>/);
    }
    if (path !== 'index.html' && path !== 'global-components/index.html') {
      assert.match(source, /href="\.\.\/global-components\/">Global Components<\/a>/);
    }
    if (path !== 'index.html' && path !== 'component-manager/index.html') {
      assert.match(source, /href="\.\.\/component-manager\/">Component Manager<\/a>/);
    }
  });
  assert.match(runtime, /localStorage\.setItem\('wex-theme'/);
  assert.match(runtime, /root\.dataset\.wexTheme/);
});

test('moves the existing colour presentation to its own route', () => {
  const colour = pageByPath['colour/index.html'];
  assert.match(colour, /<h1 id="colour-title"[^>]*>Colour<\/h1>/);
  assert.match(colour, /data-wex-colour="--wex-color-accent"/);
  assert.match(colour, /data-wex-colour="--wex-color-yellow"/);
  assert.match(colour, /data-wex-colour="--wex-color-green"/);
  assert.match(colour, /data-wex-colour="--wex-color-red"/);
});

test('keeps all registered typography specimens and computed facts on Typography', () => {
  const typography = pageByPath['typography/index.html'];
  assert.match(typography, /id="type-system"/);
  assert.match(typography, /data-wex-value="--wex-type-family-sans"/);
  assert.match(runtime, /weights: \['light', 'regular', 'semibold'\]/);
  assert.match(runtime, /weights: \['semibold'\]/);
  assert.match(runtime, /weights: \['light', 'regular'\]/);
  assert.match(runtime, /typographyTiers = \['small', 'default', 'large'\]/);
  assert.match(runtime, /\['normal', 'italic'\]/);
  assert.match(runtime, /family: computedStyle\.fontFamily/);
  assert.match(runtime, /size: computedStyle\.fontSize/);
  assert.match(runtime, /'line-height': computedStyle\.lineHeight/);
  assert.match(runtime, /weight: computedStyle\.fontWeight/);
  assert.match(runtime, /style: computedStyle\.fontStyle/);
  assert.doesNotMatch(css, /font-(?:family|size|weight|style)|line-height|letter-spacing/);
});

test('limits Actions to existing Button presentation', () => {
  const actions = pageByPath['actions/index.html'];
  ['primary', 'neutral', 'subtle', 'warning', 'danger'].forEach((variant) => assert.match(actions, new RegExp(`wex-button--${variant}`)));
  assert.doesNotMatch(actions, /aria-pressed|onclick=|addEventListener\(['"]click/);
});

test('keeps the Global Components catalogue entrypoint empty', () => {
  const components = pageByPath['global-components/index.html'];
  assert.match(components, /<a aria-current="page" href="\.\/">Global Components<\/a>/);
  assert.match(components, /<h1 id="global-components-title"[^>]*>Global Components<\/h1>/);
  assert.match(components, /Registered components/);
  assert.doesNotMatch(components, /Button|wex-button|<button|aria-pressed|onclick=|addEventListener\(['"]click/);
});

test('provides an isolated Component Manager sandbox without registering a component', () => {
  const manager = pageByPath['component-manager/index.html'];
  assert.match(manager, /<a aria-current="page" href="\.\/">Component Manager<\/a>/);
  assert.match(manager, /<h1 id="component-manager-title"[^>]*>Component Manager<\/h1>/);
  assert.match(manager, /data-component-manager-sandbox/);
  assert.match(manager, /No component is mounted or registered/);
  assert.doesNotMatch(manager, /<button|<form|aria-pressed|onclick=|addEventListener\(['"]click/);
});

test('keeps Component Manager viewport tooling bound to current WEX layout thresholds', () => {
  const manager = pageByPath['component-manager/index.html'];
  assert.match(manager, /<fieldset id="component-manager-viewport-controls"[^>]*aria-describedby="component-manager-viewport-description"/);
  const modes = [
    { value: 'large', width: '1440', label: 'Large · 1440px' },
    { value: 'medium', width: '1024', label: 'Medium · 1024px' },
    { value: 'compact', width: '767', label: 'Compact · 767px' },
    { value: 'fluid', width: 'fluid', label: 'Fluid' },
  ];
  let previous = -1;
  modes.forEach(({ value, width, label }) => {
    const control = `value="${value}" data-component-manager-viewport-width="${width}" aria-controls="component-manager-sandbox-mount"`;
    const offset = manager.indexOf(control);
    assert.ok(offset > previous, `${value} follows the previous authorised viewport mode`);
    assert.match(manager, new RegExp(`${control}[\\s\\S]*${label}`));
    previous = offset;
  });
  assert.match(manager, /value="fluid"[^>]*checked/);
  assert.match(manager, /id="component-manager-viewport-status"[^>]*aria-live="polite"/);
  assert.match(manager, /id="component-manager-sandbox-mount"[^>]*data-component-manager-viewport="fluid"/);
  assert.match(runtime, /style\.maxInlineSize = width === 'fluid' \? 'none' : `\$\{width\}px`/);
  assert.match(runtime, /dataset\.componentManagerViewport = control\.value/);
  assert.match(css, /--component-manager-viewport-width, none/);
  assert.doesNotMatch(manager, /<button|<form|data-component-(?:definition|fixture|registration)|Drawer|Data Card|Collection/);
});

test('moves verified layout presentation values to Layout and presents Typography-aligned Global Tokens', () => {
  const layout = pageByPath['layout/index.html'];
  const tokens = pageByPath['global-tokens/index.html'];
  ['--wex-space-8', '--wex-layout-columns', '--wex-radius-default', '--wex-border-width-default', '--wex-focus-width'].forEach((token) => assert.match(layout, new RegExp(`data-wex-value="${token}"`)));
  assert.match(layout, /Spacing and gaps|Layout and grid|Geometry and radius|Borders|Interaction presentation/);
  assert.doesNotMatch(layout, /#[0-9a-f]{3,8}|rgb\(|hsl\(/i);
  assert.match(pageByPath['index.html'], /href="\.\/global-tokens\/"><span[^>]*>Global Tokens<\/span>/);
  assert.match(tokens, /<a aria-current="page" href="\.\/">Global Tokens<\/a>/);
  assert.match(tokens, /<h1 id="global-tokens-title"[^>]*>Global Tokens<\/h1>/);
  const roleSpecs = [
    { role: 'heading', attributes: ['Heading Default', 'Colour / Light', 'Colour / Accent', 'Weight / Bold', 'Weight / Thin', 'Style / Italic', 'Size / Large', 'Size / Small'], classes: ['wex-type-heading-default-regular', 'wex-type-heading-default-semibold', 'wex-type-heading-default-light', 'wex-type-heading-default-regular-italic', 'wex-type-heading-large-regular', 'wex-type-heading-small-regular'] },
    { role: 'title', attributes: ['Title Default', 'Colour / Light', 'Colour / Accent', 'Weight / Bold', 'Weight / Thin', 'Style / Italic', 'Size / Large', 'Size / Small'], classes: ['wex-type-title-default-regular', 'wex-type-title-default-semibold', 'wex-type-title-default-light', 'wex-type-title-default-regular-italic', 'wex-type-title-large-regular', 'wex-type-title-small-regular'] },
    { role: 'navigation', attributes: ['Navigation Default', 'Colour / Light', 'Colour / Accent', 'Style / Italic', 'Size / Large', 'Size / Small'], classes: ['wex-type-navigation-default-semibold', 'wex-type-navigation-default-semibold-italic', 'wex-type-navigation-large-semibold', 'wex-type-navigation-small-semibold'] },
    { role: 'body', attributes: ['Body Default', 'Colour / Light', 'Colour / Accent', 'Weight / Thin', 'Style / Italic', 'Size / Large', 'Size / Small'], classes: ['wex-type-body-default-regular', 'wex-type-body-default-light', 'wex-type-body-default-regular-italic', 'wex-type-body-large-regular', 'wex-type-body-small-regular'] },
  ];
  const roleOffsets = roleSpecs.map(({ role }) => tokens.indexOf(`data-global-token-role="${role}"`));
  roleOffsets.forEach((offset, index) => assert.ok(offset > (roleOffsets[index - 1] ?? -1), `${roleSpecs[index].role} follows the previous role`));
  roleSpecs.forEach((spec, index) => {
    const roleSource = tokens.slice(roleOffsets[index], roleOffsets[index + 1]);
    let previousAttribute = -1;
    spec.attributes.forEach((attribute) => {
      const attributeIndex = roleSource.indexOf(`>${attribute}</h3>`);
      assert.ok(attributeIndex > previousAttribute, `${spec.role} keeps ${attribute} in role-valid order`);
      previousAttribute = attributeIndex;
    });
    assert.match(roleSource, new RegExp(`${spec.attributes[0]}[\\s\\S]*Base Design Token`));
    spec.classes.forEach((className) => assert.match(roleSource, new RegExp(className)));
    assert.match(roleSource, /global-tokens__card--light-demo[\s\S]*global-tokens__specimen--light/);
    assert.match(roleSource, /global-tokens__specimen--accent/);
  });
  assert.doesNotMatch(tokens.slice(roleOffsets[2], roleOffsets[3]), /Weight \/ (?:Bold|Thin)|wex-type-navigation-default-(?:light|regular)/);
  assert.doesNotMatch(tokens.slice(roleOffsets[3]), /Weight \/ Bold|wex-type-body-default-semibold/);
  assert.match(tokens, /Use each role’s Default Design Token as the base/);
  assert.match(tokens, /global-tokens__card--light-demo[\s\S]*global-tokens__specimen--light/);
  assert.match(css, /global-tokens__card--light-demo[^\n]*var\(--wex-color-white\)/);
  assert.match(css, /global-tokens__card--light-demo[^\n]*border-color: var\(--wex-color-border-subtle\)/);
  assert.match(css, /global-tokens__specimen--light \{ color: var\(--wex-color-white\); \}/);
  assert.doesNotMatch(tokens, /Typography \+ Global Tokens|Canonical vocabulary|Registered attributes|Each attribute changes one concern/);
  assert.doesNotMatch(tokens, /Page Heading|Heading DNA|#[0-9a-f]{3,8}|rgb\(|hsl\(/i);
});

test('uses the canonical WEX bundle and has no retained temporary state presentation', () => {
  assert.match(css, /packages\/wex\/src\/index\.css/);
  assert.doesNotMatch(css, /#[0-9a-f]{3,8}|rgb\(|hsl\(/i);
});

test('keeps the catalogue package and shared Button presentation platform-neutral', () => {
  assert.deepEqual(elementDirectories.sort(), ['color', 'grid-theory', 'icons', 'motion', 'pictograms', 'spacing', 'themes', 'typography']);
  assert.match(buttonPresentation, /createButtonPresentation/);
  assert.doesNotMatch(buttonPresentation, /document\.|aria-pressed|#[0-9a-f]{3,8}/i);
});
