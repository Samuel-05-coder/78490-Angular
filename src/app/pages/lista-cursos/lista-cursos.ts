import { Component } from '@angular/core';

interface Curso {
  nombre: string;
  profesor: string;
  duracion: string;
}

@Component({
  selector: 'app-lista-cursos',
  standalone: false,
  templateUrl: './lista-cursos.html',
  styleUrl: './lista-cursos.css'
})
export class ListaCursosComponent {
  cursos: Curso[] = [
    { nombre: 'Matemáticas', profesor: 'Carlos Ramírez', duracion: '40 horas' },
    { nombre: 'Historia', profesor: 'Laura Gómez', duracion: '35 horas' },
    { nombre: 'Inglés', profesor: 'Marta López', duracion: '50 horas' }
  ];
}










