import {createFeatureSelector, createSelector} from "@ngrx/store";
import {RegisterState} from "./register.reducer";


export const selectAuthState = createFeatureSelector<RegisterState>('register')

export const selectLoading = createSelector(
  selectAuthState,
  state => state.isLoading
)
