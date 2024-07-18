import { Component, OnInit, HostListener } from '@angular/core';
import { NavesService } from '../../services/naves.service';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Naves, Nave } from '../../interfaces/naves';

@Component({
  selector: 'app-lista-naves',
  standalone: true,
  imports: [HeaderComponent, CommonModule, RouterModule],
  templateUrl: './lista-naves.component.html',
  styleUrls: ['./lista-naves.component.css']
})
export class ListaNavesComponent implements OnInit {
  listaNaves: Naves[] = [];
  naveSeleccionada?: Nave;
  siguienteUrl: string | null = null;
  cargando: boolean = false;

  constructor(private servicio: NavesService, private router: Router) { }

  ngOnInit(): void {
    this.cargarNaves();
  }

  cargarNaves(): void {
    this.servicio.getNaves().subscribe((datos) => {
      const intermediaria = datos.body;
      this.listaNaves = intermediaria?.results || [];
      this.siguienteUrl = intermediaria?.next || null;
      this.servicio.setSiguienteUrl(this.siguienteUrl);
      console.log(intermediaria?.count);
      console.log(intermediaria?.results);
    });
  }

  cargarMasNaves(): void {
    if (this.cargando || !this.siguienteUrl) return;

    this.cargando = true;
    this.servicio.getMasNaves().subscribe((datos: { body: any; }) => {
      console.log(datos);
      const intermediaria = datos.body;
      console.log(datos);
      this.listaNaves = [...this.listaNaves, ...(intermediaria?.results || [])];
      console.log(intermediaria?.results);
      this.siguienteUrl = intermediaria?.next || null;
      console.log(this.siguienteUrl = intermediaria?.next)
      this.servicio.setSiguienteUrl(this.siguienteUrl);
      console.log(this.siguienteUrl);
      this.cargando = false;
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.cargarMasNaves();
    }
  }

  seleccionarNave(url: string): void {
    const id = url.split('/').filter(Boolean).pop() || '';
    this.servicio.getNaveDetalle(id).subscribe((data: Nave) => {
      this.naveSeleccionada = data;
    });
  }

  getNaveSeleccionada(item: Naves): void {
    if (this..getUrl(item.url);
    this.router.navigate([encodeURIComponent(item.url)]);
  }
}
