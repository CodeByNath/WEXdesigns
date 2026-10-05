export {
  bootstrapWexIdentity,
  generateWexPlatformRegistrationId,
  WexIdentityBootstrapError,
  type WexIdentityBootstrapOptions,
  type WexIdentityBootstrapResult,
  type WexIdentityStorageAdapter,
} from './bootstrap.js';

export {
  assignWexIdentityAllocation,
  lookupWexIdentityAllocation,
  reserveWexIdentityAllocation,
  retireWexIdentityAllocation,
  WexIdentityAllocationError,
  type AssignWexIdentityAllocationOptions,
  type RetireWexIdentityAllocationOptions,
  type ReserveWexIdentityAllocationOptions,
  type WexIdentityAllocationAddress,
} from './allocation.js';
