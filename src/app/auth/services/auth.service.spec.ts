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
    service.register('u1', 'passw').subscribe((ok) => {
      expect(ok).toBeTrue();
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

  it('should not register if user already exists', (done) => {
    service.register('u2', 'passw').subscribe((ok1) => {
      expect(ok1).toBeTrue();
      service.register('u2', 'passw').subscribe((ok2) => {
        expect(ok2).toBeFalse();
        done();
      });
    });
  });
});
