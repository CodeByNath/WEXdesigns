import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../src/catalogue.css', import.meta.url), 'utf8');
const uiBoundary = await readFile(
  new URL('../../../packages/ui/src/index.ts', import.meta.url),
  'utf8',
);
const elementDirectories = await readdir(
  new URL('../../../packages/catalogue/content/elements', import.meta.url),
);

test('keeps only the header, content frame, and footer in the index shell', () => {
  assert.match(html, /<header class="catalogue-header">/);
  assert.match(html, /<main id="main-content" class="catalogue-content wex-page-frame"/);
  assert.match(html, /<section class="catalogue-content__surface"/);
  assert.match(html, /<footer class="catalogue-footer">/);
  assert.doesNotMatch(html, /data-view=|catalogue-sidebar|foundation-section/);
});

test('stores the agreed element families in the catalogue package', () => {
  assert.deepEqual(elementDirectories.sort(), [
    'color',
    'grid-theory',
    'icons',
    'motion',
    'pictograms',
    'spacing',
    'themes',
    'typography',
  ]);
});

test('uses the canonical WEX foundation bundle', () => {
  assert.match(css, /packages\/wex\/src\/index\.css/);
  assert.doesNotMatch(css, /#[0-9a-f]{3,8}|rgb\(|hsl\(/i);
});

test('keeps the shared UI package component-empty', () => {
  assert.equal(uiBoundary.trim(), 'export {};');
});
