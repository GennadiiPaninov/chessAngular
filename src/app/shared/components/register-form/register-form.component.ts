import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from '@angular/common';

import {InputComponent} from "../input/input.component";
import {ButtonComponent} from "../button/button.component";
import {FieldComponent} from "../field/field.component";
import {matchPasswordsValidator} from "../../../core/helpers/matchPasswordsValidator";
import {passwordValidator} from "../../../core/helpers/passwordValidator";
import {AuthService} from "../../../core/services/auth/auth.service";

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, ButtonComponent, NgIf, FieldComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  registerForm!: FormGroup;
  isSend: boolean = false

  constructor(private fb: FormBuilder, private auth: AuthService) {
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
      this.auth.register(email, password).subscribe({
        next: (res) => {
          this.isSend = true
          console.log(res.message)
        },
        error: err => console.log(err.error?.message)
      })
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
