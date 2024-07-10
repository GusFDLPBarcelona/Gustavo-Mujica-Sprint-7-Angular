import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavesService } from '../../naves.service';
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
      console.log(data.nave);
      this.nave = data.nave;
      let imagenUrl = this.nave.url;
      console.log(imagenUrl);
      const regex = 'https://swapi.py4e.com/api/starships/';
      const match = imagenUrl.replace(regex, '').replace('/', '');
      this.imageUrl = this.navesService.getNaveImagen(match);

      console.log(match);
    });

  }
}
