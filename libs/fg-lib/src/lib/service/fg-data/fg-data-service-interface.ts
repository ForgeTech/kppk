import { Observable } from 'rxjs';
import { ApplicationStateEntity } from '../../entity/application.state.entity';
import { ApplicationStateInterface } from '../../interfaces/application.state.interface';
import { ApplicationInterface } from '../../interfaces/application.interface';
import { ApplicationConfigInterface } from '../../interfaces/application.config.interface';

/**
 * FgDataServiceInterface -
 * Describe basic interface of an applications main
 * data-source. Implemented by the service used to
 * manage the applications primary source of data
 */
export interface FgDataServiceInterface {
  /** Provides stream of application-data */
  app$: Observable<ApplicationInterface>;
  /** Methode to update application data */
  updateApp(app: ApplicationInterface): Observable<ApplicationInterface>;
  /** Provides stream of application-data */
  state$: Observable<ApplicationStateInterface>;
  /** Methode to update application state-data */
  updateState(state: ApplicationStateInterface): ApplicationStateInterface;
  /** Methode used to persist local app-configuration data */
  persistConfig(config: ApplicationConfigInterface): Observable<unknown>;
  /** Prepare and connect to applications main-datasource */
  connect(options?: any): Observable<any>;
  /** Disconnect applications main-datasource and perform clean-up taks */
  disconnect(options?: any): Observable<any>;
}
