import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FieldComponent} from "../../field/field.component";
import {InputComponent} from "../../input/input.component";

@Component({
  selector: 'app-create-debut-modal',
  standalone: true,
  imports: [FieldComponent, InputComponent, ReactiveFormsModule],
  templateUrl: './create-debut-modal.component.html',
  styleUrl: './create-debut-modal.component.scss'
})
export class CreateDebutModalComponent {
  createDebutForm!: FormGroup
  @Output() close = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    this.createDebutForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      desc: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  onClose() {
    this.close.emit();
  }
  submit() {

  }
}
