import {createAction, props} from "@ngrx/store";



export const register = createAction('register effect', props<{ email: string, password: string }>())

