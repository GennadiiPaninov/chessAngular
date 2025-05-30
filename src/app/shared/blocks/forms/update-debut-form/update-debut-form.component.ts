import {Component, EventEmitter, inject, Input, OnChanges, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {createDebutAction, updateDebut} from "../../../../store/debuts/debuts.actions";
import {resetFormHelper} from "../../../../core/helpers/resetFormHelper/resetFormHelper";
import {FieldComponent} from "../../../components/field/field.component";
import {InputComponent} from "../../../components/input/input.component";
import {NgClass} from "@angular/common";
import {ButtonComponent} from "../../../components/button/button.component";
import {RadioComponent} from "../../../components/radio/radio.component";
import {debutInterface} from "../../../../core/models/debut-models/debut-models";

@Component({
  selector: 'app-update-debut-form',
  standalone: true,
  imports: [FieldComponent, InputComponent, ReactiveFormsModule, NgClass, ButtonComponent, RadioComponent],
  templateUrl: './update-debut-form.component.html',
  styleUrl: './update-debut-form.component.scss'
})
export class UpdateDebutFormComponent implements OnChanges{

  @Output() clicked = new EventEmitter<void>()
  @Input() debut: debutInterface = {} as debutInterface

  private fb = inject(FormBuilder)
  private store = inject(Store)

  private resetFormHelper = inject(resetFormHelper)
  updateDebutForm!: FormGroup

  ngOnChanges(): void {
    this.updateDebutForm = this.fb.group({
      title: [this.debut.title, [Validators.required, Validators.minLength(5)]],
      desc: [this.debut.desc, [Validators.required, Validators.minLength(5)]],
    })
  }
  submit() {
    if (this.updateDebutForm.valid) {
      const {title, desc} = this.updateDebutForm.value
      const id = this.debut.id
      this.store.dispatch(updateDebut({title, desc, id}))
      this.resetFormHelper.reset({
        fb: this.updateDebutForm,
        onReset: ()=> this.clicked.emit()
      })
    } else {
      this.updateDebutForm.markAllAsTouched()
    }
  }
}
