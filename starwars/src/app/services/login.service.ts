import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { iLogin, iUsuario } from '../interfaces/usuarios';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private urlDDBB = 'http://localhost:3000';
  private tokenSubject = new BehaviorSubject<string | null>(null);


  constructor(private http: HttpClient) { }

  registrarUsuario(usuario: iUsuario): Observable<any> {
    return this.http.post<any>(`${this.urlDDBB}/users`, usuario)
      .pipe(
        catchError(this.handleError)
      );
  }

  getEmails(email: string): Observable<any> {
    return this.http.get(`${this.urlDDBB}/users`)
      .pipe(
        catchError(this.handleError)
      );
  }

  login(credentials: iLogin): any {
    return this.http.post<{ token: string }>(`${this.urlDDBB}/login`, credentials);
  }

  logOut(): void {
    this.tokenSubject.next(null);
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    return this.tokenSubject.value !== undefined && localStorage.getItem('accessToken') !== undefined;
  }

  setearToken(token: string): void {
    this.tokenSubject.next(token);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}


