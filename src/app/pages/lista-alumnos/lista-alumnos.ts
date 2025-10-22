import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-alumnos',
  standalone: false,
  templateUrl: './lista-alumnos.html',
  styleUrl: './lista-alumnos.css'
})

export class ListaAlumnosComponent {
  filtro: string='';
  
  alumnos = [
    { nombre: 'Juan Pérez', edad: 20, email: 'juan@gmail.com' },
    { nombre: 'María Gómez', edad: 22, email: 'maria@gmail.com' },
    { nombre: 'Luis Rodríguez', edad: 21, email: 'luis@gmail.com' }
  ];

  cambiarestado(alumno: any) {
    alumno.activo = !alumno.activo;
  }

  eliminarAlumno(indice: number) {
    this.alumnos.splice(indice, 1);
  }

  editarAlumno(indice: number) {
    const nuevoNombre = prompt('Ingrese el nuevo nombre del alumno:', this.alumnos[indice].nombre);
  }
}