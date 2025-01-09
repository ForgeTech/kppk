import { Router } from '@angular/router';
import { Injectable, InjectionToken, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FgBaseService } from '../../base/fg-base.service';
import { FgEventService } from '../../service/fg-event/fg-event.service';
import { NGXLogger } from 'ngx-logger';
import { FgAuthService } from '../../service/fg-auth/fg-auth.service';

/**
 * Injection-Token used to provide the path to 'home' view
 */
export const FG_ROUTING_HOME_PATH = new InjectionToken<string>('');


/**
 * FgAuthHomeRedirectGuard -
 * Does redirect to home-screen if auth-token is found
 */
@Injectable({
  providedIn: 'root',
})
export class FgAuthHomeRedirectGuard extends FgBaseService  {
  protected $router = inject(Router);
  protected $auth = inject(FgAuthService);
  protected fgRoutingHomePath = inject(FG_ROUTING_HOME_PATH);

  /** Checks if called route can be activated by current navigation-request */
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const canActivate$: Observable<boolean> = this.$auth.getStoredAuthData().pipe(
      map(authCookie => {
        let canActivate = false;
        if (authCookie) {
          this.$router.navigate([this.fgRoutingHomePath]);
        } else {
          canActivate = true;
        }
        return canActivate;
      })
    );
    return canActivate$;
  }
}
