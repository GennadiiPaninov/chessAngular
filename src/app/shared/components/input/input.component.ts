import {
  Component,
  Input,
  forwardRef, inject, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor, FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {CommonModule, NgClass, NgIf} from '@angular/common';
import {svgName} from "../../../core/models/common-models/button.model";
import {ButtonComponent} from "../button/button.component";
import {InputErrorsService} from "../../../core/services/inputErrorsService/input-errors.service";

@Component({
  selector: 'app-input',
  standalone: true,
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  imports: [CommonModule, NgClass, NgIf, ButtonComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class InputComponent implements ControlValueAccessor {
  @Input() type: string = 'text'
  @Input() placeholder = ''
  @Input() id: string = crypto.randomUUID()
  @Input() svgName: svgName | '' = ''
  @Input() password: boolean = false
  @Input() formControlName?: string;
  @Input() autocomplete: string = 'off'
  @Input() standaloneValue: string = ''
  @Output() standaloneValueChange = new EventEmitter<string>()

  value: string = ''
  disabled = false;
  isPasswordVisible: boolean = false
  showError: boolean = false
  private controlContainer = inject(ControlContainer, { optional: true })
  private inputErrorsService = inject(InputErrorsService)
  private cdr = inject(ChangeDetectorRef)

  onChange = (value: string) => {
  };
  onTouched = () => {

  };

  showPassword(): void {
    this.isPasswordVisible = !this.isPasswordVisible
    this.isPasswordVisible ? this.type = 'text' : this.type = 'password'
  }

  writeValue(value: string): void {
    this.value = value
    this.standaloneValue = value
    this.showError = false
    this.cdr.markForCheck()

  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  onBlur(): void {
    this.showError = true
    this.onTouched()
  }
  onFocus(): void {
    this.showError = false
  }
  onInput(event: Event) {
    const target = event.target as HTMLInputElement
    const newValue = target.value
    this.value = newValue

    this.onChange(newValue)
    this.onTouched();

    if (!this.formControlName) {
      this.standaloneValue = newValue
      this.standaloneValueChange.emit(newValue)
    }
  }


  get control(): FormControl | null {
    if (!this.formControlName) return null
    const ctrl = this.controlContainer?.control?.get(this.formControlName)
    return ctrl instanceof FormControl ? ctrl : null
  }
  get errorMessage(): string |null {
    const control = this.control
    return this.inputErrorsService.getError(control)
  }
}
