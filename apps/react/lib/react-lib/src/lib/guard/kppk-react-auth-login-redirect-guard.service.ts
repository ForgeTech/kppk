import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { FG_ROUTING_LOGIN_PATH } from '@kppk/fg-lib-new';
import { FgAuthLocalActorService } from '../machine';

/**
 * KppkReactLoginRedirectGuard -
 * Does redirect to login route if application isn't in authorized state
 */
export const KppkReactLoginRedirectGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const $auth = inject(FgAuthLocalActorService);
  const $router = inject(Router);
  const token_login_route = inject(FG_ROUTING_LOGIN_PATH);

  return $auth.state$.pipe(
    // filter( state => !state.matches({"STATE": "INITIALIZE"})),
    map( state => {
      if (!state?.matches({"STATE": "AUTHORIZED"}) ) {
        return $router.createUrlTree([token_login_route]);
      }
      return true;
    }),
  );
};
