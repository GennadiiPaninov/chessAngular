import {Component, inject, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {DebutStore} from "@store/debut/debutStore";
import {ActivatedRoute} from "@angular/router";
import {ModalComponent} from "@components/modals/common-modal/modal.component";
import {CreateFirstMoveFormComponent} from "../../forms/create-first-move-form/create-first-move-form.component";
import {ChessBoardComponent} from "@components/chess-board/chess-board.component";
import {BoardModalComponent} from "@components/modals/board-modal/board-modal.component";
import {moveInterface} from "@core/models/move-models/move-models";
import {ButtonComponent} from "@components/button/button.component";
import {BuildTitlePipe} from "@core/pipes/movePipe/build-title.pipe";
import {TrimDescPipe} from "@core/pipes/movePipe/trim-desc.pipe";
import {UpdateFirstMoveFormComponent} from "../../forms/update-first-move-form/update-first-move-form.component";

@Component({
  selector: 'app-first-move-list',
  standalone: true,
  imports: [
    NgIf,
    ModalComponent,
    CreateFirstMoveFormComponent,
    ChessBoardComponent,
    BoardModalComponent,
    NgForOf,
    ButtonComponent,
    BuildTitlePipe,
    TrimDescPipe,
    UpdateFirstMoveFormComponent
  ],
  templateUrl: './first-move-list.component.html',
  styleUrl: './first-move-list.component.css'
})
export class FirstMoveListComponent implements OnInit{
  debutStore = inject(DebutStore)
  route = inject(ActivatedRoute)
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    if(id){
      this.debutStore.load(id)
    }
  }
  trackById(index: number, item: moveInterface) {
    return item.id
  }
}
