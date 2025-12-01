import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthFacade } from '../auth.facade';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private facade: AuthFacade, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.facade.isAdmin$.pipe(
      take(1),
      map((isAdmin) => (isAdmin ? true : this.router.createUrlTree(['/'])))
    );
  }
}
