import { LogoDefinitionSchema, type LogoDefinitionInput } from '@weerax/schemas';

export interface LogoPresentation {
  readonly className: string;
  readonly label: string;
}

/** Resolves a serializable Logo definition without browser or host behaviour. */
export function createLogoPresentation(input: LogoDefinitionInput): LogoPresentation {
  const logo = LogoDefinitionSchema.parse(input);

  return {
    className: 'wex-logo',
    label: logo.label,
  };
}
