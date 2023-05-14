import { inject } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { exhaustMap, map, catchError, of } from "rxjs";
import { LoginService } from "../service/feature-login.service";
import { LoginActionsGroup } from "./featrue-login.store";

export const performLogin = createEffect(
  (
    actions$ = inject(Actions),
    loginService = inject(LoginService)
  ) => {
    return actions$.pipe(
      ofType(LoginActionsGroup.loginInit),
      exhaustMap(({ loginInput }) => {
        const { username, password } = loginInput;
        return loginService.login(username, password).pipe(
          map((loginState) =>
            LoginActionsGroup.loginSuccessful({ loginState })
          ),
          catchError(({ error }: { error: string }) =>
            of(LoginActionsGroup.loginFailure({ error }))
          )
        )
      })
    )
  },
  { functional: true }
)