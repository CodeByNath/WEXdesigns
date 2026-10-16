import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { sha384, verifyReleaseDirectory } from './studio-release.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const releasePath = 'apps/web-runtime/public/studio-releases';
export const pointerFile = 'staging-pointer.json';
export const pointerSchema = 'wex-studio-staging-pointer@1';
const releasePattern = /^wex-studio-v1-([0-9a-f]{40})$/;
const keys = ['change', 'contract', 'manifestDigest', 'manifestPath', 'previous', 'releaseId', 'schema', 'sequence'];
const previousKeys = ['manifestDigest', 'releaseId', 'sequence'];
const digestPattern = /^sha384-[A-Za-z0-9+/]{64}$/;

export const serializePointer = (pointer) => `${JSON.stringify(pointer, null, 2)}\n`;

export const sourceShaOf = (releaseId) => {
  const match = releasePattern.exec(releaseId);
  assert.ok(match, `invalid Studio release id: ${releaseId}`);
  return match[1];
};

function gitIsAncestor(ancestor, descendant) {
  try {
    execFileSync('git', ['merge-base', '--is-ancestor', ancestor, descendant], { cwd: root, stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

async function verifiedManifestDigest(releaseRoot, releaseId) {
  const directory = join(releaseRoot, releaseId);
  await verifyReleaseDirectory(directory, { releaseId, sourceSha: sourceShaOf(releaseId) });
  return sha384(await readFile(join(directory, 'manifest.json')));
}

export function parsePointer(text) {
  const pointer = JSON.parse(text);
  assert.deepEqual(Object.keys(pointer).sort(), keys, 'pointer has unexpected or missing fields');
  assert.equal(text, serializePointer(pointer), 'pointer must use the canonical serialization');
  assert.equal(pointer.schema, pointerSchema);
  assert.equal(pointer.contract, 'wex-studio-host@1');
  assert.ok(['advance', 'rollback'].includes(pointer.change));
  assert.ok(Number.isSafeInteger(pointer.sequence) && pointer.sequence >= 1);
  sourceShaOf(pointer.releaseId);
  assert.equal(pointer.manifestPath, `${pointer.releaseId}/manifest.json`);
  assert.match(pointer.manifestDigest, digestPattern);
  if (pointer.sequence === 1) {
    assert.equal(pointer.previous, null, 'the first pointer has no previous release');
    assert.equal(pointer.change, 'advance');
  } else {
    assert.deepEqual(Object.keys(pointer.previous ?? {}).sort(), previousKeys);
    assert.equal(pointer.previous.sequence, pointer.sequence - 1);
    sourceShaOf(pointer.previous.releaseId);
    assert.match(pointer.previous.manifestDigest, digestPattern);
  }
  return pointer;
}

/**
 * Verifies a staging pointer against the retained release tree. `basePointerText`
 * is the pointer on the previous deployed commit (null when none existed).
 * `head` is the commit the release source must be reachable from (main).
 */
export async function verifyStagingPointer(text, {
  releaseRoot,
  basePointerText = null,
  head = null,
  isAncestor = gitIsAncestor,
}) {
  const pointer = parsePointer(text);
  assert.equal(await verifiedManifestDigest(releaseRoot, pointer.releaseId), pointer.manifestDigest,
    'pointer manifest digest does not match the retained release manifest');
  if (head) {
    assert.ok(isAncestor(sourceShaOf(pointer.releaseId), head), 'pointer release source is not reachable from main');
  }
  if (pointer.previous) {
    assert.equal(await verifiedManifestDigest(releaseRoot, pointer.previous.releaseId), pointer.previous.manifestDigest,
      'previous release is no longer retained and verifiable');
  }
  if (basePointerText === null) {
    assert.equal(pointer.sequence, 1, 'a pointer with no base must start at sequence 1');
    return pointer;
  }
  if (basePointerText === text) return pointer;

  const base = parsePointer(basePointerText);
  assert.equal(pointer.sequence, base.sequence + 1, 'pointer sequence must advance by exactly one');
  assert.deepEqual(pointer.previous, {
    sequence: base.sequence,
    releaseId: base.releaseId,
    manifestDigest: base.manifestDigest,
  }, 'pointer previous must be the prior pointer');
  assert.notEqual(pointer.releaseId, base.releaseId, 'a pointer change must select a different release');
  const [from, to] = [sourceShaOf(base.releaseId), sourceShaOf(pointer.releaseId)];
  if (pointer.change === 'advance') {
    assert.ok(isAncestor(from, to), 'an advance must select a release descended from the previous release');
  } else {
    assert.ok(isAncestor(to, from), 'a rollback must select a release older than the previous release');
  }
  return pointer;
}

/** Deterministically builds the next pointer; the caller decides whether to commit it. */
export async function proposeStagingPointer({ releaseRoot, releaseId, currentText = null, rollback = false, head = null, isAncestor = gitIsAncestor }) {
  const manifestDigest = await verifiedManifestDigest(releaseRoot, releaseId);
  const current = currentText === null ? null : parsePointer(currentText);
  const pointer = {
    schema: pointerSchema,
    contract: 'wex-studio-host@1',
    change: rollback ? 'rollback' : 'advance',
    sequence: current ? current.sequence + 1 : 1,
    releaseId,
    manifestPath: `${releaseId}/manifest.json`,
    manifestDigest,
    previous: current && {
      sequence: current.sequence,
      releaseId: current.releaseId,
      manifestDigest: current.manifestDigest,
    },
  };
  const text = serializePointer(pointer);
  await verifyStagingPointer(text, { releaseRoot, basePointerText: currentText, head, isAncestor });
  return text;
}

function gitShow(base, path) {
  try {
    return execFileSync('git', ['show', `${base}:${path}`], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  } catch {
    return null;
  }
}

async function verifyLive(pageUrl, expectedText) {
  const expected = parsePointer(expectedText);
  const base = new URL('studio-releases/', pageUrl.endsWith('/') ? pageUrl : `${pageUrl}/`);
  for (let attempt = 1; ; attempt += 1) {
    try {
      const pointerResponse = await fetch(new URL(pointerFile, base), { cache: 'no-store' });
      assert.equal(pointerResponse.status, 200);
      assert.equal(await pointerResponse.text(), expectedText, 'live pointer differs from the deployed pointer');
      const manifestResponse = await fetch(new URL(expected.manifestPath, base), { cache: 'no-store' });
      assert.equal(manifestResponse.status, 200);
      assert.equal(sha384(Buffer.from(await manifestResponse.arrayBuffer())), expected.manifestDigest,
        'live manifest digest does not match the pointer');
      return;
    } catch (error) {
      if (attempt >= 6) throw error;
      await new Promise((done) => setTimeout(done, 10_000));
    }
  }
}

function option(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
}

async function main() {
  const [command] = process.argv.slice(2);
  const releaseRoot = join(root, releasePath);
  const file = join(releaseRoot, pointerFile);
  const currentText = await readFile(file, 'utf8').catch(() => null);
  if (command === 'verify') {
    assert.ok(currentText !== null, 'the staging pointer file is required');
    const base = option('--base');
    const baseText = base && /^[0-9a-f]{40}$/.test(base) ? gitShow(base, `${releasePath}/${pointerFile}`) : null;
    await verifyStagingPointer(currentText, { releaseRoot, basePointerText: baseText, head: 'HEAD' });
    console.log(`verified staging pointer ${parsePointer(currentText).releaseId}`);
  } else if (command === 'propose') {
    const releaseId = option('--release');
    assert.ok(releaseId, 'propose requires --release <release-id>');
    const text = await proposeStagingPointer({
      releaseRoot, releaseId, currentText, rollback: process.argv.includes('--rollback'), head: 'HEAD',
    });
    await writeFile(file, text);
    console.log(`proposed staging pointer ${releaseId}`);
  } else if (command === 'verify-live') {
    assert.ok(currentText !== null && option('--url'), 'verify-live requires --url and a pointer file');
    await verifyLive(option('--url'), currentText);
    console.log('verified live staging pointer and manifest');
  } else {
    throw new Error('usage: studio-staging-pointer.mjs verify [--base <sha>] | propose --release <id> [--rollback] | verify-live --url <pages-url>');
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => { console.error(error); process.exitCode = 1; });
}
