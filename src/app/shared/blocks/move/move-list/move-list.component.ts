import {Component, inject, OnInit} from '@angular/core';
import {MoveStore} from "../../../../store/move/moveStore";
import {ActivatedRoute} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {BoardModalComponent} from "../../../components/modals/board-modal/board-modal.component";
import {moveInterface} from "../../../../core/models/move-models/move-models";
import {ButtonComponent} from "../../../components/button/button.component";
import {TrimDescPipe} from "../../../../core/pipes/movePipe/trim-desc.pipe";
import {BuildTitlePipe} from "../../../../core/pipes/movePipe/build-title.pipe";
import {CreateMoveFormComponent} from "../../forms/create-move-form/create-move-form.component";
import {ChessBoardComponent} from "../../../components/chess-board/chess-board.component";

@Component({
  selector: 'app-move-list',
  standalone: true,
  imports: [BuildTitlePipe, NgIf, BoardModalComponent, MoveListComponent, ButtonComponent, TrimDescPipe, NgForOf, CreateMoveFormComponent, ChessBoardComponent],
  templateUrl: './move-list.component.html',
  styleUrl: './move-list.component.scss'
})
export class MoveListComponent implements OnInit{
  moveStore = inject(MoveStore)
  showModal = this.moveStore.showModal
  modalFen = this.moveStore.modalFen
  modalLastFens = this.moveStore.lastTwoFens
  orientation = this.moveStore.orientation
  route = inject(ActivatedRoute)
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    if(id){
      this.moveStore.load(id)
    }
  }
  trackById(index: number, item: moveInterface) {
    return item.id
  }
}
