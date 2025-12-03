import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User, UserRole } from '../store/auth.models';
import { delay, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _logged$ = new BehaviorSubject<boolean>(false);
  private readonly STORAGE_KEY = 'app_users_v1';

  get isLogged$(): Observable<boolean> {
    return this._logged$.asObservable();
  }

  /**
   * Login returns the user object WITHOUT password on success, or null on failure
   * This demo store includes a role field for authorization (admin/user).
   */
  login(username: string, password: string): Observable<User | null> {
    const users = this.getStoredUsers();
    const found = users.find((u) => u.username === username && u.password === password);
    const result: User | null = found ? { username: found.username, role: found.role as UserRole } : null;
    return of(result).pipe(
      delay(300),
      tap((v) => this._logged$.next(Boolean(v)))
    );
  }

  /**
   * Registra un nuevo usuario localmente. Retorna true si se creó correctamente,
   * false si el usuario ya existe.
   */
  register(username: string, password: string, role: UserRole = 'user'): Observable<User | null> {
    const users = this.getStoredUsers();
    const exists = users.some((u) => u.username === username);
    if (exists) {
      return of(null).pipe(delay(250));
    }
    users.push({ username, password, role });
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    } catch (e) {
      // ignore storage errors for the simulation
    }
    // Auto-login after register and return the saved user without password
    const user: User = { username, role };
    return of(user).pipe(
      delay(250),
      tap(() => this._logged$.next(true))
    );
  }

  /** Create a user without logging in (for admin UI). Returns true on success. */
  createUser(username: string, password: string, role: UserRole = 'user'): boolean {
    const users = this.getStoredUsers();
    if (users.some((u) => u.username === username)) return false;
    users.push({ username, password, role });
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
      return true;
    } catch (e) {
      return false;
    }
  }

  private getStoredUsers(): Array<{ username: string; password: string; role?: UserRole }> {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (!raw) return [
        { username: 'admin', password: 'admin', role: 'admin' as UserRole },
        { username: 'user', password: 'user', role: 'user' as UserRole }
      ];
      return JSON.parse(raw) as Array<{ username: string; password: string; role?: UserRole }>;
    } catch (e) {
      return [{ username: 'admin', password: 'admin', role: 'admin' as UserRole }];
    }
  }

  /**
   * Returns stored users but excludes password field for UI consumption
   */
  getAllUsersPublic(): Array<{ username: string; role?: string }> {
    return this.getStoredUsers().map((u) => ({ username: u.username, role: u.role }));
  }

  /** Update an existing user (only exposed for admin UI in this demo). */
  updateUser(username: string, updates: { password?: string; role?: UserRole; email?: string; nombre?: string; telefono?: string; direccion?: string }): boolean {
    const users = this.getStoredUsers();
    const idx = users.findIndex((u) => u.username === username);
    if (idx === -1) return false;
    users[idx] = { ...users[idx], ...updates };
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    } catch (e) {}
    return true;
  }

  /** Remove a user from storage. Returns true when removed. */
  deleteUser(username: string): boolean {
    const users = this.getStoredUsers();
    const next = users.filter((u) => u.username !== username);
    if (next.length === users.length) return false;
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(next));
    } catch (e) {}
    return true;
  }

  // Duplicate admin-facing api removed. Keep the boolean create/update/delete above

  logout(): void {
    this._logged$.next(false);
  }
}
