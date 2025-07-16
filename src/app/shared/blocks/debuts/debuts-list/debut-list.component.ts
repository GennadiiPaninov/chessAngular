import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {debutInterface, modal} from "@core/models/debut-models/debut-models";
import {ModalComponent} from "@components/modals/common-modal/modal.component";
import {ButtonComponent} from "@components/button/button.component";
import {CreateDebutFormComponent} from "../../forms/create-debut-form/create-debut-form.component";
import {UpdateDebutFormComponent} from "../../forms/update-debut-form/update-debut-form.component";
import {DebutsStore} from "@store/debuts/debutsStore";

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
  }

  trackById(index: number, item: debutInterface) {
    return item.id
  }
  openModal(modal: modal, debut?: debutInterface){
    this.debutsStore.openModal(modal, debut)
  }
  closeModal(){

    this.debutsStore.closeModal()
  }
}
