import * as TYPES from './fg-roles.const';

type ROLES_MODULE = typeof TYPES;

/**
 * RoleType -
 * Type for the list of available user roles
 */
export type FgRoleType = ROLES_MODULE[keyof ROLES_MODULE];

/**
 * Role -
 * Type representing a simple role object
 */
export type FgRole<ROLE_TYPE> = {
  root: ROLE_TYPE;
  children: FgRole<ROLE_TYPE>[];
};
