import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Register } from './register';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AuthFacade } from '../../auth.facade';

describe('Register Component', () => {
  let fixture: ComponentFixture<Register>;
  let component: Register;
  let mockStoreDispatch: jasmine.Spy;
  let router: Router;

  beforeEach(async () => {
    const mockFacade = {
      error$: of(null),
      loading$: of(false),
      register: jasmine.createSpy('register')
    } as Partial<AuthFacade> as AuthFacade;

    await TestBed.configureTestingModule({
      imports: [Register, RouterTestingModule, FormsModule],
      providers: [{ provide: AuthFacade, useValue: mockFacade }],
    }).compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    mockStoreDispatch = (mockFacade.register as jasmine.Spy);
    fixture.detectChanges();
  });

  it('should show validation error when passwords mismatch', () => {
    component.username = 'u';
    component.password = '123456';
    component.confirm = '123';
    component.onSubmit();
    expect(component.error).toBe('Las contraseñas no coinciden');
  });

  it('should call auth.register and navigate on success', () => {
    component.username = 'newuser';
    component.password = '123456';
    component.confirm = '123456';
    component.onSubmit();
    expect(mockStoreDispatch).toHaveBeenCalled();
  });
});
