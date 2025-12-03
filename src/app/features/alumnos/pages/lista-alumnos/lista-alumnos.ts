import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthFacade } from '../../../../auth/auth.facade';
import { AlumnosService, Alumno } from '../../../../core/services/alumnos';

@Component({
  selector: 'app-lista-alumnos',
  standalone: false,
  templateUrl: './lista-alumnos.html',
  styleUrls: ['./lista-alumnos.css']
})
export class ListaAlumnosComponent implements OnInit {
  alumnos: Alumno[] = [];
  columnas = ['id', 'nombre', 'apellido', 'email', 'activo', 'acciones'];
  isAdmin$: Observable<boolean>;

  constructor(private alumnosService: AlumnosService, private router: Router, private facade: AuthFacade) {
    this.isAdmin$ = this.facade.isAdmin$;
  }

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos(): void {
    this.alumnos = this.alumnosService.obtenerAlumnos();
  }

  nuevoAlumno(): void {
    this.router.navigate(['/alumnos/nuevo']);
  }

  editarAlumno(alumno: Alumno): void {
    this.router.navigate(['/alumnos/editar', alumno.id]);
  }

  eliminarAlumno(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este alumno?')) {
      this.alumnosService.eliminarAlumno(id);
      this.cargarAlumnos();
    }
  }
}