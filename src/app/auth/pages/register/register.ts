import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthFacade } from '../../auth.facade';

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

  constructor(private facade: AuthFacade, private router: Router) {
    this.facade.error$.subscribe((e: string | null) => (this.error = e || ''));
    this.facade.loading$.subscribe((l: boolean) => (this.busy = l));
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
    this.facade.register(this.username, this.password);
  }
}
