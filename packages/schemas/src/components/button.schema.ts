import { z } from 'zod';

import { WexTierSchema } from '../composition/wex-tier.schema.js';

export const ButtonVariantSchema = z.enum(['primary', 'neutral', 'subtle', 'warning', 'danger']);

export const ButtonDefinitionSchema = z.object({
  id: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
  label: z.string().min(1),
  variant: ButtonVariantSchema.default('primary'),
  tier: WexTierSchema.default('default'),
  disabled: z.boolean().default(false),
}).strict();

export type ButtonDefinition = z.infer<typeof ButtonDefinitionSchema>;
export type ButtonDefinitionInput = z.input<typeof ButtonDefinitionSchema>;
export type ButtonVariant = z.infer<typeof ButtonVariantSchema>;
