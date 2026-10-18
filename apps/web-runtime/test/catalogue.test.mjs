import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import test from 'node:test';

const pagePaths = ['index.html', 'colour/index.html', 'typography/index.html', 'actions/index.html', 'layout/index.html', 'global-tokens/index.html', 'global-components/index.html', 'component-manager/index.html'];
const pages = await Promise.all(pagePaths.map(async (path) => [path, await readFile(new URL(`../${path}`, import.meta.url), 'utf8')]));
const pageByPath = Object.fromEntries(pages);
const pageSource = pages.map(([, source]) => source).join('\n');
const css = await readFile(new URL('../src/catalogue.css', import.meta.url), 'utf8');
const runtime = await readFile(new URL('../src/main.js', import.meta.url), 'utf8');
const componentManagerPreview = await readFile(new URL('../component-manager/preview.html', import.meta.url), 'utf8');
const componentManagerPreviewRuntime = await readFile(new URL('../src/component-manager-preview.js', import.meta.url), 'utf8');
const adminStation = await readFile(new URL('../admin-station/index.html', import.meta.url), 'utf8');
const adminStationCss = await readFile(new URL('../src/admin-station.css', import.meta.url), 'utf8');
const adminStationRuntime = await readFile(new URL('../src/admin-station.js', import.meta.url), 'utf8');
const adminStationShell = await readFile(new URL('../src/admin-station-shell.js', import.meta.url), 'utf8');
const adminStationRuntimeBehaviour = await readFile(new URL('../src/admin-station-runtime.js', import.meta.url), 'utf8');
const adminStationSidebar = await readFile(new URL('../src/admin-station-sidebar.js', import.meta.url), 'utf8');
const adminStationNavigation = await readFile(new URL('../src/admin-station-navigation.js', import.meta.url), 'utf8');
const renderDescriptionMaterializer = await readFile(new URL('../src/render-description.js', import.meta.url), 'utf8');
const viteConfig = await readFile(new URL('../vite.config.ts', import.meta.url), 'utf8');
const buttonPresentation = await readFile(new URL('../../../packages/ui/src/components/button.ts', import.meta.url), 'utf8');
const logoPresentation = await readFile(new URL('../../../packages/ui/src/components/logo.ts', import.meta.url), 'utf8');
const headerFoundation = await readFile(new URL('../../../packages/wex/src/foundations/header.css', import.meta.url), 'utf8');
const wexLayout = await readFile(new URL('../../../packages/wex/src/foundations/layout.css', import.meta.url), 'utf8');
const elementDirectories = await readdir(new URL('../../../packages/catalogue/content/elements', import.meta.url));

test('builds a neutral root catalogue entry surface and seven catalogue routes plus Admin Station access in order', () => {
  assert.deepEqual(Object.keys(pageByPath), pagePaths);
  assert.match(pageByPath['index.html'], /href="\.\/colour\/"/);
  assert.match(pageByPath['index.html'], /href="\.\/typography\/"/);
  assert.match(pageByPath['index.html'], /href="\.\/actions\/"/);
  assert.match(pageByPath['index.html'], /href="\.\/layout\/"/);
  assert.match(pageByPath['index.html'], /href="\.\/global-tokens\/"/);
  assert.match(pageByPath['index.html'], /href="\.\/global-components\/"/);
  assert.match(pageByPath['index.html'], /href="\.\/component-manager\/"/);
  assert.match(pageByPath['index.html'], /href="\.\/admin-station\/"/);
  const routes = ['./colour/', './typography/', './actions/', './layout/', './global-tokens/', './global-components/', './component-manager/', './admin-station/'];
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
    if (path !== 'index.html') {
      assert.match(source, /href="\.\.\/admin-station\/">Admin Station<\/a>/);
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

test('provides an isolated Component Manager sandbox with the approved Logo candidate only', () => {
  const manager = pageByPath['component-manager/index.html'];
  assert.match(manager, /<a aria-current="page" href="\.\/">Component Manager<\/a>/);
  assert.match(manager, /<h1 id="component-manager-title"[^>]*>Component Manager<\/h1>/);
  assert.match(manager, /data-component-manager-sandbox/);
  assert.match(manager, /mounts the approved Logo candidate in the Header-owned Brand allocation/);
  assert.match(componentManagerPreview, /Component preview/);
  assert.match(componentManagerPreview, /data-component-manager-logo-preview/);
  assert.match(componentManagerPreview, /id="component-manager-logo-mount"/);
  assert.match(componentManagerPreviewRuntime, /createLogoRenderDescription/);
  assert.match(componentManagerPreviewRuntime, /materializeRenderDescription/);
  assert.match(componentManagerPreview, /data-header-compartment="brand"/);
  assert.match(componentManagerPreview, /class="component-manager__logo-allocation"/);
  assert.doesNotMatch(componentManagerPreview, /Admin Shell|data-admin-shell-region/);
  assert.doesNotMatch(componentManagerPreviewRuntime, /createAdminShellMarkup|route:|callback|data-admin-shell-region/);
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
    const control = `value="${value}" data-component-manager-viewport-width="${width}" aria-controls="component-manager-preview-frame"`;
    const offset = manager.indexOf(control);
    assert.ok(offset > previous, `${value} follows the previous authorised viewport mode`);
    assert.match(manager, new RegExp(`${control}[\\s\\S]*${label}`));
    previous = offset;
  });
  assert.match(manager, /value="fluid"[^>]*checked/);
  assert.match(manager, /id="component-manager-viewport-status"[^>]*aria-live="polite"/);
  assert.match(manager, /<iframe id="component-manager-preview-frame"[^>]*title="Component Manager responsive preview"[^>]*src="\.\/preview\.html"[^>]*data-component-manager-viewport="fluid"/);
  assert.match(runtime, /componentManagerPreview\.style\.inlineSize = width === 'fluid' \? '100%' : `\$\{width\}px`/);
  assert.match(runtime, /dataset\.componentManagerViewport = control\.value/);
  assert.match(runtime, /postMessage\(\{ type: 'wex-theme', dark \}, window\.location\.origin\)/);
  assert.match(componentManagerPreview, /class="wex-layout"/);
  assert.match(componentManagerPreviewRuntime, /window\.getComputedStyle\(layout\)/);
  assert.match(componentManagerPreviewRuntime, /window\.innerWidth/);
  assert.match(manager, /href="\.\.\/admin-station\/">Admin Station<\/a>/);
  assert.doesNotMatch(manager, /Admin Shell|data-admin-station|wex-admin-shell/);
  assert.doesNotMatch(componentManagerPreviewRuntime, /1440|1024|767/);
  assert.match(css, /\.component-manager__preview-frame/);
  assert.match(css, /\.component-manager__preview-frame[\s\S]*min-block-size: calc\(var\(--wex-space-64\) \* 16\)/);
  assert.match(css, /\.component-manager__logo-allocation[\s\S]*inline-size: var\(--wex-space-64\);/);
  assert.doesNotMatch(manager, /<button|<form|data-component-(?:definition|fixture|registration)|Drawer|Data Card|Collection/);
  assert.match(componentManagerPreviewRuntime, /label: 'Logo'/);
  assert.match(headerFoundation, /@media \(max-width: 767px\)/);
});

test('keeps the Admin Shell as a standalone Admin Station runtime layout', () => {
  assert.match(viteConfig, /adminStation: fileURLToPath\(new URL\('\.\/admin-station\/index\.html'/);
  assert.match(adminStation, /data-admin-station-layout/);
  ['<header', '<aside', '<main', '<footer'].forEach((landmark) => assert.match(adminStation, new RegExp(landmark)));
  ['header', 'sidebar', 'main', 'footer'].forEach((region) => assert.match(adminStation, new RegExp(`data-admin-station-region="${region}"`)));
  assert.match(adminStation, /class="wex-admin-shell"/);
  assert.match(adminStation, /aria-label="Admin Station sidebar"/);
  assert.match(adminStation, /href="\.\.\/src\/admin-station\.css"/);
  assert.match(adminStation, /src="\.\.\/src\/admin-station\.js"/);
  assert.doesNotMatch(adminStation, /catalogue\.css|src\/main\.js/);
  assert.match(adminStation, /<nav class="wex-admin-shell__sidebar-navigation" aria-label="Admin navigation" data-sidebar-navigation><\/nav>/);
  assert.doesNotMatch(adminStation, /Data Card|Collection|<form|record|permission|persist|adapter|schema|style=/i);
  assert.match(pageSource, /href="\.\.\/admin-station\/">Admin Station<\/a>/);
  assert.match(adminStationCss, /packages\/wex\/src\/index\.css/);
  assert.doesNotMatch(adminStationCss, /catalogue|component-manager|#[0-9a-f]{3,8}|rgb\(|hsl\(/i);
  assert.match(adminStationRuntime, /initialiseAdminStation\(shell\)/);
  assert.match(adminStationRuntimeBehaviour, /localStorage\.getItem\('wex-theme'\)/);
  assert.match(adminStationRuntimeBehaviour, /searchParams\.get\('theme'\)/);
  assert.match(adminStationRuntimeBehaviour, /matchMedia\('\(prefers-color-scheme: dark\)'\)/);
  assert.match(adminStationRuntimeBehaviour, /documentRoot\.dataset\.wexTheme/);
  assert.match(adminStationRuntimeBehaviour, /createLogoRenderDescription/);
  assert.match(adminStationRuntimeBehaviour, /materializeRenderDescription/);
  assert.match(adminStationRuntimeBehaviour, /brand\.dataset\.headerCompartment = 'brand'/);
  assert.match(adminStationRuntimeBehaviour, /title\.textContent = 'VRAX Admin'/);
  assert.match(adminStationRuntimeBehaviour, /label: 'Logo'/);
  assert.doesNotMatch(adminStationRuntimeBehaviour, /typeSystem|componentManager|postMessage|viewport|catalogue/i);
  assert.doesNotMatch(adminStationRuntimeBehaviour, /route:|callback|identitySpace|WEXAMH|fetch\(/);
  assert.match(adminStationShell, /data-admin-station-layout/);
  assert.match(renderDescriptionMaterializer, /document\.createElement\(description\.tagName\)/);
  assert.match(renderDescriptionMaterializer, /document\.createTextNode\(description\.value\)/);
  assert.doesNotMatch(renderDescriptionMaterializer, /Logo|Header|CompuZign|fixture/i);
  assert.match(wexLayout, /\.wex-admin-shell \{/);
  assert.match(headerFoundation, /\.wex-admin-shell__header\s*\{/);
  assert.match(headerFoundation, /\.wex-admin-shell__brand\s*\{/);
  assert.match(headerFoundation, /\.wex-admin-shell__brand \.wex-logo\s*\{[\s\S]*inline-size: calc\(var\(--wex-admin-shell-sidebar-collapsed\) - var\(--wex-space-16\) - var\(--wex-space-16\)\);/);
  assert.doesNotMatch(headerFoundation, /wex-admin-header/);
  assert.match(wexLayout, /block-size: 100dvh;/);
  assert.match(wexLayout, /grid-template-rows: auto minmax\(0, 1fr\) auto;/);
  const adminShellRule = wexLayout.match(/\.wex-admin-shell\s*\{([\s\S]*?)\n\}/);
  assert.ok(adminShellRule, 'missing Admin Shell base rule');
  assert.doesNotMatch(adminShellRule[1], /\bgap\s*:/);
  assert.match(wexLayout, /var\(--wex-space-16\)/);
  assert.match(wexLayout, /var\(--wex-color-layer-0[12]\)/);
  assert.match(wexLayout, /var\(--wex-radius-default\)/);
  assert.doesNotMatch(wexLayout.match(/@media \(max-width: 1024px\)\s*\{[\s\S]*?\n\}/)?.[0] ?? '', /wex-admin-shell/);
  assert.doesNotMatch(wexLayout.slice(wexLayout.indexOf('.wex-admin-shell')), /(?:#[0-9a-f]{3,8}|rgb\(|hsl\()/i);
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

test('keeps the catalogue package and shared Button and Logo presentations platform-neutral', () => {
  assert.deepEqual(elementDirectories.sort(), ['color', 'grid-theory', 'icons', 'motion', 'pictograms', 'spacing', 'themes', 'typography']);
  assert.match(buttonPresentation, /createButtonPresentation/);
  assert.doesNotMatch(buttonPresentation, /document\.|aria-pressed|#[0-9a-f]{3,8}/i);
  assert.match(logoPresentation, /createLogoRenderDescription/);
  assert.match(logoPresentation, /wex-logo__label/);
  assert.doesNotMatch(logoPresentation, /document\.|callback|route|#[0-9a-f]{3,8}/i);
});

test('provides the Admin Station Sidebar rail, compact drawer, rounded split-window controls, and local navigation tabs', () => {
  ['toggle', 'open', 'close', 'backdrop'].forEach((control) => assert.match(adminStation, new RegExp(`data-sidebar-control="${control}"`)));
  assert.match(adminStation, /data-sidebar="collapsed" data-sidebar-hovered="false" data-sidebar-drawer="closed"/);
  assert.match(adminStation, /aria-controls="admin-station-sidebar"/);
  assert.equal((adminStation.match(/<svg /g) ?? []).length, 3);
  assert.equal((adminStation.match(/<svg [^>]*aria-hidden="true"/g) ?? []).length, 3);
  assert.equal((adminStation.match(/<rect x="3\.75" y="4\.5" width="16\.5" height="15" rx="2"/g) ?? []).length, 3);
  assert.equal((adminStation.match(/stroke-linecap="round" d="M9\.75 5\.5v13"/g) ?? []).length, 3);
  assert.match(adminStation, /adapted from Heroicons 24\/outline \(view-columns\)[\s\S]*MIT License/);
  assert.equal((adminStationShell.match(/<rect x="3\.75" y="4\.5" width="16\.5" height="15" rx="2"/g) ?? []).length, 3);
  assert.equal((adminStationShell.match(/stroke-linecap="round" d="M9\.75 5\.5v13"/g) ?? []).length, 3);
  assert.match(adminStationShell, /adapted from Heroicons 24\/outline \(view-columns\)[\s\S]*MIT License/);
  assert.match(adminStation, /wex-admin-shell__sidebar-label wex-type-navigation-small-semibold[^>]*>Menu<\/span>/);
  assert.match(adminStationShell, /wex-admin-shell__sidebar-label wex-type-navigation-small-semibold[^>]*>Menu<\/span>/);
  assert.match(adminStationShell, /<nav class="wex-admin-shell__sidebar-navigation" aria-label="Admin navigation" data-sidebar-navigation><\/nav>/);
  assert.match(wexLayout, /\.wex-admin-shell\[data-sidebar="expanded"\] \.wex-admin-shell__sidebar-label\s*\{\s*display: inline;/);
  assert.match(wexLayout, /\.wex-admin-shell\[data-sidebar-hovered="true"\] \{\s*--wex-admin-shell-sidebar-current: var\(--wex-admin-shell-sidebar-expanded\);/);
  assert.match(wexLayout, /\.wex-admin-shell\[data-sidebar-hovered="true"\] \.wex-admin-shell__sidebar-label\s*\{\s*display: inline;/);
  assert.match(wexLayout, /\.wex-admin-shell__sidebar-label\s*\{[\s\S]*color: var\(--wex-color-text-secondary\);[\s\S]*text-transform: uppercase;/);
  assert.match(wexLayout, /\.wex-admin-shell__control\s*\{[\s\S]*color: var\(--wex-color-text-secondary\);/);
  assert.match(wexLayout, /\.wex-admin-shell__control\s*\{[\s\S]*inline-size: var\(--wex-space-32\);[\s\S]*block-size: var\(--wex-space-32\);/);
  assert.match(wexLayout, /\.wex-admin-shell__control:hover\s*\{\s*border-color: var\(--wex-color-border-interactive\);/);
  assert.match(wexLayout, /\.wex-admin-shell__sidebar-toggle\s*\{\s*border-color: transparent;/);
  assert.match(adminStation, /<main[^>]*><div class="wex-admin-shell__page"><\/div><\/main>/);
  assert.match(adminStation, /<div class="wex-admin-shell__navigation">[\s\S]*<div class="wex-admin-shell__location"><\/div>[\s\S]*<div class="wex-admin-shell__nav-actions"><\/div>/);
  assert.match(adminStation, /<footer[^>]*><\/footer>/);
  assert.doesNotMatch(adminStation, /<a [^>]*href="(?!#admin-station-main)/);
  assert.match(adminStationRuntimeBehaviour, /initSidebar\(shell\)/);
  assert.match(adminStationRuntimeBehaviour, /mountSidebarNavigation\(shell\)/);
  assert.match(adminStationRuntimeBehaviour, /header\.prepend\(brand\)/);
  assert.match(adminStationNavigation, /sidebarTabInputs/);
  ['Dashboard', 'Product Manager', 'New Product', 'All Products', 'Product Keywords', 'Tools'].forEach((label) => assert.match(adminStationNavigation, new RegExp(`label: '${label}'`)));
  assert.match(adminStationNavigation, /wex-admin-shell__sidebar-tab-label wex-type-navigation-small-semibold/);
  assert.doesNotMatch(adminStationNavigation, /wex-admin-shell__sidebar-tab-label wex-type-navigation-default-semibold/);
  assert.match(adminStationNavigation, /dataset\.sidebarTabActive/);
  assert.match(adminStationNavigation, /aria-pressed/);
  assert.match(adminStationNavigation, /aria-expanded/);
  assert.match(adminStationNavigation, /data-sidebar-navigation/);
  assert.match(adminStationNavigation, /id: 'product-manager',[\s\S]*expanded: true,\s*children:/);
  assert.match(adminStationNavigation, /function syncGroupActive\(control, items\)[\s\S]*data-sidebar-tab-active/);
  assert.match(adminStationNavigation, /syncGroupActive\(group, children\);/);
  assert.doesNotMatch(adminStationNavigation, /localStorage|fetch\(|location|route|callback|innerHTML/i);
  assert.match(adminStationSidebar, /COMPACT_QUERY = '\(max-width: 767px\)'/);
  assert.match(adminStationSidebar, /matchMedia\(COMPACT_QUERY\)/);
  assert.match(adminStationSidebar, /function openCompactDrawer\(\) \{[\s\S]*shell\.dataset\.sidebar = 'expanded';[\s\S]*openDrawer\(\{ focus: false \}\);/);
  assert.match(adminStationSidebar, /ui\.openTrigger\.addEventListener\('click', \(\) => \{[\s\S]*isDrawerOpen\(\)[\s\S]*closeDrawer\(\);[\s\S]*openCompactDrawer\(\);/);
  assert.match(adminStationSidebar, /compact\.addEventListener\('change', \(\) => \{[\s\S]*compact\.matches && shell\.dataset\.sidebar === 'expanded'[\s\S]*openDrawer\(\{ focus: false \}\);/);
  assert.match(adminStationSidebar, /pointerover/);
  assert.match(adminStationSidebar, /pointerleave/);
  assert.match(adminStationSidebar, /dataset\.sidebarHovered/);
  assert.match(adminStationSidebar, /event\.key === 'Escape'/);
  assert.match(adminStationSidebar, /returnFocus/);
  assert.match(adminStationSidebar, /\.inert = true/);
  assert.match(adminStationSidebar, /aria-expanded/);
  assert.doesNotMatch(adminStationSidebar, /localStorage|fetch\(|route|callback|viewport|innerHTML/i);
  assert.match(wexLayout, /--wex-admin-shell-header-size: var\(--wex-space-64\);/);
  assert.match(wexLayout, /--wex-admin-shell-collapsed-size: calc\(var\(--wex-space-64\) \+ var\(--wex-space-8\) \+ var\(--wex-space-4\)\);/);
  assert.match(wexLayout, /--wex-admin-shell-sidebar-collapsed: var\(--wex-admin-shell-collapsed-size\);/);
  assert.match(wexLayout, /--wex-admin-shell-sidebar-expanded: calc\(var\(--wex-space-64\) \* 4 \+ var\(--wex-space-16\) \+ var\(--wex-space-8\) \+ var\(--wex-space-8\)\);/);
  assert.match(wexLayout, /--wex-admin-shell-sidebar-header: var\(--wex-admin-shell-sidebar-collapsed\);/);
  assert.match(wexLayout, /\.wex-admin-shell\[data-sidebar="expanded"\] \{[\s\S]*--wex-admin-shell-sidebar-header: var\(--wex-admin-shell-sidebar-expanded\);/);
  assert.match(wexLayout, /\.wex-admin-shell__sidebar\s*\{[\s\S]*inline-size: 100%;[\s\S]*max-inline-size: var\(--wex-admin-shell-sidebar-expanded\);[\s\S]*padding: var\(--wex-space-8\);[\s\S]*box-shadow: inset calc\(-1 \* var\(--wex-border-width-default\)\) 0 0 var\(--wex-color-border-subtle\);[\s\S]*background: var\(--wex-color-layer-01\);/);
  assert.match(wexLayout, /\.wex-admin-shell__sidebar-controls\s*\{[\s\S]*padding: var\(--wex-space-8\);/);
  assert.match(wexLayout, /\.wex-admin-shell__sidebar-navigation\s*\{[\s\S]*padding: var\(--wex-space-8\);/);
  assert.match(wexLayout, /\.wex-admin-shell__sidebar-tab-item\s*\{\s*display: grid;\s*gap: var\(--wex-space-8\);\s*\}/);
  assert.match(wexLayout, /\.wex-admin-shell__sidebar-tab\s*\{[\s\S]*gap: var\(--wex-space-8\);[\s\S]*min-block-size: var\(--wex-space-48\);/);
  assert.match(wexLayout, /\.wex-admin-shell__sidebar-tab-icon\s*\{[\s\S]*inline-size: 100%;[\s\S]*block-size: 100%;[\s\S]*max-inline-size: calc\(var\(--wex-space-48\) - var\(--wex-space-4\)\);[\s\S]*max-block-size: calc\(var\(--wex-space-48\) - var\(--wex-space-4\)\);/);
  assert.match(wexLayout, /\.wex-admin-shell__sidebar-tab-icon-svg\s*\{[\s\S]*inline-size: var\(--wex-icon-size-20\);[\s\S]*block-size: var\(--wex-icon-size-20\);/);
  assert.match(wexLayout, /\.wex-admin-shell__sidebar-tab\[data-sidebar-tab-active="true"\]\s*\{[\s\S]*background: var\(--wex-color-light-grey\);[\s\S]*color: var\(--wex-color-text-accent\);/);
  assert.match(wexLayout, /\.wex-admin-shell__sidebar-tab:not\(\[data-sidebar-tab-active="true"\]\):hover\s*\{[\s\S]*outline: var\(--wex-border-width-default\) solid var\(--wex-color-border-interactive\);/);
  assert.match(wexLayout, /\.wex-admin-shell:not\(\[data-sidebar="expanded"\]\):not\(\[data-sidebar-hovered="true"\]\) \.wex-admin-shell__sidebar-tab\s*\{[\s\S]*inline-size: calc\(var\(--wex-space-48\) - var\(--wex-space-4\)\);[\s\S]*min-block-size: calc\(var\(--wex-space-48\) - var\(--wex-space-4\)\);[\s\S]*block-size: calc\(var\(--wex-space-48\) - var\(--wex-space-4\)\);[\s\S]*padding-block: 0;/);
  assert.match(wexLayout, /\.wex-admin-shell:not\(\[data-sidebar="expanded"\]\):not\(\[data-sidebar-hovered="true"\]\) \.wex-admin-shell__sidebar-tab-label/);
  assert.match(wexLayout, /\.wex-admin-shell__main\s*\{[\s\S]*background: var\(--wex-color-layer-02\);/);
  assert.match(wexLayout, /\.wex-admin-shell__control\s*\{[\s\S]*inline-size: var\(--wex-space-32\);[\s\S]*block-size: var\(--wex-space-32\);/);
  assert.match(wexLayout, /\.wex-admin-shell__control svg \{\s*inline-size: var\(--wex-icon-size-20\);\s*block-size: var\(--wex-icon-size-20\);\s*\}/);
  const compact = wexLayout.slice(wexLayout.indexOf('@media (max-width: 767px)'));
  assert.match(compact, /grid-template-areas:\s*"header"\s*"main"\s*"footer";/);
  assert.match(compact, /\.wex-admin-shell__drawer-trigger\s*\{[\s\S]*display: grid;[\s\S]*inset-inline-start: calc\(var\(--wex-admin-shell-sidebar-collapsed\) \+ var\(--wex-space-16\)\);/);
  assert.match(compact, /\.wex-admin-shell__sidebar\s*\{[\s\S]*display: none;[\s\S]*inset-block: var\(--wex-admin-shell-header-size\) 0;[\s\S]*inline-size: 100%;[\s\S]*max-inline-size: min\(var\(--wex-admin-shell-sidebar-expanded\), calc\(100% - var\(--wex-admin-shell-sidebar-collapsed\)\)\);/);
  assert.match(compact, /data-sidebar-drawer="open"\] \.wex-admin-shell__sidebar\s*\{\s*display: flex;/);
  assert.match(compact, /\.wex-admin-shell__sidebar-controls\s*\{\s*display: none;/);
  assert.match(compact, /data-sidebar-drawer="open"\] \.wex-admin-shell__drawer-trigger\s*\{[\s\S]*color: var\(--wex-color-on-accent\);/);
  assert.match(wexLayout, /\.wex-admin-shell__footer:not\(:empty\)/);
  const shellRules = wexLayout.slice(wexLayout.indexOf('.wex-admin-shell')).replace(/@media \([^)]*\)/g, '');
  assert.doesNotMatch(shellRules, /\d+px|transition|animation|rgba?\(|color-mix/);
});
