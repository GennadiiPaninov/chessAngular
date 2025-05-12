import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {register, registerSuccessAction} from "./register.actions";
import {catchError, concat, map, mergeMap, of} from "rxjs";
import {AuthService} from "../../core/services/auth/auth.service";
import {createNotification, toggleLoader} from "../global/global.actions";

@Injectable()
export class RegisterEffects {
  constructor(private actions$: Actions,  private auth: AuthService ) {
  }
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      mergeMap(({ email, password }) => {
          return concat(
            of(toggleLoader({isLoading: true})),
            this.auth.register(email, password).pipe(
              mergeMap(() => [
                  createNotification({
                    notificationType: 'notification-success',
                    title: 'Сообщение о верификации направлено на почту, возможно оно попало в спам'
                  }),
                  registerSuccessAction()
                ]
              ),
              catchError(err =>
                of(
                  createNotification({
                    notificationType: 'notification-error',
                    title: err.error.message
                  })
                )
              )
            ),
            of(toggleLoader({isLoading: false}))
          )
        }
      )
    )
  )
}
