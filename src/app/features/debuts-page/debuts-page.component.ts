import { Component } from '@angular/core';
import {DebutListComponent} from "../../shared/components/debuts/debut-list/debut-list.component";

@Component({
  selector: 'app-debuts-page',
  standalone: true,
    imports: [
        DebutListComponent
    ],
  templateUrl: './debuts-page.component.html',
  styleUrl: './debuts-page.component.scss'
})
export class DebutsPageComponent {

}
