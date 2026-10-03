import { z } from 'zod';

import {
  getWexUiAllocationFamily,
  WexUiAllocationFamilySchema,
  WexUiAllocationIdSchema,
  WexUiAllocationPlacementSchema,
} from './wex-ui-identity.schema.js';

export const WexIdentitySpaceReferenceSchema = z.string().min(1);

export const WexIdentityTimestampSchema = z.string().datetime({ offset: true });

export const WexIdentitySpaceRegistrationSchema = z.object({
  identitySpaceId: WexIdentitySpaceReferenceSchema,
  platformKey: z.string().min(1),
  registeredAt: WexIdentityTimestampSchema,
}).strict();

export const WexIdentityInitializationStateSchema = z.enum([
  'absent',
  'approval-required',
  'ready',
]);

export const WexIdentityAllocationLifecycleStateSchema = z.enum([
  'reserved',
  'assigned',
  'retired',
]);

const WexIdentityAllocationRecordBase = {
  identitySpaceId: WexIdentitySpaceReferenceSchema,
  allocationId: WexUiAllocationIdSchema,
  family: WexUiAllocationFamilySchema,
  placement: WexUiAllocationPlacementSchema,
  reservedAt: WexIdentityTimestampSchema,
};

const WexIdentityReservedAllocationRecordSchema = z.object({
  ...WexIdentityAllocationRecordBase,
  lifecycleState: z.literal('reserved'),
}).strict();

const WexIdentityAssignedAllocationRecordSchema = z.object({
  ...WexIdentityAllocationRecordBase,
  lifecycleState: z.literal('assigned'),
  assignedAt: WexIdentityTimestampSchema,
}).strict();

const WexIdentityRetiredAllocationRecordSchema = z.object({
  ...WexIdentityAllocationRecordBase,
  lifecycleState: z.literal('retired'),
  assignedAt: WexIdentityTimestampSchema.optional(),
  retiredAt: WexIdentityTimestampSchema,
  retirementEvidence: z.string().min(1),
}).strict();

export const WexIdentityAllocationRecordSchema = z.discriminatedUnion(
  'lifecycleState',
  [
    WexIdentityReservedAllocationRecordSchema,
    WexIdentityAssignedAllocationRecordSchema,
    WexIdentityRetiredAllocationRecordSchema,
  ],
).refine(
  (record) => getWexUiAllocationFamily(record.allocationId) === record.family,
  { message: 'allocationId must match family' },
);

export const WexIdentityAllocationLookupSchema = z.object({
  identitySpaceId: WexIdentitySpaceReferenceSchema,
  allocationId: WexUiAllocationIdSchema,
}).strict();

export type WexIdentitySpaceReference = z.infer<typeof WexIdentitySpaceReferenceSchema>;
export type WexIdentityTimestamp = z.infer<typeof WexIdentityTimestampSchema>;
export type WexIdentitySpaceRegistration = z.infer<typeof WexIdentitySpaceRegistrationSchema>;
export type WexIdentityInitializationState = z.infer<typeof WexIdentityInitializationStateSchema>;
export type WexIdentityAllocationLifecycleState = z.infer<
  typeof WexIdentityAllocationLifecycleStateSchema
>;
export type WexIdentityAllocationRecord = z.infer<typeof WexIdentityAllocationRecordSchema>;
export type WexIdentityAllocationLookup = z.infer<typeof WexIdentityAllocationLookupSchema>;
