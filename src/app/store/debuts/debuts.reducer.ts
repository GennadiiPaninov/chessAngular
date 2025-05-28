import {createReducer, on} from "@ngrx/store";
import {addDebut, getDebuts} from "./debuts.actions";
import {debutInterface} from "../../core/models/debut-models/debut-models";

export interface DebutsState {
  debuts: debutInterface[]
}
export const initialState: DebutsState = {
  debuts: []
}
export const debutsReducer = createReducer(
  initialState,
  on(addDebut, (state, props)=>{
    return {...state, debuts: [...state.debuts, props.debut]}
  }),
  on(getDebuts, (state, props)=>{
    return {...state, debuts: [...props.debuts]}
  })
)
