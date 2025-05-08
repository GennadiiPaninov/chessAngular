import {createFeatureSelector, createSelector} from "@ngrx/store";

export const selectVerifyState = createFeatureSelector<{isVerify: boolean }>('verify')

export const selectIsVerify = createSelector(selectVerifyState, state=> state.isVerify)
