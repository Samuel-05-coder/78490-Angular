import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-abm-alumnos',
  standalone: false,
  templateUrl: './abm-alumnos.html',
  styleUrl: './abm-alumnos.css'
})

export class AbmAlumnosComponent {
  alumnoForm: FormGroup;
  alumnos: any[] = [];

  constructor(private fb: FormBuilder) {
    this.alumnoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  agregarAlumno() {
    if (this.alumnoForm.valid) {
      this.alumnos.push(this.alumnoForm.value);
      this.alumnoForm.reset();
    } else {
      alert('Por favor completa todos los campos correctamente');
    }
  }

  eliminarAlumno(index: number) {
    this.alumnos.splice(index, 1);
  }

  editarAlumno(index: number) {
    const alumno = this.alumnos[index];
    this.alumnoForm.setValue({
      nombre: alumno.nombre,
      apellido: alumno.apellido,
      email: alumno.email
    });
    this.eliminarAlumno(index);
  }
}