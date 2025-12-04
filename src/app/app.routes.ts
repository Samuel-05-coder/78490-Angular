import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout';
import { Login } from './auth/pages/login/login';
import { Register } from './auth/pages/register/register';
import { PerfilUsuarioComponent } from './auth/pages/perfil-usuario/perfil-usuario';
import { ConfiguracionComponent } from './shared/pages/configuracion/configuracion';
import { AuthGuard } from './auth/services/auth.guard';
import { RoleGuard } from './auth/services/role.guard';

export const routes: Routes = [
  
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'perfil', component: PerfilUsuarioComponent, canActivate: [AuthGuard] },

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
        loadChildren: () => import('./features/cursos/cursos-module').then((m) => m.CursosModule),
      },
      {
        path: 'inscripciones',
        loadChildren: () => import('./features/inscripciones/inscripciones-module').then((m) => m.InscripcionesModule)
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./features/usuarios/usuarios-module').then((m) => m.UsuariosModule),
        canActivate: [RoleGuard]
      },
      {
        path: 'configuracion',
        component: ConfiguracionComponent,
        canActivate: [AuthGuard]
      },
      { path: '', redirectTo: 'alumnos', pathMatch: 'full' },
    ],
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' },
];