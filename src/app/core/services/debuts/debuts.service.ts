import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {createDebut} from "../../models/debut-models/debut-models";

@Injectable(
  {providedIn: 'any'}
)
export class DebutsService{
  private readonly API = 'https://chess-backend-api-r1ze.vercel.app/debuts'
  private http = inject(HttpClient)

  createDebut(debutData: createDebut): Observable<{}>{
    const {title, desc, side} = debutData
    return this.http.post(this.API, {
      title,
      desc,
      side
    }, {withCredentials: true})
  }
  findAll(my?: boolean): Observable<{}>{
    return this.http.get(my ? this.API + '?mine=true' : this.API,  {withCredentials: true})
  }

  deleteDebut(id:string): Observable<{}>{
    return this.http.delete(this.API + `/${id}`, {withCredentials:true})
  }
}
