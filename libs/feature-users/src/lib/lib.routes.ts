import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/user-list/user-list.component').then((m) => m.UserListComponent),
  },
];
