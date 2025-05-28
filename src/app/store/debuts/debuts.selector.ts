import {createFeatureSelector, createSelector} from "@ngrx/store";
import {DebutsState} from "./debuts.reducer";

export const selectDebutsFeature = createFeatureSelector<DebutsState>('debuts')

export const selectDebuts = createSelector(selectDebutsFeature, state=> state.debuts)
