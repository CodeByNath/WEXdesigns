import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const header = readFileSync(resolve(root, 'src/foundations/header.css'), 'utf8');
const index = readFileSync(resolve(root, 'src/index.css'), 'utf8');

test('loads the Admin Header shell foundation and consumes accepted WEX allocation values', () => {
  assert.match(index, /@import "\.\/foundations\/header\.css";/);
  const base = header.match(/\.wex-admin-shell__header\s*\{([\s\S]*?)\}/);
  assert.ok(base, 'missing Header base rule');
  assert.match(base[1], /position: relative;/);
  assert.match(base[1], /display: grid;/);
  assert.match(base[1], /grid-template-columns: var\(--wex-admin-shell-sidebar-header\) minmax\(0, 1fr\);/);
  assert.match(base[1], /gap: var\(--wex-space-8\);/);
  assert.match(base[1], /block-size: var\(--wex-space-64\);/);
  assert.match(base[1], /padding: 0;/);
  assert.match(header, /\.wex-admin-shell__brand\s*\{[\s\S]*position: absolute;[\s\S]*z-index: 1;[\s\S]*box-sizing: border-box;[\s\S]*inline-size: var\(--wex-admin-shell-sidebar-header\);[\s\S]*block-size: var\(--wex-space-64\);[\s\S]*padding-block: var\(--wex-space-4\);[\s\S]*padding-inline-start: var\(--wex-space-16\);[\s\S]*padding-inline-end: var\(--wex-space-16\);[\s\S]*inset-block-start: 0;[\s\S]*inset-inline-start: 0;[\s\S]*background: var\(--wex-color-background-accent\);[\s\S]*color: var\(--wex-color-on-accent\);/);
  const brandRule = header.match(/\.wex-admin-shell__brand\s*\{([\s\S]*?)\n\}/);
  assert.ok(brandRule, 'missing Brand shell base rule');
  assert.match(brandRule[1], /justify-content:\s*flex-start;/);
  assert.match(brandRule[1], /padding-inline-start:\s*var\(--wex-space-16\);/);
  assert.match(header, /\.wex-admin-shell__navigation\s*\{[\s\S]*grid-column: 2;[\s\S]*gap: var\(--wex-space-8\);[\s\S]*padding-block: var\(--wex-space-4\);[\s\S]*padding-inline-end: var\(--wex-space-16\);/);
  assert.match(header, /\.wex-admin-shell__nav-actions\s*\{[\s\S]*display: flex;[\s\S]*gap: var\(--wex-space-8\);/);
  assert.match(header, /\.wex-admin-shell__brand \.wex-logo\s*\{[\s\S]*inline-size: calc\(var\(--wex-space-64\) - var\(--wex-space-16\) - var\(--wex-space-16\)\);[\s\S]*block-size: calc\(var\(--wex-space-64\) - var\(--wex-space-4\) - var\(--wex-space-4\)\);[\s\S]*color: var\(--wex-color-on-accent\);/);
  assert.match(header, /\.wex-admin-shell\[data-sidebar="expanded"\] \.wex-admin-shell__brand\s*\{[\s\S]*justify-content: flex-start;/);
  assert.doesNotMatch(header, /\.wex-admin-shell\[data-sidebar="expanded"\] \.wex-admin-shell__header/);
  assert.match(header, /\.wex-admin-shell\[data-sidebar="expanded"\] \.wex-admin-shell__brand-title\s*\{[\s\S]*display: inline;/);
  assert.doesNotMatch(header, /wex-admin-header|wex-header__|location-label|sidebar-trigger|primary-navigation|main-action/);
  assert.doesNotMatch(header, /#[0-9a-f]{3,8}|rgb\(|hsl\(/i);
});

test('uses the existing compact boundary for the Header Logo allocation', () => {
  const compact = header.match(/@media \(max-width: 767px\)\s*\{([\s\S]*)\}/);
  assert.ok(compact, 'missing compact Header rule');
  assert.doesNotMatch(compact[1], /\.wex-admin-shell__header\s*\{/);
  assert.match(compact[1], /\.wex-admin-shell\[data-sidebar="expanded"\] \.wex-admin-shell__brand\s*\{[\s\S]*inline-size: min\(var\(--wex-admin-shell-sidebar-expanded\), calc\(100% - var\(--wex-space-64\)\)\);/);
  assert.doesNotMatch(header, /(?:768px|1024px|1440px)/);
});
