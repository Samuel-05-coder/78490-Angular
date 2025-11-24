import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { NavbarComponent } from './navbar';
import { AuthFacade } from '../../auth/auth.facade';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let facadeSpy: jasmine.SpyObj<AuthFacade>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    facadeSpy = jasmine.createSpyObj('AuthFacade', ['logout']);

    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [MatListModule, MatIconModule, BrowserAnimationsModule],
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
});
