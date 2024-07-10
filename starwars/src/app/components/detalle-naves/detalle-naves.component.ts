import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavesService } from '../../naves.service';
import { Naves } from '../../interfaces/naves';
import { HeaderComponent } from '../header/header.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detalle-naves',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './detalle-naves.component.html',
  styleUrls: ['./detalle-naves.component.css']
})
export class DetalleNavesComponent implements OnInit {
  nave?: Naves;
  id?: string;
  navesService: any;
  naves$!: Observable<Naves>;
  imageUrl: string = '';
  listaNaves: any;

  constructor(
    private route: ActivatedRoute,
    private servicio: NavesService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.servicio.getNaveDetalle(this.id).subscribe((data: Naves) => {
      console.log(data);
      this.nave = data;
    });
  }
}
