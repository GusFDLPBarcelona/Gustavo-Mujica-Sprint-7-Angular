import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { iLogin, iUsuario } from '../interfaces/usuarios';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlDDBB = 'http://localhost:3000';

  private errores = new Subject()

  constructor(private http: HttpClient) { }

  registrarUsuario(usuario: iUsuario): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Powered-By': 'tinyhttp',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
      'Connection': 'keep-alive'
    });
    if (this.getEmails(usuario.email)) {
      return this.http.post<any>(`${this.urlDDBB}/users`, usuario, { headers })
    } else {
      this.errores.next('El usuario ya existe')
      return this.errores.asObservable();
    }

  }

  getEmails(email: string): boolean {
    this.http.get(`${this.urlDDBB}/users`).subscribe((todo) => {
      const usuariosList = todo;
      console.log(usuariosList);
    });
    return true;
  }

  login(login: iLogin): Observable<any> {
    console.log(login);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Powered-By': 'tinyhttp',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
      'Connection': 'keep-alive',
      'etag': 'W/"9-0gXL1ngzMqISxa6S1zx3F4wtLyg"'
    });
    return this.http.post(`${this.urlDDBB}/login`, login, { headers });
  }
}
