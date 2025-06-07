import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FieldComponent} from "../../../components/field/field.component";
import {InputComponent} from "../../../components/input/input.component";
import {NgClass} from "@angular/common";
import {ButtonComponent} from "../../../components/button/button.component";
import {RadioComponent} from "../../../components/radio/radio.component";
import {TextAreaComponent} from "../../../components/text-area/text-area.component";
import {DebutStore} from "../../../../store/debut/debutStore";

@Component({
  selector: 'app-create-first-move-form',
  standalone: true,
  imports: [FieldComponent, InputComponent, ReactiveFormsModule, NgClass, ButtonComponent, RadioComponent, TextAreaComponent],
  templateUrl: './create-first-move-form.component.html',
  styleUrl: './create-first-move-form.component.scss'
})
export class CreateFirstMoveFormComponent {
  @Output() clicked = new EventEmitter<void>()
  private fb = inject(FormBuilder)
  private debutStore = inject(DebutStore)

  createMoveForm!: FormGroup


  constructor() {
    this.createMoveForm = this.fb.group({
      from: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      to: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      desc: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(250)]],
    })
  }
  submit() {
    if (this.createMoveForm.valid) {
      // const {title, desc, side} = this.createDebutForm.value
      // this.debutsStore.createDebut({title, desc, side},()=>this.createDebutForm.reset())
    } else {
      this.createMoveForm.markAllAsTouched()
    }
  }
}
