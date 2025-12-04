import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthFacade } from '../../auth.facade';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  username = '';
  password = '';
  error = '';
  loading = false;

  constructor(private facade: AuthFacade, private router: Router) {
    this.facade.error$.subscribe((e: string | null) => (this.error = e || ''));
    this.facade.loading$.subscribe((l: boolean) => (this.loading = l));
  }

  onSubmit(): void {
    this.error = '';
    this.facade.login(this.username, this.password);
  }

  quickLogin(username: string, password: string): void {
    this.username = username;
    this.password = password;
    this.error = '';
    this.facade.login(username, password);
  }
}
