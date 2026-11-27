import { z } from 'zod';

/**
 * WEX Form configuration v1. The one serializable contract the WEX Form Editor
 * writes and the WEX Form Renderer reads. It describes how a form's fields are
 * laid out and whether each is active; it never carries field values, business
 * rules or host-specific data. The host supplies its business schema, values and
 * a storage adapter; WEX owns this configuration and its behaviour.
 */
export const WEX_FORM_CONFIGURATION_SCHEMA = 'wex-form-configuration@1';

/** Field width: Default (full row) or a whole percentage from 0 to 100. */
export const WexFormFieldWidthSchema = z.union([
  z.literal('default'),
  z.string().regex(/^(?:100|[1-9]?\d)$/),
]);

export const WexFormFieldPositionSchema = z.enum(['start', 'center', 'end', 'stretch']);
export const WexFormFieldAlignmentSchema = z.enum(['left', 'center', 'right', 'justify']);
/** A field is on its own row, or the first or second of a shared two-field row. */
export const WexFormFieldRowSchema = z.enum(['own', 'first', 'second']);
export const WexFormFieldStatusSchema = z.enum(['on', 'off']);

export const WexFormFieldConfigurationSchema = z.object({
  name: z.string().min(1).max(120),
  width: WexFormFieldWidthSchema,
  position: WexFormFieldPositionSchema,
  alignment: WexFormFieldAlignmentSchema,
  row: WexFormFieldRowSchema,
  reverse: z.boolean(),
  status: WexFormFieldStatusSchema,
}).strict();

/** Which form, for which host record. Both are opaque host-supplied keys. */
export const WexFormConfigurationKeySchema = z.object({
  formId: z.string().min(1).max(120),
  scopeId: z.string().min(1).max(160),
}).strict();

/** The fields in display order; a field name appears once. */
export const WexFormConfigurationSchema = z.object({
  schema: z.literal(WEX_FORM_CONFIGURATION_SCHEMA),
  formId: WexFormConfigurationKeySchema.shape.formId,
  scopeId: WexFormConfigurationKeySchema.shape.scopeId,
  fields: z.array(WexFormFieldConfigurationSchema).max(200).refine(
    (fields) => new Set(fields.map((field) => field.name)).size === fields.length,
    'Form configuration field names must be unique.',
  ),
}).strict();

/**
 * The host adapter's confirmation that a configuration was persisted. WEX reports
 * Save or Publish as successful only after receiving a valid receipt.
 */
export const WexFormConfigurationReceiptSchema = z.object({
  persisted: z.literal(true),
  revision: z.number().int().nonnegative(),
}).strict();

/** What `load` returns: the published configuration, or null when none exists yet. */
export const WexFormConfigurationLoadResultSchema = z.object({
  published: WexFormConfigurationSchema.nullable(),
}).strict();

export type WexFormFieldConfiguration = z.infer<typeof WexFormFieldConfigurationSchema>;
export type WexFormConfigurationKey = z.infer<typeof WexFormConfigurationKeySchema>;
export type WexFormConfiguration = z.infer<typeof WexFormConfigurationSchema>;
export type WexFormConfigurationReceipt = z.infer<typeof WexFormConfigurationReceiptSchema>;
export type WexFormConfigurationLoadResult = z.infer<typeof WexFormConfigurationLoadResultSchema>;

/**
 * The host-supplied storage adapter. WEX calls it; the host implements it with
 * its own backend. `save` keeps a working copy, `publish` makes the
 * configuration the one restored and rendered on load. Each resolves with a
 * receipt only once persistence succeeded, and rejects otherwise.
 */
export interface WexFormConfigurationAdapter {
  load(key: WexFormConfigurationKey): Promise<WexFormConfigurationLoadResult>;
  save(configuration: WexFormConfiguration): Promise<WexFormConfigurationReceipt>;
  publish(configuration: WexFormConfiguration): Promise<WexFormConfigurationReceipt>;
}
