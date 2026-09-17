import {
  ButtonDefinitionSchema,
  type ButtonDefinitionInput,
  type SemanticAction,
} from '@weerax/schemas';

export interface ButtonPresentation {
  readonly action?: SemanticAction;
  readonly className: string;
  readonly disabled: boolean;
  readonly id: string;
  readonly label: string;
}

/**
 * Resolves a serializable Button definition into platform-neutral presentation
 * data. Browser runtimes may render this as a native button and route its
 * optional semantic action to the owning domain handler.
 */
export function createButtonPresentation(input: ButtonDefinitionInput): ButtonPresentation {
  const button = ButtonDefinitionSchema.parse(input);

  return {
    ...(button.action ? { action: button.action } : {}),
    className: [
      'wex-button',
      `wex-button--${button.variant}`,
      `wex-button--${button.tier}`,
    ].join(' '),
    disabled: button.disabled,
    id: button.id,
    label: button.label,
  };
}
