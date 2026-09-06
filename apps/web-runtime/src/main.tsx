import '@weerax/ui';

import { WexTierSchema } from '@weerax/schemas';

export const webRuntimeFoundation = Object.freeze({
  status: 'foundation',
  tier: WexTierSchema.parse('default'),
});
