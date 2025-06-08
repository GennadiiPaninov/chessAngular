import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FieldComponent} from "../../../components/field/field.component";
import {InputComponent} from "../../../components/input/input.component";
import {NgClass} from "@angular/common";
import {ButtonComponent} from "../../../components/button/button.component";
import {RadioComponent} from "../../../components/radio/radio.component";
import {TextAreaComponent} from "../../../components/text-area/text-area.component";
import {DebutStore} from "../../../../store/debut/debutStore";
import {validateMoveHelper} from "../../../../core/helpers/validateMoveHelper/validateMoveHelper";
import {ChessBoardComponent} from "../../../components/chess-board/chess-board.component";

@Component({
  selector: 'app-create-first-move-form',
  standalone: true,
  imports: [FieldComponent, InputComponent, ReactiveFormsModule, NgClass, ButtonComponent, RadioComponent, TextAreaComponent, ChessBoardComponent],
  templateUrl: './create-first-move-form.component.html',
  styleUrl: './create-first-move-form.component.scss'
})
export class CreateFirstMoveFormComponent {
  @Output() clicked = new EventEmitter<void>()
  private fb = inject(FormBuilder)
  debutStore = inject(DebutStore)

  createMoveForm!: FormGroup
  fen = 'start'

  constructor() {
    this.createMoveForm = this.fb.group({
      mFrom: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      mTo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      eFrom: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      eTo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      desc: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(250)]],
    },{
        validators: validateMoveHelper('mFrom', 'mTo', 'eFrom', 'eTo', this.debutStore.debut().side)
      }
    )
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
