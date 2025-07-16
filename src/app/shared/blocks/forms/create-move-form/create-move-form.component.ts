import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {validateMoveHelper} from "@core/helpers/validateMoveHelper/validateMoveHelper";
import {updateNewMovesSignalT} from "@core/models/move-models/move-models";
import {FieldComponent} from "@components/field/field.component";
import {InputComponent} from "@components/input/input.component";
import {NgClass} from "@angular/common";
import {ButtonComponent} from "@components/button/button.component";
import {RadioComponent} from "@components/radio/radio.component";
import {TextAreaComponent} from "@components/text-area/text-area.component";
import {MoveStore} from "@store/move/moveStore";

@Component({
  selector: 'app-create-move-form',
  standalone: true,
  imports: [FieldComponent, InputComponent, ReactiveFormsModule, NgClass, ButtonComponent, RadioComponent, TextAreaComponent],
  templateUrl: './create-move-form.component.html',
  styleUrl: './create-move-form.component.scss'
})
export class CreateMoveFormComponent {
  @Output() clicked = new EventEmitter<void>()
  private fb = inject(FormBuilder)
  moveStore = inject(MoveStore)
  createMoveForm!: FormGroup

  constructor() {
    this.createMoveForm = this.fb.group({
      moveGroup: this.fb.group({
        mFrom: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
        mTo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
        eFrom: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
        eTo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      }, {
        validators: validateMoveHelper(
          'mFrom', 'mTo', 'eFrom', 'eTo',
          this.moveStore.isWhite(),
          (obj: updateNewMovesSignalT) => this.moveStore.setNewMoveSignal(obj),
          () => this.moveStore.resetNewMoveSignal(),
          this.moveStore.moveFen()
        )
      }),
      desc: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(250)]],
    })
  }

  submit() {
    if (this.createMoveForm.valid) {
      const moveGroup = this.createMoveForm.get('moveGroup')!.value;
      const desc = this.createMoveForm.get('desc')!.value;

      this.moveStore.createMove({
        ...moveGroup,
        desc
      });
    } else {
      this.createMoveForm.markAllAsTouched();
    }
  }
}
