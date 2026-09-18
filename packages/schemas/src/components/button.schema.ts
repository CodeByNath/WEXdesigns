import { z } from 'zod';

import { SemanticActionSchema } from '../actions/semantic-action.schema.js';
import { WexTierSchema } from '../composition/wex-tier.schema.js';

export const ButtonVariantSchema = z.enum(['primary', 'neutral', 'subtle', 'warning', 'danger']);

export const ButtonDefinitionSchema = z.object({
  action: SemanticActionSchema,
  variant: ButtonVariantSchema.default('primary'),
  tier: WexTierSchema.default('default'),
  disabled: z.boolean().default(false),
}).strict();

export type ButtonDefinition = z.infer<typeof ButtonDefinitionSchema>;
export type ButtonDefinitionInput = z.input<typeof ButtonDefinitionSchema>;
export type ButtonVariant = z.infer<typeof ButtonVariantSchema>;
