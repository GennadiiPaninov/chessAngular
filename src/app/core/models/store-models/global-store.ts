export type notificationType = "notification-error" | "notification-info" | "notification-success"
export type notification = {
  notificationType: notificationType
  title: string
  id: string
}
