import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit {
  estoyLogueado: boolean = false;
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.estoyLogueado = this.loginService.isAuthenticated();
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
}