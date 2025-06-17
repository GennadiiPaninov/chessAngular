export type fensT = string[]
export type piecesT = string[]
export interface moveInterface {
  id: string
  title: string
  desc: string
  notation: string
  fen: string
  fens: fensT
  pieces: piecesT
  side: string
  debutId?: string
  parentId?: string
}

export type createFMoveT = Omit<moveInterface, "id">

export type newMoveSignalT = Pick<moveInterface, 'fen' | 'fens' | 'pieces'>
export type updateNewMovesSignalT = Partial<newMoveSignalT>
export interface createMoveFormI {
  mFrom: string
  mTo: string
  eFrom: string
  eTo:string
  desc: string
}
