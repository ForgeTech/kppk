import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { FgAuthService } from '../../service/fg-auth/fg-auth.service';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FgBaseService } from '../../base/fg-base.service';
import { FgEventService } from '../../service/fg-event/fg-event.service';
import { NGXLogger } from 'ngx-logger';
import { FG_ROUTING_LOGIN_PATH } from '../../token/fg-routing.token';

/**
 * FgAuthLoginRedirectGuard -
 * Does redirect to login route if there is no auth-token available.
 */
@Injectable({
  providedIn: 'root',
})
export class FgAuthLoginRedirectGuard extends FgBaseService  {
  /** CONSTRUCTOR */
  constructor(
    protected $router: Router,
    protected $auth: FgAuthService,
    protected activeRoute: ActivatedRoute,
    @Inject(FG_ROUTING_LOGIN_PATH) protected loginPath: string,

    @Optional() protected override $log: NGXLogger
  ) {
    super()
  }
  /** Checks if called route can be activated by current navigation-request */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const canActivate$: Observable<boolean> = this.$auth.getStoredAuthData().pipe(
      map(authToken => {
        console.log('AUTH_LOGIN_GUARD');
        let canActivate = false;
        if (!authToken) {
          console.log('AUTH_REDIRECT_TO_LOGIN');
          const snap = this.activeRoute.snapshot;
          this.$router.navigate([this.loginPath], { queryParams: { returnUrl: state.url } });
        } else {
          canActivate = true;
          console.log('AUTH_CAN_ACTIVATE_TRUE');
        }
        return canActivate;
      })
    );
    return canActivate$;
  }
}
