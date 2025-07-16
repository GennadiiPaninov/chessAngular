import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordValue = control.value;

    if (!passwordValue) return null;

    const hasNumber = /\d/.test(passwordValue);
    const hasUpperCase = /[A-Z]/.test(passwordValue);
    const hasLowerCase = /[a-z]/.test(passwordValue);
    if (!hasNumber) {
      return {
        number: true,
      };
    }
    if (!hasUpperCase) {
      return {
        capitalLetter: true,
      };
    }
    if (!hasLowerCase) {
      return {
        smallLetter: true,
      };
    }
    return null;
  };
};
