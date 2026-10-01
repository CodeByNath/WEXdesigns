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

/** Creates the service-private transaction boundary for a PostgreSQL ledger. */
export function createPostgresDatabase(pool: Pool): TransactionDatabase {
  return {
    async withTransaction<Result>(operation: (current: Transaction) => Promise<Result>): Promise<Result> {
      const client = await pool.connect();

      try {
        await client.query('BEGIN');
        const outcome = await operation(transaction(client));
        await client.query('COMMIT');
        return outcome;
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      } finally {
        client.release();
      }
    },
  };
}
