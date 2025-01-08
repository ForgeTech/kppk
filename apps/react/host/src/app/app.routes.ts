import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'react_view_calc',
    loadChildren: () =>
      import('react_view_calc/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'react_view_home',
    loadChildren: () =>
      import('react_view_home/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'react_view_login',
    loadChildren: () =>
      import('react_view_login/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: '**',
    redirectTo: 'react_view_home',
  },
];
