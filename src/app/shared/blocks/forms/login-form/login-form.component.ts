import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {passwordValidator} from "../../../../core/helpers/passwordValidator";
import {InputComponent} from "../../../components/input/input.component";
import {ButtonComponent} from "../../../components/button/button.component";
import {NgIf} from "@angular/common";
import {FieldComponent} from "../../../components/field/field.component";
import {AuthService} from "../../../../core/services/auth/auth.service";
import {Store} from "@ngrx/store";
import {loginAction} from "../../../../store/login/login.action";
import {resetFormHelper} from "../../../../core/helpers/resetFormHelper/resetFormHelper";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, ButtonComponent, NgIf, FieldComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private store: Store, private resetFormHelper: resetFormHelper) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), passwordValidator()]],

    });
  }


  submit() {
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.value
      this.store.dispatch(loginAction({email, password}))
      this.resetFormHelper.reset({fb: this.loginForm, isAuth:true})


    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
