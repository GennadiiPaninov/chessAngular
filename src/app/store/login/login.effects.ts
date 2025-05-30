import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../../core/services/auth/auth.service";
import {  exhaustMap, tap} from "rxjs";
import {loginAction, loginFormSubmitSuccess} from "./login.action";
import {Router} from "@angular/router";
import {withFeedbackHelper} from "../../core/helpers/withFeedbackHelper/withFeedbackHelper";

@Injectable()
export class LoginEffects {
  private actions$ = inject(Actions)
  private auth = inject(AuthService)
  private router = inject(Router)

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      exhaustMap(({ email, password }) =>
        withFeedbackHelper(
          this.auth.login(email, password),
          () => [
            loginFormSubmitSuccess(),
          ],
          {
            success: 'Вход выполнен успешно',
            error: 'Вход не выполнен, убедитесь что данные введены корректно'
          }
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
