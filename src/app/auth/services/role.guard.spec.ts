import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { of } from 'rxjs';
import { RoleGuard } from './role.guard';
import { AuthFacade } from '../auth.facade';

describe('RoleGuard', () => {
  let guard: RoleGuard;

  function setup(isAdmin: boolean, urlTree: UrlTree = {} as UrlTree) {
    const routerMock = { createUrlTree: jasmine.createSpy('createUrlTree').and.returnValue(urlTree) } as unknown as Router;
    const facadeMock = { isAdmin$: of(isAdmin) } as Partial<AuthFacade> as AuthFacade;

    TestBed.configureTestingModule({ providers: [RoleGuard, { provide: AuthFacade, useValue: facadeMock }, { provide: Router, useValue: routerMock }] });
    guard = TestBed.inject(RoleGuard);
    return { routerMock };
  }

  it('permite acceso cuando usuario es admin', (done) => {
    setup(true);
    guard.canActivate().subscribe((v) => {
      expect(v).toBeTrue();
      done();
    });
  });

  it('redirige cuando usuario no es admin', (done) => {
    const expectedUrlTree = {} as UrlTree;
    const { routerMock } = setup(false, expectedUrlTree);
    guard.canActivate().subscribe((v) => {
      expect(v).toBe(expectedUrlTree);
      expect(routerMock.createUrlTree).toHaveBeenCalledWith(['/']);
      done();
    });
  });
});
