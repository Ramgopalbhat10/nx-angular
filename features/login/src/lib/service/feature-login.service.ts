import { Injectable } from "@angular/core";
import { Observable, delay, of, throwError } from "rxjs";
import { LoginState } from "../+state/featrue-login.store";

const loginState: LoginState = {
  isLoggedIn: true,
  jwt: "abcdef"
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  login(username?: string, password?: string): Observable<LoginState> {
    if (username === "demo" && password === "demo") {
      return of(loginState).pipe(delay(2_000));
    } else {
      const error = new Error("username or password is incorrect")
      return throwError(() => error)
    }
  }
}