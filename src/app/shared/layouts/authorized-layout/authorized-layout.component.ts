import { Component } from '@angular/core';
import {HeaderComponent} from "../../blocks/header/header.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-authorized-layout',
  standalone: true,
    imports: [
        HeaderComponent,
      RouterOutlet
    ],
  templateUrl: './authorized-layout.component.html',
  styleUrl: './authorized-layout.component.scss'
})
export class AuthorizedLayoutComponent {

}
