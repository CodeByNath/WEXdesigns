import { z } from 'zod';

export const EntityIdentifierSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('id'),
    value: z.string().uuid(),
  }),
  z.object({
    type: z.literal('slug'),
    value: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  }),
]);

export type EntityIdentifier = z.infer<typeof EntityIdentifierSchema>;
