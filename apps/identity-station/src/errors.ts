export class IdentityStationError extends Error {}

export class InvalidReserveRequestError extends IdentityStationError {}

export class AllocationNotFoundError extends IdentityStationError {}

export class InvalidAllocationStateError extends IdentityStationError {}

export class InvalidBootstrapPlacementError extends IdentityStationError {}

export class BootstrapAllocationConflictError extends IdentityStationError {}

export class CandidateExhaustedError extends IdentityStationError {}
