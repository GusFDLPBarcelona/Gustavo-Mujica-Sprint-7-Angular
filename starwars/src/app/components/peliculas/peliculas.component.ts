import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { NavesService } from '../../services/naves.service';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent {
  @Input() films?: string[];
  @Input() imagenesPelis: any;

  peliculas?: any[];
  imagenPeliculas$?: Observable<any>;
  dataPeliculas$?: Observable<any>;
  urlImagenes?: SafeUrl[];

  constructor(private navesService: NavesService) { }

  ngOnInit(): void {
    this.peliculas = this.films;
    const fetchData: any = this.peliculas?.map(url => this.navesService.getFilmsData(url));
    this.dataPeliculas$ = forkJoin(fetchData);
  }

  getImagenUrl(url: string): SafeUrl {
    return this.navesService.getFilmsPhoto(url);
  }
}


