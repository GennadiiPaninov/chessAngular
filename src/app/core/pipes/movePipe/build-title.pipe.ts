import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buildTitle',
  standalone: true,
  pure: true,
})
export class BuildTitlePipe implements PipeTransform {
  transform(title: string, pieces: string[]): string {
    console.log(title);
    const icons = {
      wP: '♟',
      wN: '♘',
      wB: '♗',
      wR: '♖',
      wQ: '♕',
      wK: '♔',
      bP: '♟',
      bN: '♞',
      bB: '♝',
      bR: '♜',
      bQ: '♛',
      bK: '♚',
    } as const;

    type PieceKey = keyof typeof icons;

    const res = title.split(':').map((el, ind) => {
      const color = ind === 0 ? 'w' : 'b';
      const pieceCode = color + pieces[ind];
      const icon = icons[pieceCode as PieceKey] ?? '?';
      return ind === 0 ? `${icon}${el.trim()}` : `${el.trim()}${icon}`;
    });

    return res.join(' : ');
  }
}
