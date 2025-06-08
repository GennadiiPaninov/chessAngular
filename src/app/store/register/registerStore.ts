import {inject, Injectable} from "@angular/core";
import {GlobalStore} from "../global/globalStore";
import {AuthService} from "../../core/services/auth/auth.service";
import {RedirectTo} from "../../core/helpers/redirectToHelper/redirectTo";
import {firstValueFrom} from "rxjs";
import {handleHttpError} from "../../core/helpers/handle-http-errors";

@Injectable({providedIn:"any"})
export class RegisterStore{
  private global = inject(GlobalStore)
  private auth = inject(AuthService)
  async register (email:string, password: string, name: string, callback:()=> void){
    this.global.toggleLoader(true)

    try{
      await firstValueFrom(this.auth.register(email, password, name))
      callback()
      this.global.createNotification('Сообщение о верификации направлено на почту, возможно оно попало в спам')
    } catch (err:unknown){
      handleHttpError(this.global, err, 'Не удалось зарегистрироваться')
    } finally {
      this.global.toggleLoader(false)
    }
  }
}
