import {
  HeaderPrimaryActionIconSchema,
  HeaderPrimaryActionImagePropertyBindingSchema,
  HeaderPrimaryActionImageUrlSchema,
} from '@weerax/schemas';

/** @param {unknown} value */
function isValueMap(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Resolves the closed, host-owned Header primary-action inputs into typed
 * presentation properties. Missing or unsafe image values leave the icon
 * fallback in place.
 * @param {unknown} icon
 * @param {unknown} binding
 * @param {unknown} sourceValues
 * @returns {import('@weerax/schemas').HeaderPrimaryActionPresentationProperties}
 */
export function resolveHeaderPrimaryActionProperties(icon, binding, sourceValues) {
  const resolvedIcon = HeaderPrimaryActionIconSchema.safeParse(icon);
  const properties = resolvedIcon.success ? { icon: resolvedIcon.data } : {};
  const parsedBinding = HeaderPrimaryActionImagePropertyBindingSchema.safeParse(binding);
  if (!parsedBinding.success || !isValueMap(sourceValues)) return properties;
  const imageUrl = HeaderPrimaryActionImageUrlSchema.safeParse(sourceValues[parsedBinding.data.source]);
  return imageUrl.success ? { ...properties, imageUrl: imageUrl.data } : properties;
}
