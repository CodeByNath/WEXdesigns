CREATE TABLE IF NOT EXISTS wex_identity.identity_space_registration (
  singleton BOOLEAN PRIMARY KEY DEFAULT TRUE CHECK (singleton),
  wex_platform_registration_id TEXT NOT NULL UNIQUE,
  platform_key TEXT NOT NULL,
  registered_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS wex_identity.identity_allocation_record (
  wex_platform_registration_id TEXT NOT NULL REFERENCES wex_identity.identity_space_registration (wex_platform_registration_id),
  allocation_id TEXT NOT NULL,
  family TEXT NOT NULL CHECK (family IN ('WEXAM', 'WEXAMH')),
  placement_kind TEXT NOT NULL CHECK (placement_kind IN ('root', 'child')),
  parent_allocation_id TEXT NULL,
  slot TEXT NULL,
  lifecycle_state TEXT NOT NULL CHECK (lifecycle_state IN ('reserved', 'assigned', 'retired')),
  reserved_at TIMESTAMPTZ NOT NULL,
  assigned_at TIMESTAMPTZ NULL,
  retired_at TIMESTAMPTZ NULL,
  retirement_evidence TEXT NULL,
  PRIMARY KEY (wex_platform_registration_id, allocation_id),
  CHECK (
    (placement_kind = 'root' AND parent_allocation_id IS NULL AND slot IS NULL)
    OR
    (placement_kind = 'child' AND parent_allocation_id IS NOT NULL AND slot IS NOT NULL)
  ),
  CHECK (
    (lifecycle_state = 'reserved' AND assigned_at IS NULL AND retired_at IS NULL AND retirement_evidence IS NULL)
    OR
    (lifecycle_state = 'assigned' AND assigned_at IS NOT NULL AND retired_at IS NULL AND retirement_evidence IS NULL)
    OR
    (lifecycle_state = 'retired' AND retired_at IS NOT NULL AND retirement_evidence IS NOT NULL AND length(retirement_evidence) > 0)
  )
);

CREATE OR REPLACE FUNCTION wex_identity.protect_identity_allocation_record()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    RAISE EXCEPTION 'portable identity allocation records are never deleted';
  END IF;

  IF OLD.wex_platform_registration_id IS DISTINCT FROM NEW.wex_platform_registration_id
    OR OLD.allocation_id IS DISTINCT FROM NEW.allocation_id
    OR OLD.family IS DISTINCT FROM NEW.family
    OR OLD.placement_kind IS DISTINCT FROM NEW.placement_kind
    OR OLD.parent_allocation_id IS DISTINCT FROM NEW.parent_allocation_id
    OR OLD.slot IS DISTINCT FROM NEW.slot
    OR OLD.reserved_at IS DISTINCT FROM NEW.reserved_at THEN
    RAISE EXCEPTION 'portable identity allocation evidence is immutable';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER identity_allocation_record_immutable
BEFORE UPDATE OR DELETE ON wex_identity.identity_allocation_record
FOR EACH ROW EXECUTE FUNCTION wex_identity.protect_identity_allocation_record();
