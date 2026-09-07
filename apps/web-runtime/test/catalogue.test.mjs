import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../src/catalogue.css', import.meta.url), 'utf8');
const javascript = await readFile(new URL('../src/main.js', import.meta.url), 'utf8');
const uiBoundary = await readFile(
  new URL('../../../packages/ui/src/index.ts', import.meta.url),
  'utf8',
);

test('publishes the three main library categories', () => {
  for (const registry of ['elements', 'guidelines', 'components']) {
    assert.match(html, new RegExp(`data-view="${registry}"`));
  }
});

test('registers the agreed element families', () => {
  const elements = [
    'grid',
    'color',
    'icons',
    'pictograms',
    'motion',
    'spacing',
    'themes',
    'typography',
  ];
  for (const element of elements) {
    assert.match(html, new RegExp(`id="${element}"`));
  }
  for (let index = 1; index < elements.length; index += 1) {
    assert.ok(javascript.indexOf(`'${elements[index - 1]}'`) < javascript.indexOf(`'${elements[index]}'`));
  }
});

test('uses the canonical WEX foundation bundle', () => {
  assert.match(css, /packages\/wex\/src\/index\.css/);
  assert.doesNotMatch(css, /#[0-9a-f]{3,8}|rgb\(|hsl\(/i);
});

test('keeps the shared UI package component-empty', () => {
  assert.equal(uiBoundary.trim(), 'export {};');
});
