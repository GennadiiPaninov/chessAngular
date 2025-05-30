import {AfterViewInit, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {debutInterface} from "../../../../core/models/debut-models/debut-models";
import {ModalComponent} from "../../../components/modals/common-modal/modal.component";
import {selectDebuts} from "../../../../store/debuts/debuts.selector";
import {Store} from "@ngrx/store";
import {ButtonComponent} from "../../../components/button/button.component";
import {CreateDebutFormComponent} from "../../forms/create-debut-form/create-debut-form.component";
import {deleteDebut, initDebuts} from "../../../../store/debuts/debuts.actions";
import {UpdateDebutFormComponent} from "../../forms/update-debut-form/update-debut-form.component";

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
  selectedDebut: debutInterface | null = null
  private store = inject(Store)
  debuts$ = this.store.select(selectDebuts)
  showCreateModal: boolean = false
  showDeleteModal: boolean = false
  showUpdateModal: boolean = false
  deleteDebutId: string | null = null
  updateDebutVal: debutInterface = {} as debutInterface
  ngOnInit() {
    setTimeout(()=>{
      this.store.dispatch(initDebuts({}))
    }, 0)
  }

  debuts: debutInterface[] = [
    {id: "1231", title:"Каро кан", desc: "ОПисаниеееав ыфвыв ыфв  фывыфв ы вы в ыв ы в ыв ы вы фв",side:"White", createdAt: new Date(), ownerId: "sdsadsadsd"},
    {id: "12312", title:"Мадин", desc: "ОПисаниеееав ыфвыв ыфв  фывыфв ы вы в ыв ы в ыв ы вы фв",side:"Black", createdAt: new Date(), ownerId: "sdsadsadsd"},
    {id: "12313", title:"Садин кан", desc: "ОПисаниеееав ыфвыв ыфв  фывыфв ы вы в ыв ы в ыв ы вы фв",side:"Black", createdAt: new Date(), ownerId: "sdsadsadsd"},
    {id: "12314", title:"Тудин ан", desc: "ОПисаниеееав ыфвыв ыфв  фывыфв ы вы в ыв ы в ыв ы вы фв",side:"White", createdAt: new Date(), ownerId: "sdsadsadsd"},
    {id: "12315", title:"Падинкан", desc: "ОПисаниеееав ыфвыв ыфв  фывыфв ы вы в ыв ы в ыв ы вы фв",side:"White", createdAt: new Date(), ownerId: "sdsadsadsd"},
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
  openDeleteModal(id: string){
    this.deleteDebutId = id
    this.showDeleteModal = true
  }
  closeDeleteModal(){
    this.showDeleteModal = false
    this.deleteDebutId = null
  }
  deleteDebut(){
    this.store.dispatch(deleteDebut({id: this.deleteDebutId as string}))
  }
  openUpdateModal(debut: debutInterface){
    this.showUpdateModal = true
    this.updateDebutVal = debut
  }
  closeUpdateModal(){
    this.showUpdateModal = false
    this.updateDebutVal = {} as debutInterface
  }

}
