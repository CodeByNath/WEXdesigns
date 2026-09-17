import { z } from 'zod';

import { SemanticActionSchema } from '../actions/semantic-action.schema.js';
import { WexTierSchema } from '../composition/wex-tier.schema.js';

export const ButtonVariantSchema = z.enum(['primary', 'secondary', 'ghost', 'danger']);

export const ButtonDefinitionSchema = z.object({
  id: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
  label: z.string().min(1),
  variant: ButtonVariantSchema.default('primary'),
  tier: WexTierSchema.default('default'),
  disabled: z.boolean().default(false),
  action: SemanticActionSchema.optional(),
});

export type ButtonDefinition = z.infer<typeof ButtonDefinitionSchema>;
export type ButtonDefinitionInput = z.input<typeof ButtonDefinitionSchema>;
export type ButtonVariant = z.infer<typeof ButtonVariantSchema>;
