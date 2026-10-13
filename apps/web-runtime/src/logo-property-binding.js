import {
  LogoImagePropertyBindingSchema,
  LogoImageUrlSchema,
} from '@weerax/schemas';

/**
 * Resolves a host-provided source value to Logo's closed image property.
 * The host/domain adapter owns the source record and provides only its values.
 * @param {unknown} binding
 * @param {unknown} sourceValues
 * @returns {import('@weerax/schemas').LogoPresentationProperties}
 */
export function resolveLogoImagePropertyBinding(binding, sourceValues) {
  const parsedBinding = LogoImagePropertyBindingSchema.safeParse(binding);
  if (!parsedBinding.success || !isValueMap(sourceValues)) return {};

  const imageUrl = LogoImageUrlSchema.safeParse(sourceValues[parsedBinding.data.source]);
  return imageUrl.success ? { imageUrl: imageUrl.data } : {};
}

/** @param {unknown} value @returns {value is Record<string, unknown>} */
function isValueMap(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
