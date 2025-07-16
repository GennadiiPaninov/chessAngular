import {computed, inject, Injectable, signal} from "@angular/core";
import {firstValueFrom} from "rxjs";
import {handleHttpError} from "@core/helpers/handle-http-errors";
import {GlobalStore} from "../global/globalStore";
import {AuthService} from "@core/services/auth/auth.service";

@Injectable({providedIn:"any"})
export class VerifyStore {

  private Verify = signal<boolean>(false)

  readonly isVerify = computed(()=> this.Verify)
  private global = inject(GlobalStore)
  private auth = inject(AuthService)
  async verify(token:string){
    this.global.toggleLoader(true)
    try{
      await firstValueFrom(this.auth.confirmEmail(token))
      this.global.createNotification('Верификация прошли успешно')
      this.Verify.set(true)
    } catch (err:unknown){
      handleHttpError(this.global, err, 'Не удалось верифицироваться')
    } finally {
      this.global.toggleLoader(false)
    }
  }
}
