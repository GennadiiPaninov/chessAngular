import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonComponent} from "../../button/button.component";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() data: any;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
