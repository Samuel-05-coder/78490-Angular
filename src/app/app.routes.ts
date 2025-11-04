import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'alumnos',
        loadChildren: () =>
          import('./features/alumnos/alumnos-module').then(
            (m) => m.AlumnosModule
          ),
      },
      {
        path: 'cursos',
        loadChildren: () =>
          import('./features//cursos/cursos-module').then(
            (m) => m.CursosModule
          ),
      },
      { path: '', redirectTo: 'alumnos', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '' },
];