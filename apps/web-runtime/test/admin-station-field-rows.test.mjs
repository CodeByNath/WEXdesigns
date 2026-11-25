import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { canMoveField, moveField, needsShareChoice, rowsOf, setRowReverse } from '../src/admin-station-field-rows.js';

const read = (name) => readFileSync(new URL(`../src/${name}`, import.meta.url), 'utf8');
const form = (...roles) => roles.map((role, index) => ({ id: 'ABCDEF'[index], role, reverse: false }));
const order = (items) => items.map((item) => item.id).join('');
const roles = (items) => items.map((item) => item.role).join(',');

test('a lone neighbour raises the prompt; Share row gives a two-field row, Swap position changes the order', () => {
  const items = form('own', 'own', 'own');
  assert.equal(needsShareChoice(items, 'B', 'up'), true);
  assert.equal(moveField(items, 'B', 'up'), null);
  const shared = moveField(items, 'B', 'up', 'share');
  assert.equal(order(shared), 'ABC');
  assert.equal(roles(shared), 'first,second,own');
  const swapped = moveField(items, 'B', 'up', 'swap');
  assert.equal(order(swapped), 'BAC');
  assert.equal(roles(swapped), 'own,own,own');
  assert.equal(order(moveField(items, 'B', 'down', 'swap')), 'ACB');
  const down = moveField(items, 'B', 'down', 'share');
  assert.equal(roles(down), 'own,first,second');
});

test('Up is unavailable at the first row and Down at the last row of own-row fields', () => {
  const items = form('own', 'own');
  assert.equal(canMoveField(items, 'A', 'up'), false);
  assert.equal(canMoveField(items, 'B', 'down'), false);
  assert.equal(moveField(items, 'A', 'up', 'swap'), null);
  assert.equal(canMoveField(items, 'A', 'down'), true);
});

test('a shared row is passed without a prompt and a shared field leaves above or below its partner', () => {
  const items = form('own', 'first', 'second', 'own');
  assert.deepEqual(rowsOf(items).map((row) => row.map((item) => item.id).join('')), ['A', 'BC', 'D']);
  assert.equal(needsShareChoice(items, 'D', 'up'), false);
  assert.equal(order(moveField(items, 'D', 'up')), 'ADBC');
  assert.equal(order(moveField(items, 'A', 'down')), 'BCAD');
  const leaveUp = moveField(items, 'C', 'up');
  assert.equal(order(leaveUp), 'ACBD');
  assert.equal(roles(leaveUp), 'own,own,own,own');
  const leaveDown = moveField(items, 'B', 'down');
  assert.equal(order(leaveDown), 'ACBD');
  assert.equal(canMoveField(form('first', 'second'), 'A', 'up'), true);
});

test('Reverse flips both fields of a shared row and does nothing for a field on its own row', () => {
  const items = form('own', 'first', 'second');
  const flipped = setRowReverse(items, 'B', true);
  assert.deepEqual(flipped.map((item) => item.reverse), [false, true, true]);
  assert.equal(setRowReverse(items, 'A', true), items);
  assert.equal(moveField(flipped, 'B', 'up').every((item) => !item.reverse), true);
});

test('Row uses the Editor mode controller, data attributes and the Small Dropdown prompt; no inline CSS', () => {
  const control = read('admin-station-field-row-control.js');
  assert.match(control, /className = 'wex-admin-editor-control'/);
  assert.match(control, /wex-admin-editor-control__item wex-admin-editor-control__item--icon/);
  assert.match(control, /wex-dropdown-menu--small wex-admin-field-layout__row-options/);
  assert.match(control, /\['share', 'Share row'\], \['swap', 'Swap position'\]/);
  assert.match(control, /data-field-row/);
  assert.doesNotMatch(control, /\.style\b|style=|cssText/);
  assert.match(read('admin-station-field-options.js'), /row\(document, 'Row', createRowControl\(/);
  const css = read('admin-station-field-layout.css');
  assert.match(css, /grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(css, /\[data-field-row="first"\]\[data-field-row-reverse\] \{ grid-column: 2; \}/);
  assert.match(css, /\[data-field-row="second"\]\[data-field-row-reverse\] \{ grid-column: 1; \}/);
});
