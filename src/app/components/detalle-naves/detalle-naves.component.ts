import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavesService } from '../../services/naves.service';
import { Naves, Pilot, Film } from '../../interfaces/naves';
import { HeaderComponent } from '../header/header.component';
import { forkJoin, Observable } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LoginService } from '../../services/login.service';
import { PilotosComponent } from '../pilotos/pilotos.component';
import { PeliculasComponent } from '../peliculas/peliculas.component';


@Component({
  selector: 'app-detalle-naves',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, PeliculasComponent, PilotosComponent],
  templateUrl: './detalle-naves.component.html',
  styleUrls: ['./detalle-naves.component.css']
})
export class DetalleNavesComponent implements OnInit {
  nave?: any;
  id?: string;
  naves$!: Observable<Naves>;
  imageUrl?: SafeUrl;
  listaNaves: any;
  imagenPeliUrl$?: Observable<any>;
  defaultImage: string = 'assets/nonave.jpg';
  estoyLogueado: boolean = false;
  pilots?: string[];
  films: any;


  constructor(
    private route: ActivatedRoute,
    private navesService: NavesService,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.estoyLogueado = this.loginService.isAuthenticated();
    this.route.data.subscribe((data: any) => {
      if (data) {
        const id = data.nave.url.replace('https://swapi.py4e.com/api/starships/', '').replace('/', '');
        this.cargarDatos(id);
      }

    });
  }

  cargarDatos(id: string): void {
    this.navesService.getNaveDetalle(Number(id)).subscribe((nave: any) => {
      this.nave = nave;
      this.pilots = nave.pilots;
      this.films = nave.films;
    });
    this.imageUrl = this.navesService.getNaveImagen(id);
  }

  nonave() {
    this.imageUrl = this.defaultImage;
  }

}

