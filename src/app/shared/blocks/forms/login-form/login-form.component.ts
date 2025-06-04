import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {passwordValidator} from "../../../../core/helpers/passwordValidator";
import {InputComponent} from "../../../components/input/input.component";
import {ButtonComponent} from "../../../components/button/button.component";
import {NgIf} from "@angular/common";
import {FieldComponent} from "../../../components/field/field.component";
import {LoginStore} from "../../../../store/login/loginStore";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, ButtonComponent, NgIf, FieldComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  private fb = inject(FormBuilder)
  private loginStore = inject(LoginStore)
  loginForm!: FormGroup;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), passwordValidator()]],

    });
  }


  submit() {
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.value

      this.loginStore.login(email, password, ()=>this.loginForm.reset())
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
