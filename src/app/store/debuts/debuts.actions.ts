import {createAction, props} from "@ngrx/store";
import {createDebut, debutInterface} from "../../core/models/debut-models/debut-models";

export const createDebutAction = createAction('create debut', props<createDebut>())
export const addDebut = createAction('add debut', props<{debut: debutInterface}>())
export const getDebuts  = createAction('get debuts', props<{ debuts: debutInterface[] }>())
export const initDebuts = createAction('init debuts')
