import { randomBytes as nodeRandomBytes } from 'node:crypto';

import {
  WexIdentitySpaceRegistrationSchema,
  WexPlatformRegistrationIdSchema,
  WEX_PLATFORM_REGISTRATION_PREFIX,
  WEX_PLATFORM_REGISTRATION_SUFFIX_ALPHABET,
  WEX_PLATFORM_REGISTRATION_SUFFIX_LENGTH,
  type WexIdentitySpaceRegistration,
  type WexPlatformRegistrationId,
} from '@weerax/schemas';

export type WexIdentityStorageAdapter = {
  detectSpace(): Promise<'absent' | 'present'>;
  createSpace(registration: WexIdentitySpaceRegistration): Promise<void>;
  readRegistration(): Promise<WexIdentitySpaceRegistration | undefined>;
};

export type WexIdentityBootstrapOptions = {
  adapter: WexIdentityStorageAdapter;
  platformKey: string;
  approvalGranted: boolean;
  now?: () => Date;
  randomBytes?: (size: number) => Uint8Array;
};

export type WexIdentityBootstrapResult =
  | { state: 'approval-required' }
  | { state: 'ready'; registration: WexIdentitySpaceRegistration };

export class WexIdentityBootstrapError extends Error {
  override name = 'WexIdentityBootstrapError';
}

function bootstrapError(message: string, cause?: unknown): WexIdentityBootstrapError {
  return new WexIdentityBootstrapError(message, cause === undefined ? undefined : { cause });
}

function sameRegistration(
  expected: WexIdentitySpaceRegistration,
  actual: WexIdentitySpaceRegistration,
): boolean {
  return expected.wexPlatformRegistrationId === actual.wexPlatformRegistrationId
    && expected.platformKey === actual.platformKey
    && expected.registeredAt === actual.registeredAt;
}

function parseRegistration(value: unknown): WexIdentitySpaceRegistration {
  try {
    return WexIdentitySpaceRegistrationSchema.parse(value);
  } catch (error) {
    throw bootstrapError('WEX identity registration is invalid or damaged', error);
  }
}

async function readRequiredRegistration(
  adapter: WexIdentityStorageAdapter,
): Promise<WexIdentitySpaceRegistration> {
  let registration: WexIdentitySpaceRegistration | undefined;
  try {
    registration = await adapter.readRegistration();
  } catch (error) {
    throw bootstrapError('Unable to read WEX identity registration', error);
  }
  if (registration === undefined) {
    throw bootstrapError('WEX identity space is missing its registration');
  }
  return parseRegistration(registration);
}

export function generateWexPlatformRegistrationId(
  randomBytes: (size: number) => Uint8Array = nodeRandomBytes,
): WexPlatformRegistrationId {
  const random = randomBytes(WEX_PLATFORM_REGISTRATION_SUFFIX_LENGTH);
  if (!(random instanceof Uint8Array) || random.length !== WEX_PLATFORM_REGISTRATION_SUFFIX_LENGTH) {
    throw bootstrapError('Secure random source did not return 26 bytes');
  }
  const suffix = Array.from(random, (value) => (
    WEX_PLATFORM_REGISTRATION_SUFFIX_ALPHABET[value & 0b11111]
  )).join('');
  return WexPlatformRegistrationIdSchema.parse(`${WEX_PLATFORM_REGISTRATION_PREFIX}${suffix}`);
}

export async function bootstrapWexIdentity(
  options: WexIdentityBootstrapOptions,
): Promise<WexIdentityBootstrapResult> {
  let observed: 'absent' | 'present';
  try {
    observed = await options.adapter.detectSpace();
  } catch (error) {
    throw bootstrapError('WEX identity space is damaged or unreadable', error);
  }

  if (observed === 'present') {
    return { state: 'ready', registration: await readRequiredRegistration(options.adapter) };
  }
  if (observed !== 'absent') {
    throw bootstrapError('WEX identity adapter returned an invalid space observation');
  }
  if (!options.approvalGranted) return { state: 'approval-required' };

  const registration = parseRegistration({
    wexPlatformRegistrationId: generateWexPlatformRegistrationId(options.randomBytes),
    platformKey: options.platformKey,
    registeredAt: (options.now ?? (() => new Date()))().toISOString(),
  });

  try {
    await options.adapter.createSpace(registration);
  } catch (createError) {
    let readback: WexIdentitySpaceRegistration | undefined;
    try {
      readback = await options.adapter.readRegistration();
    } catch (readError) {
      throw bootstrapError('WEX identity creation failed and readback is unreadable', readError);
    }
    if (readback === undefined) {
      throw bootstrapError('WEX identity creation failed without a durable registration', createError);
    }
    const parsedReadback = parseRegistration(readback);
    if (!sameRegistration(registration, parsedReadback)) {
      throw bootstrapError('WEX identity creation readback does not match the generated registration');
    }
    return { state: 'ready', registration: parsedReadback };
  }

  const readback = await readRequiredRegistration(options.adapter);
  if (!sameRegistration(registration, readback)) {
    throw bootstrapError('WEX identity creation readback does not match the generated registration');
  }
  return { state: 'ready', registration: readback };
}
