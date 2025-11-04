import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ListaCursosComponent } from './pages/lista-cursos/lista-cursos';
import { AbmCursosComponent } from './pages/abm-cursos/abm-cursos';

const routes: Routes = [
  { path: '', component: ListaCursosComponent },
  { path: 'nuevo', component: AbmCursosComponent },
  { path: 'editar/:id', component: AbmCursosComponent }
];

@NgModule({
  declarations: [
  ],
  
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class CursosModule {}