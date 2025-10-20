import { Component, EventEmitter, Output, Input, NgModule } from '@angular/core';




@Component({
  selector: 'app-alumno-card',
  standalone: false,
  templateUrl: './alumno-card.html',
  styleUrl: './alumno-card.css'
})

export class AlumnoCardComponent {
  
  @Input() alumno: any;
  @Output() eliminarAlumno: EventEmitter<number>;
  @Output() editarAlumno: EventEmitter<number>;

  constructor() {
    this.eliminarAlumno = new EventEmitter<number>();
    this.editarAlumno = new EventEmitter<number>();
  }
}
