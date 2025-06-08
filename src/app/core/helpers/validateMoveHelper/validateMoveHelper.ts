import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms'
import {Chess} from 'chess.js'

export function validateMoveHelper(
  mFromKey: string,
  mToKey: string,
  eFromKey: string,
  eToKey: string,
  side: string,
  fen?: string
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const mToControl = group.get(mToKey)
    const eToControl = group.get(eToKey)
    const isWhite = side === 'White'
    console.log(side, isWhite)
    const mFrom = group.get(mFromKey)?.value?.toLowerCase()
    const mTo = group.get(mToKey)?.value?.toLowerCase()
    const eFrom = group.get(eFromKey)?.value?.toLowerCase()
    const eTo = group.get(eToKey)?.value?.toLowerCase()

    if (isWhite) {
      if (mFrom.length !== 2 || mTo.length !== 2) return null
    } else {
      if (eFrom.length !== 2 || eTo.length !== 2) return null
    }
    const chess = new Chess(fen || undefined)
    const errors: ValidationErrors = {}
    console.log('попал1')
    try {
      const move1 = chess.move(isWhite ? {from: mFrom, to: mTo} : {from: eFrom, to: eTo})
      if (!move1) {
        isWhite ?
          mToControl?.setErrors({...mToControl.errors, ['invalidMove']: true}) :
          eToControl?.setErrors({...eToControl.errors, ['invalidMove']: true})
        errors['invalidMove'] = true
      }else {
        console.log(chess.ascii())

      }
    } catch (e) {
      isWhite ?
        mToControl?.setErrors({...mToControl.errors, ['invalidMove']: true}) :
        eToControl?.setErrors({...eToControl.errors, ['invalidMove']: true})
      errors['invalidMove'] = true
    }

    if (mFrom.length !== 2 || mTo.length !== 2 || eFrom.length !== 2 || eTo.length !== 2) return null

    try {
      const move1 = chess.move(isWhite ? {from: eFrom, to: eTo} : {from: eFrom, to: eTo})
      if (!move1) {
        isWhite ?
          eToControl?.setErrors({...eToControl.errors, ['invalidMove']: true}) :
          mToControl?.setErrors({...mToControl.errors, ['invalidMove']: true})
        errors['invalidMove'] = true
      }
    } catch (e) {
      isWhite ?
        eToControl?.setErrors({...eToControl.errors, ['invalidMove']: true}) :
        mToControl?.setErrors({...mToControl.errors, ['invalidMove']: true})
      errors['invalidMove'] = true
    }

    return Object.keys(errors).length ? errors : null
  }
}
