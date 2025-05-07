import {Component} from '@angular/core';
import {FormBuilder,  FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from '@angular/common';
import { Store } from '@ngrx/store';

import {InputComponent} from "../input/input.component";
import {ButtonComponent} from "../button/button.component";
import {FieldComponent} from "../field/field.component";
import {matchPasswordsValidator} from "../../../core/helpers/matchPasswordsValidator";
import {passwordValidator} from "../../../core/helpers/passwordValidator";
import {AuthService} from "../../../core/services/auth/auth.service";
import {LoaderComponent} from "../loader/loader.component";
import {RegisterState} from "../../../store/register/register.reducer";
import {selectLoading} from "../../../store/register/register.selector";

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, ButtonComponent, NgIf, FieldComponent, LoaderComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  registerForm!: FormGroup;
  isSend: boolean = false
  loading:boolean = false
  // isLoading$ = this.store.select(selectLoading)
  constructor(private fb: FormBuilder, private auth: AuthService, private store: Store<{register:RegisterState}>) {
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
      this.loading = true
      const {email, password} = this.registerForm.value

      // this.auth.register(email, password).subscribe({
      //   next: (res) => {
      //     this.isSend = true
      //     console.log(res.message)
      //     this.loading = false
      //   },
      //   error: err => {
      //     this.loading = false
      //     console.log(err.error?.message)
      //   }
      // })
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
