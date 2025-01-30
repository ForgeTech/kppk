import { Route } from '@angular/router';
import { HOST_ROUTES } from '@kppk/react-lib';

export const app_routes: Route[] = [
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
          ).then((m) => m!.KppkReactViewCalculationComponent),
      },
      {
        path: HOST_ROUTES.HOME,
        loadComponent: () =>
          import(
            './view/kppk-react-view-home/kppk-react-view-home.component'
          ).then((m) => m!.KppkReactViewHomeComponent),
      },
      {
        path: HOST_ROUTES.IMPRINT,
        loadComponent: () =>
          import(
            './view/kppk-react-view-imprint/kppk-react-view-imprint.component'
          ).then((m) => m!.KppkReactViewImprintComponent),
      },
      {
        path: HOST_ROUTES.DATA_PROTECTION,
        loadComponent: () =>
          import(
            './view/kppk-react-view-data-protection/kppk-react-view-data-protection.component'
          ).then((m) => m!.KppkReactViewDataProtectionComponent),
      },
    ],
  },
  {
    path: HOST_ROUTES.LOGIN,
    loadComponent: () =>
      import(
        './view/kppk-react-view-login/kppk-react-view-login.component'
      ).then((m) => m!.KppkReactViewLoginComponent),
  },
  {
    path: HOST_ROUTES.WILDCARD,
    redirectTo: HOST_ROUTES.LOGIN,
  },
];
