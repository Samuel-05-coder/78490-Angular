import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Login } from './login';
import { AuthFacade } from '../../auth.facade';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    const mockFacade = {
      error$: of(null),
      loading$: of(false),
      login: jasmine.createSpy('login')
    } as Partial<AuthFacade> as AuthFacade;

    await TestBed.configureTestingModule({
      imports: [Login, RouterTestingModule],
      providers: [{ provide: AuthFacade, useValue: mockFacade }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
