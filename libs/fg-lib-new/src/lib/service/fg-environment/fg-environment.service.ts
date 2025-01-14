import { Inject, Injectable } from '@angular/core';
import { FgEnvironmentConfigInterface } from '../../interface/fg-environment.config.interface';
import { FG_ENVIRONMENT } from '../../token/fg-environment.token';
import { FgBaseService } from '../../base/fg-base.service';
/**
 * Create base Interface and Class to allow to inject angular-environment variables as
 * service for usage in application and to allow override during unit/e2e-testing
 * https://stackoverflow.com/questions/48495665/extending-this-in-typescript-class-by-object-assign
 */
interface BaseEnvironment extends FgEnvironmentConfigInterface<any> {}
class BaseEnvironment extends FgBaseService implements FgEnvironmentConfigInterface<any> {}
/**
 * EnvironmentService -
 * Service to allow injection of angular environment-variables for
 * usage within the application
 */
@Injectable({
  providedIn: 'root',
})
export class FgEnvironmentService extends BaseEnvironment {
  /** CONSTRUCTOR */
  constructor(@Inject(FG_ENVIRONMENT) environment: BaseEnvironment) {
    super();
    Object.assign(this, environment);
  }
}
