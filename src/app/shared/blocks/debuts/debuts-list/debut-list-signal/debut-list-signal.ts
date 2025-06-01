import {Injectable, signal} from "@angular/core";
import {debutInterface} from "../../../../../core/models/debut-models/debut-models";
interface debutsSignal {
  showModel: {
    update: boolean
    create:boolean
    delete: boolean
  },
  selectedDebut: debutInterface
}
@Injectable(
  {providedIn: null}
)
export class DebutListSignal {
  _debutsSignal = signal<debutsSignal>({
    showModel: {
      update: false,
      create: false,
      delete: false,
    },
    selectedDebut: {} as debutInterface
  })
  openModal(key:string){
    this._debutsSignal.update((state) => ({
      ...state,
      showModel: {
        ...state.showModel,
        [key]: true
      }
    }))
  }
  closeModal(key: string) {
    this._debutsSignal.update((state) => ({
      ...state,
      showModel: {
        ...state.showModel,
        [key]: false
      }
    }))
  }
}
