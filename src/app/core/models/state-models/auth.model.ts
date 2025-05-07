export interface Loader {
  isLoading: boolean
}

export interface Notification {
  title: string
  type: 'success' | "error" | "alarm"
}
