import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutModule } from './layout/layout-module';
import { PagesModule } from './pages/pages-module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LayoutModule, PagesModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('entrega-1-angular');
}
