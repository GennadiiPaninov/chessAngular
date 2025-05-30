import {Component, } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from '@angular/common';
import {Store} from '@ngrx/store';

import {InputComponent} from "../../../components/input/input.component";
import {ButtonComponent} from "../../../components/button/button.component";
import {FieldComponent} from "../../../components/field/field.component";
import {matchPasswordsValidator} from "../../../../core/helpers/matchPasswordsValidator";
import {passwordValidator} from "../../../../core/helpers/passwordValidator";
import {LoaderComponent} from "../../../components/loader/loader.component";
import {register} from "../../../../store/register/register.actions";
import {resetFormHelper} from "../../../../core/helpers/resetFormHelper/resetFormHelper";

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, ButtonComponent, NgIf, FieldComponent, LoaderComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store, private resetFormHelper: resetFormHelper) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), passwordValidator()]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(8)]]
    }, {
      validators: matchPasswordsValidator('password', 'passwordConfirm')
    });
  }


  submit() {
    if (this.registerForm.valid) {
      const {email, password} = this.registerForm.value
      this.store.dispatch(register({email, password}))
      this.resetFormHelper.reset({ fb:this.registerForm })
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
