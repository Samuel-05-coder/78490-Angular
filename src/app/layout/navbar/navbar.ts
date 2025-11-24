import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '../../auth/auth.facade';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  constructor(private facade: AuthFacade) {}

  logout(): void {
    this.facade.logout();
  }

}
