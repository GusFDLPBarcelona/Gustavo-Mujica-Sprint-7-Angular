import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Naves } from '../app/interfaces/naves';

@Injectable({
  providedIn: 'root'
})
export class NavesService {

  protected url = 'https://swapi.py4e.com/api/starships';
  imageBaseUrl = 'https://starwars-visualguide.com/assets/img';

  constructor(private httpClient: HttpClient) { }

  getNaves(): Observable<HttpResponse<any>> {
    return this.httpClient.get<Naves[]>(this.url, { observe: 'response' });
  }

  getNaveImagen(id: string) {
    return `${this.imageBaseUrl}/starships/${id}.jpg`;
  }

  getNaveDetalle(id: string): Observable<Naves> {
    return this.httpClient.get<Naves>(`${this.url}/${id}`);
  }
}


