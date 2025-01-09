import { Injectable } from '@angular/core';
import { FgDataServiceInterface } from './fg-data-service-interface';
import { Subject, Observable, BehaviorSubject, of } from 'rxjs';
import { ApplicationInterface, APP_STORAGE_KEY_CONFIG } from '../../interfaces/application.interface';
import { FgEnvironmentService } from '../fg-environment/fg-environment.service';
import { ApplicationStateEntity } from '../../entity/application.state.entity';
import { ApplicationStateInterface, ConnectionState } from '../../interfaces/application.state.interface';
import { FgStorageService } from '../fg-storage/fg-storage.service';
import { ApplicationConfigInterface } from '../../interfaces/application.config.interface';
import { shareReplay } from 'rxjs/operators';

/**
 * FgDataService -
 * Service is used to hold a applications data-model, make it
 * accessible and distribute changes within the application
 * CAUTION: This version only holds application-data
 * defined in envirement-file and is meant to be exchanged
 * with specific application implementation via DI
 */
@Injectable({
  providedIn: 'platform',
})
export class FgDataService implements FgDataServiceInterface {
  /** Provides stream of current application-data */
  protected APP$: Subject<ApplicationInterface>;
  get app$(): Observable<ApplicationInterface> {
    return this.APP$.asObservable().pipe(shareReplay(1));
  }
  protected APP: ApplicationInterface;
  get app() {
    return this.APP;
  }
  updateApp(app: ApplicationInterface): Observable<ApplicationInterface> {
    this.APP = app;
    this.APP$.next(app);
    return this.app$;
  }
  /** Provides stream of current application connection-state */
  protected STATE$: Subject<ApplicationStateInterface>;
  get state$(): Observable<ApplicationStateInterface> {
    return this.STATE$.asObservable().pipe(shareReplay(1));
  }
  protected STATE: ApplicationStateInterface;
  get state(): ApplicationStateInterface {
    return this.STATE;
  }
  updateState(state: ApplicationStateInterface) {
    this.STATE = state;
    this.STATE$.next(state);
    return this.STATE;
  }
  /** CONSTRUCTOR */
  constructor(protected $env: FgEnvironmentService, protected $storage: FgStorageService) {
    this.APP = this.$env.app;
    this.APP$ = new BehaviorSubject(this.APP);
    this.STATE = new ApplicationStateEntity();
    this.STATE$ = new BehaviorSubject(this.STATE);
  }
  public persistConfig(config: ApplicationConfigInterface): Observable<unknown> {
    return this.$storage.setItem(APP_STORAGE_KEY_CONFIG, config);
  }
  /** Prepare and connect to applications main-datasource */
  public connect(options?: any): Observable<any> {
    return of(true);
  }
  /** Disconnect applications main-datasource and perform clean-up taks */
  public disconnect(options?: any): Observable<any> {
    return of(true);
  }
}
