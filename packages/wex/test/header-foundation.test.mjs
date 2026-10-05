import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const header = readFileSync(resolve(root, 'src/foundations/header.css'), 'utf8');
const index = readFileSync(resolve(root, 'src/index.css'), 'utf8');

test('loads the Header foundation and consumes accepted WEX allocation values', () => {
  assert.match(index, /@import "\.\/foundations\/header\.css";/);
  const base = header.match(/\.wex-header\s*\{([\s\S]*?)\}/);
  assert.ok(base, 'missing Header base rule');
  assert.match(base[1], /grid-template-columns: var\(--wex-space-64\) minmax\(0, 1fr\);/);
  assert.match(base[1], /block-size: var\(--wex-space-64\);/);
  assert.match(base[1], /padding-inline: var\(--wex-space-16\);/);
  assert.match(header, /\.wex-header__brand\s*\{[\s\S]*inline-size: var\(--wex-space-64\);/);
  assert.match(header, /\.wex-header__navigation\s*\{[\s\S]*padding-inline: var\(--wex-space-8\);/);
  assert.doesNotMatch(header, /#[0-9a-f]{3,8}|rgb\(|hsl\(/i);
});

test('uses the existing compact boundary to replace only the location form', () => {
  const compact = header.match(/@media \(max-width: 767px\)\s*\{([\s\S]*)\}/);
  assert.ok(compact, 'missing compact Header rule');
  assert.match(compact[1], /\.wex-header\s*\{[\s\S]*padding-inline: var\(--wex-space-8\);/);
  assert.match(compact[1], /\.wex-header__location-label\s*\{[\s\S]*display: none;/);
  assert.match(compact[1], /\.wex-header__sidebar-trigger\s*\{[\s\S]*display: inline-flex;/);
  assert.doesNotMatch(header, /(?:768px|1024px|1440px)/);
});

test('keeps location at inline-start and anchors remaining Header slots at inline-end', () => {
  const navigation = header.match(/\.wex-header__navigation\s*\{([\s\S]*?)\}/);
  assert.ok(navigation, 'missing Header navigation rule');
  assert.match(navigation[1], /grid-template-columns: auto minmax\(0, 1fr\) auto auto auto;/);
  assert.match(header, /\.wex-header__location-label,[\s\S]*?\.wex-header__sidebar-trigger\s*\{\s*grid-column: 1;/);
  assert.match(header, /\.wex-header__search\s*\{\s*grid-column: 3;\s*justify-self: end;/);
  assert.match(header, /\.wex-header__primary-navigation\s*\{\s*grid-column: 4;\s*justify-self: end;/);
  assert.match(header, /\.wex-header__main-action\s*\{\s*grid-column: 5;\s*justify-self: end;/);
});
