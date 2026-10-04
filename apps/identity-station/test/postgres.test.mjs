import assert from 'node:assert/strict';
import test from 'node:test';

import { createPostgresDatabase } from '../dist/index.js';

test('PostgreSQL adapter transactions commit supplied persistence operations', async () => {
  const calls = [];
  const client = {
    async query(text, values = []) {
      calls.push({ text, values });
      return { rows: [] };
    },
    release() {},
  };
  const database = createPostgresDatabase({ async connect() { return client; } });

  await database.withTransaction(async (transaction) => {
    await transaction.query('SELECT 1');
  });

  assert.deepEqual(calls, [
    { text: 'BEGIN', values: [] },
    { text: 'SELECT 1', values: [] },
    { text: 'COMMIT', values: [] },
  ]);
});
