import { z } from 'zod';

/**
 * A Logo is a reusable, serializable presentation capability. The consuming
 * application supplies its identity label; no product or host identity is
 * embedded in the shared definition.
 */
export const LogoDefinitionSchema = z.object({
  label: z.string().min(1).max(120),
}).strict();

export type LogoDefinition = z.infer<typeof LogoDefinitionSchema>;
export type LogoDefinitionInput = z.input<typeof LogoDefinitionSchema>;
