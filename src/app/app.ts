import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { LayoutModule } from './layout/layout-module';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AuthFacade } from './auth/auth.facade';
import { firstValueFrom } from 'rxjs';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutModule, CommonModule, MatIconModule, RouterLink],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  protected readonly title = signal('entrega-1-angular');
  constructor(public facade: AuthFacade, private router: Router) {}

  async ngOnInit(): Promise<void> {
    try {
      // Check persisted localStorage first to avoid redirecting before store rehydration
      try {
        const raw = localStorage.getItem('app_state_v1');
        if (raw) {
          const parsed = JSON.parse(raw);
          const persistedUser = parsed?.auth?.user ?? null;
          if (persistedUser) {
            // there's a persisted user — assume logged in and skip redirect
            return;
          }
        }
      } catch (e) {
        // ignore localStorage parse errors and continue
      }

      const logged = await firstValueFrom(this.facade.isLogged$);
      if (!logged) {
        await this.router.navigate(['/login']);
      }
    } catch (e) {
      // ignore errors during bootstrap
    }
  }
}
