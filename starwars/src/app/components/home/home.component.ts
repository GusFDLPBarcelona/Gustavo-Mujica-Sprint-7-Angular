import { Component } from '@angular/core';
import { ListaNavesComponent } from '../lista-naves/lista-naves.component';
import { HeaderComponent } from "../header/header.component";
import { DetalleNavesComponent } from '../detalle-naves/detalle-naves.component';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListaNavesComponent, HeaderComponent, DetalleNavesComponent, LoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

const numStars: number = 100;


function getRandomPosition(): [number, number] {
  const y: number = window.innerHeight;
  const x: number = window.innerWidth;
  const randomY: number = Math.floor(Math.random() * y);
  const randomX: number = Math.floor(Math.random() * x);
  return [randomY, randomX];
}


for (let i = 0; i < numStars; i++) {
  let star: HTMLDivElement = document.createElement("div");
  star.className = "star";
  const [top, left] = getRandomPosition();
  star.style.top = `${top}px`;
  star.style.left = `${left}px`;
  document.body.appendChild(star);
}