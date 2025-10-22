import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroAlumnos'
})
export class FiltroAlumnosPipe implements PipeTransform {

  transform(alumnos: any[], filtro: string): any[] {
    if (!alumnos) return [];
    if (!filtro) return alumnos;

    filtro = filtro.toLowerCase();

    return alumnos.filter(alumno =>
      alumno.nombre.toLowerCase().includes(filtro) ||
      alumno.apellido.toLowerCase().includes(filtro)
    );
  }
}
