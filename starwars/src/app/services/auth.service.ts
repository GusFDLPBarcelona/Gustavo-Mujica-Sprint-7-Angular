import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSignal } from '@angular/core/signals';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { iLogin } from '../interfaces/usuarios'; // Asegúrate de que esta ruta sea correcta

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenSignal = new BehaviorSignal<string | null>(null);

  constructor(private http: HttpClient) { }

  getToken(): Observable<string> {
    return this.http.get<{ token: string }>('/api/auth/token').pipe(
      tap((response) => {
        this.tokenSignal.value = response.token;
      }),
      map(response => response.token)
    );
  }

  get token(): string | null {
    return this.tokenSignal.value;
  }

  isAuthenticated(): boolean {
    return !!this.tokenSignal.value;
  }

  login(credentials: iLogin): Observable<void> {
    return this.http.post<{ token: string }>('/api/auth/login', credentials).pipe(
      tap(response => {
        this.tokenSignal.value = response.token;
      }),
      map(() => { })
    );
  }

  register(data: { username: string, password: string }): Observable<void> {
    return this.http.post<{ token: string }>('/api/auth/register', data).pipe(
      tap(response => {
        this.tokenSignal.value = response.token;
      }),
      map(() => { })
    );
  }
}
