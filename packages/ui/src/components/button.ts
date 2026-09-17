import {
  ButtonDefinitionSchema,
  type ButtonDefinitionInput,
  type ButtonState,
  type WexTier,
} from '@weerax/schemas';

export interface ButtonPresentation {
  readonly className: string;
  readonly disabled: boolean;
  readonly id: string;
  readonly label: string;
  readonly state: ButtonState;
  readonly tier: WexTier;
}

/**
 * Resolves a serializable ordinary Button definition into platform-neutral
 * presentation data. The consuming runtime applies `state` to the native
 * control without introducing persistent selection semantics.
 */
export function createButtonPresentation(input: ButtonDefinitionInput): ButtonPresentation {
  const button = ButtonDefinitionSchema.parse(input);

  return {
    className: `wex-button wex-button--${button.variant}`,
    disabled: button.state === 'disabled',
    id: button.id,
    label: button.label,
    state: button.state,
    tier: button.tier,
  };
}
