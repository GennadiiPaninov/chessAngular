import {Injectable} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {Actions, ofType} from "@ngrx/effects";
import {registerSuccessAction} from "../../../store/register/register.actions";
import {take} from "rxjs";

@Injectable({ providedIn: 'root' })
export class resetFormHelper {
  constructor(private actions$:Actions){}
  reset(fb: FormGroup){
    this.actions$.pipe(
      ofType(registerSuccessAction),
      take(1)
    ).subscribe(()=>{
      fb.reset()
    })
  }
}
