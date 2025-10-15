import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-alumnos',
  standalone: false,
  templateUrl: './lista-alumnos.html',
  styleUrl: './lista-alumnos.css'
})
export class ListaAlumnosComponent {
  
  alumnos = [
    { nombre: 'Juan Pérez', edad: 20, curso: 'Matemáticas' },
    { nombre: 'María Gómez', edad: 22, curso: 'Física' },
    { nombre: 'Luis Rodríguez', edad: 21, curso: 'Química' }
  ];

  cambiarestado(alumno: any) {
    alumno.activo = !alumno.activo;
  }
}
