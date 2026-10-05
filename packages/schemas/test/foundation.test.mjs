import assert from 'node:assert/strict';
import test from 'node:test';

import {
  ButtonDefinitionSchema,
  ButtonVariantSchema,
  EntityIdentifierSchema,
  HeaderDefinitionSchema,
  getWexUiAllocationFamily,
  SemanticActionSchema,
  WexIdentityAllocationLookupSchema,
  WexIdentityAllocationRecordSchema,
  WexIdentityInitializationStateSchema,
  WexIdentitySpaceRegistrationSchema,
  WexPlatformRegistrationIdSchema,
  WexUiAllocationIdSchema,
  WexUiAllocationPlacementSchema,
  WexUiPlatformBindingSchema,
  WexTierSchema,
} from '../dist/index.js';

test('accepts UUID and slug identifiers', () => {
  assert.equal(
    EntityIdentifierSchema.parse({
      type: 'id',
      value: '550e8400-e29b-41d4-a716-446655440000',
    }).type,
    'id',
  );
  assert.equal(
    EntityIdentifierSchema.parse({ type: 'slug', value: 'managed-services' }).type,
    'slug',
  );
});

test('rejects uncontrolled identifiers', () => {
  assert.equal(
    EntityIdentifierSchema.safeParse({ type: 'slug', value: 'Managed Services' }).success,
    false,
  );
});

test('accepts and recognises the closed WEX UI allocation families', () => {
  assert.equal(WexUiAllocationIdSchema.parse('WEXAMABCDE'), 'WEXAMABCDE');
  assert.equal(WexUiAllocationIdSchema.parse('WEXAMHABCDE'), 'WEXAMHABCDE');
  assert.equal(getWexUiAllocationFamily('WEXAMABCDE'), 'WEXAM');
  assert.equal(getWexUiAllocationFamily('WEXAMHABCDE'), 'WEXAMH');

  for (const value of [
    'WEXZZABCDE',
    'WEXAMABCD',
    'WEXAMHABCDEF',
    'wexamABCDE',
    'WEXAMIABCD',
    'WEXAMOABCD',
    'WEXAM0ABCD',
    'WEXAM1ABCD',
  ]) {
    assert.equal(WexUiAllocationIdSchema.safeParse(value).success, false);
    assert.equal(getWexUiAllocationFamily(value), undefined);
  }
});

test('requires either a root placement or an explicit parent and slot', () => {
  assert.deepEqual(WexUiAllocationPlacementSchema.parse({}), {});
  assert.deepEqual(
    WexUiAllocationPlacementSchema.parse({
      parentAllocationId: 'WEXAMABCDE',
      slot: 'header',
    }),
    {
      parentAllocationId: 'WEXAMABCDE',
      slot: 'header',
    },
  );

  assert.equal(
    WexUiAllocationPlacementSchema.safeParse({ parentAllocationId: 'WEXAMABCDE' }).success,
    false,
  );
  assert.equal(WexUiAllocationPlacementSchema.safeParse({ slot: 'header' }).success, false);
});

test('keeps platform bindings strict and serializable', () => {
  const binding = {
    uiAllocationId: 'WEXAMHABCDE',
    bindingSlot: 'record',
    platformKey: 'compuzign',
    platformRecordRef: 'service-1',
  };

  assert.deepEqual(WexUiPlatformBindingSchema.parse(binding), binding);
  assert.equal(WexUiPlatformBindingSchema.safeParse({ ...binding, callback: () => {} }).success, false);
  assert.equal(WexUiPlatformBindingSchema.safeParse({ ...binding, handler: 'resolve' }).success, false);
  assert.equal(WexUiPlatformBindingSchema.safeParse({ ...binding, permission: 'admin' }).success, false);
  assert.equal(WexUiPlatformBindingSchema.safeParse({ ...binding, payload: {} }).success, false);
  assert.equal(WexUiPlatformBindingSchema.safeParse({ ...binding, resolver: 'lookup' }).success, false);
  assert.equal(
    WexUiPlatformBindingSchema.safeParse({ ...binding, platformRecordRef: '' }).success,
    false,
  );
});

test('defines WEX-owned platform registration and initialization states', () => {
  const registration = {
    wexPlatformRegistrationId: 'WEXPR-ABCDEFGHJKLMNPQRSTUVWXYZ23',
    platformKey: 'host-platform',
    registeredAt: '2026-10-03T00:00:00.000Z',
  };

  assert.deepEqual(WexIdentitySpaceRegistrationSchema.parse(registration), registration);
  assert.deepEqual(WexIdentityInitializationStateSchema.options, [
    'absent',
    'approval-required',
    'ready',
  ]);
  assert.equal(
    WexIdentitySpaceRegistrationSchema.safeParse({ ...registration, domainRecord: 'customer-1' }).success,
    false,
  );
  assert.equal(
    WexIdentitySpaceRegistrationSchema.safeParse({ ...registration, identitySpaceId: 'host-space-1' }).success,
    false,
  );
  assert.equal(
    WexIdentitySpaceRegistrationSchema.safeParse({ platformKey: 'host-platform', registeredAt: registration.registeredAt }).success,
    false,
  );
  for (const invalid of [
    'WEXPR-ABCDEFGHJKLMNPQRSTUVWXYZ2',
    'WEXPR-ABCDEFGHJKLMNPQRSTUVWXYZ234',
    'wexpr-ABCDEFGHJKLMNPQRSTUVWXYZ23',
    'WEXPR-ABCDEFGHJKLMNPQRSTUVWXYZI3',
    'WEXAMABCDEFGHJKLMNPQRSTUVWXYZ23',
  ]) {
    assert.equal(WexPlatformRegistrationIdSchema.safeParse(invalid).success, false);
  }
});

test('defines strict portable lifecycle records without issuing allocations', () => {
  const reserved = {
    wexPlatformRegistrationId: 'WEXPR-ABCDEFGHJKLMNPQRSTUVWXYZ23',
    allocationId: 'WEXAMABCDE',
    family: 'WEXAM',
    placement: {},
    lifecycleState: 'reserved',
    reservedAt: '2026-10-03T00:00:00.000Z',
  };
  const assigned = {
    ...reserved,
    lifecycleState: 'assigned',
    assignedAt: '2026-10-03T00:01:00.000Z',
  };
  const retired = {
    ...assigned,
    lifecycleState: 'retired',
    retiredAt: '2026-10-03T00:02:00.000Z',
    retirementEvidence: 'superseded-by-host-change',
  };

  assert.deepEqual(WexIdentityAllocationRecordSchema.parse(reserved), reserved);
  assert.deepEqual(WexIdentityAllocationRecordSchema.parse(assigned), assigned);
  assert.deepEqual(WexIdentityAllocationRecordSchema.parse(retired), retired);
  assert.equal(
    WexIdentityAllocationRecordSchema.safeParse({ ...reserved, family: 'WEXAMH' }).success,
    false,
  );
  assert.equal(
    WexIdentityAllocationRecordSchema.safeParse({ ...assigned, callback: () => {} }).success,
    false,
  );
  assert.equal(
    WexIdentityAllocationRecordSchema.safeParse({ ...retired, retirementEvidence: '' }).success,
    false,
  );
  assert.deepEqual(
    WexIdentityAllocationLookupSchema.parse({
      wexPlatformRegistrationId: 'WEXPR-ABCDEFGHJKLMNPQRSTUVWXYZ23',
      allocationId: 'WEXAMABCDE',
    }),
    {
      wexPlatformRegistrationId: 'WEXPR-ABCDEFGHJKLMNPQRSTUVWXYZ23',
      allocationId: 'WEXAMABCDE',
    },
  );
});

test('accepts semantic actions without executable callbacks', () => {
  assert.deepEqual(
    SemanticActionSchema.parse({
      id: 'save',
      label: 'Save',
      command: 'service.update',
      recordId: 'service-1',
    }),
    {
      id: 'save',
      label: 'Save',
      command: 'service.update',
      recordId: 'service-1',
    },
  );
});

test('keeps the global WEX tier language closed', () => {
  assert.deepEqual(WexTierSchema.options, ['small', 'default', 'large']);
  assert.equal(WexTierSchema.safeParse('compact').success, false);
});

test('defines an action-bound Button without serializing presentation state', () => {
  assert.deepEqual(ButtonVariantSchema.options, [
    'primary', 'neutral', 'subtle', 'warning', 'danger',
  ]);
  assert.deepEqual(
    ButtonDefinitionSchema.parse({
      action: {
        id: 'archive',
        label: 'Archive',
        command: 'record.archive',
        recordId: 'record-1',
      },
      disabled: true,
    }),
    {
      action: {
        id: 'archive',
        label: 'Archive',
        command: 'record.archive',
        recordId: 'record-1',
      },
      variant: 'primary',
      tier: 'default',
      disabled: true,
    },
  );
  assert.equal(ButtonVariantSchema.safeParse('secondary').success, false);
  assert.equal(ButtonVariantSchema.safeParse('ghost').success, false);
  assert.equal(
    ButtonDefinitionSchema.safeParse({ id: 'archive', label: 'Archive' }).success,
    false,
  );
  for (const field of [
    'id',
    'label',
    'callback',
    'handler',
    'payload',
    'permission',
    'state',
    'transientState',
    'domainData',
  ]) {
    assert.equal(
      ButtonDefinitionSchema.safeParse({
        action: {
          id: 'archive',
          label: 'Archive',
          command: 'record.archive',
          recordId: 'record-1',
        },
        [field]: field === 'state' ? 'hover' : 'unapproved',
      }).success,
      false,
    );
  }
});

test('defines a strict Header with only its governed direct-child slots', () => {
  const header = {
    brand: { capability: 'brand' },
    navigation: {
      location: {
        locationLabel: 'location-label',
        sidebarTrigger: 'sidebar-trigger',
      },
      search: { capability: 'search' },
      primaryNavigation: { capability: 'primary-navigation' },
      mainAction: { capability: 'main-action' },
    },
  };

  assert.deepEqual(HeaderDefinitionSchema.parse(header), header);
  assert.equal(HeaderDefinitionSchema.safeParse({ ...header, id: 'WEXAMHABCDE' }).success, false);
  assert.equal(HeaderDefinitionSchema.safeParse({ ...header, callback: () => {} }).success, false);
  assert.equal(
    HeaderDefinitionSchema.safeParse({
      ...header,
      navigation: { ...header.navigation, route: '/admin' },
    }).success,
    false,
  );
  assert.equal(
    HeaderDefinitionSchema.safeParse({
      ...header,
      navigation: {
        ...header.navigation,
        location: { locationLabel: 'location-label', sidebarTrigger: 'menu' },
      },
    }).success,
    false,
  );
  assert.equal(
    HeaderDefinitionSchema.safeParse({
      ...header,
      navigation: { ...header.navigation, search: { capability: 'primary-navigation' } },
    }).success,
    false,
  );
});
