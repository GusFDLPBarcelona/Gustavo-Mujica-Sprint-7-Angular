import { Component, OnInit, HostListener } from '@angular/core';
import { NavesService } from '../../services/naves.service';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Naves, Nave, Pilot, Film, } from '../../interfaces/naves';
import { LoginService } from '../../services/login.service';
import { PilotosComponent } from '../pilotos/pilotos.component';
import { PeliculasComponent } from '../peliculas/peliculas.component';

@Component({
  selector: 'app-lista-naves',
  standalone: true,
  imports: [HeaderComponent, CommonModule, RouterModule, PilotosComponent, PeliculasComponent],
  templateUrl: './lista-naves.component.html',
  styleUrls: ['./lista-naves.component.css']
})
export class ListaNavesComponent implements OnInit {
  listaNaves: Naves[] = [];
  naveSeleccionada?: Nave;
  pilots: Naves[] = [];
  films: Naves[] = [];
  siguienteUrl: string | null = null;
  cargando: boolean = false;
  estoyLogueado: boolean = false;

  constructor(private servicio: NavesService, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.estoyLogueado = this.loginService.isAuthenticated();
    this.cargarNaves();
  }

  cargarNaves(): void {
    this.servicio.getNaves().subscribe((datos) => {
      const intermediaria = datos.body;
      this.listaNaves = intermediaria?.results || [];
      this.siguienteUrl = intermediaria?.next || null;
      this.servicio.setSiguienteUrl(this.siguienteUrl);
    });
  }

  cargarMasNaves(): void {
    if (this.cargando || !this.siguienteUrl) return;
    this.cargando = true;
    this.servicio.getMasNaves().subscribe((datos: { body: any; }) => {
      const intermediaria = datos.body;
      this.listaNaves = [...this.listaNaves, ...(intermediaria?.results || [])];
      this.siguienteUrl = intermediaria?.next || null;
      this.servicio.setSiguienteUrl(this.siguienteUrl);
      this.cargando = false;
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.cargarMasNaves();
    }
  }


  getNaveSeleccionada(item: Naves): void {
    this.servicio.getUrl(item.url);
    console.log(item)
    this.router.navigate([encodeURIComponent(item.url)]);
  }
}


