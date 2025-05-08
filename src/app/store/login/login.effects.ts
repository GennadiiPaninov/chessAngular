import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../../core/services/auth/auth.service";
import {catchError, concat, map, mergeMap, of} from "rxjs";
import {loginAction} from "./login.action";
import {createNotification, toggleLoader} from "../global/global.actions";

@Injectable()
export class LoginEffects {
  constructor(private actions$: Actions, private auth: AuthService) {
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      mergeMap(({email, password}) =>
        concat(
          of(toggleLoader({isLoading: true})),
          this.auth.login(email, password).pipe(
            map(res=> createNotification({title: "Вход выполнен успешно", notificationType: "notification-success"})),
            catchError(err=> of(createNotification({title: "Вход не выполнен, убадитесь что данные введены корректно", notificationType: "notification-error"})))
          ),
          of(toggleLoader({isLoading: false}))
        )
      )
    )
  )
}
