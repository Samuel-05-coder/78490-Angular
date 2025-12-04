import { TestBed } from '@angular/core/testing';
import { PerfilUsuarioComponent } from './perfil-usuario';
import { AuthFacade } from '../../auth.facade';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

describe('PerfilUsuarioComponent', () => {
  let component: any;
  let fixture: any;
  let mockFacade: any;
  let mockAuthService: any;
  let mockRouter: any;
  let mockSnackBar: any;

  beforeEach(async () => {
    mockFacade = {
      user$: of({ username: 'testuser', role: 'user', nombre: 'Test', email: 'test@test.com' }),
      isLogged$: of(true),
      refreshUser: jasmine.createSpy('refreshUser')
    };

    mockAuthService = {
      updateUser: jasmine.createSpy('updateUser').and.returnValue(true)
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    mockSnackBar = {
      open: jasmine.createSpy('open')
    };

    await TestBed.configureTestingModule({
      imports: [PerfilUsuarioComponent],
      providers: [
        { provide: AuthFacade, useValue: mockFacade },
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilUsuarioComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user on init', (done) => {
    fixture.detectChanges();
    setTimeout(() => {
      expect(component.user).toBeDefined();
      expect(component.user.username).toBe('testuser');
      done();
    }, 100);
  });

  it('should toggle edit mode', () => {
    fixture.detectChanges();
    expect(component.editing).toBeFalsy();
    component.toggleEdit();
    expect(component.editing).toBeTruthy();
    component.toggleEdit();
    expect(component.editing).toBeFalsy();
  });

  it('should save profile changes', () => {
    fixture.detectChanges();
    component.user = { username: 'testuser', role: 'user' };
    component.formNombre = 'New Name';
    component.save();
    expect(mockAuthService.updateUser).toHaveBeenCalledWith('testuser', jasmine.objectContaining({ nombre: 'New Name' }));
  });
});
