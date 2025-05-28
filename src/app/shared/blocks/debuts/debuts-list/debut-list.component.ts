import {Component, inject} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {debutInterface} from "../../../../core/models/debut-models/debut-models";
import {ModalComponent} from "../../../components/modals/common-modal/modal.component";
import {CreateDebutModalComponent} from "../../../components/modals/create-debut-modal/create-debut-modal.component";
import {selectDebuts} from "../../../../store/debuts/debuts.selector";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-debut-list',
  standalone: true,
  imports: [
    NgForOf,
    ModalComponent,
    NgIf,
    CreateDebutModalComponent,
    AsyncPipe
  ],
  templateUrl: './debut-list.component.html',
  styleUrl: './debut-list.component.scss'
})

export class DebutListComponent {
  selectedDebut: debutInterface | null = null
  private store = inject(Store)
  debuts$ = this.store.select(selectDebuts)
  showCreateModal: boolean = false
  // debuts: debutInterface[] = [
  //   {id: "1231", title:"Каро кан", desc: "ОПисаниеееав ыфвыв ыфв  фывыфв ы вы в ыв ы в ыв ы вы фв",side:"White", createdAt: new Date(), ownerId: "sdsadsadsd"},
  //   {id: "12312", title:"Мадин", desc: "ОПисаниеееав ыфвыв ыфв  фывыфв ы вы в ыв ы в ыв ы вы фв",side:"Black", createdAt: new Date(), ownerId: "sdsadsadsd"},
  //   {id: "12313", title:"Садин кан", desc: "ОПисаниеееав ыфвыв ыфв  фывыфв ы вы в ыв ы в ыв ы вы фв",side:"Black", createdAt: new Date(), ownerId: "sdsadsadsd"},
  //   {id: "12314", title:"Тудин ан", desc: "ОПисаниеееав ыфвыв ыфв  фывыфв ы вы в ыв ы в ыв ы вы фв",side:"White", createdAt: new Date(), ownerId: "sdsadsadsd"},
  //   {id: "12315", title:"Падинкан", desc: "ОПисаниеееав ыфвыв ыфв  фывыфв ы вы в ыв ы в ыв ы вы фв",side:"White", createdAt: new Date(), ownerId: "sdsadsadsd"},
  // ]

  trackById(index: number, item: debutInterface) {
    return item.id
  }

  openCreateDebutModal(){
    this.showCreateModal = true
  }
  openModal(debut: debutInterface) {
    this.selectedDebut = debut
  }

  closeModal() {
    this.selectedDebut = null
  }
  closeCreateModal() {
    this.showCreateModal = false
  }
}
