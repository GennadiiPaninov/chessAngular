import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {register} from "./register.actions";
import { mergeMap } from "rxjs";
import {AuthService} from "../../core/services/auth/auth.service";
import {formSubmitSuccess} from "../global/global.actions";
import {withFeedbackHelper} from "../../core/helpers/withFeedbackHelper/withFeedbackHelper";

@Injectable()
export class RegisterEffects {
  constructor(private actions$: Actions, private auth: AuthService) {
  }

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      mergeMap(({ email, password }) =>
        withFeedbackHelper(
          this.auth.register(email, password),
          () => [formSubmitSuccess()],
          {
            success: 'Сообщение о верификации направлено на почту, возможно оно попало в спам',
            error: 'Ошибка при регистрации'
          }
        )
      )
    )
  )
}
