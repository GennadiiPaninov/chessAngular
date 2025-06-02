import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {debutInterface, modal} from "../../../../core/models/debut-models/debut-models";
import {ModalComponent} from "../../../components/modals/common-modal/modal.component";
import {ButtonComponent} from "../../../components/button/button.component";
import {CreateDebutFormComponent} from "../../forms/create-debut-form/create-debut-form.component";
import {UpdateDebutFormComponent} from "../../forms/update-debut-form/update-debut-form.component";
import {DebutsStore} from "../../../../store/debuts/debutsStore";

@Component({
  selector: 'app-debut-list',
  standalone: true,
  imports: [
    NgForOf,
    ModalComponent,
    NgIf,
    AsyncPipe,
    ButtonComponent,
    CreateDebutFormComponent,
    UpdateDebutFormComponent
  ],
  templateUrl: './debut-list.component.html',
  styleUrl: './debut-list.component.scss'
})

export class DebutListComponent implements OnInit{
  debutsStore = inject(DebutsStore)

  debuts = this.debutsStore.debutsList
  showCreateModal = this.debutsStore.showCreateModal
  showDebutModal = this.debutsStore.showDebutModal
  showDeleteModal = this.debutsStore.showDeleteModal
  showUpdateModal = this.debutsStore.showUpdateModal
  selectedDebut = this.debutsStore.selectedDebut



  ngOnInit(): void {
    this.debutsStore.loadDebuts()
    // setTimeout(()=>{
    //   this.store.dispatch(initDebuts({}))
    // }, 0)
  }

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
  openModal(modal: modal, debut?: debutInterface){
    this.debutsStore.openModal(modal, debut)
  }
  closeModal(){
    this.debutsStore.closeModal()
  }

  // openCreateDebutModal(){
  //   this.showCreateModal = true
  // }
  // openModal(debut: debutInterface) {
  //   this.selectedDebut = debut
  // }
  //
  // closeModal() {
  //   this.selectedDebut = null
  // }
  // closeCreateModal() {
  //   this.showCreateModal = false
  // }
  // openDeleteModal(id: string){
  //   this.deleteDebutId = id
  //   this.showDeleteModal = true
  // }
  // closeDeleteModal(){
  //   this.showDeleteModal = false
  //   this.deleteDebutId = null
  // }
  // deleteDebut(){
  //   // this.store.dispatch(deleteDebut({id: this.deleteDebutId as string}))
  // }
  // openUpdateModal(debut: debutInterface){
  //   this.showUpdateModal = true
  //   this.updateDebutVal = debut
  // }
  // closeUpdateModal(){
  //   this.showUpdateModal = false
  //   this.updateDebutVal = {} as debutInterface
  // }


}
