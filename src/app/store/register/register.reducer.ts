import {createReducer, on} from "@ngrx/store";
import {register, registerError, registerSuccess, toggleLoader} from "./register.actions";

export interface RegisterState {
  isLoading: boolean
  error: string
}
export const initialState: RegisterState = {
  isLoading: false,
  error: ''
}

export const registerReducer = createReducer(
  initialState,
  on(register, state=>({...state, isLoading: false})),
  on(toggleLoader, state=>({...state, isLoading: !state.isLoading})),
  on(registerSuccess, state=>({...state, isLoading: false})),
  on(registerError, state=>({...state, isLoading: false})),
)
