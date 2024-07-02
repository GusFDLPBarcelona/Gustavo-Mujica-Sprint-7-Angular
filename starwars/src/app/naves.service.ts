import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Nave {
  nombre: string,
  modelo: string
}

@Injectable({
  providedIn: 'root'
})
export class NavesService {

  protected url = 'https://swapi.py4e.com/api/starships';

  constructor(private httpClient: HttpClient) { }

  getNaves(): Observable<HttpResponse<any>> {
    return this.httpClient.get<Nave[]>(this.url, { observe: 'response' });
  }
}
