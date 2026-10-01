import assert from 'node:assert/strict';
import test from 'node:test';

import { createPostgresDatabase } from '../dist/index.js';

test('PostgreSQL bootstrap transaction acquires the Station-owned advisory lock before work', async () => {
  const calls = [];
  const client = {
    async query(text, values = []) {
      calls.push({ text, values });
      return { rows: [] };
    },
    release() {},
  };
  const database = createPostgresDatabase({ async connect() { return client; } });

  await database.withAdminManagerHeaderBootstrapTransaction(async (transaction) => {
    await transaction.query('SELECT 1');
  });

  assert.deepEqual(calls, [
    { text: 'BEGIN', values: [] },
    { text: 'SELECT pg_advisory_xact_lock($1, $2)', values: [0x574558, 0x414d48] },
    { text: 'SELECT 1', values: [] },
    { text: 'COMMIT', values: [] },
  ]);
});
