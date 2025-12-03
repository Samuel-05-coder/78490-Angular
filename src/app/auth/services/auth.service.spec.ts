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

  it('createUser should add a user without logging in', () => {
    const ok = service.createUser('newu', 'pw123', 'user');
    expect(ok).toBeTrue();
    const raw = localStorage.getItem(KEY) || '';
    const users = JSON.parse(raw) as Array<any>;
    expect(users.some((u) => u.username === 'newu')).toBeTrue();
  });

  it('updateUser should edit role and password', () => {
    service.createUser('toedit', 'p1', 'user');
    const updated = service.updateUser('toedit', { role: 'admin', password: 'p2' });
    expect(updated).toBeTrue();
    const raw = localStorage.getItem(KEY) || '';
    const users = JSON.parse(raw) as Array<any>;
    const u = users.find((x) => x.username === 'toedit');
    expect(u).toBeTruthy();
    expect(u.role).toBe('admin');
  });

  it('deleteUser should remove the user', () => {
    service.createUser('todel', 'p', 'user');
    const ok = service.deleteUser('todel');
    expect(ok).toBeTrue();
    const raw = localStorage.getItem(KEY) || '';
    const users = JSON.parse(raw) as Array<any>;
    expect(users.some((u) => u.username === 'todel')).toBeFalse();
  });

  it('should create, update and delete a user via admin methods', () => {
    // ensure clean
    localStorage.removeItem(KEY);
    const s = TestBed.inject(AuthService);

    // create admin and user defaults will exist by fallback
    const created = s.createUser('newu', 'pw', 'user');
    expect(created).toBeTrue();
    // check storage contains the user
    let raw = localStorage.getItem(KEY) || '';
    let users = JSON.parse(raw) as Array<any>;
    expect(users.some((u) => u.username === 'newu')).toBeTrue();

    // trying to create same user returns false
    const dup = s.createUser('newu', 'pw', 'user');
    expect(dup).toBeFalse();

    // update user role
    const updated = s.updateUser('newu', { role: 'admin' });
    expect(updated).toBeTrue();
    raw = localStorage.getItem(KEY) || '';
    users = JSON.parse(raw) as Array<any>;
    const u = users.find((x) => x.username === 'newu');
    expect(u).toBeTruthy();
    expect(u?.role).toBe('admin');

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
