import {createAction, props} from "@ngrx/store";

export const toggleLoader = createAction('[Loader] toggle loader')
export const register = createAction('register effect', props<{ email: string, password: string }>())
export const registerSuccess = createAction('register success')
export const registerError = createAction('register error', props<{ error: string }>())
