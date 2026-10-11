import { LogoDefinitionSchema, type LogoDefinitionInput } from '@weerax/schemas';
import type { RenderElementDescription } from '../render-description.js';

export type LogoRenderDescription = RenderElementDescription;

/** Resolves Logo's complete structure without browser or host behaviour. */
export function createLogoRenderDescription(input: LogoDefinitionInput): LogoRenderDescription {
  const logo = LogoDefinitionSchema.parse(input);

  return {
    kind: 'element',
    tagName: 'span',
    classNames: ['wex-logo', 'wex-type-navigation-default-semibold'],
    attributes: { 'data-logo-capability': 'logo' },
    children: [
      {
        kind: 'element',
        tagName: 'span',
        classNames: ['wex-logo__label'],
        attributes: {},
        children: [{ kind: 'text', value: logo.label }],
      },
    ],
  };
}
