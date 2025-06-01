import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { DebutsHttpService } from "../../core/services/debuts/debuts-http.service";
import {
  addDebut,
  createDebutAction,
  deleteDebut,
  deleteDebutAction,
  getDebuts,
  initDebuts,
  updateDebut, updateDebutAction
} from "./debuts.actions";
import {exhaustMap, switchMap, tap} from "rxjs";
import { formSubmitSuccess } from "../global/global.actions";
import { debutInterface } from "../../core/models/debut-models/debut-models";
import {withFeedbackHelper} from "../../core/helpers/withFeedbackHelper/withFeedbackHelper";


@Injectable()
export class DebutsEffects {
  private actions$ = inject(Actions)
  private debutsService = inject(DebutsHttpService)


  getDebuts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initDebuts),
      switchMap(({ my }) =>
        withFeedbackHelper(
          this.debutsService.findAll(my),
          (res) => [getDebuts({ debuts: res as debutInterface[] })],
          { error: 'Не удалось загрузить дебюты' }
        )
      )
    )
  )
  createDebut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createDebutAction),
      switchMap(({ title, desc, side }) =>
        withFeedbackHelper(
          this.debutsService.createDebut({ title, desc, side }),
          (res) => [
            addDebut({ debut: res as debutInterface }),
            formSubmitSuccess(),
          ],
          { success: 'Дебют успешно создан', error: 'Ошибка создания дебюта' }
        )
      )
    )
  )
  deleteDebut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteDebut),
      exhaustMap(({ id }) =>
        withFeedbackHelper(
          this.debutsService.deleteDebut(id),
          () => {
            return [deleteDebutAction({ id: id }), formSubmitSuccess()]
          },
          { success: 'Дебют удалён', error: 'Ошибка при удалении' }
        )
      )
    )
  )
  updateDebut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateDebut),
      exhaustMap(({ title, desc, id }) =>
        withFeedbackHelper(
          this.debutsService.updateDebut({title, desc, id}),
          () => {
            return [updateDebutAction({ title, desc, id }), formSubmitSuccess()]
          },
          { success: 'Дебют успешно изменен', error: 'Ошибка при обновлении дебюта' }
        )
      )
    )
  )
}
