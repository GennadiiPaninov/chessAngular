import {
  Component,
  Input, ViewChild,
} from '@angular/core'
@Component({
  selector: 'app-chess-board',
  imports: [
    // NgxChessBoardModule
  ],
  standalone: true,
  templateUrl: './chess-board.component.html',
  styleUrl: './chess-board.component.scss'
})
export class ChessBoardComponent {

  // @Input() fen: string = 'start';
  // @Input() orientation: 'white' | 'black' = 'white';
  // @Input() boardSize: number = 480;
  //
  // @ViewChild('chessboard', { static: false }) board!: NgxChessBoardComponent;
  //
  // setFen(fen: string) {
  //   this.fen = fen;
  //   this.board?.setFEN(fen);
  // }
  //
  // getFen(): string {
  //   return this.board?.getFEN();
  // }

}
