import {Component} from '@angular/core';
import { ButtonComponent } from "../../shared/components/button/button.component";
import {LoginFormComponent} from "../../shared/blocks/forms/login-form/login-form.component";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ButtonComponent, LoginFormComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

}
