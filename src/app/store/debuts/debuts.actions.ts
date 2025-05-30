import {createAction, props} from "@ngrx/store";
import {createDebut, debutInterface,  updateDebutType} from "../../core/models/debut-models/debut-models";

export const createDebutAction = createAction('create debut', props<createDebut>())
export const addDebut = createAction('add debut', props<{debut: debutInterface}>())
export const getDebuts  = createAction('get debuts', props<{ debuts: debutInterface[] }>())
export const initDebuts = createAction('init debuts', props<{my?: boolean}>())

export const deleteDebut = createAction('delete debut', props<{id:string}>())
export const deleteDebutAction = createAction('delete debut', props<{id:string}>())

export const updateDebut = createAction('update debut', props<updateDebutType>())
export const updateDebutAction = createAction('update debut action', props<updateDebutType>())
