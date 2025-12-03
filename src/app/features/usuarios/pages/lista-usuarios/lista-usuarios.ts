import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../auth/services/auth.service';
import { AuthFacade } from '../../../../auth/auth.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-usuarios.html',
  styleUrls: ['./lista-usuarios.css']
})
export class ListaUsuariosComponent implements OnInit {
  usuarios: Array<{ username: string; role?: string }> = [];

  // form model
  formUsername = '';
  formPassword = '';
  formRole: 'admin' | 'user' = 'user';

  editing: string | null = null; // username being edited
  pendingDelete: string | null = null;
  createError = '';

  isAdmin$!: Observable<boolean>;

  constructor(private auth: AuthService, private facade: AuthFacade) {
    this.isAdmin$ = this.facade.isAdmin$;
  }

  ngOnInit(): void {
    this.reload();
  }

  reload() {
    this.usuarios = this.auth.getAllUsersPublic();
  }

  startEdit(u: { username: string; role?: string }) {
    this.editing = u.username;
    this.formUsername = u.username;
    this.formRole = (u.role as 'admin' | 'user') || 'user';
    this.formPassword = '';
  }

  cancelEdit() {
    this.editing = null;
    this.resetForm();
  }

  save() {
    if (!this.formUsername || (!this.editing && !this.formPassword)) return;

    if (this.editing) {
      // disallow renaming usernames in this demo; only allow updating password/role
      if (this.formUsername !== this.editing) {
        this.createError = 'No se permite renombrar usuarios. Crea uno nuevo si quieres cambiar el nombre.';
        return;
      }
      // update
      const updated = this.auth.updateUser(this.editing, { password: this.formPassword || undefined, role: this.formRole });
      if (updated) {
        this.reload();
        this.cancelEdit();
      }
    } else {
      // create
      const created = this.auth.createUser(this.formUsername, this.formPassword, this.formRole);
      if (created) {
        this.reload();
        this.resetForm();
        this.createError = '';
      } else {
        // username exists
        this.createError = 'El usuario ya existe';
      }
    }
  }

  delete(username: string) {
    // show inline confirmation in the UI
    this.pendingDelete = username;
  }

  confirmDelete(username: string) {
    this.auth.deleteUser(username);
    this.reload();
    this.pendingDelete = null;
  }

  cancelDelete() {
    this.pendingDelete = null;
  }

  resetForm() {
    this.formUsername = '';
    this.formPassword = '';
    this.formRole = 'user';
  }
}
