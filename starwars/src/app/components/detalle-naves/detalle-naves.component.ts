import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavesService } from '../../naves.service';
import { Naves } from '../../interfaces/naves';

@Component({
  selector: 'app-detalle-naves',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-naves.component.html',
  styleUrls: ['./detalle-naves.component.css']
})
export class DetalleNavesComponent implements OnInit {
  nave?: Nave;
  id?: string;

  constructor(
    private route: ActivatedRoute,
    private servicio: NavesService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.servicio.getNaveDetalle(this.id).subscribe((data: Nave) => {
      this.nave = data;
    });
  }
}
