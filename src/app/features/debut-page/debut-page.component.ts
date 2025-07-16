import { Component } from '@angular/core';
import { FirstMoveListComponent } from '@shared/blocks/debut/first-move-list/first-move-list.component';

@Component({
  selector: 'app-debut-page',
  standalone: true,
  imports: [FirstMoveListComponent],
  templateUrl: './debut-page.component.html',
  styleUrl: './debut-page.component.scss',
})
export class DebutPageComponent {}
