/* eslint-disable @nx/enforce-module-boundaries */
import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { loginEffects, loginStore } from '~nx-angular/features/login';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideState(loginStore.loginFeature),
    provideEffects(loginEffects),
    provideStoreDevtools(),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
  ],
};
