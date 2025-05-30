import {createReducer, on} from "@ngrx/store";
import {addDebut, deleteDebutAction, getDebuts, updateDebutAction} from "./debuts.actions";
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
  }),
  on(deleteDebutAction, (state, props)=>{
    return {...state, debuts: [...state.debuts.filter(debut=> debut.id !== props.id)]}
  }),
  on(updateDebutAction, (state, props)=>{
    return {...state, debuts: [...state.debuts.map(debut=> debut.id == props.id ? {...debut, title: props.title, desc: props.desc} : debut)]}
  })
)
