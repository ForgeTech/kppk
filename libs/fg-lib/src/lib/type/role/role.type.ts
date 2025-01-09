import * as TYPES from './roles.const';

type ROLES_MODULE = typeof TYPES;

/**
 * RoleType -
 * Type for the list of available user roles
 */
export type RoleType = ROLES_MODULE[keyof ROLES_MODULE];

/**
 * Role -
 * Type representing a simple role object
 */
export type Role<ROLE_TYPE> = {
  root: ROLE_TYPE;
  children: Role<ROLE_TYPE>[];
};
