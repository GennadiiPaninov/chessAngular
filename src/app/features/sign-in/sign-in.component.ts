import {Component} from '@angular/core';
import { ButtonComponent } from "../../shared/components/button/button.component";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  conso1(){
    console.log("1")
  }
  conso2(){
    console.log("2")
  }

}
