import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFacade } from '../../../auth/auth.facade';
import { User, UserRole } from '../../../auth/store/auth.models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './configuracion.html',
  styleUrls: ['./configuracion.css']
})
export class ConfiguracionComponent implements OnInit {
  user: User | null = null;
  loading = false;

  constructor(
    private facade: AuthFacade,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.facade.user$.subscribe((u: User | null) => {
      this.user = u;
    });
  }

  async changeRole(newRole: UserRole): Promise<void> {
    if (!this.user || this.user.role === newRole) return;
    this.loading = true;
    try {
      await this.facade.changeRole(newRole);
      this.snackBar.open(`✓ Rol cambiado a ${newRole === 'admin' ? 'Administrador' : 'Usuario'}`, 'Cerrar', { duration: 2000 });
    } catch (err) {
      this.snackBar.open('Error al cambiar rol', 'Cerrar', { duration: 2000 });
    } finally {
      this.loading = false;
    }
  }

  getRoleBadgeClass(): string {
    return this.user?.role === 'admin' ? 'admin-badge' : 'user-badge';
  }

  getRoleLabel(): string {
    return this.user?.role === 'admin' ? 'Administrador' : 'Usuario';
  }
}
