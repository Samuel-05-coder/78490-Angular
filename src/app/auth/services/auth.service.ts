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

  /** Create a new user (admin action). Returns created user object or null if exists */
  createUser(username: string, password: string, role: UserRole = 'user'): { username: string; role?: UserRole } | null {
    const users = this.getStoredUsers();
    if (users.some((u) => u.username === username)) return null;
    users.push({ username, password, role });
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    } catch (e) {
      // ignore
    }
    return { username, role };
  }

  /** Update existing user (admin). Returns updated user object or null if not found */
  updateUser(username: string, changes: { username?: string; password?: string; role?: UserRole }): { username: string; role?: UserRole } | null {
    const users = this.getStoredUsers();
    const idx = users.findIndex((u) => u.username === username);
    if (idx === -1) return null;
    const updated = { ...users[idx], ...changes };
    users[idx] = updated;
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    } catch (e) {
      // ignore
    }
    return { username: updated.username, role: updated.role };
  }

  /** Delete user by username. Returns true if removed */
  deleteUser(username: string): boolean {
    const users = this.getStoredUsers();
    const next = users.filter((u) => u.username !== username);
    if (next.length === users.length) return false;
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      // ignore
    }
    return true;
  }

  logout(): void {
    this._logged$.next(false);
  }
}
