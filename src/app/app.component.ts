import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SignInComponent} from "./features/sign-in/sign-in.component";
import {ButtonComponent} from "./shared/components/button/button.component";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, SignInComponent, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'chessAppAng';
}
