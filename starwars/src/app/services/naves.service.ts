import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Naves, Nave } from '../interfaces/naves';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class NavesService {

  private url = 'https://swapi.py4e.com/api/starships';
  private detalleUrl = 'https://swapi.dev/api/starships/';
  private imageBaseUrl = 'https://starwars-visualguide.com/assets/img';
  private siguienteUrl: string | null = null;
  private urlSubject = new BehaviorSubject<string>('');

  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer) { }

  getNaves(): Observable<HttpResponse<any>> {
    return this.httpClient.get<Naves[]>(this.url, { observe: 'response' });
  }

  getNaveImagen(id: string): SafeUrl {
    const imageUrl = `${this.imageBaseUrl}/starships/${id}.jpg`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  getNaveDetalle(id: number): Observable<Nave> {
    return this.httpClient.get<Nave>(`${this.detalleUrl}${id}`);
  }

  getNaveDato(url: string): Observable<HttpResponse<Naves>> {
    return this.httpClient.get<Naves>(url, { observe: 'response' });
  }

  getMasNaves(): Observable<HttpResponse<any>> {
    console.log(Observable<HttpResponse<any>>)
    if (this.siguienteUrl) {
      return this.httpClient.get<any>(this.siguienteUrl, { observe: 'response' });
    } else {
      return this.getNaves();
    }
  }

  getUrl(url: string) {
    this.urlSubject.next(url);
  }

  getMyUrl(): string {
    return this.urlSubject.getValue();
  }

  setSiguienteUrl(url: string | null): void {
    console.log(this.siguienteUrl)
    this.siguienteUrl = url;
  }
}


