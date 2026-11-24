import assert from 'node:assert/strict';
import test from 'node:test';
import { parseFieldWidth } from '../src/admin-station-field-options.js';

test('manual width accepts whole percentages including both slider endpoints', () => {
  for (const value of [0, 1, 37, 99, 100]) assert.equal(parseFieldWidth(String(value)), value);
});

test('invalid or incomplete manual width cannot replace the applied percentage', () => {
  for (const value of ['', '-1', '101', '999', '50.5', '1e2', '40%', ' 40 ', 'default']) {
    assert.equal(parseFieldWidth(value), null, value);
  }
});
