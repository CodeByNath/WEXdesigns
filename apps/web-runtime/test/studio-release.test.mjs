import assert from 'node:assert/strict';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';

import { safeRelativePath, verifyReleaseDirectory } from '../../../tooling/scripts/studio-release.mjs';

const releaseRoot = new URL('../public/studio-releases/', import.meta.url);

test('retained Studio releases are complete, content-addressed and path-safe', async () => {
  const releases = (await readdir(releaseRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  assert.ok(releases.length > 0, 'at least one retained Studio release is required');
  assert.equal(new Set(releases).size, releases.length);
  for (const releaseId of releases) {
    assert.ok(safeRelativePath(releaseId));
    const manifest = await verifyReleaseDirectory(join(releaseRoot.pathname, releaseId));
    assert.equal(manifest.releaseId, releaseId);
  }
});
