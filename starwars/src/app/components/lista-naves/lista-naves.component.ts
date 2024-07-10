import { Component } from '@angular/core';
import { Naves, NavesService } from '../../naves.service';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-lista-naves',
  standalone: true,
  imports: [HeaderComponent, CommonModule, RouterModule],
  templateUrl: './lista-naves.component.html',
  styleUrl: './lista-naves.component.css'
})
export class ListaNavesComponent {

  listaNaves?: any;

  constructor(private servicio: NavesService) { }

  ngOnInit(): void {
    this.servicio.getNaves().subscribe((datos) => {
      const intermediaria = datos.body;
      this.listaNaves = intermediaria!.results;
      console.log(this.listaNaves.count);
      console.log(this.listaNaves.results);
    })
  }


}
