import Chessground from 'chessground'
import { Chess } from 'chess.js'
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy, signal,
  ViewChild,
} from '@angular/core'
import {NgForOf} from "@angular/common";
import {themeType} from "../../../core/models/common-models/board-model";

@Component({
  selector: 'app-chess-board',
  standalone: true,
  templateUrl: './chess-board.component.html',
  styleUrl: './chess-board.component.scss',
  imports: [
    NgForOf
  ]
})

export class ChessBoardComponent implements AfterViewInit, OnDestroy {
  @ViewChild('board', { static: true }) boardRef!: ElementRef<HTMLDivElement>
  @Input() fen: string = 'start'
  @Input() orientation: string = 'white'
  private theme = signal<themeType>('marble')

  @Input() set boardTheme(val: themeType) {
    this.theme.set(val)
  }
  private board!: any
  private chess = new Chess()

  ngAfterViewInit(): void {
    this.initBoard()
  }

  ngOnDestroy(): void {
    this.board?.destroy()
  }
  private updateBoardTheme(): void {
    console.log(this.theme())
    const classList = this.boardRef.nativeElement.classList;
    classList.remove('blue', 'wood', 'marble', 'light-wood-3d')
    classList.add(this.theme())
  }
  private initBoard(): void {
    this.board = Chessground(this.boardRef.nativeElement, {
      orientation: this.orientation,
      fen: this.fen,
      movable: {
        free: false,
        color: 'white',
        dests: this.computeDests(),
      },
    })
    this.updateBoardTheme()
  }

  private getAllSquares(): string[] {
    const files = 'abcdefgh'
    const ranks = '12345678'
    return [...files].flatMap((f) => [...ranks].map((r) => `${f}${r}`))
  }

  private computeDests(): Map<string, string[]> {
    const dests = new Map<string, string[]>()

    const fenToUse = this.fen === 'start'
      ? 'rn1qkbnr/ppp2ppp/4p3/3p4/3P4/2N1PN2/PPP2PPP/R1BQKB1R w KQkq - 0 1'
      : this.fen

    try {
      this.chess.load(fenToUse)
    } catch (err) {
      console.error('Invalid FEN provided:', this.fen)
      return dests
    }

    for (const square of this.getAllSquares()) {
      const moves = this.chess.moves({ square: square as any, verbose: true }) as { to: string }[]
      if (moves.length) {
        dests.set(square, moves.map(m => m.to))
      }
    }

    return dests
  }

  public setPosition(fen: string): void {
    this.fen = fen
    this.chess.load(fen)
    this.board.set({ fen, movable: { dests: this.computeDests() } })
  }
}
