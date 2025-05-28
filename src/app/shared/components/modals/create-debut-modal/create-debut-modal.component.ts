import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FieldComponent} from "../../field/field.component";
import {InputComponent} from "../../input/input.component";
import {NgClass} from "@angular/common";
import {ButtonComponent} from "../../button/button.component";
import {RadioComponent} from "../../radio/radio.component";
import {loginAction} from "../../../../store/login/login.action";
import {DebutsService} from "../../../../core/services/debuts/debuts.service";
import {Store} from "@ngrx/store";
import {createDebutAction} from "../../../../store/debuts/debuts.actions";

@Component({
  selector: 'app-create-debut-modal',
  standalone: true,
  imports: [FieldComponent, InputComponent, ReactiveFormsModule, NgClass, ButtonComponent, RadioComponent],
  templateUrl: './create-debut-modal.component.html',
  styleUrl: './create-debut-modal.component.scss'
})
export class CreateDebutModalComponent {
  radioOptions = [
    { label: 'Белые', value: 'White' },
    { label: 'Чёрные', value: 'Black' }
  ]
  createDebutForm!: FormGroup
  @Output() close = new EventEmitter<void>()
  private fb = inject(FormBuilder)
  private store = inject(Store)

  constructor() {
    this.createDebutForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      desc: ['', [Validators.required, Validators.minLength(5)]],
      side: ['', Validators.required],
    })
  }

  onClose() {
    this.close.emit()
  }
  submit() {
    if (this.createDebutForm.valid) {
      const {title, desc, side} = this.createDebutForm.value
      this.store.dispatch(createDebutAction({title, desc, side}))
    } else {
      this.createDebutForm.markAllAsTouched();
    }
  }
}
