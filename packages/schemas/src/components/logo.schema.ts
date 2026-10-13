import { z } from 'zod';

/**
 * A Logo is a reusable, serializable presentation capability. The consuming
 * application supplies its identity label; no product or host identity is
 * embedded in the shared definition.
 */
export const LogoDefinitionSchema = z.object({
  label: z.string().min(1).max(120),
}).strict();

export type LogoDefinition = z.infer<typeof LogoDefinitionSchema>;
export type LogoDefinitionInput = z.input<typeof LogoDefinitionSchema>;

/**
 * A closed, serializable mapping from an application-owned value source to
 * Logo's only externally bindable presentation property.
 */
export const LogoImagePropertyBindingSchema = z.object({
  source: z.string().min(1).max(160),
  target: z.literal('imageUrl'),
}).strict();

export type LogoImagePropertyBinding = z.infer<typeof LogoImagePropertyBindingSchema>;
export type LogoImagePropertyBindingInput = z.input<typeof LogoImagePropertyBindingSchema>;

/** A safe, externally supplied Logo image value. */
export const LogoImageUrlSchema = z.string().max(2048).url().refine(
  (value) => /^https:\/\//i.test(value),
  'Logo image URLs must use HTTPS.',
);

/** Typed presentation data accepted by the Logo renderer after host resolution. */
export const LogoPresentationPropertiesSchema = z.object({
  imageUrl: LogoImageUrlSchema.optional(),
}).strict();

export type LogoPresentationProperties = z.infer<typeof LogoPresentationPropertiesSchema>;
export type LogoPresentationPropertiesInput = z.input<typeof LogoPresentationPropertiesSchema>;
