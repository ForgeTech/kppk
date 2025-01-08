import { Route } from '@angular/router';

export const hostRoutes = {
    root: '',
    calc: 'react_view_calc',
    home: 'react_view_home',
    login: 'react_view_login',
    wildcard: '**',
}

export const appRoutes: Route[] = [
  // {
  //   path: hostRoutes.root,
  //   loadComponent: () => import('./view/both.view.component').then(m => m.BothViewComponent),
  //   children: [
      {
        path: hostRoutes.calc,
        loadChildren: () =>
          import('react_view_calc/Routes').then((m) => m!.remoteRoutes),
      },
      {
        path: hostRoutes.home,
        loadChildren: () =>
          import('react_view_home/Routes').then((m) => m!.remoteRoutes),
      },
  //   ]
  // },
  {
    path: hostRoutes.login,
    loadChildren: () =>
      import('react_view_login/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: hostRoutes.wildcard,
    redirectTo: hostRoutes.home,
  },
];
