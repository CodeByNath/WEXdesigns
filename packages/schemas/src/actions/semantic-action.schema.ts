import { z } from 'zod';

export const SemanticActionSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  command: z.string().regex(/^[a-z][a-z0-9]*(?:\.[a-z][a-z0-9]*)+$/),
  recordId: z.string().min(1),
});

export type SemanticAction = z.infer<typeof SemanticActionSchema>;
