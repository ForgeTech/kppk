import { InjectionToken } from '@angular/core';
import { FgEnvironmentConfigInterface } from '@kppk/fg-lib-new';

/**
 * Injection-Token used used to provide environment variables outside app.module
 */
export const FG_ENVIRONMENT = new InjectionToken<FgEnvironmentConfigInterface<any>>('FgEnvironment');
