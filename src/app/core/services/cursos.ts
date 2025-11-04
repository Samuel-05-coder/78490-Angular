import { Injectable } from '@angular/core';

export interface Curso {
  id: number;
  nombre: string;
  profesor: string;
  duracion: number;
}

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private cursos: Curso[] = [
    { id: 1, nombre: 'Angular Básico', profesor: 'Juan Pérez', duracion: 20 },
    { id: 2, nombre: 'TypeScript Avanzado', profesor: 'Ana Gómez', duracion: 15 }
  ];

  obtenerCursos(): Curso[] {
    return [...this.cursos];
  }

  obtenerCursoPorId(id: number): Curso | undefined {
    return this.cursos.find(c => c.id === id);
  }

  agregarCurso(curso: Curso): void {
    const nuevoId = this.cursos.length > 0 ? Math.max(...this.cursos.map(c => c.id)) + 1 : 1;
    this.cursos.push({ ...curso, id: nuevoId });
  }

  actualizarCurso(id: number, cursoActualizado: Curso): void {
    const index = this.cursos.findIndex(c => c.id === id);
    if (index !== -1) {
      this.cursos[index] = { ...cursoActualizado, id };
    }
  }

  eliminarCurso(id: number): void {
    this.cursos = this.cursos.filter(c => c.id !== id);
  }
}