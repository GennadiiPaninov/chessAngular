import {createAction, props} from "@ngrx/store";

export const verifyAction = createAction('verify', props<{ token: string }>())
export const isVerifyAction = createAction('show verify', props<{ isVerify: boolean }>())
