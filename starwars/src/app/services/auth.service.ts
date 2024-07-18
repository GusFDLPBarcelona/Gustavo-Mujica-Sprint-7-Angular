import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { iLogin } from '../interfaces/usuarios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) { }

  getToken(): Observable<string> {
    return this.http.get<{ token: string }>('/api/auth/token').pipe(
      tap((response) => {
        this.tokenSubject.next(response.token);
      }),
      map(response => response.token)
    );
  }

  get token(): string | null {
    return this.tokenSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.tokenSubject.value;
  }



  register(data: { username: string, password: string }): Observable<void> {
    return this.http.post<{ token: string }>('/api/auth/register', data).pipe(
      tap(response => {
        this.tokenSubject.next(response.token);
      }),
      map(() => { })
    );
  }
}
