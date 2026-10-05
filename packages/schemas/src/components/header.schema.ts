import { z } from 'zod';

const HeaderBrandSlotSchema = z.object({
  capability: z.literal('brand'),
}).strict();

const HeaderSearchSlotSchema = z.object({
  capability: z.literal('search'),
}).strict();

const HeaderPrimaryNavigationSlotSchema = z.object({
  capability: z.literal('primary-navigation'),
}).strict();

const HeaderMainActionSlotSchema = z.object({
  capability: z.literal('main-action'),
}).strict();

/**
 * The responsive form is closed, while WEX owns the viewport rule that makes
 * one form active. No CSS value or breakpoint is serialised here.
 */
export const HeaderLocationSlotSchema = z.object({
  locationLabel: z.literal('location-label'),
  sidebarTrigger: z.literal('sidebar-trigger'),
}).strict();

export const HeaderNavigationDefinitionSchema = z.object({
  location: HeaderLocationSlotSchema,
  search: HeaderSearchSlotSchema,
  primaryNavigation: HeaderPrimaryNavigationSlotSchema,
  mainAction: HeaderMainActionSlotSchema,
}).strict();

/**
 * A reusable Header capability defines only its two direct children. Child
 * internals remain governed by their own future contracts.
 */
export const HeaderDefinitionSchema = z.object({
  brand: HeaderBrandSlotSchema,
  navigation: HeaderNavigationDefinitionSchema,
}).strict();

export type HeaderDefinition = z.infer<typeof HeaderDefinitionSchema>;
export type HeaderDefinitionInput = z.input<typeof HeaderDefinitionSchema>;
export type HeaderLocationSlot = z.infer<typeof HeaderLocationSlotSchema>;
export type HeaderNavigationDefinition = z.infer<typeof HeaderNavigationDefinitionSchema>;
