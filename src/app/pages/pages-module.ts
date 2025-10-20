import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaAlumnosComponent } from './lista-alumnos/lista-alumnos';
import { AbmAlumnosComponent } from './abm-alumnos/abm-alumnos';
import { ListaCursosComponent } from './lista-cursos/lista-cursos';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AlumnoCardComponent } from './lista-alumnos/alumno-card/alumno-card';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    ListaAlumnosComponent,
    AbmAlumnosComponent,
    ListaCursosComponent,
    AlumnoCardComponent
  ],

  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class PagesModule { }
