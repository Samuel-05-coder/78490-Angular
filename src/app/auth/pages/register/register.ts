import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth.actions';
import { selectAuthError, selectAuthLoading } from '../../store/auth.selectors';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  username = '';
  password = '';
  confirm = '';
  busy = false;
  error = '';

  constructor(private store: Store, private auth: AuthService, private router: Router) {
    this.store.select(selectAuthError).subscribe((e: string | null) => (this.error = e || ''));
    this.store.select(selectAuthLoading).subscribe((l: boolean) => (this.busy = l));
  }

  onSubmit(): void {
    this.error = '';
    if (!this.username || !this.password) {
      this.error = 'Ingrese usuario y contraseña';
      return;
    }
    if (this.password !== this.confirm) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }
    if (this.password.length < 6) {
      this.error = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }
    this.busy = true;
    this.store.dispatch(AuthActions.register({ username: this.username, password: this.password }));
  }
}
