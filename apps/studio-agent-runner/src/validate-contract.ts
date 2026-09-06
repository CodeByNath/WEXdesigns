import {
  EntityIdentifierSchema,
  SemanticActionSchema,
  WexTierSchema,
} from '@weerax/schemas';

export const foundationValidation = Object.freeze({
  identifier: EntityIdentifierSchema.parse({
    type: 'slug',
    value: 'foundation-validation',
  }),
  action: SemanticActionSchema.parse({
    id: 'validate',
    label: 'Validate',
    command: 'contract.validate',
    recordId: 'foundation-validation',
  }),
  tier: WexTierSchema.parse('default'),
});
