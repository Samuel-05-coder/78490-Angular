import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthFacade } from '../auth.facade';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private facade: AuthFacade, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.facade.isLogged$.pipe(
      take(1),
      map((logged) => (logged ? true : this.router.createUrlTree(['/login'])))
    );
  }
}
