import {catchError, concat, mergeMap, Observable, of} from "rxjs";
import {Action} from "@ngrx/store";
import {createNotification, toggleLoader} from "../../../store/global/global.actions";

export function withFeedbackHelper<T>(
  req$: Observable<T>,
  onSuccess: (data: T) => Action[],
  messages?: {
    success?: string;
    error?: string;
  }
): Observable<Action> {
  return concat(
    of(toggleLoader({ isLoading: true })),
    req$.pipe(
      mergeMap((data) => {
        const successActions = onSuccess(data)
        const notification = messages?.success ? [createNotification({ title: messages.success, notificationType: 'notification-success' })]  : []
        return of(...notification, ...successActions)
      }),
      catchError(() =>
        of(
          createNotification({
            title: messages?.error ?? 'Что-то пошло не так',
            notificationType: 'notification-error',
          })
        )
      )
    ),
    of(toggleLoader({ isLoading: false }))
  )
}
