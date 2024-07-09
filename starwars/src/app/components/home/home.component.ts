import { Component } from '@angular/core';
import { ListaNavesComponent } from '../lista-naves/lista-naves.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListaNavesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
