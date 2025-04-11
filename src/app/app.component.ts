import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SignInComponent} from "./features/sign-in/sign-in.component";
import {ButtonComponent} from "./shared/components/button/button.component";
import {RegisterFormComponent} from "./shared/components/register-form/register-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, SignInComponent, ButtonComponent, RegisterFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'chessAppAng';
}
