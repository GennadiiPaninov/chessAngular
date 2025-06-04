import {Component, inject, OnDestroy, signal} from '@angular/core';
import {ButtonComponent} from "../../../components/button/button.component";
import {DebutsStore} from "../../../../store/debuts/debutsStore";
import {InputComponent} from "../../../components/input/input.component";
import {debounceSignal} from "../../../../core/helpers/debounceSignal/debounceSignal";

@Component({
  selector: 'app-debuts-sort',
  standalone: true,
  imports: [
    ButtonComponent,
    InputComponent
  ],
  templateUrl: './debuts-sort.component.html',
  styleUrl: './debuts-sort.component.scss'
})
export class DebutsSortComponent implements OnDestroy {
  searchDebuts = signal<string>('')
  debutsStore = inject(DebutsStore)
  hasAllDebutsArrived = this.debutsStore.hasAllDebutsArrived
  readonly stopDebounce: () => void

  constructor() {
    this.stopDebounce = debounceSignal(this.searchDebuts, 400, (title) => {
      this.debutsStore.loadDebuts(false, title.trim())
    })
  }

  showDebuts(my: boolean){
    this.debutsStore.loadDebuts(my, this.searchDebuts())
  }
  ngOnDestroy(): void {
    this.stopDebounce();
  }
}
