import { FgUiSettingsConfigInterface } from './fg-ui-settings.config.interface';
import { FgUserRoleConfigInterface } from './fg-user-role.config.interface';

export interface FgUserConfigInterface<
  ROLES extends FgUserRoleConfigInterface<any>,
  SETTINGS extends FgUiSettingsConfigInterface
> {
  roles: ROLES;
  settings?: SETTINGS;
}
