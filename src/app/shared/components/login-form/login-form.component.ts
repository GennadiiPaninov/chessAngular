import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {passwordValidator} from "../../../core/helpers/passwordValidator";
import {InputComponent} from "../input/input.component";
import {ButtonComponent} from "../button/button.component";
import {NgIf} from "@angular/common";
import {FieldComponent} from "../field/field.component";
import {AuthService} from "../../../core/services/auth/auth.service";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, ButtonComponent, NgIf, FieldComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), passwordValidator()]],

    });
  }


  submit() {
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.value
      this.auth.login(email,password).subscribe({
        next: res=>{

        },
        error: err=>{
          console.log(err.error.message)
        }
      })
      console.log('✅ Register Data:', this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
