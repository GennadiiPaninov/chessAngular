import {Injectable} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {Actions, ofType} from "@ngrx/effects";
import {take} from "rxjs";
import {formSubmitSuccess} from "../../../store/global/global.actions";
import {loginFormSubmitSuccess} from "../../../store/login/login.action";

type resetType = {
  fb: FormGroup,
  isAuth?: boolean
  onReset?: ()=> void
}
@Injectable({ providedIn: 'root' })
export class resetFormHelper {
  constructor(private actions$:Actions){}
  reset({fb, isAuth, onReset}:resetType){
    this.actions$.pipe(
      ofType(isAuth ? loginFormSubmitSuccess : formSubmitSuccess),
      take(1)
    ).subscribe(()=>{
      fb.reset()
      if (onReset) {
        onReset()
      }
    })
  }
}
