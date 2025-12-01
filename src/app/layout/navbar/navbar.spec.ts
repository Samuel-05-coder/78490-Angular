import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { NavbarComponent } from './navbar';
import { of } from 'rxjs';
import { AuthFacade } from '../../auth/auth.facade';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let facadeSpy: jasmine.SpyObj<AuthFacade>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    facadeSpy = jasmine.createSpyObj('AuthFacade', ['logout']);
    (facadeSpy as any).user$ = of({ username: 'testuser' });
    (facadeSpy as any).isAdmin$ = of(true);
    (facadeSpy as any).isLogged$ = of(true);

    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [MatListModule, MatIconModule, MatMenuModule, MatDividerModule, BrowserAnimationsModule],
      providers: [
        { provide: AuthFacade, useValue: facadeSpy },
        { provide: Router, useValue: routerSpy }
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
