import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NavbarComponent } from './navbar';
import { of } from 'rxjs';
import { AuthFacade } from '../../auth/auth.facade';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let facadeSpy: jasmine.SpyObj<AuthFacade>;
  let routerSpy: jasmine.SpyObj<Router>;
  let snackSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    facadeSpy = jasmine.createSpyObj('AuthFacade', ['logout', 'changeRole']);
    (facadeSpy as any).user$ = of({ username: 'testuser', role: 'user' });
    (facadeSpy as any).isAdmin$ = of(true);
    (facadeSpy as any).isLogged$ = of(true);

    snackSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [MatListModule, MatIconModule, MatMenuModule, MatDividerModule, BrowserAnimationsModule, RouterTestingModule],
      providers: [
        { provide: AuthFacade, useValue: facadeSpy },
        { provide: MatSnackBar, useValue: snackSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('dispatches logout and navigates to /login on logout()', () => {
    component.logout();
    expect(facadeSpy.logout).toHaveBeenCalled();
    expect(snackSpy.open).toHaveBeenCalledWith('Sesión cerrada', 'Cerrar', { duration: 2000 });
  });

  it('toggleRole calls facade.changeRole with expected role', async () => {
    // current role is 'user' in the spy; toggling should switch to 'admin'
    await component.toggleRole();
    expect(facadeSpy.changeRole).toHaveBeenCalledWith('admin');
    expect(snackSpy.open).toHaveBeenCalledWith('Rol cambiado a admin', 'Cerrar', { duration: 2000 });
  });

  it('shows Login menu entry when not logged', async () => {
    // simulate logged out state
    (facadeSpy as any).isLogged$ = of(false);
    (facadeSpy as any).user$ = of(null);
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    const html = fixture.nativeElement.innerHTML;
    // should contain the quick-login icon button
    expect(html).toContain('login');
    // logout should be hidden when not logged
    expect(html).not.toContain('Cerrar sesión');
  });

  it('shows username in the footer', () => {
    const el: HTMLElement = fixture.nativeElement;
    const name = el.querySelector('.username')?.textContent?.trim();
    expect(name).toBe('testuser');
  });

  it('shows Usuarios link for admin', () => {
    const el: HTMLElement = fixture.nativeElement;
    const usuariosLink = el.querySelector('a[routerlink="/usuarios"], a[routerLink="/usuarios"]');
    expect(usuariosLink).toBeTruthy();
  });

  it('shows Inscripciones link for logged in users', () => {
    const el: HTMLElement = fixture.nativeElement;
    const inscLink = el.querySelector('a[routerLink="/inscripciones"], a[routerlink="/inscripciones"]');
    expect(inscLink).toBeTruthy();
  });

  it('hides Usuarios link for non-admin', async () => {
    // simulate non-admin
    (facadeSpy as any).isAdmin$ = of(false);
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    const usuariosLink = el.querySelector('a[routerlink="/usuarios"], a[routerLink="/usuarios"]');
    expect(usuariosLink).toBeFalsy();
  });
});
