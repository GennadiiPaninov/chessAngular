import {Component, inject, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {DebutStore} from "../../../../store/debut/debutStore";
import {ActivatedRoute} from "@angular/router";
import {ModalComponent} from "../../../components/modals/common-modal/modal.component";
import {CreateFirstMoveFormComponent} from "../../forms/create-first-move-form/create-first-move-form.component";

@Component({
  selector: 'app-first-move-list',
  standalone: true,
  imports: [
    NgIf,
    ModalComponent,
    CreateFirstMoveFormComponent
  ],
  templateUrl: './first-move-list.component.html',
  styleUrl: './first-move-list.component.css'
})
export class FirstMoveListComponent implements OnInit{
  debutStore = inject(DebutStore)
  moves = this.debutStore.debut
  showModal = this.debutStore.showModal
  route = inject(ActivatedRoute)
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    if(id){
      this.debutStore.load(id)
    }
  }
  // openModal(){
  //   this.
  // }

}
