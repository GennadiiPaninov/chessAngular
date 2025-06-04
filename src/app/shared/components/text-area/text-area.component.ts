import {ChangeDetectorRef, Component, EventEmitter, forwardRef, inject, Input, Output} from '@angular/core';
import {ControlContainer, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {InputErrorsService} from "../../../core/services/inputErrorsService/input-errors.service";
import {CommonModule, NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [CommonModule, NgIf, NgClass],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true,
    },
  ],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.scss'
})
export class TextAreaComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() formControlName?: string;
  @Input() autocomplete: string = 'off';
  @Input() standaloneValue: string = '';
  @Output() standaloneValueChange = new EventEmitter<string>();

  value = '';
  disabled = false;
  showError = false;

  private controlContainer = inject(ControlContainer, { optional: true });
  private cdr = inject(ChangeDetectorRef);
  private inputErrorsService = inject(InputErrorsService);

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value;
    this.standaloneValue = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: ()=>void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: ()=>void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onBlur(): void {
    this.showError = true;
    this.onTouched();
  }

  onFocus(): void {
    this.showError = false;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    const newValue = target.value;
    this.value = newValue;

    this.onChange(newValue);
    this.onTouched();

    if (!this.formControlName) {
      this.standaloneValue = newValue;
      this.standaloneValueChange.emit(newValue);
    }
  }

  get control(): FormControl | null {
    if (!this.formControlName) return null;
    const ctrl = this.controlContainer?.control?.get(this.formControlName);
    return ctrl instanceof FormControl ? ctrl : null;
  }

  get errorMessage(): string | null {
    const control = this.control;
    return this.inputErrorsService.getError(control);
  }
}
