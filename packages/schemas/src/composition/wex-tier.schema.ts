import { z } from 'zod';

export const WexTierSchema = z.enum(['small', 'default', 'large']);

export type WexTier = z.infer<typeof WexTierSchema>;
