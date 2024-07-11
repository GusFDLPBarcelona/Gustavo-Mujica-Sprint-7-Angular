import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Naves } from '../interfaces/naves';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class NavesService {

  protected url = 'https://swapi.py4e.com/api/starships';
  protected detalleUrl = 'https://swapi.dev/api/starships/';
  imageBaseUrl = 'https://starwars-visualguide.com/assets/img';

  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer) { }

  getNaves(): Observable<HttpResponse<any>> {
    return this.httpClient.get<Naves[]>(this.url, { observe: 'response' });
  }

  getNaveImagen(id: string): SafeUrl {
    const imageUrl = `${this.imageBaseUrl}/starships/${id}.jpg`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  getNaveDetalle(id: string): Observable<any> {
    return this.httpClient.get<Naves>(`https://swapi.dev/api/starships/`);
  }

  getNaveDato(url: string): Observable<HttpResponse<Naves>> {
    return this.httpClient.get<Naves>(url, { observe: 'response' });
  }
}


