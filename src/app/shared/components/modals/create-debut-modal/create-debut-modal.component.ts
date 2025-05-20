import {Component, EventEmitter,  Output} from '@angular/core';

@Component({
  selector: 'app-create-debut-modal',
  standalone: true,
  imports: [],
  templateUrl: './create-debut-modal.component.html',
  styleUrl: './create-debut-modal.component.scss'
})
export class CreateDebutModalComponent {

  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
