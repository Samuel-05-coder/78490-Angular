import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState } from './auth.models';

export const initialAuthState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, AuthActions.register, (s: AuthState) => ({ ...s, loading: true, error: null })),
  on(AuthActions.loginSuccess, AuthActions.registerSuccess, (s: AuthState, { user }) => ({ ...s, user, loading: false })),
  on(AuthActions.loginFailure, AuthActions.registerFailure, (s: AuthState, { error }) => ({ ...s, error, loading: false })),
  on(AuthActions.changeRoleSuccess, (s: AuthState, { user }) => ({ ...s, user, loading: false })),
  on(AuthActions.changeRoleFailure, (s: AuthState, { error }) => ({ ...s, error, loading: false })),
  on(AuthActions.logout, () => initialAuthState)
);
