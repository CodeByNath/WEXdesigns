import {
  ButtonDefinitionSchema,
  type ButtonDefinitionInput,
  type WexTier,
} from '@weerax/schemas';

export interface ButtonPresentation {
  readonly className: string;
  readonly disabled: boolean;
  readonly id: string;
  readonly label: string;
  readonly tier: WexTier;
}

/**
 * Resolves a serializable ordinary Button definition into platform-neutral
 * presentation data. Native interaction states remain WEX presentation
 * behaviour rather than authored definition data.
 */
export function createButtonPresentation(input: ButtonDefinitionInput): ButtonPresentation {
  const button = ButtonDefinitionSchema.parse(input);

  return {
    className: `wex-button wex-button--${button.variant}`,
    disabled: button.disabled,
    id: button.id,
    label: button.label,
    tier: button.tier,
  };
}
