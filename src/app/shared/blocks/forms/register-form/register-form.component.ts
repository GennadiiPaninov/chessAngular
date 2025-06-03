import {Component, inject,} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from '@angular/common';

import {InputComponent} from "../../../components/input/input.component";
import {ButtonComponent} from "../../../components/button/button.component";
import {FieldComponent} from "../../../components/field/field.component";
import {matchPasswordsValidator} from "../../../../core/helpers/matchPasswordsValidator";
import {passwordValidator} from "../../../../core/helpers/passwordValidator";
import {LoaderComponent} from "../../../components/loader/loader.component";
import {RegisterStore} from "../../../../store/register/registerStore";

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, ButtonComponent, NgIf, FieldComponent, LoaderComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  private registerStore = inject(RegisterStore)
  private fb = inject(FormBuilder)
  registerForm!: FormGroup

  constructor() {
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
      this.registerStore.register(email, password).then(()=>{
        this.registerForm.reset()
      })
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
