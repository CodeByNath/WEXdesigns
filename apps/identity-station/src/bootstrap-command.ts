import { Pool } from 'pg';

import { createPostgresDatabase } from './postgres.js';
import { createIdentityStation } from './station.js';

const connectionString = process.env.WEX_IDENTITY_DATABASE_URL;

if (connectionString === undefined || connectionString.length === 0) {
  throw new Error('WEX_IDENTITY_DATABASE_URL must identify an already-configured Station PostgreSQL ledger');
}

const pool = new Pool({ connectionString });
const station = createIdentityStation(createPostgresDatabase(pool));

try {
  const allocation = await station.bootstrapAdminManagerHeader();
  process.stdout.write(`${JSON.stringify({
    adminManagerAllocationId: allocation.adminManager.allocationId,
    adminHeaderAllocationId: allocation.adminHeader.allocationId,
    adminHeaderPlacement: allocation.adminHeader.placement,
  })}\n`);
} finally {
  await pool.end();
}
