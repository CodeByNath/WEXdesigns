import {
  WEX_FORM_CONFIGURATION_SCHEMA,
  WexFormConfigurationLoadResultSchema,
  WexFormConfigurationReceiptSchema,
  WexFormConfigurationSchema,
} from '@weerax/schemas';
import { fieldChangeCount, replaceFieldBaseline } from './admin-station-field-history.js';

/**
 * WEX Form configuration (`wex-form-configuration@1`, `@weerax/schemas`): the one contract the Form Editor
 * writes and the Form Renderer reads. The configuration lives in the fields' closed data attributes and their
 * order, so reading and applying it are the only two paths between the form and storage. The host supplies a
 * storage adapter (load, save, publish); WEX never persists anything itself and never reports Save or Publish
 * as done before the adapter returns a valid receipt. Field values are never part of a configuration.
 * @typedef {import('@weerax/schemas').WexFormConfiguration} FormConfiguration
 * @typedef {import('@weerax/schemas').WexFormConfigurationAdapter} FormConfigurationAdapter
 * @typedef {import('@weerax/schemas').WexFormConfigurationReceipt} FormConfigurationReceipt
 * @typedef {{ ok: true, configuration: FormConfiguration, receipt: FormConfigurationReceipt } | { ok: false, error: string }} PersistResult
 */

const LAYOUT_ROOT = '[data-admin-station-layout]';

/** @type {WeakMap<Element, FormConfigurationAdapter>} */
const adapters = new WeakMap();

/** @param {unknown} value @returns {value is FormConfigurationAdapter} */
export function isFormConfigurationAdapter(value) {
  if (typeof value !== 'object' || value === null) return false;
  return ['load', 'save', 'publish'].every((name) => typeof Reflect.get(value, name) === 'function');
}

/** Registers the host's adapter for one mounted Admin shell; anything else is ignored. @param {Element} layout @param {unknown} adapter */
export function setFormConfigurationAdapter(layout, adapter) {
  if (isFormConfigurationAdapter(adapter)) adapters.set(layout, adapter);
}

/** The adapter of the Admin shell an element belongs to, if the host supplied one. @param {Element} element */
export function formConfigurationAdapterFor(element) {
  const layout = element.closest?.(LAYOUT_ROOT);
  return layout ? adapters.get(layout) ?? null : null;
}

/** @param {Element} form */
const fieldsOf = (form) => [...form.querySelectorAll(':scope > [data-field-name]')];
/** @param {Element} field */
const nameOf = (field) => field.getAttribute('data-field-name') ?? field.querySelector('textarea')?.getAttribute('name') ?? '';

/** The form's key, from the host-supplied ids on the form element. @param {Element} form */
export function formConfigurationKey(form) {
  return { formId: form.getAttribute('data-form-id') ?? '', scopeId: form.getAttribute('data-form-scope') ?? '' };
}

/** Form Editor side: the current configuration, read from the fields (missing attributes are the defaults). @param {Element} form @returns {FormConfiguration} */
export function readFormConfiguration(form) {
  return WexFormConfigurationSchema.parse({
    schema: WEX_FORM_CONFIGURATION_SCHEMA,
    ...formConfigurationKey(form),
    fields: fieldsOf(form).map((field) => {
      const row = field.getAttribute('data-field-row');
      return {
        name: nameOf(field),
        width: field.getAttribute('data-field-width') ?? 'default',
        position: field.getAttribute('data-field-position') ?? 'stretch',
        alignment: field.getAttribute('data-field-alignment') ?? 'left',
        row: row === 'first' || row === 'second' ? row : 'own',
        reverse: field.hasAttribute('data-field-row-reverse'),
        status: field.getAttribute('data-field-status') === 'off' ? 'off' : 'on',
      };
    }),
  });
}

/**
 * Form Renderer side: lays the fields out from a configuration. Configured fields come first in the configured
 * order; fields the configuration does not name keep their order after them, with the defaults. Names the form
 * does not have are ignored. Returns false (and changes nothing) for an invalid configuration.
 * @param {Element} form @param {unknown} configuration
 */
export function applyFormConfiguration(form, configuration) {
  const parsed = WexFormConfigurationSchema.safeParse(configuration);
  if (!parsed.success) return false;
  const fields = fieldsOf(form);
  const byName = new Map(fields.map((field) => [nameOf(field), field]));
  const configured = parsed.data.fields.filter((item) => byName.has(item.name));
  const named = new Set(configured.map((item) => item.name));
  const anchor = fields.at(-1)?.nextSibling ?? null;
  for (const item of configured) {
    const field = /** @type {Element} */ (byName.get(item.name));
    form.insertBefore(field, anchor);
    field.setAttribute('data-field-width', item.width);
    field.setAttribute('data-field-position', item.position);
    field.setAttribute('data-field-alignment', item.alignment);
    if (item.row === 'own') field.removeAttribute('data-field-row');
    else field.setAttribute('data-field-row', item.row);
    field.toggleAttribute('data-field-row-reverse', item.reverse && item.row !== 'own');
    field.setAttribute('data-field-status', item.status);
  }
  for (const field of fields) {
    if (named.has(nameOf(field))) continue;
    form.insertBefore(field, anchor);
    for (const name of ['data-field-width', 'data-field-position', 'data-field-alignment', 'data-field-row', 'data-field-row-reverse', 'data-field-status']) field.removeAttribute(name);
  }
  return true;
}

/**
 * Restores the published configuration through the host adapter when the form is built (and so on refresh).
 * It becomes the form's starting point with no history steps. A configuration that arrives after the
 * person already started editing is not applied over their changes. Without an adapter nothing happens.
 * @param {Element} form @param {FormConfigurationAdapter | null} adapter @returns {Promise<boolean>}
 */
export async function restoreFormConfiguration(form, adapter) {
  if (!adapter) return false;
  try {
    const loaded = WexFormConfigurationLoadResultSchema.safeParse(await adapter.load(formConfigurationKey(form)));
    const published = loaded.success ? loaded.data.published : null;
    if (!published || fieldChangeCount(form) > 0) return false;
    const key = formConfigurationKey(form);
    if (published.formId !== key.formId || published.scopeId !== key.scopeId) return false;
    let applied = false;
    replaceFieldBaseline(form, () => { applied = applyFormConfiguration(form, published); });
    return applied;
  } catch {
    return false;
  }
}

/**
 * Save or Publish through the host adapter. Success only with a valid receipt; no adapter, a rejection or an
 * invalid receipt is a failure, and the caller keeps the unsaved state.
 * @param {Element} form @param {'save' | 'publish'} action @param {FormConfigurationAdapter | null} adapter
 * @returns {Promise<PersistResult>}
 */
export async function persistFormConfiguration(form, action, adapter) {
  if (!adapter) return { ok: false, error: 'adapter-unavailable' };
  /** @type {FormConfiguration} */
  let configuration;
  try {
    configuration = readFormConfiguration(form);
  } catch {
    return { ok: false, error: 'invalid-configuration' };
  }
  try {
    const receipt = WexFormConfigurationReceiptSchema.safeParse(await adapter[action](configuration));
    return receipt.success ? { ok: true, configuration, receipt: receipt.data } : { ok: false, error: 'unconfirmed' };
  } catch {
    return { ok: false, error: 'persistence-failed' };
  }
}
