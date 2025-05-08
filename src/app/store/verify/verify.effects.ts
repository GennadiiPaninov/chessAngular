import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../../core/services/auth/auth.service";
import {isVerifyAction, verifyAction} from "./verify.actions";
import {catchError, concat, map, mergeMap, of} from "rxjs";
import {createNotification, toggleLoader} from "../global/global.actions";

@Injectable()
export class VerifyEffects {
  constructor(private actions$: Actions, private auth: AuthService) {
  }

  verify$ = createEffect(() =>
    this.actions$.pipe(
      ofType(verifyAction),
      mergeMap(({token}) =>
        concat(
          of(toggleLoader({isLoading: true})),
          this.auth.confirmEmail(token).pipe(
            map(() =>
              createNotification({
                title: 'Верификация прошла успешно',
                notificationType: 'notification-success'
              }),
              isVerifyAction({isVerify: true})
            ),
            catchError(err =>
              of(
                createNotification({
                  title: err.error.message,
                  notificationType: 'notification-error'
                }),
                isVerifyAction({isVerify: true})
              )
            )
          ),
          of(toggleLoader({isLoading: false}))
        )
      )
    )
  )
}
