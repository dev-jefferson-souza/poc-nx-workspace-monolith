import { Route } from '@angular/router';
import { LayoutComponent } from '@poc-nx-workspace-monolith/shared/layout';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'users',
        loadChildren: () => import('@poc-nx-workspace-monolith/feature-users').then((m) => m.routes),
      },
    ],
  },
  { path: '**', redirectTo: 'users', pathMatch: 'full' },
];
