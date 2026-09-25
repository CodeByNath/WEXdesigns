import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import test from 'node:test';

const pagePaths = ['index.html', 'colour/index.html', 'typography/index.html', 'actions/index.html', 'layout/index.html', 'design-tokens/index.html'];
const pages = await Promise.all(pagePaths.map(async (path) => [path, await readFile(new URL(`../${path}`, import.meta.url), 'utf8')]));
const pageByPath = Object.fromEntries(pages);
const pageSource = pages.map(([, source]) => source).join('\n');
const css = await readFile(new URL('../src/catalogue.css', import.meta.url), 'utf8');
const runtime = await readFile(new URL('../src/main.js', import.meta.url), 'utf8');
const buttonPresentation = await readFile(new URL('../../../packages/ui/src/components/button.ts', import.meta.url), 'utf8');
const elementDirectories = await readdir(new URL('../../../packages/catalogue/content/elements', import.meta.url));

test('builds a root entry surface and five independent foundation routes in order', () => {
  assert.deepEqual(Object.keys(pageByPath), pagePaths);
  assert.match(pageByPath['index.html'], /href="\.\/colour\/"/);
  assert.match(pageByPath['index.html'], /href="\.\/typography\/"/);
  assert.match(pageByPath['index.html'], /href="\.\/actions\/"/);
  assert.match(pageByPath['index.html'], /href="\.\/layout\/"/);
  assert.match(pageByPath['index.html'], /href="\.\/design-tokens\/"/);
  const routes = ['./colour/', './typography/', './actions/', './layout/', './design-tokens/'];
  const root = pageByPath['index.html'];
  routes.reduce((lastIndex, route) => {
    const index = root.indexOf(`href="${route}"`);
    assert.ok(index > lastIndex, `${route} must follow the previous foundation route`);
    return index;
  }, -1);
  assert.doesNotMatch(pageByPath['index.html'], /data-wex-colour|type-system|wex-button/);
});

test('keeps shared navigation, theme mechanics, and keyboard skip access on every page', () => {
  pages.forEach(([path, source]) => {
    assert.match(source, /<header class="catalogue-header">/);
    assert.match(source, /<footer class="catalogue-footer">/);
    assert.match(source, /id="theme-toggle"/);
    assert.match(source, /href="#main-content"/);
    assert.match(source, /id="main-content"/);
    assert.match(source, /src="(?:\.\/|\.\.\/)+src\/main\.js"/);
    assert.match(source, new RegExp(path === 'index.html' ? 'href="\\.\\/src\\/catalogue\\.css"' : 'href="\\.\\.\\/src\\/catalogue\\.css"'));
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

test('moves verified layout presentation values to Layout and keeps Design Tokens empty', () => {
  const layout = pageByPath['layout/index.html'];
  const tokens = pageByPath['design-tokens/index.html'];
  ['--wex-space-8', '--wex-layout-columns', '--wex-radius-default', '--wex-border-width-default', '--wex-focus-width'].forEach((token) => assert.match(layout, new RegExp(`data-wex-value="${token}"`)));
  assert.match(layout, /Spacing and gaps|Layout and grid|Geometry and radius|Borders|Interaction presentation/);
  assert.doesNotMatch(layout, /#[0-9a-f]{3,8}|rgb\(|hsl\(/i);
  assert.match(tokens, /<h1 id="tokens-title"[^>]*>Design Tokens<\/h1>/);
  assert.doesNotMatch(tokens, /data-wex-value|token-groups|token-group|token-list/);
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
