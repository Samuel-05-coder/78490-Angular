import { TestBed } from '@angular/core/testing';
import { ConfiguracionComponent } from './configuracion';
import { AuthFacade } from '../../../auth/auth.facade';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

describe('ConfiguracionComponent', () => {
  let component: any;
  let fixture: any;
  let mockFacade: any;
  let mockSnackBar: any;

  beforeEach(async () => {
    mockFacade = {
      user$: of({ username: 'testuser', role: 'user' }),
      changeRole: jasmine.createSpy('changeRole').and.returnValue(Promise.resolve())
    };

    mockSnackBar = {
      open: jasmine.createSpy('open')
    };

    await TestBed.configureTestingModule({
      imports: [ConfiguracionComponent],
      providers: [
        { provide: AuthFacade, useValue: mockFacade },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfiguracionComponent);
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

  it('should change role to admin', async () => {
    fixture.detectChanges();
    component.user = { username: 'testuser', role: 'user' };
    await component.changeRole('admin');
    expect(mockFacade.changeRole).toHaveBeenCalledWith('admin');
  });

  it('should return correct role label', () => {
    component.user = { username: 'testuser', role: 'admin' };
    expect(component.getRoleLabel()).toBe('Administrador');
  });

  it('should return correct role badge class', () => {
    component.user = { username: 'testuser', role: 'admin' };
    expect(component.getRoleBadgeClass()).toBe('admin-badge');
  });
});
