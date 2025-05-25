import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../../core/services/auth/auth.service";
import {catchError, concat, exhaustMap, mergeMap, of, tap} from "rxjs";
import {loginAction, loginFormSubmitSuccess} from "./login.action";
import {createNotification, toggleLoader} from "../global/global.actions";
import {Router} from "@angular/router";

@Injectable()
export class LoginEffects {
  constructor(private actions$: Actions, private auth: AuthService, private router: Router ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      exhaustMap(({email, password}) =>
        concat(
          of(toggleLoader({isLoading: true})),
          this.auth.login(email, password).pipe(
            mergeMap(res => [
              createNotification({
              title: "Вход выполнен успешно",
              notificationType: "notification-success"
            }),
              loginFormSubmitSuccess()
            ]),
            catchError(err => of(createNotification({
              title: "Вход не выполнен, убадитесь что данные введены корректно",
              notificationType: "notification-error"
            })))
          ),
          of(toggleLoader({isLoading: false}))
        )
      )
    )
  )

  redirectAfterLogin$ = createEffect(()=>
    this.actions$.pipe(
      ofType(loginFormSubmitSuccess),
      tap(()=>{
        this.router.navigate(['/'])
      })
    ),
    { dispatch: false }
  )
}
