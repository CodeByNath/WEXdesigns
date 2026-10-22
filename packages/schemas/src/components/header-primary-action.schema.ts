import { z } from 'zod';

/** The Header's primary action exposes only its existing built-in icon. */
export const HeaderPrimaryActionIconSchema = z.literal('primary');

export type HeaderPrimaryActionIcon = z.infer<typeof HeaderPrimaryActionIconSchema>;

/**
 * A closed, serializable mapping from an application-owned value source to
 * the Header primary action's only externally bindable presentation property.
 */
export const HeaderPrimaryActionImagePropertyBindingSchema = z.object({
  source: z.string().min(1).max(160),
  target: z.literal('imageUrl'),
}).strict();

export type HeaderPrimaryActionImagePropertyBinding = z.infer<typeof HeaderPrimaryActionImagePropertyBindingSchema>;
export type HeaderPrimaryActionImagePropertyBindingInput = z.input<typeof HeaderPrimaryActionImagePropertyBindingSchema>;

/** A safe, externally supplied Header primary-action image value. */
export const HeaderPrimaryActionImageUrlSchema = z.string().max(2048).url().refine(
  (value) => /^https:\/\//i.test(value),
  'Header primary-action image URLs must use HTTPS.',
);

/**
 * Typed presentation data accepted by the Header primary action after host
 * resolution. A valid image takes precedence over the selected built-in icon.
 */
export const HeaderPrimaryActionPresentationPropertiesSchema = z.object({
  icon: HeaderPrimaryActionIconSchema.optional(),
  imageUrl: HeaderPrimaryActionImageUrlSchema.optional(),
}).strict();

export type HeaderPrimaryActionPresentationProperties = z.infer<typeof HeaderPrimaryActionPresentationPropertiesSchema>;
export type HeaderPrimaryActionPresentationPropertiesInput = z.input<typeof HeaderPrimaryActionPresentationPropertiesSchema>;
