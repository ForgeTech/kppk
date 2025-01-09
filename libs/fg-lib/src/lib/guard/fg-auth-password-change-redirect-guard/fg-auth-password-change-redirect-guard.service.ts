import { Router } from '@angular/router';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FgBaseService } from '../../base/fg-base.service';
import { FgEventService } from '../../service/fg-event/fg-event.service';
import { NGXLogger } from 'ngx-logger';
import { FG_ROUTING_PASSWORD_CHANGE_PATH } from '../../token/fg-routing.token';
import { FgAuthTokenInterface } from '../../service/fg-auth/fg-auth.abstract.service';
import { FgAuthService } from '../../service/fg-auth/fg-auth.service';

/**
 * FgPasswordChangeRedirectGuard -
 * Does redirect to password-change route if a auth-token with
 * 'forcePasswordChange' property set to true is found
 */
@Injectable({
  providedIn: 'root',
})
export class FgPasswordChangeRedirectGuard extends FgBaseService  {
  /** CONSTRUCTOR */
  constructor(
    protected $router: Router,
    protected $auth: FgAuthService,
    @Inject(FG_ROUTING_PASSWORD_CHANGE_PATH) protected passwordChangePath: string,

    @Optional() protected override $log: NGXLogger
  ) {
    super()
  }
  /** Checks if called route can be activated by current navigation-request */
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const canActivate$: Observable<boolean> = this.$auth.getStoredAuthData().pipe(
      map(authToken => {
        let canActivate = false;
        if (authToken && authToken?.forcePasswordChange) {
          this.$router.navigate([this.passwordChangePath]);
        } else {
          canActivate = true;
        }
        return canActivate;
      })
    );
    return canActivate$;
  }
}
