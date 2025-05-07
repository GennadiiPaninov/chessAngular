import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../../core/services/auth/auth.service";
import {register, registerError, registerSuccess} from "./register.actions";
import {catchError, map, mergeMap, of} from "rxjs";

@Injectable()
export class RegisterEffects {
  constructor(private actions$: Actions, private auth:AuthService) {}

  register$ = createEffect(()=>
    this.actions$.pipe(
      ofType(register),
      mergeMap(({email,password})=>
        
        this.auth.register(email,password).pipe(
          map(response=> registerSuccess()),
          catchError(err=> of(registerError({ error: err.error.message })))
        )
      )
    )
  )
}
