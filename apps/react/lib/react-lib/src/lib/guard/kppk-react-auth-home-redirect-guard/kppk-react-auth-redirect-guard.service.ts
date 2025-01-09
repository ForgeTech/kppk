import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject} from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { ROUTES_ENUM } from '../../app.routes';
import { KppkReactComponentBaseService } from '../../base/xstate-base/kppk-react-component-base.service';

/**
 * KppkReactAuthHomeRedirectGuard -
 * Does redirect to home-screen if application is in authorized state
 */
export const KppkReactAuthHomeRedirectGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const $component = inject(KppkReactComponentBaseService);
  const $router = inject(Router);

  return $component.state_auth$
  .pipe(
    filter( state => !state.matches({"STATE": "INITIALIZE"})),
    map( state => {
      console.log('AUTH_HOME_REDIRECT_GUARD');
      if (state.matches({"STATE": "AUTHORIZED"}) ) {
        console.log('REDIRECTS_HOME');
        return $router.createUrlTree([ROUTES_ENUM.HOME]);
      }
      return true;
    }),
  );
};

