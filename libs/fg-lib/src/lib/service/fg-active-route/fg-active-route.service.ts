import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { FgBaseService } from '../../base/fg-base.service';
import { FgEventService } from '../fg-event/fg-event.service';

/**
 * FgActiveRouteService -
 * Service to share a routed-components route-params
 * with other none-routed components
 */
@Injectable({
  providedIn: 'root',
})
export class FgActiveRouteService extends FgBaseService {
  /** Is used to dispatch angulars active-route via service */
  private ACTIVE_ROUTE$ = new BehaviorSubject<ActivatedRoute | false>(false);
  /** Observable allowing to subscribe to route-param changes */
  public readonly route$ = this.ACTIVE_ROUTE$.asObservable();
  /** Streams activated route params when route is available */
  public readonly params$ = this.ACTIVE_ROUTE$.asObservable().pipe(
    filter(route => (route ? true : false)),
    switchMap(route => (route ? route.params : of(false)) as Observable<Params>),
    shareReplay(1)
  );
  /** Streams activated route query params when route is available */
  public readonly queryParms$ = this.ACTIVE_ROUTE$.asObservable().pipe(
    filter(route => (route ? true : false)),
    switchMap(route => (route ? route.queryParams : of(false)) as Observable<Params>),
    shareReplay(1)
  );
  /** CONSTRUCTOR */
  constructor() {
    super()
  }
  /** Methode used publish active-route */
  public updateActiveRoute(route: ActivatedRoute): void {
    this.ACTIVE_ROUTE$.next(route);
  }
}
