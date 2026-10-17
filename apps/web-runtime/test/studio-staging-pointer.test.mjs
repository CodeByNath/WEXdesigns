import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';

import { sha384 } from '../../../tooling/scripts/studio-release.mjs';
import {
  parsePointer,
  proposeStagingPointer,
  serializePointer,
  verifyStagingPointer,
} from '../../../tooling/scripts/studio-staging-pointer.mjs';

const shaA = 'a'.repeat(40);
const shaB = 'b'.repeat(40);
const shaC = 'c'.repeat(40);
const id = (sha) => `wex-studio-v1-${sha}`;
// Linear history a -> b -> c; every sha is also reachable from "main".
const order = [shaA, shaB, shaC];
const isAncestor = (ancestor, descendant) => order.indexOf(ancestor) !== -1
  && order.indexOf(descendant) !== -1 && order.indexOf(ancestor) <= order.indexOf(descendant);

async function writeRelease(releaseRoot, sha) {
  const directory = join(releaseRoot, id(sha));
  await mkdir(join(directory, 'assets'), { recursive: true });
  const entry = `console.log("${sha}");`;
  const style = `.x{color:#${sha.slice(0, 6)}}`;
  await writeFile(join(directory, 'assets/entry.js'), entry);
  await writeFile(join(directory, 'assets/entry.css'), style);
  await writeFile(join(directory, 'manifest.json'), `${JSON.stringify({
    contract: 'wex-studio-host@1',
    entry: 'assets/entry.js',
    styles: ['assets/entry.css'],
    version: id(sha),
    releaseId: id(sha),
    sourceSha: sha,
    files: { 'assets/entry.css': sha384(style), 'assets/entry.js': sha384(entry) },
  }, null, 2)}\n`);
}

async function fixture(t) {
  const releaseRoot = await mkdtemp(join(tmpdir(), 'wex-pointer-'));
  t.after(() => rm(releaseRoot, { recursive: true, force: true }));
  for (const sha of order) await writeRelease(releaseRoot, sha);
  return releaseRoot;
}

const options = (releaseRoot, extra = {}) => ({ releaseRoot, head: shaC, isAncestor, ...extra });
const propose = (releaseRoot, sha, currentText = null, rollback = false) => proposeStagingPointer({
  releaseRoot, releaseId: id(sha), currentText, rollback, head: shaC, isAncestor,
});

test('the first pointer bootstraps at sequence 1 and later pointers chain to it', async (t) => {
  const releaseRoot = await fixture(t);
  const first = await propose(releaseRoot, shaA);
  assert.equal(parsePointer(first).previous, null);
  await verifyStagingPointer(first, options(releaseRoot));

  const second = await propose(releaseRoot, shaB, first);
  const parsed = parsePointer(second);
  assert.equal(parsed.sequence, 2);
  assert.equal(parsed.previous.releaseId, id(shaA));
  await verifyStagingPointer(second, options(releaseRoot, { basePointerText: first }));
  await verifyStagingPointer(second, options(releaseRoot, { basePointerText: second }));
});

test('only the pointer moves: tampered release bytes or manifest digest fail closed', async (t) => {
  const releaseRoot = await fixture(t);
  const text = await propose(releaseRoot, shaA);
  const wrongDigest = serializePointer({ ...parsePointer(text), manifestDigest: `sha384-${'A'.repeat(64)}` });
  await assert.rejects(verifyStagingPointer(wrongDigest, options(releaseRoot)), /manifest digest/);

  await writeFile(join(releaseRoot, id(shaA), 'assets/entry.js'), 'tampered');
  await assert.rejects(verifyStagingPointer(text, options(releaseRoot)));
});

test('pointer shape is exact, canonical and relative', async (t) => {
  const releaseRoot = await fixture(t);
  const pointer = parsePointer(await propose(releaseRoot, shaA));
  assert.throws(() => parsePointer(serializePointer({ ...pointer, extra: true })), /unexpected or missing/);
  assert.throws(() => parsePointer(JSON.stringify(pointer)), /canonical/);
  assert.throws(() => parsePointer(serializePointer({ ...pointer, manifestPath: 'https://example.invalid/manifest.json' })));
  assert.throws(() => parsePointer(serializePointer({ ...pointer, manifestPath: `../${pointer.manifestPath}` })));
  assert.throws(() => parsePointer(serializePointer({ ...pointer, releaseId: 'latest' })));
  assert.throws(() => parsePointer(serializePointer({ ...pointer, change: 'rollback' })));
});

test('sequence skips, replays and a missing previous link are rejected', async (t) => {
  const releaseRoot = await fixture(t);
  const first = await propose(releaseRoot, shaA);
  const second = await propose(releaseRoot, shaB, first);
  const skipped = serializePointer({ ...parsePointer(second), sequence: 3, previous: { ...parsePointer(second).previous, sequence: 2 } });
  await assert.rejects(verifyStagingPointer(skipped, options(releaseRoot, { basePointerText: first })), /exactly one/);
  await assert.rejects(verifyStagingPointer(second, options(releaseRoot, { basePointerText: null })), /sequence 1/);
  const forged = serializePointer({ ...parsePointer(second), previous: { sequence: 1, releaseId: id(shaC), manifestDigest: parsePointer(first).manifestDigest } });
  await assert.rejects(verifyStagingPointer(forged, options(releaseRoot, { basePointerText: first })));
  await assert.rejects(propose(releaseRoot, shaB, second), /different release/);
});

test('an advance cannot silently downgrade; a rollback must be explicit and older', async (t) => {
  const releaseRoot = await fixture(t);
  const atC = await propose(releaseRoot, shaC);
  await assert.rejects(propose(releaseRoot, shaA, atC), /descended/);

  const rolledBack = await propose(releaseRoot, shaA, atC, true);
  assert.equal(parsePointer(rolledBack).change, 'rollback');
  assert.equal(parsePointer(rolledBack).sequence, 2);
  await verifyStagingPointer(rolledBack, options(releaseRoot, { basePointerText: atC }));

  const atA = await propose(releaseRoot, shaA);
  await assert.rejects(propose(releaseRoot, shaC, atA, true), /older/);
});

test('release source must be reachable from main and the previous release must stay retained', async (t) => {
  const releaseRoot = await fixture(t);
  const first = await propose(releaseRoot, shaA);
  const second = await propose(releaseRoot, shaB, first);
  const branchOnly = (ancestor, descendant) => ancestor !== shaB && isAncestor(ancestor, descendant);
  await assert.rejects(verifyStagingPointer(second, options(releaseRoot, { basePointerText: first, isAncestor: branchOnly })), /reachable from main/);

  await rm(join(releaseRoot, id(shaA)), { recursive: true });
  await assert.rejects(verifyStagingPointer(second, options(releaseRoot, { basePointerText: first })));
});

test('the committed staging pointer names a retained, verifiable release', async () => {
  const releaseRoot = new URL('../public/studio-releases/', import.meta.url).pathname;
  const text = await readFile(join(releaseRoot, 'staging-pointer.json'), 'utf8');
  const pointer = await verifyStagingPointer(text, { releaseRoot });
  assert.equal(pointer.contract, 'wex-studio-host@1');
});
