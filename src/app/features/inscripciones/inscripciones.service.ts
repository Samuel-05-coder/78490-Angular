import { Injectable } from '@angular/core';

export interface Inscripcion {
  id: number;
  alumnoId: number;
  cursoId: number;
  fecha: string; // ISO date
  usuario: string; // username of the user who made the inscripcion
}

const STORAGE_KEY = 'inscripciones_v1';

@Injectable({ providedIn: 'root' })
export class InscripcionesService {
  private load(): Inscripcion[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      return JSON.parse(raw) as Inscripcion[];
    } catch (e) {
      return [];
    }
  }

  private save(list: Inscripcion[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  obtenerInscripciones(): Inscripcion[] {
    return this.load();
  }

  inscribir(alumnoId: number, cursoId: number, usuario: string): Inscripcion {
    const list = this.load();
    const id = list.length ? Math.max(...list.map((i) => i.id)) + 1 : 1;
    const item: Inscripcion = { id, alumnoId, cursoId, fecha: new Date().toISOString(), usuario };
    const next = [...list, item];
    this.save(next);
    return item;
  }

  desinscribir(id: number): void {
    const list = this.load();
    const next = list.filter((i) => i.id !== id);
    this.save(next);
  }
}
