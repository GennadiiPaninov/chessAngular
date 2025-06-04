import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FieldComponent} from "../../../components/field/field.component";
import {InputComponent} from "../../../components/input/input.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass} from "@angular/common";
import {ButtonComponent} from "../../../components/button/button.component";
import {RadioComponent} from "../../../components/radio/radio.component";
import {DebutsStore} from "../../../../store/debuts/debutsStore";
import {TextAreaComponent} from "../../../components/text-area/text-area.component";

@Component({
  selector: 'app-create-debut-form',
  standalone: true,
  imports: [FieldComponent, InputComponent, ReactiveFormsModule, NgClass, ButtonComponent, RadioComponent, TextAreaComponent],
  templateUrl: './create-debut-form.component.html',
  styleUrl: './create-debut-form.component.scss'
})
export class CreateDebutFormComponent {
  @Output() clicked = new EventEmitter<void>()
  private fb = inject(FormBuilder)
  private debutsStore = inject(DebutsStore)
  radioOptions = [
    { label: 'Белые', value: 'White' },
    { label: 'Чёрные', value: 'Black' }
  ]
  createDebutForm!: FormGroup



  constructor() {
    this.createDebutForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      desc: ['', [Validators.required, Validators.minLength(5)]],
      side: ['', Validators.required],
    })
  }
  submit() {
    if (this.createDebutForm.valid) {
      const {title, desc, side} = this.createDebutForm.value
      this.debutsStore.createDebut({title, desc, side},()=>this.createDebutForm.reset())
    } else {
      this.createDebutForm.markAllAsTouched()
    }
  }
}
