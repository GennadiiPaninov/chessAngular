import { Component } from '@angular/core';
import {DebutListComponent} from "../../shared/blocks/debuts/debuts-list/debut-list.component";

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
