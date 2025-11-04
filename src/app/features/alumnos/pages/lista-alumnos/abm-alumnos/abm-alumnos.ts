import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosService, Alumno } from '../../../../../core/services/alumnos';

@Component({
  selector: 'app-abm-alumnos',
  standalone: false,
  templateUrl: './abm-alumnos.html',
  styleUrls: ['./abm-alumnos.css']
})
export class AbmAlumnosComponent implements OnInit {
  form: FormGroup;
  idAlumno: number | null = null;

  constructor(
    private fb: FormBuilder,
    private alumnosService: AlumnosService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      activo: [true]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const alumno = this.alumnosService.obtenerAlumnoPorId(+id);
      if (alumno) {
        this.idAlumno = alumno.id;
        this.form.patchValue(alumno);
      }
    }
  }

  guardar(): void {
    if (this.form.invalid) return;
    const data = this.form.value;
    if (this.idAlumno) {
      this.alumnosService.actualizarAlumno({ id: this.idAlumno, ...data });
    } else {
      this.alumnosService.agregarAlumno(data);
    }
    this.router.navigate(['/alumnos']);
  }

  cancelar(): void {
    this.router.navigate(['/alumnos']);
  }
}
