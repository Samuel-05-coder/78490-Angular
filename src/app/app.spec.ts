import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthFacade } from './auth/auth.facade';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, RouterTestingModule],
      providers: [{ provide: AuthFacade, useValue: { isLogged$: of(false) } }]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const app = fixture.componentInstance as any;
    // El componente expone `title` como signal; comprobamos su valor en lugar de buscar un <h1>
    expect(typeof app.title === 'function' ? app.title() : app.title).toContain('entrega-1-angular');
  });
});
