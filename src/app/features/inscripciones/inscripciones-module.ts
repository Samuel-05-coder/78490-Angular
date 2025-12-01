import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ListaInscripcionesComponent } from './pages/lista-inscripciones/lista-inscripciones';

const routes: Routes = [{ path: '', component: ListaInscripcionesComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, ListaInscripcionesComponent]
})
export class InscripcionesModule {}
