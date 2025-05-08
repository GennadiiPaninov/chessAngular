import {Component} from '@angular/core';
import {FormBuilder,  FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from '@angular/common';
import { Store } from '@ngrx/store';

import {InputComponent} from "../input/input.component";
import {ButtonComponent} from "../button/button.component";
import {FieldComponent} from "../field/field.component";
import {matchPasswordsValidator} from "../../../core/helpers/matchPasswordsValidator";
import {passwordValidator} from "../../../core/helpers/passwordValidator";
import {LoaderComponent} from "../loader/loader.component";
import {register} from "../../../store/register/register.actions";

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, ButtonComponent, NgIf, FieldComponent, LoaderComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  registerForm!: FormGroup;
  constructor(private fb: FormBuilder, private store: Store) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), passwordValidator()]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(8)]]
    }, {
      validators: matchPasswordsValidator('password', 'passwordConfirm')
    });
  }

  message = ''

  submit() {
    if (this.registerForm.valid) {
      const {email, password} = this.registerForm.value
      this.store.dispatch(register({email, password}))
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
