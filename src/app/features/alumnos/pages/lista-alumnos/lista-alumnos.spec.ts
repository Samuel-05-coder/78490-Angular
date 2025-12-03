import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ListaAlumnosComponent } from './lista-alumnos';
import { AuthFacade } from '../../../../auth/auth.facade';
import { of } from 'rxjs';

describe('ListaAlumnosComponent', () => {
  let component: ListaAlumnosComponent;
  let fixture: ComponentFixture<ListaAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaAlumnosComponent],
      imports: [MatTableModule, BrowserAnimationsModule],
      providers: [{ provide: AuthFacade, useValue: { isAdmin$: of(false) } }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


