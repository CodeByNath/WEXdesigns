import type { Pool, PoolClient, QueryResult as PgQueryResult } from 'pg';

import type { QueryResult, Transaction, TransactionDatabase } from './database.js';

function result<Row extends object>(result: PgQueryResult<Row>): QueryResult<Row> {
  return { rows: result.rows };
}

function transaction(client: PoolClient): Transaction {
  return {
    async query<Row extends object>(text: string, values: readonly unknown[] = []) {
      return result(await client.query<Row>(text, [...values]));
    },
  };
}

async function withTransaction<Result>(
  pool: Pool,
  operation: (current: Transaction) => Promise<Result>,
  beforeOperation?: (current: Transaction) => Promise<void>,
): Promise<Result> {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const current = transaction(client);
    if (beforeOperation !== undefined) await beforeOperation(current);
    const outcome = await operation(current);
    await client.query('COMMIT');
    return outcome;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

/** Creates the transaction boundary used by the optional PostgreSQL adapter. */
export function createPostgresDatabase(pool: Pool): TransactionDatabase {
  return {
    withTransaction<Result>(operation: (current: Transaction) => Promise<Result>): Promise<Result> {
      return withTransaction(pool, operation);
    },
  };
}
