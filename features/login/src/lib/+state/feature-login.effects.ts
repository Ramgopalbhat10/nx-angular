import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, of, takeUntil, tap, concatMap } from 'rxjs';
import { LoginService } from '../service/feature-login.service';
import { LoginActionsGroup } from './featrue-login.store';
import { Router } from '@angular/router';

export const performLogin = createEffect(
  (actions$ = inject(Actions), loginService = inject(LoginService), router = inject(Router)) => {
    return actions$.pipe(
      ofType(LoginActionsGroup.loginInit),
      concatMap(({ loginInput: { username, password } }) => {
        return loginService.login(username, password).pipe(
          map((loginState) =>
            LoginActionsGroup.loginSuccessful({ loginState })
          ),
          catchError((error: string) =>
            of(LoginActionsGroup.loginFailure({ error }))
          ),
          takeUntil(actions$.pipe(ofType(LoginActionsGroup.loginInit))),
          tap(() => setTimeout(() => router.navigate(['/']), 2_000)),
        );
      })
    );
  },
  { functional: true }
);
