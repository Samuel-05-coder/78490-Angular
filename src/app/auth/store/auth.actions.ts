import { createAction, props } from '@ngrx/store';
import { User } from './auth.models';

export const login = createAction('[Auth] Login', props<{ username: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: User }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());

export const register = createAction('[Auth] Register', props<{ username: string; password: string }>());
export const registerSuccess = createAction('[Auth] Register Success', props<{ user: User }>());
export const registerFailure = createAction('[Auth] Register Failure', props<{ error: string }>());

export const logout = createAction('[Auth] Logout');

// change role (admin/user) for a specific username
export const changeRole = createAction('[Auth] Change Role', props<{ username: string; role: 'admin' | 'user' }>());
export const changeRoleSuccess = createAction('[Auth] Change Role Success', props<{ user: User }>());
export const changeRoleFailure = createAction('[Auth] Change Role Failure', props<{ error: string }>());
