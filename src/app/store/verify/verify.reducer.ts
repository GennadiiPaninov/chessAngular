import {createReducer, on} from "@ngrx/store";
import {isVerifyAction} from "./verify.actions";
export interface verifyState {
  isVerify: boolean
}
const initialState: verifyState ={
  isVerify: false
}
export const verifyReducer = createReducer(
  initialState,
  on(isVerifyAction, (state, props)=>{
    return {...state, isVerify: props.isVerify}
  })

)
