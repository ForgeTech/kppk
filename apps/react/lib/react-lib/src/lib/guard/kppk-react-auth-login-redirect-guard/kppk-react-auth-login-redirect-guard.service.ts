import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ROUTES_ENUM } from '../../app.routes';
import { KppkReactComponentBaseService } from '../../base/xstate-base/kppk-react-component-base.service';
import { FgBaseService, FgComponentBaseService } from '@fg-kppk/fg-base';

/**
 * KppkReactLoginRedirectGuard -
 * Does redirect to login route if application isn't in authorized state
 */
export const KppkReactLoginRedirectGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const $component = inject(KppkReactComponentBaseService);
  const $router = inject(Router);

  return $component.state_auth$
  .pipe(
    filter( state => !state.matches({"STATE": "INITIALIZE"})),
    map( state => {
      // console.log('AUTH_HOME_REDIRECT_GUARD');
      if (!state?.matches({"STATE": "AUTHORIZED"}) ) {
        // console.log('REDIRECTS_HOME');
        return $router.createUrlTree([ROUTES_ENUM.LOGIN]);
      }
      return true;
    }),
  );
};
