import {
  createActionGroup,
  createFeature,
  createReducer,
  emptyProps,
  on,
  props,
} from '@ngrx/store';

export type LoginInput = {
  username: string | undefined;
  password: string | undefined;
}

export type LoginState = {
  isLoggedIn: boolean;
  jwt: string | null;
};

export type State = {
  loginState: LoginState | null;
  isLoading: boolean;
  error: string | null;
};

export const initialState: State = {
  loginState: null,
  isLoading: false,
  error: null,
};

export const LoginActionsGroup = createActionGroup({
  source: 'Login',
  events: {
    'Login Opened': emptyProps(),
    'Login Init': props<{ loginInput: LoginInput }>(),
    'Login Successful': props<{ loginState: LoginState }>(),
    'Login Failure': props<{ error: string }>(),
  },
});

export const loginReducers = createReducer(
  initialState,
  on(LoginActionsGroup.loginInit, (state) => ({ ...state, isLoading: true })),
  on(LoginActionsGroup.loginSuccessful, (state, { loginState }) => ({
    ...state,
    loginState,
  })),
  on(LoginActionsGroup.loginFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export const loginFeature = createFeature({
  name: 'login',
  reducer: loginReducers,
});