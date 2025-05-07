import {createReducer, on} from "@ngrx/store";
import {createNotification, removeNotification, toggleLoader} from "./global.actions";
import { v4 as uuidv4 } from 'uuid';

export type notificationType = "notification-error" | "notification-info" | "notification-success"
export type notification = {
  notificationType: notificationType
  title: string
  id: string
}
export interface GlobalState {
  isLoading: boolean
  notifications: notification[]

}
export const initialState: GlobalState = {
  isLoading: false,
  notifications: []
}
export const globalReducer = createReducer(
  initialState,
  on(toggleLoader, (state, props) => {
    return {...state, isLoading: props.isLoading === undefined ? !state.isLoading : props.isLoading}
  }),


  on(createNotification,(state, props)=>{
    const notification = {
      id: uuidv4(),
      notificationType: props.notificationType  ?? "notification-success",
      title: props.title
    }
    return {...state, notifications: [...state.notifications, notification]}
  }),
  on(removeNotification,(state,props)=>{
    return {...state, notifications: state.notifications.filter(notification=> notification.id !== props.id)}
  })
)
