import { Component } from '@angular/core';
import { Nave, NavesService } from '../naves.service';

@Component({
  selector: 'app-lista-naves',
  standalone: true,
  imports: [],
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
