import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { of } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { AuthFacade } from '../auth.facade';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  function setup(isLogged: boolean, urlTree: UrlTree = {} as UrlTree) {
    const routerMock = { createUrlTree: jasmine.createSpy('createUrlTree').and.returnValue(urlTree) } as unknown as Router;
    const facadeMock = { isLogged$: of(isLogged) } as Partial<AuthFacade> as AuthFacade;

    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: AuthFacade, useValue: facadeMock }, { provide: Router, useValue: routerMock }]
    });

    guard = TestBed.inject(AuthGuard);
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
