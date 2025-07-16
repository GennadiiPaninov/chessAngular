import { Component, EventEmitter, inject, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FieldComponent } from '@components/field/field.component';
import { InputComponent } from '@components/input/input.component';
import { NgClass } from '@angular/common';
import { ButtonComponent } from '@components/button/button.component';
import { RadioComponent } from '@components/radio/radio.component';
import { debutInterface } from '@core/models/debut-models/debut-models';
import { DebutsStore } from '@store/debuts/debutsStore';
import { TextAreaComponent } from '@components/text-area/text-area.component';

@Component({
  selector: 'app-update-debut-form',
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
  templateUrl: './update-debut-form.component.html',
  styleUrl: './update-debut-form.component.scss',
})
export class UpdateDebutFormComponent implements OnChanges {
  @Output() clicked = new EventEmitter<void>();
  @Input() debut: debutInterface = {} as debutInterface;

  private fb = inject(FormBuilder);
  private debutsStore = inject(DebutsStore);

  updateDebutForm!: FormGroup;

  ngOnChanges(): void {
    this.updateDebutForm = this.fb.group({
      title: [this.debut.title, [Validators.required, Validators.minLength(5)]],
      desc: [this.debut.desc, [Validators.required, Validators.minLength(5)]],
    });
  }
  submit() {
    if (this.updateDebutForm.valid) {
      const { title, desc } = this.updateDebutForm.value;
      const id = this.debut.id;
      this.debutsStore.updateDebut({ title, desc, id }, () => this.updateDebutForm.reset());
    } else {
      this.updateDebutForm.markAllAsTouched();
    }
  }
}
