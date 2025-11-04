import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CursosService, Curso } from '../../../../core/services/cursos';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.html',
  styleUrls: ['./lista-cursos.css'],
  standalone: false,
})

export class ListaCursosComponent {
  cursos: Curso[] = [];
  columnas: string[] = ['id', 'nombre', 'profesor', 'duracion', 'acciones'];

  constructor(
    private cursosService: CursosService,
    private router: Router
  ) {
    this.cargarCursos();
  }

  cargarCursos(): void {
    this.cursos = this.cursosService.obtenerCursos();
  }

  eliminarCurso(id: number): void {
    this.cursosService.eliminarCurso(id);
    this.cargarCursos();
  }

  editarCurso(curso: Curso): void {
    this.router.navigate(['/cursos/editar', curso.id]);
  }

  nuevoCurso(): void {
    this.router.navigate(['/cursos/nuevo']);
  }
}
