import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { meResponse } from '../../models/state-models/auth.model';

@Injectable({ providedIn: 'any' })
export class AuthService {
  private readonly API = 'https://chess-backend-api-r1ze.vercel.app/auth';

  private http = inject(HttpClient);

  register(email: string, password: string, name: string): Observable<{ message: string }> {
    console.log({
      email,
      password,
      name,
    });
    return this.http.post<{ message: string }>(`${this.API}/register`, {
      email,
      password,
      name,
    });
  }

  login(email: string, password: string): Observable<{ access_token: string }> {
    return this.http
      .post<{
        access_token: string;
      }>(`${this.API}/login`, { email, password }, { withCredentials: true })
      .pipe(
        tap((res) => {
          localStorage.setItem('access_token', res.access_token);
        }),
      );
  }

  logout(): Observable<any> {
    return this.http
      .post(`${this.API}/logout`, {}, { withCredentials: true })
      .pipe(tap(() => localStorage.removeItem('access_token')));
  }

  checkAuth(): Observable<meResponse> {
    const accessToken = localStorage.getItem('access_token');

    const headers = accessToken
      ? new HttpHeaders({
          Authorization: `Bearer ${accessToken}`,
        })
      : undefined;

    return this.http.get<meResponse>(`${this.API}/me`, {
      headers,
      withCredentials: true,
    });
  }

  confirmEmail(token: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.API}/confirm-email`, { token });
  }

  refresh(): Observable<{ access_token: string }> {
    return this.http
      .post<{ access_token: string }>(`${this.API}/refresh`, {}, { withCredentials: true })
      .pipe(
        tap((res) => {
          localStorage.setItem('access_token', res.access_token);
        }),
      );
  }
}
