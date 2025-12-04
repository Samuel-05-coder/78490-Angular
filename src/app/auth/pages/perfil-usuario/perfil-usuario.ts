import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFacade } from '../../auth.facade';
import { AuthService } from '../../services/auth.service';
import { User } from '../../store/auth.models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil-usuario.html',
  styleUrls: ['./perfil-usuario.css']
})
export class PerfilUsuarioComponent implements OnInit {
  user: User | null = null;
  editing = false;
  loading = false;
  error = '';

  // form model
  formNombre = '';
  formEmail = '';
  formTelefono = '';
  formDireccion = '';

  constructor(
    private facade: AuthFacade,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.facade.user$.subscribe((u) => {
      this.user = u;
      if (u) {
        this.formNombre = u.nombre || '';
        this.formEmail = u.email || '';
        this.formTelefono = u.telefono || '';
        this.formDireccion = u.direccion || '';
      }
    });

    // redirect if not logged
    this.facade.isLogged$.subscribe((logged) => {
      if (!logged) {
        this.router.navigate(['/login']);
      }
    });
  }

  toggleEdit(): void {
    this.editing = !this.editing;
    this.error = '';
  }

  cancel(): void {
    this.editing = false;
    this.error = '';
    if (this.user) {
      this.formNombre = this.user.nombre || '';
      this.formEmail = this.user.email || '';
      this.formTelefono = this.user.telefono || '';
      this.formDireccion = this.user.direccion || '';
    }
  }

  save(): void {
    if (!this.user) return;
    this.loading = true;
    this.error = '';

    const updated = this.auth.updateUser(this.user.username, {
      nombre: this.formNombre || undefined,
      email: this.formEmail || undefined,
      telefono: this.formTelefono || undefined,
      direccion: this.formDireccion || undefined
    });

    this.loading = false;
    if (updated) {
      // dispatch action to refresh user in store (or just update the facade observable)
      this.facade.refreshUser();
      this.editing = false;
      this.snackBar.open('Perfil actualizado correctamente', 'Cerrar', { duration: 2000 });
    } else {
      this.error = 'Error al actualizar el perfil';
    }
  }
}
