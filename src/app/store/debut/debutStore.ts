import {computed, inject, Injectable, signal} from "@angular/core";
import {firstValueFrom} from "rxjs";
import {debutInterface, fullDebutInterface} from "../../core/models/debut-models/debut-models";
import {handleHttpError} from "../../core/helpers/handle-http-errors";
import {GlobalStore} from "../global/globalStore";
import {DebutsHttpService} from "../../core/services/debuts/debuts-http.service";
import {showModalType} from "../../core/models/common-models/modal-models";
import {moveInterface} from "../../core/models/move-models/move-models";

@Injectable({providedIn: "any"})
export class DebutStore {
  private global = inject(GlobalStore)
  private service = inject(DebutsHttpService)
  private debutSignal = signal<fullDebutInterface>({} as fullDebutInterface)
  private selected = signal<moveInterface>({} as moveInterface)
  private modalFenSignal = signal<string>('start')
  private showModalSignal = signal<showModalType>({
    createModal: false,
    updateModal: false,
    deleteModal: false
  })
  private lastTwoFensSignal = signal<string[]>([])
  readonly debut = computed(()=> this.debutSignal())
  readonly firstMoves = computed(()=> this.debutSignal().firstMoves)
  readonly showModal = computed(this.showModalSignal)
  readonly isWhite = computed(()=> this.debutSignal().side === 'White')
  readonly orientation = computed(()=>this.debutSignal().side?.toLowerCase())
  readonly modalFen = computed(()=>this.modalFenSignal())
  readonly  lastTwoFens = computed(()=>this.lastTwoFensSignal())
  async load(id:string){
    this.global.toggleLoader(true)
    try {
      const result = await firstValueFrom(this.service.findOne(id))
      console.log(result)
      this.debutSignal.set(result as fullDebutInterface)
      console.log(result)
    } catch (err: unknown){
      handleHttpError(this.global, err, 'Не удалось загрузить дебют')
    } finally {
      this.global.toggleLoader(false)
    }
  }
  openModal(modal: string, move?: moveInterface){
    this.showModalSignal.update(prev=>({...prev, [modal]: true}))
    if(move) this.selected.set(move)
  }
  closeModal(){
    this.showModalSignal.update(modals => {
      const updatedModals = { ...modals };
      (Object.keys(updatedModals) as Array<keyof showModalType>).forEach(key => {
        updatedModals[key] = false
      })
      this.resetModalFen()
      return updatedModals
    })
    this.selected.set({} as moveInterface)
  }
  setFen(fen: string) {
    this.modalFenSignal.set(fen)
  }
  resetModalFen() {
    this.modalFenSignal.set('start')
  }
  setLastTwoFens(fens:string[]){
    fens.unshift("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    this.lastTwoFensSignal.set(fens)
    console.log(fens)
  }
  resetLastTwoFens(){
    this.lastTwoFensSignal.set([])
  }
}
