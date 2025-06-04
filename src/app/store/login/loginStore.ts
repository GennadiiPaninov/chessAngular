import {inject, Injectable} from "@angular/core";
import {GlobalStore} from "../global/globalStore";
import {handleHttpError} from "../../core/helpers/handle-http-errors";
import {AuthService} from "../../core/services/auth/auth.service";
import {RedirectTo} from "../../core/helpers/redirectToHelper/redirectTo";
import {firstValueFrom} from "rxjs";

@Injectable({providedIn:"any"})
export class LoginStore {
  private global = inject(GlobalStore)
  private auth = inject(AuthService)
  private redirect = inject(RedirectTo)
  async login (email:string, password: string, callback:()=>void){
    this.global.toggleLoader(true)
    try{
      await firstValueFrom(this.auth.login(email, password))
      callback()
      this.global.createNotification('Авторизация прошла успешно')
      this.redirect.navigateTo('/')
    }catch (err:unknown){
      handleHttpError(this.global, err, 'Не удалось авторизироваться')
    } finally {
      this.global.toggleLoader(false)
    }
  }
}
