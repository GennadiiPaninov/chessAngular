import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { DebutsService } from "../../core/services/debuts/debuts.service";
import {addDebut, createDebutAction, getDebuts, initDebuts} from "./debuts.actions";
import { catchError, concat, mergeMap, of, switchMap } from "rxjs";
import {createNotification, formSubmitSuccess, toggleLoader} from "../global/global.actions";
import {createDebut, debutInterface} from "../../core/models/debut-models/debut-models";

@Injectable()
export class DebutsEffects {
  private actions$ = inject(Actions)
  private debutsService = inject(DebutsService)

  getDebuts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initDebuts),
      switchMap(() =>
        concat(
          of(toggleLoader({ isLoading: true })),
          this.debutsService.findAll().pipe(
            switchMap(res => {
              return of(getDebuts({ debuts: res as debutInterface[]}))
            }),
            catchError(err => of(createNotification({
              title: "Что-то пошло не так",
              notificationType: "notification-error"
            })))
          ),
          of(toggleLoader({ isLoading: false }))
        )
      )
    )
  )
  createDebut$ = createEffect(()=>
    this.actions$.pipe(
      ofType(createDebutAction),
      switchMap(({ title, desc, side }) =>
        concat(
          of(toggleLoader({ isLoading: true })),
          this.debutsService.createDebut({title, desc, side}).pipe(
            mergeMap(res => {
              return of(
                createNotification({
                  title: 'Дебют успешно создан',
                  notificationType: 'notification-success'
                }),
                addDebut({ debut: res as debutInterface }),
                formSubmitSuccess()
              );
            }),
            catchError(err => of(createNotification({
              title: "Что-то пошло не так",
              notificationType: "notification-error"
            })))
          ),
          of(toggleLoader({ isLoading: false }))
        )
      )
    )
  )
}
