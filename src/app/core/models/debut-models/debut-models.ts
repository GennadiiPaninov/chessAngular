
export interface debutInterface {
  id: string
  title: string
  desc: string
  createdAt: Date
  side: "White" | "Black"
  ownerId: string
}
export type createDebut = Omit<debutInterface, "id" | "createdAt" | "ownerId">

export type updateDebutType = Pick<debutInterface, "title" | "desc" | "id">

