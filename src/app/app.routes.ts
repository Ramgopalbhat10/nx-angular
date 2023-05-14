import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadChildren: () =>
      import('~nx-angular/features/login').then((m) => m.featuresLoginRoutes),
  },
  {
    path: '',
    component: HomeComponent
  }
];
