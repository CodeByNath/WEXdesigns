CREATE SCHEMA IF NOT EXISTS wex_identity;

CREATE TABLE IF NOT EXISTS wex_identity.allocation_ledger (
  allocation_id TEXT PRIMARY KEY,
  family TEXT NOT NULL CHECK (family IN ('WEXAM', 'WEXAMH')),
  placement_kind TEXT NOT NULL CHECK (placement_kind IN ('root', 'child')),
  parent_allocation_id TEXT NULL,
  slot TEXT NULL,
  state TEXT NOT NULL CHECK (state IN ('reserved', 'assigned', 'retired')),
  reserved_at TIMESTAMPTZ NOT NULL,
  assigned_at TIMESTAMPTZ NULL,
  retired_at TIMESTAMPTZ NULL,
  CHECK (
    (placement_kind = 'root' AND parent_allocation_id IS NULL AND slot IS NULL)
    OR
    (placement_kind = 'child' AND parent_allocation_id IS NOT NULL AND slot IS NOT NULL)
  )
);

CREATE OR REPLACE FUNCTION wex_identity.protect_allocation_ledger()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    RAISE EXCEPTION 'allocation ledger rows are never deleted';
  END IF;

  IF OLD.allocation_id IS DISTINCT FROM NEW.allocation_id
    OR OLD.family IS DISTINCT FROM NEW.family
    OR OLD.placement_kind IS DISTINCT FROM NEW.placement_kind
    OR OLD.parent_allocation_id IS DISTINCT FROM NEW.parent_allocation_id
    OR OLD.slot IS DISTINCT FROM NEW.slot THEN
    RAISE EXCEPTION 'allocation identity, family, and placement are immutable';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER allocation_ledger_immutable
BEFORE UPDATE OR DELETE ON wex_identity.allocation_ledger
FOR EACH ROW EXECUTE FUNCTION wex_identity.protect_allocation_ledger();
