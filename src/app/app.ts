import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutModule } from './layout/layout-module';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutModule,],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('entrega-1-angular');
}
