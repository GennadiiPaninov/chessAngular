import {createAction, props} from "@ngrx/store";
import {notificationType} from "./global.reducer";

export const toggleLoader = createAction("toggle loader", props<{isLoading: boolean | undefined }>())
export const createNotification = createAction('create notifications', props<{ notificationType: notificationType | undefined, title: string}>())
export const removeNotification = createAction('remove notifications', props<{id: string}>())
export const formSubmitSuccess = createAction('form submit success')
