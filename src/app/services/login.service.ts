import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
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
    return this.http.post<{ token: string }>(`${this.urlDDBB}/login`, credentials).pipe(
      catchError(this.handleError)
    );
  }

  logOut(): void {
    this.tokenSubject.next(null);
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('accessToken') !== null;
  }

  setearToken(token: string): void {
    this.tokenSubject.next(token);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //console.error(errorMessage); // Opcional: muestra el error en la consola
    return throwError(() => new Error(errorMessage));
  }
}


