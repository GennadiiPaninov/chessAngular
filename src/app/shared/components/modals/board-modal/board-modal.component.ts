import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ChessBoardComponent} from "../../chess-board/chess-board.component";

@Component({
  selector: 'app-board-modal',

  standalone: true,
  imports: [
    ChessBoardComponent
  ],
  templateUrl: './board-modal.component.html',
  styleUrl: './board-modal.component.scss'
})
export class BoardModalComponent {
  @Input() data: any
  @Output() close = new EventEmitter<void>()
  @Input() modalFen:string = 'start'
  @Input() lastTwoFens:string[] = []

  onClose() {
    this.close.emit()
  }
}
