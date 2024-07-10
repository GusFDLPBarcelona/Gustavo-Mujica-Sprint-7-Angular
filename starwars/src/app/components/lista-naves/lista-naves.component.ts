import { Component, OnInit } from '@angular/core';
import { NavesService } from '../../naves.service';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Naves } from '../../interfaces/naves';



@Component({
  selector: 'app-lista-naves',
  standalone: true,
  imports: [HeaderComponent, CommonModule, RouterModule],
  templateUrl: './lista-naves.component.html',
  styleUrl: './lista-naves.component.css'
})
export class ListaNavesComponent implements OnInit {
  listaNaves: Naves[] = [];
  naveSeleccionada?: Naves



  constructor(private servicio: NavesService) { }

  ngOnInit(): void {
    this.servicio.getNaves().subscribe((datos) => {
      const intermediaria = datos.body;
      this.listaNaves = intermediaria!.results;
      console.log(intermediaria.listaNaves.count);
      console.log(intermediaria.listaNaves.results);
    })
  }


}
