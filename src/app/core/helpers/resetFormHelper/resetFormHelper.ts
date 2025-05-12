import {Injectable} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {Actions, ofType} from "@ngrx/effects";
import {take} from "rxjs";
import {formSubmitSuccess} from "../../../store/global/global.actions";

@Injectable({ providedIn: 'root' })
export class resetFormHelper {
  constructor(private actions$:Actions){}
  reset(fb: FormGroup){
    this.actions$.pipe(
      ofType(formSubmitSuccess),
      take(1)
    ).subscribe(()=>{
      fb.reset()
    })
  }
}
