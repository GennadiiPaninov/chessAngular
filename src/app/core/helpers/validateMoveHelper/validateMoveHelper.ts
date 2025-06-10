import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms'
import {Chess} from 'chess.js'

export function validateMoveHelper(
  mFromKey: string,
  mToKey: string,
  eFromKey: string,
  eToKey: string,
  isWhite: boolean,
  updateFen: (fen: string) => void,
  updateLastFens: (fen: string[]) => void,
  fen?: string
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const mToControl = group.get(mToKey)
    const eToControl = group.get(eToKey)
    const mFrom = isWhite ? group.get(mFromKey)?.value?.toLowerCase() : group.get(eFromKey)?.value?.toLowerCase()
    const mTo = isWhite ? group.get(mToKey)?.value?.toLowerCase() : group.get(eToKey)?.value?.toLowerCase()
    const eFrom = isWhite ? group.get(eFromKey)?.value?.toLowerCase() : group.get(mFromKey)?.value?.toLowerCase()
    const eTo = isWhite ? group.get(eToKey)?.value?.toLowerCase() : group.get(mToKey)?.value?.toLowerCase()

    if (mFrom.length !== 2 || mTo.length !== 2) return null


    const chess = new Chess(fen || undefined)
    const errors: ValidationErrors = {}
    try {
      const move1 = chess.move({from: mFrom, to: mTo})
      if (!move1) {

       mToControl?.setErrors({...mToControl.errors, ['invalidMove']: true})

        errors['invalidMove'] = true
      }else {
        console.log(chess.ascii())
      }
    } catch (e) {
        mToControl?.setErrors({...mToControl.errors, ['invalidMove']: true})
        errors['invalidMove'] = true
        updateFen("start")
        updateLastFens([])
    }

    const fenAfterFirst = chess.fen()
    console.log(fenAfterFirst)
    updateFen(fenAfterFirst)
    updateLastFens([fenAfterFirst])

    if (mFrom.length !== 2 || mTo.length !== 2 || eFrom.length !== 2 || eTo.length !== 2) return null

    try {
      const move1 = chess.move( {from: eFrom, to: eTo})
      if (!move1) {
          eToControl?.setErrors({...eToControl.errors, ['invalidMove']: true})
          errors['invalidMove'] = true
      }
      updateFen(chess.fen())
      updateLastFens([fenAfterFirst, chess.fen()])
    } catch (e) {
        eToControl?.setErrors({...eToControl.errors, ['invalidMove']: true})
        errors['invalidMove'] = true
        updateLastFens([fenAfterFirst])
        updateFen("start")
    }

    return Object.keys(errors).length ? errors : null
  }
}
