import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import { ListaAlumnosComponent } from './pages/lista-alumnos/lista-alumnos';
import { AbmAlumnosComponent } from './pages/lista-alumnos/abm-alumnos/abm-alumnos';

const routes: Routes = [
  { path: '', component: ListaAlumnosComponent },
  { path: 'nuevo', component: AbmAlumnosComponent },
  { path: 'editar/:id', component: AbmAlumnosComponent }
];

@NgModule({
  declarations: [ 
    ListaAlumnosComponent,
    AbmAlumnosComponent],

  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule
  ]
})

export class AlumnosModule {}