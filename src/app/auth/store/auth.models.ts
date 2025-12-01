export type UserRole = 'admin' | 'user';

export interface User {
  username: string;
  // role/profile for authorization
  role?: UserRole;
  // additional optional fields for future backend integration
  email?: string;
  nombre?: string;
  direccion?: string;
  telefono?: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
