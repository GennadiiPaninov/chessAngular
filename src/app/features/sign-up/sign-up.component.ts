import { Component } from '@angular/core';
import {RegisterFormComponent} from "../../shared/components/register-form/register-form.component";

@Component({
  selector: 'app-sign-up',
  standalone: true,
    imports: [
        RegisterFormComponent
    ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

}
