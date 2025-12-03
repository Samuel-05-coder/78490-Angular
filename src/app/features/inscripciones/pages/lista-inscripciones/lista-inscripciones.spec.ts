import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaInscripcionesComponent } from './lista-inscripciones';
import { AlumnosService } from '../../../../core/services/alumnos';
import { CursosService } from '../../../../core/services/cursos';
import { InscripcionesService } from '../../inscripciones.service';
import { AuthFacade } from '../../../../auth/auth.facade';
import { of } from 'rxjs';

describe('ListaInscripcionesComponent (crear alumno)', () => {
  let fixture: ComponentFixture<ListaInscripcionesComponent>;
  let component: ListaInscripcionesComponent;
  let alumnosService: AlumnosService;

  beforeEach(async () => {
    // make sure storage keys don't interfere
    localStorage.removeItem('alumnos_data_v1');
    localStorage.removeItem('inscripciones_v1');

    await TestBed.configureTestingModule({
      imports: [ListaInscripcionesComponent],
      providers: [AlumnosService, CursosService, InscripcionesService, { provide: AuthFacade, useValue: { user$: of({ username: 'u' }) } }]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaInscripcionesComponent);
    component = fixture.componentInstance;
    alumnosService = TestBed.inject(AlumnosService);
    fixture.detectChanges();
  });

  it('crea un alumno nuevo desde el formulario', () => {
    const initial = alumnosService.obtenerAlumnos().length;
    component.newNombre = 'Prueba';
    component.newApellido = 'Alumno';
    component.newEmail = 'p@x.com';
    component.crearAlumno();
    const after = alumnosService.obtenerAlumnos().length;
    expect(after).toBeGreaterThan(initial);
  });
});
