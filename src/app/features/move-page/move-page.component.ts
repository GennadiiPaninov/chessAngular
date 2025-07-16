import {Component } from '@angular/core';
import {MoveListComponent} from "@shared/blocks/move/move-list/move-list.component";

@Component({
  selector: 'app-move-page',
  standalone: true,
  imports: [
    MoveListComponent
  ],
  templateUrl: './move-page.component.html',
  styleUrl: './move-page.component.scss'
})
export class MovePageComponent {

}
