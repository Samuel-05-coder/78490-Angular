import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaAlumnosComponent } from './lista-alumnos/lista-alumnos';
import { AbmAlumnosComponent } from './abm-alumnos/abm-alumnos';
import { ListaCursosComponent } from './lista-cursos/listas-cursos';



@NgModule({
  declarations: [
    ListaAlumnosComponent,
    AbmAlumnosComponent,
    ListaCursosComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
