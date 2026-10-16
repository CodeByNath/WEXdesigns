import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { verifyReleaseDirectory } from './studio-release.mjs';

const root = resolve(fileURLToPath(new URL('../..', import.meta.url)));
const releasePath = 'apps/web-runtime/public/studio-releases';
const releaseRoot = join(root, releasePath);
const base = process.argv[process.argv.indexOf('--base') + 1];

function git(...args) {
  return execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
}

async function main() {
  const releases = (await readdir(releaseRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
  assert.ok(releases.length > 0, 'at least one Studio release is required');
  for (const releaseId of releases) await verifyReleaseDirectory(join(releaseRoot, releaseId));

  if (base && /^[0-9a-f]{40}$/.test(base)) {
    const changed = git('diff', '--name-only', base, 'HEAD', '--', releasePath)
      .split('\n').filter(Boolean);
    for (const path of changed) {
      const releaseId = path.split('/')[4];
      assert.ok(releaseId, `unexpected Studio release path: ${path}`);
      const prior = `${releasePath}/${releaseId}`;
      let existed = true;
      try {
        execFileSync('git', ['cat-file', '-e', `${base}:${prior}`], { cwd: root, stdio: 'ignore' });
      } catch {
        existed = false;
      }
      assert.equal(existed, false, `immutable Studio release changed: ${releaseId}`);
    }
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
