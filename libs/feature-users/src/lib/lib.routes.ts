import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/user-list/user-list.component').then((m) => m.UserListComponent),
  },
  {
    path: 'create',
    loadComponent: () => import('./pages/user-form/user-form.component').then((m) => m.UserFormComponent),
  },
];
