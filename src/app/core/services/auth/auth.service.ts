import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {meResponse} from "../../models/state-models/auth.model";

@Injectable({ providedIn: 'root' })

export class AuthService {
  private readonly API = 'https://chess-backend-api-r1ze.vercel.app/auth';

  constructor(private http: HttpClient) {}

  register(email: string, password: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.API}/register`, {
      email,
      password,
      name: "Gennadij",
    });
  }

  login(email: string, password: string): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(
      `${this.API}/login`,
      { email, password },
      { withCredentials: true }
    ).pipe(
      tap(res => {
        localStorage.setItem('access_token', res.access_token);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.API}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => localStorage.removeItem('access_token'))
    );
  }

  checkAuth(): Observable<meResponse> {
    return this.http.get<meResponse>(`${this.API}/me`, { withCredentials: true });
  }

  confirmEmail(token: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.API}/confirm-email`, { token });
  }

  refresh(): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(
      `${this.API}/refresh`,
      {},
      { withCredentials: true }
    ).pipe(
      tap(res => {
        localStorage.setItem('access_token', res.access_token)
      })
    );
  }
}
