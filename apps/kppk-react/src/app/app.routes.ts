import { Route } from '@angular/router';
import { HOST_ROUTES } from '@kppk/react-lib';



export const app_routes: Route[] = [
  {
    pathMatch: 'prefix',
    path: HOST_ROUTES.ROOT,
    loadComponent: () => 
      import('./layout/kppk-react-default-layout-router-outlet/kppk-react-default-layout-router-outlet.component')
      .then(m => m.KppkReactDefaultLayoutRouterOutletComponent),
    children: [
      {
        path:  HOST_ROUTES.ROOT,
        pathMatch: 'prefix',
        redirectTo: HOST_ROUTES.HOME
      },
      {
        path: HOST_ROUTES.CALC,
        loadChildren: () =>
          import('./view/kppk-react-view-calculation/kppk-react-view-calculation.component')
          .then((m) => m!.KppkReactViewCalculationComponent),
      },
      {
        path: HOST_ROUTES.HOME,
        loadChildren: () =>
          import('./view/kppk-react-view-home/kppk-react-view-home.component')
          .then((m) => m!.KppkReactViewHomeComponent),
      },
    ]
  },
  {
    path: HOST_ROUTES.LOGIN,
    loadChildren: () =>
      import('./view/kppk-react-view-login/kppk-react-view-login.component')
      .then((m) => m!.KppkReactViewLoginComponent),
  },
  {
    path: HOST_ROUTES.WILDCARD,
    redirectTo: HOST_ROUTES.LOGIN,
  },
];
