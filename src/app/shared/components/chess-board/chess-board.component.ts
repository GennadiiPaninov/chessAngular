import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  signal,
} from '@angular/core';
import { themeType } from "../../../core/models/common-models/board-model";
import Chessground from 'chessground';
import { Chess } from 'chess.js';

@Component({
  selector: 'app-chess-board',
  standalone: true,
  templateUrl: './chess-board.component.html',
  styleUrl: './chess-board.component.scss',
  imports: []
})
export class ChessBoardComponent implements AfterViewInit, OnDestroy, OnChanges {
  @ViewChild('board', { static: true }) boardRef!: ElementRef<HTMLDivElement>
  @Input() fen: string = 'start'
  @Input() orientation: string = 'white'
  @Input() lastTwoFens: string[] =[]
  private theme = signal<themeType>('marble')

  @Input() set boardTheme(val: themeType) {
    this.theme.set(val)
  }

  private board!: any
  private chess = new Chess()

  ngAfterViewInit(): void {
    this.initBoard()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fen'] && !changes['fen'].firstChange) {
      this.setPosition(this.fen)
    }
    if (changes['lastTwoFens'] && this.lastTwoFens) {
      console.log(this.lastTwoFens, "in board")
      this.highlightLastMove(this.lastTwoFens)
    }
  }

  ngOnDestroy(): void {
    if (this.board?.destroy) {
      this.board.destroy()
    }
  }

  private updateBoardTheme(): void {
    const classList = this.boardRef.nativeElement.classList
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

      highlight : {
        lastMove : true,
      }
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
      this.chess.load(fenToUse);
    } catch (err) {
      console.error('Invalid FEN provided:', this.fen)
      return dests
    }

    for (const square of this.getAllSquares()) {
      const moves = this.chess.moves({ square: square as any, verbose: true }) as { to: string }[];
      if (moves.length) {
        dests.set(square, moves.map(m => m.to))
      }
    }

    return dests
  }

  public setPosition(fen: string): void {
    try {
      this.chess.load(fen)
      this.board?.set({
        fen: fen,
        movable: { dests: this.computeDests() },
      });
    } catch (err) {
      console.warn('Could not set new FEN:', fen, err)
    }
  }
  public highlightLastMove(fens: string[]): void {
    try {
      if (fens.length < 2) return

      const prev = new Chess(fens[fens.length - 2])
      const next = new Chess(fens[fens.length - 1])

      const prevBoard = prev.board()
      const nextBoard = next.board()

      let from = ''
      let to = ''

      for (let rank = 0; rank < 8; rank++) {
        for (let file = 0; file < 8; file++) {
          const prevPiece = prevBoard[rank][file]
          const nextPiece = nextBoard[rank][file]

          const fileChar = String.fromCharCode('a'.charCodeAt(0) + file)
          const rankChar = `${8 - rank}`
          const square = `${fileChar}${rankChar}`

          if (!prevPiece && nextPiece) {
            to = square
          } else if (prevPiece && !nextPiece) {
            from = square
          }
        }
      }

      if (from && to) {
        this.board?.set({
          lastMove: [from, to],
        })
      }

    } catch (err) {
      console.error('Ошибка при подсветке последнего хода:', err)
    }
  }

}
