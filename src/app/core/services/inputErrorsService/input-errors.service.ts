import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ERROR_MESSAGES } from './input-errors';

/**
 * Сервис для обработки и отображения ошибок валидации для input.
 * Преобразует ошибки валидации в читаемые сообщения, использует объект с ошибками.
 */
@Injectable({ providedIn: 'root' })
export class InputErrorsService {
  /**
   * Получает сообщение об ошибке для указанного контрола формы.
   * @param control Контрол формы, для которого нужно получить сообщение об ошибке.
   * @returns Сообщение об ошибке или Неверное значение, если ошибока не зарегистрированна в объекте обшибок.
   */
  public getError(control: AbstractControl | null): string | null {
    if (!control || !control.errors) return null;

    const errors: ValidationErrors = control.errors;

    for (let key in errors) {
      const messageFn = ERROR_MESSAGES[key];
      if (messageFn) return messageFn(errors[key]);
    }

    return 'Неверное значение';
  }
}
