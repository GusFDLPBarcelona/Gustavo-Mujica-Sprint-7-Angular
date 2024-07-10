import { Component } from '@angular/core';
import { ListaNavesComponent } from '../lista-naves/lista-naves.component';
import { HeaderComponent } from "../header/header.component";
import { DetalleNavesComponent } from '../detalle-naves/detalle-naves.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListaNavesComponent, HeaderComponent, DetalleNavesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
