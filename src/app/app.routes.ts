import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout';
import { ListaAlumnosComponent } from './pages/lista-alumnos/lista-alumnos';
import { AbmAlumnosComponent } from './pages/abm-alumnos/abm-alumnos';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {path: 'lista-alumnos', component: ListaAlumnosComponent},
            {path: 'abm-alumnos', component: AbmAlumnosComponent},
            {path: 'lista-cursos', component: ListaAlumnosComponent},
            {path: '', redirectTo: 'lista-alumnos', pathMatch: 'full'},
        ],
    },
    {path: '**', redirectTo: '', pathMatch: 'full'},
];
