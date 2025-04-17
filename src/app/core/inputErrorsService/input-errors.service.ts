import {Injectable} from "@angular/core";
import {AbstractControl, ValidationErrors} from "@angular/forms";
import {ERROR_MESSAGES} from "./input-errors";

/**
 * Сервис для обработки и отображения ошибок валидации для input.
 * Преобразует ошибки валидации в читаемые сообщения, использует объект с ошибками.
 */
@Injectable({providedIn: "root"})
export class InputErrorsService {
  /**
   * Получает сообщение об ошибке для указанного контрола формы.
   * @param control Контрол формы, для которого нужно получить сообщение об ошибке.
   * @returns Сообщение об ошибке или null, если ошибок нет или контрол не тронут.
   */
  public getError(control:AbstractControl | null): string | null {

    if(!control || !control.touched || !control.errors) return null

    const errors: ValidationErrors = control.errors
    const formGroup = control.parent

    for(let key in errors){
      const messageFn = ERROR_MESSAGES[key]
      if(messageFn) return messageFn(errors[key])
    }

    if (formGroup?.errors?.['passwordsMismatch'] && control === formGroup.get('passwordConfirm')) {
      console.log("Ошибка,пароли не совпадают")
      return 'Пароли не совпадают';
    }

    return "Неверное значение"

  }
}
