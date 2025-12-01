import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService (register)', () => {
  let service: AuthService;
  const KEY = 'app_users_v1';

  beforeEach(() => {
    localStorage.removeItem(KEY);
    TestBed.configureTestingModule({ providers: [AuthService] });
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    localStorage.removeItem(KEY);
  });

  it('should register a new user and auto-login', (done) => {
    service.register('u1', 'passw').subscribe((user) => {
      expect(user).toBeTruthy();
      expect(user?.username).toBe('u1');
      const raw = localStorage.getItem(KEY) || '';
      const users = JSON.parse(raw) as Array<any>;
      expect(users.some((u) => u.username === 'u1')).toBeTrue();
      // isLogged$ should emit true eventually
      service.isLogged$.subscribe((logged) => {
        if (logged) {
          expect(logged).toBeTrue();
          done();
        }
      });
    });
  });

  it('should include admin and user defaults when no storage', () => {
    // getStoredUsers is private; we check the fallback via getAllUsersPublic
    const publicUsers = service.getAllUsersPublic();
    expect(publicUsers.some((u) => u.username === 'admin')).toBeTrue();
    expect(publicUsers.some((u) => u.username === 'user')).toBeTrue();
  });

  it('should create, update and delete a user via admin methods', () => {
    // ensure clean
    localStorage.removeItem(KEY);
    const s = TestBed.inject(AuthService);

    // create admin and user defaults will exist by fallback
    const created = s.createUser('newu', 'pw', 'user');
    expect(created).toBeTruthy();
    expect(created?.username).toBe('newu');

    // trying to create same user returns null
    const dup = s.createUser('newu', 'pw', 'user');
    expect(dup).toBeNull();

    // update user role
    const updated = s.updateUser('newu', { role: 'admin' });
    expect(updated).toBeTruthy();
    expect(updated?.role).toBe('admin');

    // delete user
    const deleted = s.deleteUser('newu');
    expect(deleted).toBeTrue();
    // deleting again returns false
    expect(s.deleteUser('newu')).toBeFalse();
  });

  it('should not register if user already exists', (done) => {
    service.register('u2', 'passw').subscribe((first) => {
      expect(first).toBeTruthy();
      service.register('u2', 'passw').subscribe((second) => {
        expect(second).toBeNull();
        done();
      });
    });
  });
});
