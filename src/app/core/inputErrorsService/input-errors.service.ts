import {Injectable} from "@angular/core";
import {AbstractControl, ValidationErrors} from "@angular/forms";
import {ERROR_MESSAGES} from "./input-errors";

@Injectable({providedIn: "root"})
export class InputErrorsService {
  public getError(control:AbstractControl | null): string | null {

    if(!control || !control.touched || !control.errors) return null

    const errors: ValidationErrors = control.errors
    for(let key in errors){
      const messageFn = ERROR_MESSAGES[key]
      if(messageFn) return messageFn(errors[key])
    }
    return "Неверное значение"

  }
}
