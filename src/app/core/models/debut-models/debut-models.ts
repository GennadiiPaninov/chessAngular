
export interface debutInterface {
  id: string
  title: string
  desc: string
  createdAt: Date
  side: "White" | "Black"
  ownerId: string
  isMine: boolean
}
export type createDebut = Omit<debutInterface, "id" | "createdAt" | "ownerId" | "isMine">

export type updateDebutType = Pick<debutInterface, "title" | "desc" | "id">

export interface showModalType {
  createModal: boolean
  deleteModal: boolean
  updateModal: boolean
  debutModal: boolean
}

export type modal = 'createModal' | 'updateModal' | 'deleteModal' | 'debutModal'

