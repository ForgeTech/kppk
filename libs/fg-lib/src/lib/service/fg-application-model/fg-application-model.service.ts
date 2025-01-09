import { Inject, Injectable, Optional } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FgEnvironmentService } from '../fg-environment/fg-environment.service';
import { FgStorageService } from '../fg-storage/fg-storage.service';
import { FgEventService } from '../fg-event/fg-event.service';
import { NGXLogger } from 'ngx-logger';
import { FgEvent } from '../fg-event/fg-event.class';
import { DELAY_MODEL_CONSTRUCTION_UNTIL, FgApplicationModelServiceAbstract } from './fg-application-model.abstract-service';
export interface HelperInterface {
  model: boolean;
}
/**
 * FgApplicationModelService -
 * Service is used to hold a applications data-model, make it
 * accessible and distribute changes within the application
 * CAUTION: This version only holds application-data
 * defined in envirement-file and is meant to be exchanged
 * with specific application implementation via DI
 */
@Injectable({
  providedIn: 'root',
})
export class FgApplicationModelService extends FgApplicationModelServiceAbstract<HelperInterface> {
  /** CONSTRUCTOR */
  constructor(
    protected $env: FgEnvironmentService,
    protected $storage: FgStorageService,
    /** (Optional) Injection token to prevent modal preinitalization */
    @Optional() @Inject(DELAY_MODEL_CONSTRUCTION_UNTIL) DELAY_UNTIL_SUBSCRIPTION: true,
  ) {
    super(DELAY_UNTIL_SUBSCRIPTION);
  }
  /**
   * OVERRIDE to implement specific bootstrap for application
   * model data
   */
  protected initModel(): Observable<HelperInterface> {
    return of({ model: true });
  }
  /**
   * OVERRIDE to implement model updates based on your specific
   * update events
   */
  protected updateModel(model: HelperInterface, event: FgEvent): HelperInterface {
    return model;
  }
  /**
   * OVERRIDE to add the specific model update events being
   * implemented
   */
  protected getModelUpdateEvents(): string[] {
    return [];
  }
  /** Connect user to applicaiton model and fetch specific data */
  public connectUser(): Observable<boolean> {
    return of(false);
  }
  /** Disconnect user from applicaiton model and perform cleanup*/
  public disconnectUser(): Observable<boolean> {
    return of(false);
  }
}
