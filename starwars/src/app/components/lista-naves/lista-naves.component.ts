import { Component, OnInit } from '@angular/core';
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
  styleUrl: './lista-naves.component.css'
})
export class ListaNavesComponent implements OnInit {
  listaNaves: Naves[] = [];
  naveSeleccionada?: Nave;



  constructor(private servicio: NavesService, private router: Router) { }

  ngOnInit(): void {
    this.servicio.getNaves().subscribe((datos) => {
      const intermediaria = datos.body;
      this.listaNaves = intermediaria!.results;
      console.log(intermediaria.count);
      console.log(intermediaria.results);
    });
  }
  seleccionarNave(url: string): void {
    this.servicio.getNaveDetalle(url).subscribe((data: Nave) => {
      this.naveSeleccionada = data;
    });
  }

  getNaveSeleccionada(item: Naves): void {
    const url = `${item.url}`;
    this.router.navigate([encodeURIComponent(url)]);

  }



}
