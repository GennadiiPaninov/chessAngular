import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {createDebut, updateDebutType} from "../../models/debut-models/debut-models";

@Injectable(
  {providedIn: 'any'}
)
export class DebutsHttpService {
  private readonly API = 'https://chess-backend-api-r1ze.vercel.app/debuts'
  private http = inject(HttpClient)

  createDebut(debutData: createDebut): Observable<{}> {
    const {title, desc, side} = debutData
    return this.http.post(this.API, {
      title,
      desc,
      side
    }, {withCredentials: true})
  }

  findAll(my?: boolean, title?: string): Observable<{}> {
    const params: {my?: boolean, title?: string} = {}
    if (my !== undefined) params.my = my
    if (title) params.title = title
    return this.http.get(this.API, {params, withCredentials: true})
  }

  deleteDebut(id: string): Observable<{}> {
    return this.http.delete(this.API + `/${id}`, {withCredentials: true})
  }

  updateDebut({title, desc, id}: updateDebutType): Observable<{}> {
    return this.http.patch(this.API + `/${id}`, {
      title,
      desc,
      id
    }, {withCredentials: true})
  }
}
