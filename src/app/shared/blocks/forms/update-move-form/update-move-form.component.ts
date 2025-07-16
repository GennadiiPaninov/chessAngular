import { Component, EventEmitter, inject, Input, OnChanges, Output } from '@angular/core';
import { moveInterface } from '@core/models/move-models/move-models';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FieldComponent } from '@components/field/field.component';
import { InputComponent } from '@components/input/input.component';
import { NgClass } from '@angular/common';
import { ButtonComponent } from '@components/button/button.component';
import { RadioComponent } from '@components/radio/radio.component';
import { TextAreaComponent } from '@components/text-area/text-area.component';
import { MoveStore } from '@store/move/moveStore';

@Component({
  selector: 'app-update-move-form',
  standalone: true,
  imports: [
    FieldComponent,
    InputComponent,
    ReactiveFormsModule,
    NgClass,
    ButtonComponent,
    RadioComponent,
    TextAreaComponent,
  ],
  templateUrl: './update-move-form.component.html',
  styleUrl: './update-move-form.component.scss',
})
export class UpdateMoveFormComponent implements OnChanges {
  @Output() clicked = new EventEmitter<void>();
  @Input() move: moveInterface = {} as moveInterface;

  private fb = inject(FormBuilder);
  private moveStore = inject(MoveStore);

  updateMoveForm!: FormGroup;

  ngOnChanges(): void {
    this.updateMoveForm = this.fb.group({
      desc: [
        this.move.desc,
        [Validators.required, Validators.minLength(5), Validators.maxLength(250)],
      ],
    });
  }
  submit() {
    if (this.updateMoveForm.valid) {
      const { desc } = this.updateMoveForm.value;
      this.moveStore.updateMove(desc);
    } else {
      this.updateMoveForm.markAllAsTouched();
    }
  }
}
