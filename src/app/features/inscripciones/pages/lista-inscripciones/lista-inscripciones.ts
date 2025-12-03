import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InscripcionesService, Inscripcion } from '../../inscripciones.service';
import { AlumnosService, Alumno } from '../../../../core/services/alumnos';
import { CursosService, Curso } from '../../../../core/services/cursos';
import { AuthFacade } from '../../../../auth/auth.facade';

@Component({
  selector: 'app-lista-inscripciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-inscripciones.html',
  styleUrls: ['./lista-inscripciones.css']
})
export class ListaInscripcionesComponent implements OnInit {
  inscripciones: Inscripcion[] = [];
  alumnos: Alumno[] = [];
  cursos: Curso[] = [];
  selectedAlumno: number | null = null;
  selectedCurso: number | null = null;
  currentUser: string | null = null;
  
  newNombre = '';
  newApellido = '';
  newEmail = '';
  createMessage = '';

  constructor(
    private inscripcionesService: InscripcionesService,
    private alumnosService: AlumnosService,
    private cursosService: CursosService,
    private authFacade: AuthFacade
  ) {}

  ngOnInit(): void {
    this.reload();
    this.alumnos = this.alumnosService.obtenerAlumnos();
    this.cursos = this.cursosService.obtenerCursos();
    this.authFacade.user$.subscribe((u) => (this.currentUser = u?.username ?? null));
  }

  reload() {
    this.inscripciones = this.inscripcionesService.obtenerInscripciones();
  }

  getAlumnoNombre(alumnoId: number): string {
    const a = this.alumnos.find((x) => x.id === alumnoId);
    return a ? `${a.nombre} ${a.apellido}` : '—';
  }

  getCursoNombre(cursoId: number): string {
    const c = this.cursos.find((x) => x.id === cursoId);
    return c ? c.nombre : '—';
  }

  inscribir() {
    if (this.selectedAlumno == null || this.selectedCurso == null || !this.currentUser) return;
    // types narrowed by the null-check above; cast to number for clarity
    this.inscripcionesService.inscribir(this.selectedAlumno as number, this.selectedCurso as number, this.currentUser);
    this.reload();
  }

  canCreateAlumno(): boolean {
    return ((this.newNombre.trim().length > 0 || this.newApellido.trim().length > 0) && this.newEmail.trim().length > 0);
  }

  crearAlumno() {
    if (!this.canCreateAlumno()) return;
    this.alumnosService.agregarAlumno({ nombre: this.newNombre, apellido: this.newApellido, email: this.newEmail, activo: true });
    this.newNombre = '';
    this.newApellido = '';
    this.newEmail = '';
    this.createMessage = 'Alumno creado';
    this.alumnos = this.alumnosService.obtenerAlumnos();
    // clear message after short timeout
    setTimeout(() => (this.createMessage = ''), 1800);
  }

  desinscribir(id: number) {
    if (!confirm('¿Desea eliminar la inscripción?')) return;
    this.inscripcionesService.desinscribir(id);
    this.reload();
  }
}
