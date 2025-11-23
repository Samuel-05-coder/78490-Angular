import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { AuthGuard } from './auth.guard';
import { selectIsLogged } from '../store/auth.selectors';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let store: MockStore; // Retain the store declaration

  function setup(isLogged: boolean, urlTree: UrlTree = {} as UrlTree) {
    const routerMock = { createUrlTree: jasmine.createSpy('createUrlTree').and.returnValue(urlTree) } as unknown as Router;

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        provideMockStore({ initialState: { auth: { user: isLogged ? { username: 'u' } : null, loading: false, error: null } }}), // Adjusted to include store initialization
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    store = TestBed.inject(MockStore); // Retain the store injection
    return { routerMock };
  }

  it('permite el acceso cuando isLogged$ emite true', (done) => {
    setup(true);

    guard.canActivate().subscribe((res) => {
      expect(res).toBeTrue();
      done();
    });
  });

  it('redirige a /login cuando isLogged$ emite false', (done) => {
    const expectedUrlTree = {} as UrlTree;
    const { routerMock } = setup(false, expectedUrlTree);

    guard.canActivate().subscribe((res) => {
      expect(res).toBe(expectedUrlTree);
      expect(routerMock.createUrlTree).toHaveBeenCalledWith(['/login']);
      done();
    });
  });
});
