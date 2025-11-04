import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  activo: boolean;
}

const STORAGE_KEY = 'alumnos_data_v1';

@Injectable({ providedIn: 'root' })
export class AlumnosService {
  private alumnosSubject = new BehaviorSubject<Alumno[]>(this.cargar());
  alumnos$ = this.alumnosSubject.asObservable();

  private cargar(): Alumno[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data
      ? JSON.parse(data)
      : [
          { id: 1, nombre: 'Juan', apellido: 'Pérez', email: 'juan@mail.com', activo: true },
          { id: 2, nombre: 'Ana', apellido: 'Gómez', email: 'ana@mail.com', activo: false }
        ];
  }

  private guardar(list: Alumno[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    this.alumnosSubject.next(list);
  }

  obtenerAlumnos(): Alumno[] {
    return this.alumnosSubject.value;
  }

  obtenerAlumnoPorId(id: number): Alumno | undefined {
    return this.alumnosSubject.value.find(a => a.id === id);
  }

  agregarAlumno(alumno: Omit<Alumno, 'id'>): void {
    const lista = this.alumnosSubject.value;
    const id = lista.length ? Math.max(...lista.map(a => a.id)) + 1 : 1;
    const nuevo = { id, ...alumno };
    this.guardar([...lista, nuevo]);
  }

  actualizarAlumno(alumno: Alumno): void {
    const actualizados = this.alumnosSubject.value.map(a => (a.id === alumno.id ? alumno : a));
    this.guardar(actualizados);
  }

  eliminarAlumno(id: number): void {
    const restantes = this.alumnosSubject.value.filter(a => a.id !== id);
    this.guardar(restantes);
  }
}