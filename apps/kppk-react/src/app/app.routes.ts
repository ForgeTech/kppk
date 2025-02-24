import { Route } from '@angular/router';
import { FgNavigationGuard, HOST_ROUTES } from '@kppk/react-lib';

export const append_routes_with_default_guards = function( routes: Route[]): Route[] {
  // routes.forEach( route => {
  //   if( route.children ) {
  //     append_routes_with_default_guards( route.children );
  //   } else {
  //     if(route.redirectTo === undefined){
  //       if(route.canActivate === undefined) {
  //         route.canActivate = [];
  //       }
  //       route.canActivate.push(FgNavigationGuard);
  //       if(route.canDeactivate === undefined) {
  //         route.canDeactivate = [];
  //       }
  //       route.canDeactivate.push(FgNavigationGuard)
  //     }
  //   }
  // });
  // console.log('>>>>>>>>>>>ROUTES>>>>>>>>>>>>');
  return routes;
}

export const app_routes: Route[] = append_routes_with_default_guards([
  {
    pathMatch: 'prefix',
    path: HOST_ROUTES.ROOT,
    loadComponent: () =>
      import(
        './layout/kppk-react-default-layout-router-outlet/kppk-react-default-layout-router-outlet.component'
      ).then((m) => m.KppkReactDefaultLayoutRouterOutletComponent),
    children: [
      {
        path: HOST_ROUTES.ROOT,
        pathMatch: 'prefix',
        redirectTo: HOST_ROUTES.HOME,
      },
      {
        path: HOST_ROUTES.CALC,
        loadComponent: () =>
          import(
            './view/kppk-react-view-calculation/kppk-react-view-calculation.component'
          ).then((m) => m.KppkReactViewCalculationComponent),
      },
      {
        path: HOST_ROUTES.HOME,
        loadComponent: () =>
          import(
            './view/kppk-react-view-home/kppk-react-view-home.component'
          ).then((m) => m.KppkReactViewHomeComponent),
      },
      {
        path: HOST_ROUTES.IMPRINT,
        loadComponent: () =>
          import(
            './view/kppk-react-view-imprint/kppk-react-view-imprint.component'
          ).then((m) => m.KppkReactViewImprintComponent),
      },
      {
        path: HOST_ROUTES.DATA_PROTECTION,
        loadComponent: () =>
          import(
            './view/kppk-react-view-data-protection/kppk-react-view-data-protection.component'
          ).then((m) => m.KppkReactViewDataProtectionComponent),
      },
    ],
  },
  {
    path: HOST_ROUTES.AUTH,
    loadComponent: () =>
      import(
        './layout/kppk-react-view-auth-layout-router-outlet/kppk-react-view-auth-layout-router-outlet.component'
      ).then((m) => m.KppkReactViewAuthLayoutRouterOutletComponent),
      children: [
        {
          path: HOST_ROUTES.AUTH_LOGIN,
          pathMatch: 'prefix',
          loadComponent: () =>
            import(
              './view/kppk-react-view-auth-login/kppk-react-view-auth-login.component'
            ).then((m) => m.KppkReactViewAuthLoginComponent),
        },
        {
          path: HOST_ROUTES.AUTH_PASSWORD_FORGOT,
          pathMatch: 'prefix',
          loadComponent: () =>
            import(
              './view/kppk-react-view-auth-password-forgot/kppk-react-view-auth-password-forgot.component'
            ).then((m) => m.KppkReactViewAuthPasswordForgotComponent),
        },
        {
          path: HOST_ROUTES.AUTH_PASSWORD_CHANGE,
          pathMatch: 'prefix',
          loadComponent: () =>
            import(
              './view/kppk-react-view-auth-password-change/kppk-react-view-auth-password-change.component'
            ).then((m) => m.KppkReactViewAuthPasswordChangeComponent),
        },
        {
          path: HOST_ROUTES.AUTH_PASSWORD_RESET,
          pathMatch: 'prefix',
          loadComponent: () =>
            import(
              './view/kppk-react-view-auth-password-reset/kppk-react-view-auth-password-reset.component'
            ).then((m) => m.KppkReactViewAuthPasswordResetComponent),
        },
        {
          path: HOST_ROUTES.AUTH_LOGOUT,
          pathMatch: 'prefix',
          loadComponent: () =>
            import(
              './view/kppk-react-view-auth-logout/kppk-react-view-auth-logout.component'
            ).then((m) => m.KppkReactViewAuthLogoutComponent),
        },
        {
          path: HOST_ROUTES.WILDCARD,
          pathMatch: 'prefix',
          redirectTo: [HOST_ROUTES.AUTH_LOGIN].join('/')
        },
      ]
  },
  {
    path: HOST_ROUTES.WILDCARD,
    redirectTo: [HOST_ROUTES.AUTH, HOST_ROUTES.AUTH_LOGIN].join('/'),
  },
]);
