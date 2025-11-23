import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { AuthService } from '../services/auth.service';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ username, password }) =>
        this.auth.login(username, password).pipe(
          map((ok) => (ok ? AuthActions.loginSuccess({ user: { username } }) : AuthActions.loginFailure({ error: 'Credenciales inválidas' }))),
          catchError((err) => of(AuthActions.loginFailure({ error: err?.message || 'Error' })))
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(({ username, password }) =>
        this.auth.register(username, password).pipe(
          map((ok) => (ok ? AuthActions.registerSuccess({ user: { username } }) : AuthActions.registerFailure({ error: 'Usuario existente' }))),
          catchError((err) => of(AuthActions.registerFailure({ error: err?.message || 'Error' })))
        )
      )
    )
  );

  // Navigate to root on login or register success
  navigateOnSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess, AuthActions.registerSuccess),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  // Navigate to login on logout
  navigateOnLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => this.router.navigate(['/login']))
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private auth: AuthService, private router: Router) {}
}
