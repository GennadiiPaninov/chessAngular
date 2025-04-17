import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Функция для отображения ошибоки в случае если пароль и  пароль для подтверждения не совпадают.
 * В случае если value у паролей разное, мы добавляем в объект ошибок ошибку, в ином случае удаляем.
 */
export function matchPasswordsValidator(passwordKey: string, confirmKey: string): ValidatorFn {
  /**
   * Получает formControlName паролей
   * @returns ValidatorFn с картой проверки ошибок.
   */
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get(passwordKey)
    const confirm = group.get(confirmKey)

    if (!password || !confirm) return null

    const mismatch = password.value !== confirm.value

    if (mismatch) {
      confirm.setErrors({ ...confirm.errors, passwordsMismatch: true })
    } else {
      if (confirm.errors) {
        delete confirm.errors['passwordsMismatch']
        if (Object.keys(confirm.errors).length === 0) {
          confirm.setErrors(null)
        } else {
          confirm.setErrors(confirm.errors)
        }
      }
    }

    return null
  }
}
