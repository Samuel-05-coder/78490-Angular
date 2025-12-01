import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ListaUsuariosComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ListaUsuariosComponent]
})
export class UsuariosModule {}
