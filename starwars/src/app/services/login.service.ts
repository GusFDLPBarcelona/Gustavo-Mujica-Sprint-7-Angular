import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iUsuario } from '../interfaces/usuarios';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlDDBB = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  registrarUsuario(usuario: iUsuario): Observable<iUsuario> {
    return this.http.post<iUsuario>(`${this.urlDDBB}/users`, usuario);
  }

  getEmails(email: string): boolean {
    this.http.get(`${this.urlDDBB}/users`).subscribe((todo) => {
      const usuariosList = todo;
      console.log(usuariosList);
    });
    return true;
  }
}
