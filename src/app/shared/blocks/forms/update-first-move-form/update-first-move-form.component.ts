import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FieldComponent} from "../../../components/field/field.component";
import {InputComponent} from "../../../components/input/input.component";
import {NgClass} from "@angular/common";
import {ButtonComponent} from "../../../components/button/button.component";
import {RadioComponent} from "../../../components/radio/radio.component";
import {TextAreaComponent} from "../../../components/text-area/text-area.component";
import {DebutStore} from "../../../../store/debut/debutStore";
import {moveInterface} from "../../../../core/models/move-models/move-models";

@Component({
  selector: 'app-update-first-move-form',
  standalone: true,
  imports: [FieldComponent, InputComponent, ReactiveFormsModule, NgClass, ButtonComponent, RadioComponent, TextAreaComponent],
  templateUrl: './update-first-move-form.component.html',
  styleUrl: './update-first-move-form.component.scss'
})
export class UpdateFirstMoveFormComponent {

  @Output() clicked = new EventEmitter<void>()
  @Input() move: moveInterface = {} as moveInterface

  private fb = inject(FormBuilder)
  private debutStore = inject(DebutStore)

  updateMoveForm!: FormGroup

  ngOnChanges(): void {
    this.updateMoveForm = this.fb.group({
      desc: [this.move.desc, [Validators.required, Validators.minLength(5), Validators.maxLength(250)]],
    })
  }
  submit() {
    if (this.updateMoveForm.valid) {
      const {desc} = this.updateMoveForm.value
      this.debutStore.updateMove(desc)
    } else {
      this.updateMoveForm.markAllAsTouched()
    }
  }
}
