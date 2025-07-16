import {computed, inject, Injectable, signal} from "@angular/core";
import {
  createDebut,
  debutInterface,
  modal,
  updateDebutType
} from "@core/models/debut-models/debut-models";
import {GlobalStore} from "../global/globalStore";
import {DebutsHttpService} from "@core/services/debuts/debuts-http.service";
import {firstValueFrom} from "rxjs";
import {handleHttpError} from "@core/helpers/handle-http-errors";
import {showModalType} from "@core/models/common-models/modal-models";

@Injectable({providedIn: 'any'})
export class DebutsStore {
  private debuts = signal<debutInterface[]>([])
  private selected = signal<debutInterface>({} as debutInterface)
  private showModal = signal<showModalType>({
    createModal: false,
    deleteModal: false,
    updateModal: false,
    debutModal: false
  })
  private debutsReceived = signal<boolean>(true)
  private global = inject(GlobalStore)
  private service = inject(DebutsHttpService)

  readonly debutsList = computed(()=>this.debuts())
  readonly selectedDebut = computed(()=> this.selected())
  readonly showCreateModal = computed(()=> this.showModal().createModal)
  readonly showDebutModal = computed(()=> this.showModal().debutModal)
  readonly showUpdateModal = computed(()=> this.showModal().updateModal)
  readonly showDeleteModal = computed(()=> this.showModal().deleteModal)
  readonly hasAllDebutsArrived = computed(()=> this.debutsReceived())

  async loadDebuts(my?: boolean, title?: string){
    this.global.toggleLoader(true)
    try {
      const result = await firstValueFrom(this.service.findAll(my, title))
      this.debuts.set(result as debutInterface[])
      this.debutsReceived.set(!my)
    } catch (err: unknown){
      handleHttpError(this.global, err, 'Не удалось загрузить дебюты')
    } finally {
      this.global.toggleLoader(false)
    }
  }
  async createDebut(debut: createDebut, callback: ()=>void){
    this.global.toggleLoader(true)
    try{
      const result = await firstValueFrom(this.service.createDebut(debut))
      callback()
      this.closeModal()
      this.debuts.update(debuts=>[...debuts, {...result, isMine: true} as debutInterface])
      this.global.createNotification('Дебют успешно создан')
    } catch (err:unknown){
      handleHttpError(this.global, err, 'Не удалось создать дебюты')
    } finally {
      this.global.toggleLoader(false)
    }
  }
  async updateDebut(debutData: updateDebutType, callback: ()=>void){
    this.global.toggleLoader(true)
    try {
      await firstValueFrom(this.service.updateDebut(debutData))
      this.debuts.update(debuts => debuts.map(item => item.id === debutData.id ? { ...item, title: debutData.title, desc: debutData.desc } : item))
      this.global.createNotification('Дебют успешно обновлен')
      this.closeModal()
    }catch (err:unknown){
      handleHttpError(this.global, err, 'Не удалось обновить дебют')
    } finally {
      this.global.toggleLoader(false)
    }
  }

  async deleteDebut(){
    this.global.toggleLoader(true)
    try {
      await firstValueFrom(this.service.deleteDebut(this.selectedDebut().id))
      this.debuts.update(debuts => debuts.filter(item => item.id !== this.selectedDebut().id))
      this.global.createNotification('Дебют успешно удален')
      this.closeModal()
    } catch (err: unknown){
      handleHttpError(this.global, err, 'Не удалось удалить дебют')
    } finally {
      this.global.toggleLoader(false)
    }
  }
  select(debut: debutInterface){
    this.selected.set(debut)
  }
  openModal(modal: modal, debut?: debutInterface){

    this.showModal.update(modals => ({ ...modals, [modal]: true }))
    if(debut) this.selected.set(debut)
  }
  closeModal(){
    this.showModal.update(modals => {
      const updatedModals = { ...modals };
      (Object.keys(updatedModals) as Array<keyof showModalType>).forEach(key => {
        updatedModals[key] = false
      })
      return updatedModals
    })
    this.selected.set({} as debutInterface)
  }
}
