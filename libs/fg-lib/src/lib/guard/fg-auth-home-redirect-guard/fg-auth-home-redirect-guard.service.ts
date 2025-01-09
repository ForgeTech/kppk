import { Router } from '@angular/router';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FgBaseService } from '../../base/fg-base.service';
import { FgEventService } from '../../service/fg-event/fg-event.service';
import { NGXLogger } from 'ngx-logger';
import { FG_ROUTING_HOME_PATH } from '../../token/fg-routing.token';
import { FgAuthService } from '../../service/fg-auth/fg-auth.service';

/**
 * FgAuthHomeRedirectGuard -
 * Does redirect to home-screen if auth-token is found
 */
@Injectable({
  providedIn: 'root',
})
export class FgAuthHomeRedirectGuard extends FgBaseService  {
  /** CONSTRUCTOR */
  constructor(
    protected $router: Router,
    protected $auth: FgAuthService,

    
    @Inject(FG_ROUTING_HOME_PATH) protected fgRoutingHomePath: string
  ) {
    super()
  }
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
