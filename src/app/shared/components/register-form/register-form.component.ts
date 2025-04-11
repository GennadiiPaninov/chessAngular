import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

import {InputComponent} from "../input/input.component";
import {ButtonComponent} from "../button/button.component";

@Component({
  selector: 'app-register-form',
  standalone: true,
    imports: [InputComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]]
    });
  }


  submit() {
    if (this.registerForm.valid) {
      console.log('✅ Login Data:', this.registerForm.value)
    } else {

    }
  }
}
