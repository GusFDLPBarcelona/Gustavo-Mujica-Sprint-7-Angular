import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavesService } from '../../services/naves.service';
import { Naves } from '../../interfaces/naves';
import { HeaderComponent } from '../header/header.component';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-detalle-naves',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './detalle-naves.component.html',
  styleUrls: ['./detalle-naves.component.css']
})
export class DetalleNavesComponent implements OnInit {
  nave?: any;
  id?: string;
  naves$!: Observable<Naves>;
  imageUrl?: SafeUrl;
  listaNaves: any;
  imagenUrl: any;

  constructor(
    private route: ActivatedRoute,
    private navesService: NavesService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
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
    });
    this.imageUrl = this.navesService.getNaveImagen(this.nave.id);
    console.log(this.imageUrl);
  }
}

