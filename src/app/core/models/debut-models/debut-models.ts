import {moveInterface} from "../move-models/move-models";

export interface debutInterface {
  id: string
  title: string
  desc: string
  createdAt: Date
  side: "White" | "Black"
  ownerId: string
  isMine: boolean
}
export interface fullDebutInterface extends debutInterface {
  firstMoves: moveInterface[]
}
export type createDebut = Omit<debutInterface, "id" | "createdAt" | "ownerId" | "isMine">

export type updateDebutType = Pick<debutInterface, "title" | "desc" | "id">



export type modal = 'createModal' | 'updateModal' | 'deleteModal' | 'debutModal'

