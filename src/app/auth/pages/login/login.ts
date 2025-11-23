import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth.actions';
import { selectAuthError, selectAuthLoading } from '../../store/auth.selectors';


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

  constructor(private store: Store, private router: Router) {
    this.store.select(selectAuthError).subscribe((e: string | null) => (this.error = e || ''));
    this.store.select(selectAuthLoading).subscribe((l: boolean) => (this.loading = l));
  }

  onSubmit(): void {
    this.error = '';
    this.store.dispatch(AuthActions.login({ username: this.username, password: this.password }));
  }
}
