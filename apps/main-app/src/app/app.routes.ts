import { Route } from '@angular/router';
import { LayoutComponent } from '@poc-nx-workspace-monolith/shared/layout';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'users',
        loadChildren: () => import('@poc-nx-workspace-monolith/feature-users').then((m) => m.routes),
      },
      {
        path: 'welcome',
        loadComponent: () => import('./nx-welcome.component').then((m) => m.NxWelcomeComponent),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
];
