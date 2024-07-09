import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaNavesComponent } from './components/lista-naves/lista-naves.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListaNavesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'starwars';
}
