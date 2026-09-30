import { z } from 'zod';

export const WexUiAllocationFamilySchema = z.enum(['WEXAM', 'WEXAMH']);

export const WEX_UI_ALLOCATION_SUFFIX_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

const WexUiAllocationIdPattern = /^(?:WEXAMH|WEXAM)[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{5}$/;

export const WexUiAllocationIdSchema = z.string().regex(WexUiAllocationIdPattern);

export const WexUiAllocationSlotSchema = z.string().min(1);

export const WexUiAllocationRootSchema = z.object({}).strict();

export const WexUiAllocationChildSchema = z.object({
  parentAllocationId: WexUiAllocationIdSchema,
  slot: WexUiAllocationSlotSchema,
}).strict();

export const WexUiAllocationPlacementSchema = z.union([
  WexUiAllocationRootSchema,
  WexUiAllocationChildSchema,
]);

export const WexUiPlatformBindingSchema = z.object({
  uiAllocationId: WexUiAllocationIdSchema,
  bindingSlot: z.string().min(1),
  platformKey: z.string().min(1),
  platformRecordRef: z.string().min(1),
}).strict();

export type WexUiAllocationFamily = z.infer<typeof WexUiAllocationFamilySchema>;
export type WexUiAllocationId = z.infer<typeof WexUiAllocationIdSchema>;
export type WexUiAllocationSlot = z.infer<typeof WexUiAllocationSlotSchema>;
export type WexUiAllocationRoot = z.infer<typeof WexUiAllocationRootSchema>;
export type WexUiAllocationChild = z.infer<typeof WexUiAllocationChildSchema>;
export type WexUiAllocationPlacement = z.infer<typeof WexUiAllocationPlacementSchema>;
export type WexUiPlatformBinding = z.infer<typeof WexUiPlatformBindingSchema>;

export function getWexUiAllocationFamily(value: string): WexUiAllocationFamily | undefined {
  if (!WexUiAllocationIdSchema.safeParse(value).success) {
    return undefined;
  }

  return value.startsWith('WEXAMH') ? 'WEXAMH' : 'WEXAM';
}
