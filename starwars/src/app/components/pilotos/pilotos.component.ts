import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Pilot } from '../../interfaces/naves';
import { NavesService } from '../../services/naves.service';
import { forkJoin, Observable } from 'rxjs';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pilotos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pilotos.component.html',
  styleUrls: ['./pilotos.component.css']
})
export class PilotosComponent {
  @Input() pilots?: any;
  pilotos?: string[];
  pilotos$?: Observable<any>;

  constructor(private navesService: NavesService) { }

  ngOnInit(): void {
    this.pilotos = this.pilots;
    const fetchPilotos: any = this.pilotos?.map(data => this.navesService.getPilotos(data));
    this.pilotos$ = forkJoin(fetchPilotos);
  }

  cargarFotos(url: string): SafeUrl {
    console.log(this.navesService.getFotoPiloto(url));
    return this.navesService.getFotoPiloto(url);

  }
}


