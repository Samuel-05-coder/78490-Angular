import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CursosService, Curso } from '../../../../core/services/cursos';
import { Observable } from 'rxjs';
import { AuthFacade } from '../../../../auth/auth.facade';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.html',
  styleUrls: ['./lista-cursos.css'],
  standalone: false,
})

export class ListaCursosComponent {
  cursos: Curso[] = [];
  columnas: string[] = ['id', 'nombre', 'profesor', 'duracion', 'acciones'];

  isAdmin$!: Observable<boolean>;

  constructor(
    private cursosService: CursosService,
    private router: Router,
    private facade: AuthFacade
  ) {
    this.isAdmin$ = this.facade.isAdmin$;
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
