import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.models';

const selectAuthFeature = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(selectAuthFeature, (s: AuthState) => s.user);
export const selectIsLogged = createSelector(selectUser, (u: any) => !!u);
export const selectAuthError = createSelector(selectAuthFeature, (s: AuthState) => s.error);
export const selectAuthLoading = createSelector(selectAuthFeature, (s: AuthState) => s.loading);
