import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '../../auth/auth.facade';
import { UserRole } from '../../auth/store/auth.models';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  // expose facade so template can use async pipe
  constructor(public facade: AuthFacade, private snackBar: MatSnackBar) {}

  logout(): void {
    this.facade.logout();
    this.snackBar.open('Sesión cerrada', 'Cerrar', { duration: 2000 });
  }

  async toggleRole(): Promise<void> {
    const u = await firstValueFrom(this.facade.user$);
    // fallback: use facade.changeRole helper
    if (!u) return;
    const next: UserRole = u.role === 'admin' ? 'user' : 'admin';
    await this.facade.changeRole(next);
    this.snackBar.open(`Rol cambiado a ${next}`, 'Cerrar', { duration: 2000 });
  }

}
