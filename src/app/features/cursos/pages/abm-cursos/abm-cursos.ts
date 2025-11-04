import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService, Curso } from '../../../../core/services/cursos';

@Component({
  selector: 'app-abm-cursos',
  templateUrl: './abm-cursos.html',
  styleUrls: ['./abm-cursos.css']
})
export class AbmCursosComponent {
  cursoForm: FormGroup;
  editando = false;
  cursoId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cursosService: CursosService
  ) {
    this.cursoForm = this.fb.group({
      nombre: ['', Validators.required],
      profesor: ['', Validators.required],
      duracion: ['', [Validators.required, Validators.min(1)]]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editando = true;
      this.cursoId = +id;
      const curso = this.cursosService.obtenerCursoPorId(this.cursoId);
      if (curso) {
        this.cursoForm.patchValue(curso);
      }
    }
  }

  guardarCurso(): void {
    if (this.cursoForm.invalid) return;

    const nuevoCurso: Curso = this.cursoForm.value;

    if (this.editando) {
      this.cursosService.actualizarCurso(this.cursoId, nuevoCurso);
    } else {
      this.cursosService.agregarCurso(nuevoCurso);
    }

    this.router.navigate(['/cursos']);
  }

  cancelar(): void {
    this.router.navigate(['/cursos']);
  }
}
