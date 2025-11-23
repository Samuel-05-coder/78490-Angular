import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _logged$ = new BehaviorSubject<boolean>(false);
  private readonly STORAGE_KEY = 'app_users_v1';

  get isLogged$(): Observable<boolean> {
    return this._logged$.asObservable();
  }

  login(username: string, password: string): Observable<boolean> {
    // Simulación simple: acepta 'admin' / 'admin'
    const users = this.getStoredUsers();
    const ok = users.some((u) => u.username === username && u.password === password);
    return of(ok).pipe(
      delay(300),
      tap((v) => this._logged$.next(v))
    );
  }

  /**
   * Registra un nuevo usuario localmente. Retorna true si se creó correctamente,
   * false si el usuario ya existe.
   */
  register(username: string, password: string): Observable<boolean> {
    const users = this.getStoredUsers();
    const exists = users.some((u) => u.username === username);
    if (exists) {
      return of(false).pipe(delay(250));
    }
    users.push({ username, password });
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    } catch (e) {
      // ignore storage errors for the simulation
    }
    // Auto-login after register
    return of(true).pipe(
      delay(250),
      tap(() => this._logged$.next(true))
    );
  }

  private getStoredUsers(): Array<{ username: string; password: string }> {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (!raw) return [{ username: 'admin', password: 'admin' }];
      return JSON.parse(raw) as Array<{ username: string; password: string }>;
    } catch (e) {
      return [{ username: 'admin', password: 'admin' }];
    }
  }

  logout(): void {
    this._logged$.next(false);
  }
}
