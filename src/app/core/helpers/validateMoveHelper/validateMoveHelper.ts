import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms'
import {Chess} from 'chess.js'
import {updateNewMovesSignalT} from "../../models/move-models/move-models";

export function validateMoveHelper(
  mFromKey: string,
  mToKey: string,
  eFromKey: string,
  eToKey: string,
  isWhite: boolean,
  updateNewMove: (obj: updateNewMovesSignalT) => void,
  resetNewMove: () => void,
  fen?: string
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const mToControl = group.get(mToKey)
    const eToControl = group.get(eToKey)
    const mFrom = isWhite ? group.get(mFromKey)?.value?.toLowerCase() : group.get(eFromKey)?.value?.toLowerCase()
    const mTo = isWhite ? group.get(mToKey)?.value?.toLowerCase() : group.get(eToKey)?.value?.toLowerCase()
    const eFrom = isWhite ? group.get(eFromKey)?.value?.toLowerCase() : group.get(mFromKey)?.value?.toLowerCase()
    const eTo = isWhite ? group.get(eToKey)?.value?.toLowerCase() : group.get(mToKey)?.value?.toLowerCase()
    const movedPiecesArr = []
    if (mFrom.length !== 2 || mTo.length !== 2) return null


    const chess = new Chess(fen || undefined)
    const errors: ValidationErrors = {}
    try {
      const move1 = chess.move({from: mFrom, to: mTo})
      if (!move1) {
        mToControl?.setErrors({...mToControl.errors, ['invalidMove']: true})
        errors['invalidMove'] = true
      } else {
        console.log(chess.ascii())
        movedPiecesArr.push(move1.piece.toUpperCase())
      }
    } catch (e) {
      mToControl?.setErrors({...mToControl.errors, ['invalidMove']: true})
      errors['invalidMove'] = true
      resetNewMove()
    }

    const fenAfterFirst = chess.fen()
    console.log({fens: [fenAfterFirst]})
    updateNewMove({fen: fenAfterFirst, fens: [fenAfterFirst]})

    if (mFrom.length !== 2 || mTo.length !== 2 || eFrom.length !== 2 || eTo.length !== 2) return null

    try {
      const move2 = chess.move({from: eFrom, to: eTo})
      if (!move2) {
        eToControl?.setErrors({...eToControl.errors, ['invalidMove']: true})
        errors['invalidMove'] = true
      } else {
        movedPiecesArr.push(move2.piece.toUpperCase())
        updateNewMove({fen:chess.fen(), fens:[fenAfterFirst, chess.fen()], pieces: movedPiecesArr})


      }
    } catch (e) {
      eToControl?.setErrors({...eToControl.errors, ['invalidMove']: true})
      errors['invalidMove'] = true
      updateNewMove({fen:"start", fens: [fenAfterFirst]})
    }
    return Object.keys(errors).length ? errors : null
  }
}
