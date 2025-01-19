import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject} from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { FG_ROUTING_HOME_PATH } from '@kppk/fg-lib-new';
import { FgAuthLocalMachineActorService } from '../machine';

/**
 * KppkReactAuthHomeRedirectGuard -
 * Does redirect to home-screen if application is in authorized state
 */
export const KppkReactAuthHomeRedirectGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const $auth = inject(FgAuthLocalMachineActorService);
  const $router = inject(Router);
  const token_home_route = inject(FG_ROUTING_HOME_PATH);
  return $auth.state$
  .pipe(
    filter( state => !state.matches({"STATE": "INITIALIZE"})),
    map( state => {
      if (state.matches({"STATE": "AUTHORIZED"}) ) {
        return $router.createUrlTree([token_home_route]);
      }
      return true;
    }),
  );
};

