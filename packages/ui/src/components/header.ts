import {
  HeaderDefinitionSchema,
  type HeaderDefinitionInput,
} from '@weerax/schemas';

export interface HeaderSlotPresentation {
  readonly capability: string;
  readonly className: string;
  readonly label: string;
}

export interface HeaderPresentation {
  readonly className: string;
  readonly brand: HeaderSlotPresentation;
  readonly navigation: {
    readonly className: string;
    readonly locationLabel: HeaderSlotPresentation;
    readonly sidebarTrigger: HeaderSlotPresentation;
    readonly search: HeaderSlotPresentation;
    readonly primaryNavigation: HeaderSlotPresentation;
    readonly mainAction: HeaderSlotPresentation;
  };
}

/**
 * Resolves a serializable Header definition into platform-neutral semantic
 * structure. Rendering, native events, and child-component internals remain
 * with the consuming integration.
 */
export function createHeaderPresentation(input: HeaderDefinitionInput): HeaderPresentation {
  const header = HeaderDefinitionSchema.parse(input);

  return {
    className: 'wex-header',
    brand: {
      capability: header.brand.capability,
      className: 'wex-header__brand',
      label: 'Brand',
    },
    navigation: {
      className: 'wex-header__navigation',
      locationLabel: {
        capability: header.navigation.location.locationLabel,
        className: 'wex-header__location-label',
        label: 'Location',
      },
      sidebarTrigger: {
        capability: header.navigation.location.sidebarTrigger,
        className: 'wex-header__sidebar-trigger',
        label: 'Open sidebar',
      },
      search: {
        capability: header.navigation.search.capability,
        className: 'wex-header__search',
        label: 'Search',
      },
      primaryNavigation: {
        capability: header.navigation.primaryNavigation.capability,
        className: 'wex-header__primary-navigation',
        label: 'Primary navigation',
      },
      mainAction: {
        capability: header.navigation.mainAction.capability,
        className: 'wex-header__main-action',
        label: 'Main action',
      },
    },
  };
}
