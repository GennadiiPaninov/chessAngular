import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {createDebut, updateDebutType} from "../../models/debut-models/debut-models";
import {createFMoveT, moveInterface} from "../../models/move-models/move-models";

@Injectable(
  {providedIn: 'any'}
)
export class MoveHttpService {
  private readonly API = 'https://chess-backend-api-r1ze.vercel.app/moves'
  private http = inject(HttpClient)

  createMove(moveData: createFMoveT): Observable<moveInterface> {
    return this.http.post<moveInterface>(this.API, {
      ...moveData
    }, {withCredentials: true})
  }
  getRootMoves(debutId: string): Observable<moveInterface[]> {
    return this.http.get<moveInterface[]>(`${this.API}/debut/${debutId}/root`, {
      withCredentials: true
    })
  }
  getChildren(moveId: string): Observable<moveInterface[]> {
    return this.http.get<moveInterface[]>(`${this.API}/${moveId}/children`, {
      withCredentials: true
    })
  }
  getMove(id: string): Observable<moveInterface> {
    return this.http.get<moveInterface>(`${this.API}/${id}`, {
      withCredentials: true
    })
  }
  updateMove(id: string, data: Partial<moveInterface>): Observable<moveInterface> {
    return this.http.patch<moveInterface>(`${this.API}/${id}`, data, {
      withCredentials: true
    })
  }
  deleteMove(id: string): Observable<{}> {
    return this.http.delete(`${this.API}/${id}`, {
      withCredentials: true
    })
  }
}
