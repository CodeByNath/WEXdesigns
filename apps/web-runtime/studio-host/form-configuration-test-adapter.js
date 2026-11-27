/**
 * Test-only Form configuration storage adapter for the WEX fixture and tests. It implements the host contract
 * (`WexFormConfigurationAdapter`: load, save, publish) over a Storage-like object (`getItem` / `setItem`), so the
 * WEX behaviour can be shown end to end without any host. It is not part of the Studio release bundle and is
 * not storage infrastructure: a real host supplies its own adapter backed by its own backend.
 * `fail: true` rejects every save and publish, to show that WEX does not report unconfirmed success.
 * @param {{ getItem(key: string): string | null, setItem(key: string, value: string): void }} storage
 * @param {{ fail?: boolean }} [options]
 */
export function createTestFormConfigurationAdapter(storage, options = {}) {
  /** @param {{ formId: string, scopeId: string }} key @param {'published' | 'draft'} slot */
  const keyOf = (key, slot) => `wex-test-form-configuration:${key.formId}:${key.scopeId}:${slot}`;
  /** @param {{ formId: string, scopeId: string }} key @param {'published' | 'draft'} slot */
  const read = (key, slot) => {
    const text = storage.getItem(keyOf(key, slot));
    return text ? JSON.parse(text) : null;
  };
  /** @param {{ formId: string, scopeId: string }} configuration @param {'published' | 'draft'} slot */
  const write = async (configuration, slot) => {
    if (options.fail) throw new Error('Test adapter: persistence failed');
    const revision = Number(read(configuration, slot)?.revision ?? 0) + 1;
    storage.setItem(keyOf(configuration, slot), JSON.stringify({ revision, configuration }));
    return { persisted: /** @type {const} */ (true), revision };
  };
  return {
    /** @param {{ formId: string, scopeId: string }} key */
    async load(key) {
      return { published: read(key, 'published')?.configuration ?? null };
    },
    /** @param {{ formId: string, scopeId: string }} configuration */
    save: (configuration) => write(configuration, 'draft'),
    /** @param {{ formId: string, scopeId: string }} configuration */
    publish: (configuration) => write(configuration, 'published'),
  };
}

/** In-memory Storage-like object for tests. */
export function createMemoryStorage() {
  const values = new Map();
  return {
    /** @param {string} key */
    getItem: (key) => values.get(key) ?? null,
    /** @param {string} key @param {string} value */
    setItem: (key, value) => { values.set(key, String(value)); },
  };
}
