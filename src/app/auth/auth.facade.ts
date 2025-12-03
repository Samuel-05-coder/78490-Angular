import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, firstValueFrom } from 'rxjs';
import * as AuthActions from './store/auth.actions';
import { selectUser, selectIsLogged, selectAuthLoading, selectAuthError, selectIsAdmin } from './store/auth.selectors';
import { User } from './store/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  user$: Observable<User | null>;
  isLogged$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store) {
    this.user$ = this.store.select(selectUser);
    this.isLogged$ = this.store.select(selectIsLogged);
    this.isAdmin$ = this.store.select(selectIsAdmin);
    this.loading$ = this.store.select(selectAuthLoading);
    this.error$ = this.store.select(selectAuthError);
  }

  login(username: string, password: string): void {
    this.store.dispatch(AuthActions.login({ username, password }));
  }

  register(username: string, password: string): void {
    this.store.dispatch(AuthActions.register({ username, password }));
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  /** Change the current user's role (admin/user). Uses the store user to obtain username. */
  async changeRole(role: 'admin' | 'user'): Promise<void> {
    const u = await firstValueFrom(this.user$);
    if (!u) return;
    this.store.dispatch(AuthActions.changeRole({ username: u.username, role }));
  }
}
