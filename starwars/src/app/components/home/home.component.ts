import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { ListaNavesComponent } from '../lista-naves/lista-naves.component';
import { HeaderComponent } from "../header/header.component";
import { DetalleNavesComponent } from '../detalle-naves/detalle-naves.component';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListaNavesComponent, HeaderComponent, DetalleNavesComponent, LoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit {
  estoyLogueado: boolean = false;
  constructor(private renderer: Renderer2, private loginService: LoginService) { }

  ngOnInit(): void {
    this.estoyLogueado = this.loginService.isAuthenticated();
    console.log("estoy logueado?", this.estoyLogueado);
    //this.createStars();
    window.addEventListener('resize', this.createStars.bind(this));
  }

  ngAfterViewInit(): void {
    this.nuevaAnimacion();
  }

  nuevaAnimacion() {
    const content = document.getElementById('content');
    if (content) {
      content.classList.remove('animacion');
      void content.offsetWidth;
      content.classList.add('animacion');
    }
  }

  createStars(): void {
    const numStars: number = 1000;
    const starContainer = document.getElementById('star-container');
    if (starContainer) {
      starContainer.innerHTML = '';
      for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const [x, y] = this.getRandomPosition();
        star.style.left = `${x}vw`;
        star.style.top = `${y}vh`;
        starContainer.appendChild(star);
      }
    }
  }

  getRandomPosition(): [number, number] {
    const randomY: number = Math.random() * 100;
    const randomX: number = Math.random() * 100;
    return [randomX, randomY];
  }
}