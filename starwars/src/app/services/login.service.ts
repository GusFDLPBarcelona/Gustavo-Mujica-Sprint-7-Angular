import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { iLogin, iUsuario } from '../interfaces/usuarios';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlDDBB = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  registrarUsuario(usuario: iUsuario): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Powered-By': 'tinyhttp',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
    });

    return this.http.post<any>(`${this.urlDDBB}/users`, usuario, { headers })
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

  login(login: any): Observable<any> {
    console.log(login);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const email = login.email;
    const password = login.password
    return this.http.post(`${this.urlDDBB}/login`, { email, password }, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
