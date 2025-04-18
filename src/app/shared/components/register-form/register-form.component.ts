import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { NgIf} from '@angular/common';

import {InputComponent} from "../input/input.component";
import {ButtonComponent} from "../button/button.component";
import {FieldComponent} from "../field/field.component";
import {matchPasswordsValidator} from "../../../core/helpers/matchPasswordsValidator";
import {passwordValidator} from "../../../core/helpers/passwordValidator";

@Component({
  selector: 'app-register-form',
  standalone: true,
    imports: [InputComponent, ReactiveFormsModule, ButtonComponent, NgIf, FieldComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), passwordValidator()]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(8)]]
    },{
      validators: matchPasswordsValidator('password', 'passwordConfirm')
    });
  }


  submit() {
    if (this.registerForm.valid) {

      console.log('✅ Register Data:', this.registerForm.value);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
