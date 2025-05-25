import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  forwardRef,
  ViewEncapsulation,
  ChangeDetectorRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [NgClass, FormsModule, ReactiveFormsModule],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent implements ControlValueAccessor {

  @Input() label: string = ''
  @Input() disabled: boolean = false
  @Input() id: string = `checkbox-${Math.random().toString(36).substring(2)}`
  @Input() className: string = ''

  @Output() checkedChange = new EventEmitter<boolean>()

  private _isChecked: boolean = false

  get isChecked(): boolean {
    return this._isChecked
  }

  set isChecked(value: boolean) {
    if (this._isChecked !== value) {
      this._isChecked = value
      this.checkedChange.emit(value)
      this.onChange(value)
      this.cdr.markForCheck()
    }
  }

  private onChange: (value: boolean) => void = () => {}
  private onTouched: () => void = () => {}

  constructor(private cdr: ChangeDetectorRef) {}

  writeValue(value: unknown): void {
    this.isChecked = typeof value === 'boolean' ? value : false;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck()
  }

  toggleCheck(event?: Event): void {
    if (this.disabled) return;
    this.isChecked = !this.isChecked;
    this.onTouched();
    if (event) {
      event.stopPropagation()
    }
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
      this.toggleCheck(event)
    }
  }
}
