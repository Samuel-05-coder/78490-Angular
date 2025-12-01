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
  // expose facade so template can use async pipe
  constructor(public facade: AuthFacade) {}

  logout(): void {
    this.facade.logout();
  }

}
