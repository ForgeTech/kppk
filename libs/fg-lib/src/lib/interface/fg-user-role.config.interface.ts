/**
 * FgUserRoleConfigInterface -
 * Interface representing a users role cofiguration to enable
 * role-switching features
 */
export interface FgUserRoleConfigInterface<ROLE_TYPE> {
  root: ROLE_TYPE;
  active: ROLE_TYPE;
  available: ROLE_TYPE[];
}
