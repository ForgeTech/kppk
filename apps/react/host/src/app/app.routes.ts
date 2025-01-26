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
          import('react_view_calc/Routes').then((m) => m!.remoteRoutes),
      },
      {
        path: HOST_ROUTES.HOME,
        loadChildren: () =>
          import('react_view_home/Routes').then((m) => m!.remoteRoutes),
      },
    ]
  },
  {
    path: HOST_ROUTES.LOGIN,
    loadChildren: () =>
      import('react_view_login/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: HOST_ROUTES.WILDCARD,
    redirectTo: HOST_ROUTES.LOGIN,
  },
];
