import {createFeatureSelector, createSelector} from "@ngrx/store";
import {GlobalState} from "./global.reducer";

export const selectGlobal = createFeatureSelector<GlobalState>('global')

export const selectLoading = createSelector(
  selectGlobal,
  state=> state.isLoading
)

export const selectNotifications = createSelector(
  selectGlobal,
  (state)=> state.notifications
)
