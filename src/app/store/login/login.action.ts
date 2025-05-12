import {createAction, props} from "@ngrx/store";

export const loginAction = createAction('login', props<{email:string, password:string}>())
export const loginFormSubmitSuccess = createAction('form submit success')
