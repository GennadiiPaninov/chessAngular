import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createFMoveT, moveInterface } from '../../models/move-models/move-models';

@Injectable({ providedIn: 'any' })
export class MoveHttpService {
  private readonly API = 'https://chess-backend-api-r1ze.vercel.app/moves';
  private http = inject(HttpClient);

  createMove(moveData: createFMoveT): Observable<moveInterface> {
    return this.http.post<moveInterface>(
      this.API,
      {
        ...moveData,
      },
      { withCredentials: true },
    );
  }
  getMove(id: string): Observable<moveInterface> {
    return this.http.get<moveInterface>(`${this.API}/${id}`, {
      withCredentials: true,
    });
  }
  updateMove(id: string, desc: string): Observable<moveInterface> {
    return this.http.patch<moveInterface>(`${this.API}/${id}`, { desc }, { withCredentials: true });
  }
  deleteMove(id: string): Observable<{}> {
    return this.http.delete(`${this.API}/${id}`, {
      withCredentials: true,
    });
  }
}
