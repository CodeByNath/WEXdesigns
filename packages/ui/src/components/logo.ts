import {
  LogoDefinitionSchema,
  LogoPresentationPropertiesSchema,
  type LogoDefinitionInput,
  type LogoPresentationPropertiesInput,
} from '@weerax/schemas';
import type { RenderElementDescription } from '../render-description.js';

export type LogoRenderDescription = RenderElementDescription;

/** Resolves Logo's complete structure without browser or host behaviour. */
export function createLogoRenderDescription(
  input: LogoDefinitionInput,
  properties?: LogoPresentationPropertiesInput,
): LogoRenderDescription {
  const logo = LogoDefinitionSchema.parse(input);
  const presentation = LogoPresentationPropertiesSchema.safeParse(properties ?? {});
  const imageUrl = presentation.success ? presentation.data.imageUrl : undefined;

  return {
    kind: 'element',
    tagName: 'span',
    classNames: ['wex-logo', 'wex-type-navigation-default-semibold'],
    attributes: { 'data-logo-capability': 'logo' },
    children: [imageUrl
      ? {
        kind: 'image',
        tagName: 'img',
        classNames: ['wex-logo__image'],
        attributes: { src: imageUrl, alt: logo.label },
      }
      : {
        kind: 'element',
        tagName: 'span',
        classNames: ['wex-logo__label'],
        attributes: {},
        children: [{ kind: 'text', value: logo.label }],
      }],
  };
}
