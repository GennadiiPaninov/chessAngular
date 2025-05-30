import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../../core/services/auth/auth.service";
import {isVerifyAction, verifyAction} from "./verify.actions";
import {mergeMap} from "rxjs";
import {withFeedbackHelper} from "../../core/helpers/withFeedbackHelper/withFeedbackHelper";

@Injectable()
export class VerifyEffects {
  constructor(private actions$: Actions, private auth: AuthService) {
  }

  verify$ = createEffect(() =>
    this.actions$.pipe(
      ofType(verifyAction),
      mergeMap(({ token }) =>
        withFeedbackHelper(
          this.auth.confirmEmail(token),
          () => [isVerifyAction({ isVerify: true })],
          {
            success: 'Верификация прошла успешно',
            error: 'Ошибка при верификации'
          }
        )
      )
    )
  )
}
