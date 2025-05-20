import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {debutInterface} from "../../../../core/models/debut-models/debut-models";
import {ModalComponent} from "../../modals/common-modal/modal.component";
import {CreateDebutModalComponent} from "../../modals/create-debut-modal/create-debut-modal.component";

@Component({
  selector: 'app-debut-list',
  standalone: true,
  imports: [
    NgForOf,
    ModalComponent,
    NgIf,
    CreateDebutModalComponent
  ],
  templateUrl: './debut-list.component.html',
  styleUrl: './debut-list.component.scss'
})

export class DebutListComponent {
  selectedDebut: debutInterface | null = null
  showCreateModal: boolean = false
  debuts: debutInterface[] = [
    {id: "1231", title:"Каро кан", desc: "ОПисаниеееав ыфвыв ыфв  фывыфв ы вы в ыв ы в ыв ы вы фв",side:"White",},
    {id: "12312", title:"Мадин", desc: "ОПисаниеееав ыфвыв ыфв  фывыфв ы вы в ыв ы в ыв ы вы фв",side:"Black"},
    {id: "12313", title:"Садин кан", desc: "ОПисаниеееав ыфвыв ыфв  фывыфв ы вы в ыв ы в ыв ы вы фв",side:"Black"},
    {id: "12314", title:"Тудин ан", desc: "ОПисаниеееав ыфвыв ыфв  фывыфв ы вы в ыв ы в ыв ы вы фв",side:"White"},
    {id: "12315", title:"Падинкан", desc: "ОПисаниеееав ыфвыв ыфв  фывыфв ы вы в ыв ы в ыв ы вы фв",side:"White"},
  ]
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
