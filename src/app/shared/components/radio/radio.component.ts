import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  inject,
  Input,
} from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { InputErrorsService } from '@core/services/inputErrorsService/input-errors.service';

export interface RadioOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [NgIf, NgClass, NgFor],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true,
    },
  ],
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioComponent implements ControlValueAccessor {
  @Input() options: RadioOption[] = [];
  @Input() id: string = crypto.randomUUID();
  @Input() formControlName?: string;

  private cdr = inject(ChangeDetectorRef);
  private controlContainer = inject(ControlContainer);
  private inputErrorsService = inject(InputErrorsService);

  value: string = '';
  disabled = false;

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  select(value: string): void {
    if (this.disabled) return;
    this.value = value;
    this.onChange(value);
    this.onTouched();
    this.cdr.markForCheck();
  }

  onFocus(): void {
    this.cdr.markForCheck();
  }

  get control(): FormControl | null {
    if (!this.formControlName) return null;
    const ctrl = this.controlContainer?.control?.get(this.formControlName);
    return ctrl instanceof FormControl ? ctrl : null;
  }

  get errorMessage(): string | null {
    const control = this.control;
    return control?.touched && control?.invalid ? this.inputErrorsService.getError(control) : null;
  }
}
