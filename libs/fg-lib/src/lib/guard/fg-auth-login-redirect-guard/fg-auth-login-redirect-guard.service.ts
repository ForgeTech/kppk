import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { FgAuthService } from '../../service/fg-auth/fg-auth.service';
import { Injectable, InjectionToken, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FgBaseService } from '../../base/fg-base.service';

/**
 * Injection-Token used to provide the path to 'login' view
 */
export const FG_ROUTING_LOGIN_PATH = new InjectionToken<string>('');
/**
 * FgAuthLoginRedirectGuard -
 * Does redirect to login route if there is no auth-token available.
 */
@Injectable({
  providedIn: 'root',
})
export class FgAuthLoginRedirectGuard extends FgBaseService  {
  protected $router = inject(Router);
  protected $auth = inject(FgAuthService);
  protected activeRoute = inject(ActivatedRoute);
  protected loginPath = inject(FG_ROUTING_LOGIN_PATH);

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
